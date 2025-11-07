import { describe, it, expect } from "vitest";
import { getMatches } from "../../lib/matcher";
import { JobPosting, ResumeParsed } from "../../types";

const jobs: JobPosting[] = [
  { jobId: "a", title: "Frontend", company: "C1", description: "", skills: ["React", "TypeScript", "CSS"] },
  { jobId: "b", title: "Backend", company: "C2", description: "", skills: ["Node.js", "Express", "MongoDB"] },
  { jobId: "c", title: "Full Stack", company: "C3", description: "", skills: ["React", "Node.js", "TypeScript", "AWS"] },
];

const parsedBase: Omit<ResumeParsed, "skills" | "fileName" | "rawText"> = {
  name: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  experiences: [],
  education: [],
  confidence: { personalInfo: 1, experience: 1, skills: 1, education: 1 },
};

describe("Matching (Skill Overlap Scoring)", () => {
  it("returns matches sorted by score desc and computes score correctly", async () => {
    const parsed: ResumeParsed = { ...parsedBase, skills: ["React", "TypeScript", "CSS"], rawText: "", fileName: "x" };
    const matches = await getMatches(parsed, jobs);

    expect(matches.length).toBe(2); // backend has 0 overlap
    expect(matches[0].title).toBe("Frontend"); // 3/3 = 1.0
    expect(matches[0].score).toBeCloseTo(1.0);
    expect(matches[1].title).toBe("Full Stack"); // 2/4 = 0.5
    expect(matches[1].score).toBeCloseTo(0.5);
  });

  it("respects limit parameter", async () => {
    const parsed: ResumeParsed = { ...parsedBase, skills: ["React", "TypeScript", "CSS"], rawText: "", fileName: "x" };
    const matches = await getMatches(parsed, jobs, 1);
    expect(matches.length).toBe(1);
    expect(matches[0].title).toBe("Frontend");
  });

  it("returns empty array when no skills overlap", async () => {
    const parsed: ResumeParsed = { ...parsedBase, skills: ["Go", "Rust"], rawText: "", fileName: "x" };
    const matches = await getMatches(parsed, jobs);
    expect(matches).toEqual([]);
  });
});

