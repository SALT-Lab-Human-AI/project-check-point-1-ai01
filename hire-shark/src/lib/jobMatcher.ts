import type { ResumeParsed, MatchResult } from "../types";
import { fetchAdzunaJobs } from "./adzunaApi";
import { JobPreferences } from "../types";

export async function matchJobs(resume: ResumeParsed, preferences: JobPreferences, limit = 10): Promise<MatchResult[]> {
  // Fetch jobs from Adzuna
  const adzunaResults = await fetchAdzunaJobs(preferences);

  if (!adzunaResults.length) return [];

  // Build plain job objects from Adzuna results (they already are MatchResult-shaped,
  // but ensure we have description text to vectorize)
  const jobs = adzunaResults.map(j => ({
    id: j.jobId,
    title: j.title,
    company: j.company,
    description: j.snippet || "",
    keywords: j.matchedSkills || [],
    location: j.location,
    applyUrl: j.applyUrl,
    jobUrl: j.url,
    salary: j.salary,
    jobType: j.jobType?.replace(/_/g, " "),
    postedDate: j.postedDate,
  }));

  const resumeText = buildResumeDocument(resume);
  // Include resumeText in the corpus for TF-IDF so resume tokens are part of the vocabulary
  const corpus = jobs.map(j => `${j.title || ""} ${j.description || ""} ${(j.keywords || []).join(" ")}`);

  // Try to initialize optional skip-gram adapter via shared initializer, passing the full corpus
  // (jobs + resume) so the model trains on relevant tokens.
  let skipAdapter: any = null;
  try {
    const { getSkipGramAdapter } = await import("./skipgramAdapter");
    skipAdapter = await getSkipGramAdapter([...corpus, resumeText]);
  } catch (e) {
    // ignore and fall back
  }

  let jobVectors: number[][] = [];
  let resumeVector: number[] = [];

  if (skipAdapter) {
    jobVectors = corpus.map(c => skipAdapter.vectorizeText(c));
    resumeVector = skipAdapter.vectorizeText(resumeText);
  } else {
    const { buildVectorizer } = await import("./embeddings");
    // include resumeText so its tokens are included in the TF-IDF vocabulary
    const vectorizer = buildVectorizer([...corpus, resumeText]);
    jobVectors = corpus.map(c => vectorizer.vectorize(c));
    resumeVector = vectorizer.vectorize(resumeText);
  }

  const resumeSkillsOriginal = resume.skills ?? [];
  const resumeSkillTokens = resumeSkillsOriginal.map(s => s.toLowerCase().trim()).filter(Boolean);

  const results: MatchResult[] = await Promise.all(jobs.map(async (job, idx) => {
    const jobText = `${job.title} ${job.description} ${(job.keywords || []).join(' ')}`;
    const jobLowerText = jobText.toLowerCase();

    // compute vector similarity
    let vecSim = 0;
    if (skipAdapter) {
      vecSim = skipAdapter.cosineSimilarity(resumeVector, jobVectors[idx]);
    } else {
      const { cosineSimilarity } = await import("./embeddings");
      vecSim = cosineSimilarity(resumeVector, jobVectors[idx]);
    }

    const matchedSkills = Array.from(new Set(resumeSkillTokens.filter(skill => jobLowerText.includes(skill)).map(s => toTitleCase(s)))).slice(0, 10);
    const skillScore = resumeSkillsOriginal.length ? matchedSkills.length / resumeSkillsOriginal.length : 0;

    // Debug info: if vecSim is zero often it means resume vector has no overlap with job vocab
    // or vectors are zero. Log minimal diagnostics to help trace why scores are 0.
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
      try {
        const rvNonZero = Array.isArray(resumeVector) ? (resumeVector as number[]).some(v => Math.abs(v) > 1e-9) : true;
        const jvNonZero = Array.isArray(jobVectors[idx]) ? jobVectors[idx].some(v => Math.abs(v) > 1e-9) : true;
        console.debug(`matchJobs debug: job=${job.title} vecSim=${vecSim.toFixed(6)} rvNonZero=${rvNonZero} jvNonZero=${jvNonZero} skillScore=${skillScore.toFixed(6)}`);
      } catch (e) {
        // ignore logging errors
      }
    }

    const score = Math.min(1, 0.75 * vecSim + 0.25 * skillScore);

    return {
      jobId: job.id,
      title: job.title,
      company: job.company ?? "",
      score,
      matchedSkills,
      snippet: job.description ? job.description.slice(0, 300) : undefined,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      url: job.jobUrl || job.applyUrl,
      applyUrl: job.applyUrl || job.jobUrl,
      postedDate: job.postedDate,
    } as MatchResult;
  }));

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

function buildResumeDocument(resume: ResumeParsed): string {
  const pieces: string[] = [];
  if (resume.summary) pieces.push(resume.summary);
  if (resume.skills?.length) pieces.push(resume.skills.join(" "));
  resume.experiences?.forEach(exp => {
    if (exp.title) pieces.push(exp.title);
    if (exp.company) pieces.push(exp.company);
    if (exp.bullets?.length) pieces.push(exp.bullets.join(" "));
  });
  resume.education?.forEach(edu => {
    if (edu.degree) pieces.push(edu.degree);
    if (edu.field) pieces.push(edu.field);
    if (edu.institution) pieces.push(edu.institution);
  });
  return pieces.join(" ");
}

function toTitleCase(value: string): string {
  return value.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1));
}
