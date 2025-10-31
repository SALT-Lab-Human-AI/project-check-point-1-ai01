// types/index.ts
export type ResumeParsed = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: string[];
  experiences?: Array<{
    company?: string;
    title?: string;
    start?: string;
    end?: string;
    bullets?: string[];
  }>;
  rawText: string;
  fileName: string;
};

export type ResumeData = {
  id: string;
  file: File | null;
  parsed?: ResumeParsed;
  uploadedAt?: string;
};

export type MatchResult = {
  jobId: string;
  title: string;
  company: string;
  score: number; // 0..1
  matchedSkills: string[];
  snippet?: string;
};

export type JobPosting = {
    jobId: string;
    title: string;
    company: string;
    description: string;
    skills: string[];
};
