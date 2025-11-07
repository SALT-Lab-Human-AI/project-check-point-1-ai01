import { MatchResult, JobPreferences } from "../types";

const ADZUNA_API_BASE_URL = "https://api.adzuna.com/v1/api/jobs";
const ADZUNA_APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const ADZUNA_APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;

export async function fetchAdzunaJobs(preferences: JobPreferences): Promise<MatchResult[]> {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    console.error("Adzuna API keys are not set. Please set VITE_ADZUNA_APP_ID and VITE_ADZUNA_APP_KEY in your .env file.");
    return [];
  }

  const params = new URLSearchParams({
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    results_per_page: "10", // Fetch a reasonable number of results
    // Add other required parameters as needed based on Adzuna API docs
  });

  const jobQuery = preferences.jobRole || preferences.customJobRole;
  if (jobQuery) {
    const normalizedQuery = jobQuery.replace(/-/g, " ").trim();
    if (normalizedQuery) {
      params.set("what", normalizedQuery);
    }
  }
  if (preferences.minSalary) params.set("salary_min", preferences.minSalary);
  if (preferences.maxSalary) params.set("salary_max", preferences.maxSalary);

  if (preferences.jobType === "full-time") params.set("full_time", "1");
  if (preferences.jobType === "part-time") params.set("part_time", "1");
  if (preferences.jobType === "contract") params.set("contract", "1");

  const url = `${ADZUNA_API_BASE_URL}/us/search/1?${params.toString()}`;
  console.log("Fetching Adzuna jobs with URL:", url);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Adzuna API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.results.map((job: any) => ({
      jobId: job.id,
      title: job.title,
      company: job.company.display_name,
      score: 0, // Adzuna API doesn't provide a direct match score, so default to 0 or implement custom scoring later
      matchedSkills: [], // Adzuna API doesn't directly provide matched skills, can be implemented with NLP later
      snippet: job.description,
      location: job.location.display_name,
      salary: job.salary_is_predicted ? `~${job.salary_min} - ~${job.salary_max}` : `${job.salary_min} - ${job.salary_max}`,
      jobType: job.contract_type,
      url: job.redirect_url,
      applyUrl: job.redirect_url,
      postedDate: job.created,
    }));
  } catch (error) {
    console.error("Error fetching jobs from Adzuna:", error);
    return [];
  }
}
