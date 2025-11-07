import type { ResumeParsed, MatchResult } from "../types";
import { fetchAdzunaJobs } from "./adzunaApi";
import { JobPreferences } from "../types";

export async function matchJobs(resume: ResumeParsed, preferences: JobPreferences, limit = 10): Promise<MatchResult[]> {
  // For now, we'll just fetch jobs from Adzuna based on preferences.
  // In a more advanced scenario, we might use the resume to refine the Adzuna query
  // or to perform post-filtering/scoring of the Adzuna results.
  const adzunaResults = await fetchAdzunaJobs(preferences);

  // If we want to implement a scoring mechanism based on the resume and Adzuna results,
  // it would go here. For now, we return the Adzuna results directly.
  return adzunaResults.slice(0, limit);
}