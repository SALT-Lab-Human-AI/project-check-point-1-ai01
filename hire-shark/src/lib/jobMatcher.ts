import type { ResumeParsed, MatchResult, JobPreferences } from "../types";
import { fetchAdzunaJobs } from "./adzunaApi";
import { extractJobSkills } from "./skillExtractor";

const MATCH_THRESHOLD = 0.75;
const MAX_SKILL_BADGES = 10;

type SkillVector = {
  raw: string;
  normalized: string;
  vector: number[];
};

type SkillEmbeddingEngine = {
  vectorize(text: string): number[];
  cosine(a: number[], b: number[]): number;
};

export async function matchJobs(resume: ResumeParsed, preferences: JobPreferences, limit = 10): Promise<MatchResult[]> {
  const adzunaResults = await fetchAdzunaJobs(preferences);
  if (!adzunaResults.length) return [];

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

  const resumeSkills = dedupeSkills(resume.skills ?? []);
  const resumeSkillMap = new Map(resumeSkills.map(skill => [normalizeSkill(skill), skill]));

  const jobSkillLists = await Promise.all(
    jobs.map(async job => {
      try {
        const skills = await extractJobSkills({
          title: job.title ?? "",
          description: job.description ?? "",
          keywords: job.keywords ?? [],
        });
        return dedupeSkills(skills);
      } catch (error) {
        console.warn("Failed to extract job skills", error);
        return [];
      }
    }),
  );

  const skillCorpus = Array.from(new Set([...resumeSkills, ...jobSkillLists.flat()])).filter(Boolean);
  const embeddingEngine = skillCorpus.length ? await buildSkillEmbeddingEngine(skillCorpus) : null;
  const vectorCache = new Map<string, number[]>();
  const getVector = (text: string): number[] => {
    const key = text.toLowerCase();
    if (vectorCache.has(key)) {
      return vectorCache.get(key)!;
    }
    const vec = embeddingEngine ? embeddingEngine.vectorize(text) : [];
    vectorCache.set(key, vec);
    return vec;
  };

  const resumeSkillVectors: SkillVector[] = embeddingEngine
    ? resumeSkills.map(skill => ({
        raw: skill,
        normalized: normalizeSkill(skill),
        vector: getVector(skill),
      }))
    : [];

  const results: MatchResult[] = jobs.map((job, idx) => {
    const jobSkills = jobSkillLists[idx] ?? [];
    const jobSkillVectors: SkillVector[] = jobSkills.map(skill => ({
      raw: skill,
      normalized: normalizeSkill(skill),
      vector: getVector(skill),
    }));

    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    for (const jobSkill of jobSkillVectors) {
      if (!jobSkill.normalized) continue;

      if (resumeSkillMap.has(jobSkill.normalized)) {
        matchedSkills.push(jobSkill.raw);
        continue;
      }

      let bestScore = 0;
      if (embeddingEngine && vectorHasMagnitude(jobSkill.vector) && resumeSkillVectors.length) {
        for (const resumeSkill of resumeSkillVectors) {
          if (!vectorHasMagnitude(resumeSkill.vector)) continue;
          const similarity = embeddingEngine.cosine(jobSkill.vector, resumeSkill.vector);
          if (similarity > bestScore) {
            bestScore = similarity;
          }
        }
      }

      if (bestScore >= MATCH_THRESHOLD) {
        matchedSkills.push(jobSkill.raw);
      } else {
        missingSkills.push(jobSkill.raw);
      }
    }

    const totalRequired = jobSkills.length;
    const matchedCount = matchedSkills.length;
    const missingCount = missingSkills.length;
    const coverage = totalRequired ? matchedCount / totalRequired : 0;

    return {
      jobId: job.id,
      title: job.title,
      company: job.company ?? "",
      score: Math.min(1, coverage),
      matchedSkills: matchedSkills.slice(0, MAX_SKILL_BADGES),
      missingSkills: missingSkills.slice(0, MAX_SKILL_BADGES),
      matchedSkillCount: matchedCount,
      missingSkillCount: missingCount,
      totalJobSkills: totalRequired,
      snippet: job.description ? job.description.slice(0, 300) : undefined,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      url: job.jobUrl || job.applyUrl,
      applyUrl: job.applyUrl || job.jobUrl,
      postedDate: job.postedDate,
    } as MatchResult;
  });

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

function normalizeSkill(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function dedupeSkills(list: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of list) {
    const normalized = normalizeSkill(item || "");
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(item.trim());
  }
  return result;
}

function vectorHasMagnitude(vec: number[]): boolean {
  return Array.isArray(vec) && vec.some(v => Math.abs(v) > 1e-6);
}

async function buildSkillEmbeddingEngine(corpus: string[]): Promise<SkillEmbeddingEngine> {
  try {
    const { getSkipGramAdapter } = await import("./skipgramAdapter");
    const adapter = await getSkipGramAdapter(corpus);
    if (adapter) {
      return {
        vectorize: (text: string) => adapter.vectorizeText(text),
        cosine: (a: number[], b: number[]) => adapter.cosineSimilarity(a, b),
      };
    }
  } catch (error) {
    console.warn("Skip-gram adapter unavailable, falling back to TF-IDF", error);
  }

  const { buildVectorizer, cosineSimilarity } = await import("./embeddings");
  const vectorizer = buildVectorizer(corpus);
  return {
    vectorize: (text: string) => vectorizer.vectorize(text),
    cosine: (a: number[], b: number[]) => cosineSimilarity(a, b),
  };
}
