import { hasGeminiApiKeyConfigured, runWithGeminiModel } from "./gemini_parser";

const DEFAULT_SKILL_LIMIT = 10;
const COMMON_SKILL_CANDIDATES = [
  "python",
  "java",
  "javascript",
  "typescript",
  "react",
  "vue",
  "angular",
  "node.js",
  "express",
  "graphql",
  "rest apis",
  "html",
  "css",
  "sass",
  "sql",
  "nosql",
  "postgresql",
  "mysql",
  "mongodb",
  "redis",
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "terraform",
  "ci/cd",
  "git",
  "react native",
  "swift",
  "kotlin",
  "c++",
  "c#",
  "go",
  "rust",
  "php",
  "laravel",
  "django",
  "flask",
  "spring boot",
  "machine learning",
  "deep learning",
  "nlp",
  "computer vision",
  "data analysis",
  "data engineering",
  "tableau",
  "power bi",
  "excel",
  "figma",
  "ui/ux design",
  "product management",
  "project management",
  "agile",
  "scrum",
  "jira",
  "leadership",
  "communication",
  "stakeholder management",
  "salesforce",
  "crm",
  "seo",
  "sem",
  "copywriting",
  "content strategy",
  "digital marketing",
  "public speaking",
  "negotiation",
  "customer service",
];

const COMMON_SKILL_SET = new Set(COMMON_SKILL_CANDIDATES.map(skill => skill.toLowerCase()));
const DESCRIPTIVE_SUFFIXES = [
  "less",
  "ness",
  "ment",
  "tion",
  "sion",
  "ance",
  "ence",
  "hood",
  "ship",
  "ism",
  "ist",
  "ity",
  "ment",
  "able",
  "ible",
  "ary",
  "ory",
  "ing",
  "ers",
  "ence",
  "acy",
  "ous",
  "ally",
  "ally",
];
const GENERIC_SKILL_STOPWORDS = new Set([
  "tools",
  "tooling",
  "engagement",
  "engagements",
  "team",
  "teams",
  "customers",
  "clients",
  "people",
  "stakeholders",
  "stakeholder",
  "projects",
  "project",
  "solutions",
  "solution",
  "opportunities",
  "opportunity",
  "experience",
  "requirements",
  "responsibilities",
  "deliverables",
  "work",
  "tasks",
  "initiatives",
  "activities",
]);
const SHORT_SKILL_WHITELIST = new Set(["c", "c++", "c#", "css", "go", "aws", "sql", "seo", "ui", "ux", "nlp"]);
const TECH_KEYWORD_TOKENS = new Set([
  "analytics",
  "analysis",
  "analyst",
  "marketing",
  "sales",
  "product",
  "design",
  "security",
  "finance",
  "financial",
  "accounting",
  "operations",
  "automation",
  "devops",
  "data",
  "ai",
  "ml",
  "robotics",
  "testing",
  "quality",
  "support",
  "strategy",
  "cloud",
  "engineering",
  "research",
  "training",
  "growth",
]);
const SIGNAL_CHAR_REGEX = /[A-Z0-9+#/().&_-]/;
const LEADING_STOP_TOKENS = new Set([
  "our",
  "your",
  "their",
  "his",
  "her",
  "its",
  "the",
  "this",
  "that",
  "these",
  "those",
]);

const SKILL_CACHE = new Map<string, string[]>();
const GEMINI_DISABLED = import.meta.env?.VITE_DISABLE_GEMINI_JD_SKILLS === "true";

type ExtractJobSkillsInput = {
  title?: string;
  description?: string;
  keywords?: string[];
  limit?: number;
};

/**
 * Extracts a concise set of skills required for a job posting.
 * Uses Gemini (deterministic settings) only; no heuristic fallback parsing.
 * Stable ordering + caching guarded by a hash of the JD content.
 */
export async function extractJobSkills(input: ExtractJobSkillsInput): Promise<string[]> {
  const {
    title = "",
    description = "",
    keywords = [],
    limit = DEFAULT_SKILL_LIMIT,
  } = input;

  const cleanDescription = stripHtml(description).slice(0, 3500);
  const keywordHints = keywords.filter(Boolean);
  if (!cleanDescription.trim() && !title.trim() && !keywordHints.length) {
    return [];
  }

  const cacheKey = makeCacheKey(title, cleanDescription, keywordHints, limit);
  if (SKILL_CACHE.has(cacheKey)) {
    return SKILL_CACHE.get(cacheKey)!;
  }

  const shouldUseGemini = !GEMINI_DISABLED && hasGeminiApiKeyConfigured();
  let rawSkills: string[] = [];

  if (shouldUseGemini) {
    try {
      const prompt = buildPrompt({ title, description: cleanDescription, keywords: keywordHints, limit });
      rawSkills = await runWithGeminiModel(
        async model => {
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = await response.text();
          return parseSkillArray(text);
        },
        {
          model: "gemini-2.5-flash",
          generationConfig: {
            temperature: 0,
            topK: 1,
            topP: 0.1,
          },
        },
      );
    } catch (error) {
      console.warn("Gemini skill extraction failed, returning keywords only.", error);
      rawSkills = [];
    }
  } else {
    console.warn("Gemini disabled or not configured; returning keywords only.");
  }

  // If LLM unavailable or empty, at least return any provided keywords.
  if (!rawSkills.length && keywordHints.length) {
    rawSkills = keywordHints;
  }

  const finalSkills = finalizeSkillList(rawSkills, cleanDescription, limit);
  SKILL_CACHE.set(cacheKey, finalSkills);
  return finalSkills;
}

function buildPrompt(args: { title: string; description: string; keywords: string[]; limit: number }): string {
  const { title, description, keywords, limit } = args;
  return `
You extract the most important skills a candidate needs for this job. Infer required skills even if only implied by responsibilities.
- Focus on technologies, tools, frameworks, domain skills, certifications, and relevant soft skills.
- Exclude locations, schedules (hours/week), pay/benefits, employment type, headcount, and generic nouns.
- Return ONLY a JSON array (no commentary) of up to ${limit} unique skill phrases, each 1-4 words, title-cased when appropriate.
- Prioritize the top ${limit} most critical skills; avoid long tail/overly specific variants.

Job Title: ${title || "(missing)"}

Job Description:
${description || "(missing)"}

Existing keywords: ${keywords.length ? keywords.join(", ") : "none"}
`.trim();
}

function parseSkillArray(payload: string): string[] {
  const cleaned = payload.replace(/```json/gi, "").replace(/```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      return parsed
        .map(item => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean);
    }
  } catch {
    // swallow parse errors and fall back
  }
  return [];
}

