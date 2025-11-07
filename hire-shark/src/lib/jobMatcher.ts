import type { ResumeParsed, MatchResult } from "../types";

interface CsvJob {
  id: string;
  title: string;
  company: string;
  location?: string;
  employmentType?: string;
  description?: string;
  keywords?: string[];
  applyUrl?: string;
  jobUrl?: string;
}

let cachedJobs: CsvJob[] | null = null;

export async function matchResumeWithGreenhouseCsv(resume: ResumeParsed, limit = 10): Promise<MatchResult[]> {
  const jobs = await loadJobs();
  if (!jobs.length) return [];

  const resumeText = buildResumeDocument(resume);
  const resumeTokens = tokenize(resumeText);
  const resumeVector = termFrequency(resumeTokens);
  const resumeMagnitude = vectorMagnitude(resumeVector);
  const resumeSkillsOriginal = resume.skills ?? [];
  const resumeSkillTokens = resumeSkillsOriginal
    .map(skill => skill.toLowerCase().trim())
    .filter(Boolean);

  const results = jobs.map(job => {
    const jobText = buildJobDocument(job);
    const jobTokens = tokenize(jobText);
    const jobVector = termFrequency(jobTokens);
    const jobMagnitude = vectorMagnitude(jobVector);
    const jobLowerText = jobText.toLowerCase();

    const similarity = cosineSimilarity(resumeVector, resumeMagnitude, jobVector, jobMagnitude);

    const matchedSkills = Array.from(
      new Set(
        resumeSkillTokens
          .filter(skill => skill && jobLowerText.includes(skill))
          .map(skill => toTitleCase(skill))
      )
    ).slice(0, 10);
    const skillScore = resumeSkillsOriginal.length ? matchedSkills.length / resumeSkillsOriginal.length : 0;

    const score = Math.min(1, 0.75 * similarity + 0.25 * skillScore);

    const snippet = job.description ? job.description.slice(0, 220) + (job.description.length > 220 ? "…" : "") : undefined;

    return {
      jobId: job.id,
      title: job.title,
      company: job.company ?? "",
      score,
      matchedSkills,
      snippet,
      location: job.location,
      salary: undefined,
      jobType: job.employmentType,
      url: job.jobUrl || job.applyUrl,
      applyUrl: job.applyUrl || job.jobUrl,
      postedDate: undefined,
    } satisfies MatchResult;
  });

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

async function loadJobs(): Promise<CsvJob[]> {
  if (cachedJobs) return cachedJobs;

  try {
    const response = await fetch("/data/greenhouse_full_jobs.csv");
    if (!response.ok) {
      console.error("Failed to load greenhouse_full_jobs.csv", response.status);
      return [];
    }
    const text = await response.text();
    const parsed = parseCsv(text);
    cachedJobs = parsed;
    return parsed;
  } catch (error) {
    console.error("Error loading greenhouse_full_jobs.csv", error);
    return [];
  }
}

function parseCsv(content: string): CsvJob[] {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];

  const headers = lines[0].split(",").map(header => header.trim().toLowerCase());

  return lines.slice(1).map(line => {
    const values = line.split(",").map(value => value.trim());
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index] ?? "";
    });

    return {
      id: record.id || `${record.title}-${indexHash(line)}`,
      title: record.title || "Untitled Role",
      company: record.company || "Unknown Company",
      location: record.location,
      employmentType: record.employment_type || record.employmenttype,
      description: record.description || record.job_description || record.summary,
      keywords: (record.keywords || record.skills || "")
        .split(/;|\|/)
        .map(keyword => keyword.trim())
        .filter(Boolean),
      applyUrl: record.apply_url || record.applyurl,
      jobUrl: record.job_url || record.joburl,
    } satisfies CsvJob;
  });
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token));
}

function termFrequency(tokens: string[]): Map<string, number> {
  const map = new Map<string, number>();
  tokens.forEach(token => {
    map.set(token, (map.get(token) ?? 0) + 1);
  });
  return map;
}

function vectorMagnitude(vector: Map<string, number>): number {
  let sum = 0;
  vector.forEach(value => {
    sum += value * value;
  });
  return Math.sqrt(sum);
}

function cosineSimilarity(
  a: Map<string, number>,
  magA: number,
  b: Map<string, number>,
  magB: number
): number {
  if (magA === 0 || magB === 0) return 0;
  let dot = 0;
  a.forEach((value, key) => {
    const bValue = b.get(key);
    if (bValue) {
      dot += value * bValue;
    }
  });
  return dot / (magA * magB);
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

function buildJobDocument(job: CsvJob): string {
  const parts: string[] = [job.title, job.company ?? "", job.location ?? "", job.description ?? ""];
  if (job.keywords?.length) parts.push(job.keywords.join(" "));
  return parts.join(" ");
}

function toTitleCase(value: string): string {
  return value.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1));
}

function indexHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

const STOP_WORDS = new Set([
  "the",
  "and",
  "with",
  "from",
  "that",
  "this",
  "have",
  "will",
  "your",
  "about",
  "work",
  "team",
  "role",
  "experience",
  "skills",
  "responsibilities",
  "requirements",
  "for",
  "are",
  "you",
  "our",
  "job",
  "full",
  "time",
  "year",
  "ability",
  "using",
]);
