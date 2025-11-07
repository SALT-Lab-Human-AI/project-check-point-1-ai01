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
  education?: Array<{
    degree?: string;
    field?: string;
    institution?: string;
    location?: string;
    start?: string;
    end?: string;
    gpa?: string;
    honors?: string[];
  }>;
  confidence?: {
    personalInfo?: number;
    experience?: number;
    skills?: number;
    education?: number;
  };
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
  location?: string;
  salary?: string;
  jobType?: string;
  url?: string;
  applyUrl?: string;
  postedDate?: string;
};

export type JobPosting = {
    jobId: string;
    title: string;
    company: string;
    description: string;
    skills: string[];
};

// User Preferences Types
export type JobPreferences = {
  jobType?: string; // full-time, part-time, contract, etc.
  jobRole?: string; // preferred job role
  customJobRole?: string; // custom job role input
  minSalary?: string;
  maxSalary?: string;
};