function stripHtml(value?: string): string {
  if (!value) return "";
  return value.replace(/<[^>]+>/g, " ");
}

function finalizeSkillList(skills: string[], description: string, limit: number): string[] {
  const deduped = dedupeSkills(skills);
  const loweredDescription = description.toLowerCase();
  deduped.sort((a, b) => {
    const ia = loweredDescription.indexOf(a.toLowerCase());
    const ib = loweredDescription.indexOf(b.toLowerCase());
    const safeA = ia === -1 ? Number.MAX_SAFE_INTEGER : ia;
    const safeB = ib === -1 ? Number.MAX_SAFE_INTEGER : ib;
    if (safeA !== safeB) return safeA - safeB;
    return a.localeCompare(b);
  });
  return deduped.slice(0, limit);
}

function dedupeSkills(skills: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const rawSkill of skills) {
    const sanitized = sanitizeSkill(rawSkill);
    if (!sanitized) continue;
    const normalized = sanitized.toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(sanitized);
  }
  return result;
}

function makeCacheKey(title: string, description: string, keywords: string[], limit: number): string {
  return JSON.stringify({ title, description, keywords, limit });
}

function sanitizeSkill(value?: string): string | null {
  const trimmed = (value || "").trim();
  if (!trimmed) return null;
  if (!isMeaningfulSkill(trimmed)) return null;
  return trimmed;
}

function isMeaningfulSkill(value: string): boolean {
  const normalized = value.toLowerCase();
  if (GENERIC_SKILL_STOPWORDS.has(normalized)) return false;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (!tokens.length) return false;
  if (tokens.every(token => GENERIC_SKILL_STOPWORDS.has(token))) return false;
  const hasTechKeyword = tokens.some(token => TECH_KEYWORD_TOKENS.has(token));
  if (LEADING_STOP_TOKENS.has(tokens[0])) return false;

  if (tokens.length === 1) {
    const token = tokens[0];
    if (token.length <= 2 && !SHORT_SKILL_WHITELIST.has(token)) return false;
    const isAllLower = value === value.toLowerCase();
    const hasSignalChars = SIGNAL_CHAR_REGEX.test(value);
    const inDictionary = COMMON_SKILL_SET.has(token);
    if (!inDictionary && isAllLower && !hasSignalChars && !hasTechKeyword) {
      return false;
    }
    if (looksDescriptive(token) && !inDictionary) {
      return false;
    }
  }

  if (tokens.length > 1) {
    const nonStopTokens = tokens.filter(token => !GENERIC_SKILL_STOPWORDS.has(token));
    if (!nonStopTokens.length) return false;
    if (nonStopTokens.every(looksDescriptive)) return false;
  }

  const signalScore = computeSkillSignal(value, tokens, hasTechKeyword);
  return signalScore > 0;
}

function computeSkillSignal(rawValue: string, tokens: string[], hasTechKeyword: boolean): number {
  let score = 0;
  const original = rawValue.trim();
  const normalized = original.toLowerCase();

  if (COMMON_SKILL_SET.has(normalized)) score += 3;
  if (tokens.some(token => COMMON_SKILL_SET.has(token))) score += 2;
  if (hasTechKeyword) score += 1;

  if (/[A-Z]{2,}/.test(original)) score += 1;
  if (SIGNAL_CHAR_REGEX.test(original)) score += 1;
  if (original.includes(" ") || original.includes("-") || original.includes("/")) score += 1;
  if (tokens.length >= 2) score += 1;

  const descriptorPenalty = tokens.filter(token => looksDescriptive(token) && !COMMON_SKILL_SET.has(token)).length;
  score -= descriptorPenalty;

  return score;
}

function looksDescriptive(token: string): boolean {
  if (!token) return false;
  if (COMMON_SKILL_SET.has(token)) return false;
  return DESCRIPTIVE_SUFFIXES.some(suffix => token.length > suffix.length + 1 && token.endsWith(suffix));
}
