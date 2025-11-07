
import { ResumeParsed, MatchResult, JobPosting } from "../types";
import { buildVectorizer, cosineSimilarity } from "./embeddings";

// Optional skip-gram adapter (dynamically loaded). If present and initializable,
// we'll use skip-gram vectorization; otherwise fall back to TF-IDF.
async function tryInitSkipGram() {
    try {
        // dynamic import so the module (and its tfjs dependency) is only required if present
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = await import("./word_match_skipgram");
        if (mod && typeof mod.initSkipGram === "function") {
            const adapter = await mod.initSkipGram();
            return adapter;
        }
    } catch (e) {
        // ignore and fall back
        // console.warn("Skip-gram init failed, falling back to TF-IDF:", e);
    }
    return null;
}

// Hybrid matching: 80% vector similarity (TF-IDF cosine) + 20% skill overlap.
const VECTOR_WEIGHT = 0.8;
const SKILL_WEIGHT = 1 - VECTOR_WEIGHT;

export async function getMatches(parsed: ResumeParsed, jobs: JobPosting[], limit = 10): Promise<MatchResult[]> {
    const matches: MatchResult[] = [];

        // Build corpus from jobs: title + description + skills
        const corpus = jobs.map(j => `${j.title || ""} ${j.description || ""} ${j.skills.join(' ')}`);

        // Try to initialize skip-gram adapter first; if unavailable, use TF-IDF vectorizer
        const skipAdapter = await tryInitSkipGram();

        let jobVectors: number[][] = [];
        let resumeVector: number[] = [];

        if (skipAdapter) {
            jobVectors = corpus.map(c => skipAdapter.vectorizeText(c));
            const resumeText = parsed.rawText || [parsed.summary || "", (parsed.skills || []).join(' '), ...(parsed.experiences || []).flatMap(e => e.bullets || [])].join(' ');
            resumeVector = skipAdapter.vectorizeText(resumeText);
        } else {
            const vectorizer = buildVectorizer(corpus);
            // Precompute job vectors
            jobVectors = corpus.map(c => vectorizer.vectorize(c));
            // Build resume text to vectorize
            const resumeText = parsed.rawText || [parsed.summary || "", (parsed.skills || []).join(' '), ...(parsed.experiences || []).flatMap(e => e.bullets || [])].join(' ');
            resumeVector = vectorizer.vectorize(resumeText);
        }

    for (let idx = 0; idx < jobs.length; idx++) {
        const job = jobs[idx];
        const matchedSkills = job.skills.filter(skill => parsed.skills.includes(skill));

        // skill overlap score (0..1)
        const skillScore = job.skills.length > 0 ? matchedSkills.length / job.skills.length : 0;

        // vector similarity (cosine). TF-IDF vectors are L2-normalized, so cosine in [0,1]
        const vecSim = cosineSimilarity(resumeVector, jobVectors[idx]) || 0;

        const score = VECTOR_WEIGHT * vecSim + SKILL_WEIGHT * skillScore;

        // Keep results with any signal
        if (score > 0) {
            matches.push({
                jobId: job.jobId,
                title: job.title,
                company: job.company,
                score,
                matchedSkills,
                snippet: job.description ? job.description.slice(0, 300) : undefined,
            });
        }
    }

    return matches.sort((a, b) => b.score - a.score).slice(0, limit);
}
