
import { ResumeParsed, MatchResult, JobPosting } from "../types";

export async function getMatches(parsed: ResumeParsed, jobs: JobPosting[], limit = 10): Promise<MatchResult[]> {
    const matches: MatchResult[] = [];

    for (const job of jobs) {
        const matchedSkills = job.skills.filter(skill => parsed.skills.includes(skill));
        const score = matchedSkills.length / job.skills.length;

        if (score > 0) {
            matches.push({
                jobId: job.jobId,
                title: job.title,
                company: job.company,
                score,
                matchedSkills,
            });
        }
    }

    return matches.sort((a, b) => b.score - a.score).slice(0, limit);
}
