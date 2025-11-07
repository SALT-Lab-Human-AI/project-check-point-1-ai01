import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act, waitFor } from "@testing-library/react";

import { ResumeProvider, useResume } from "../../store/ResumeContext";
import { PreferencesProvider } from "../../store/PreferencesContext";
import * as gemini from "../../lib/gemini_parser";
import * as jobMatcher from "../../lib/jobMatcher";
import { ResumeData, ResumeParsed } from "../../types";

// Small harness to access the context imperatively in tests
let ctx: ReturnType<typeof useResume> | null = null;
const tick = () => new Promise((r) => setTimeout(r, 0));
const Grabber: React.FC = () => {
  const value = useResume();
  ctx = value;
  return (
    <div
      data-testid="probe"
      data-parsing={value.isParsing ? "1" : "0"}
      data-matching={value.isMatching ? "1" : "0"}
      data-has-parsed={value.resume?.parsed ? "1" : "0"}
    />
  );
};

function renderWithProvider() {
  ctx = null;
  render(
    <PreferencesProvider>
      <ResumeProvider>
        <Grabber />
      </ResumeProvider>
    </PreferencesProvider>
  );
  return () => ctx!;
}

function isParsingDom() {
  const el = document.querySelector('[data-testid="probe"]') as HTMLElement | null;
  return el?.getAttribute("data-parsing") === "1";
}

function isMatchingDom() {
  const el = document.querySelector('[data-testid="probe"]') as HTMLElement | null;
  return el?.getAttribute("data-matching") === "1";
}

describe("ResumeContext: Upload → Parse (Resume)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("uploadFile sets resume with id, file, and uploadedAt", async () => {
    const get = renderWithProvider();
    const file = new File(["hello"], "resume.txt", { type: "text/plain" });

    await act(async () => {
      get().uploadFile(file);
    });

    const state = get();
    expect(state.resume).toBeDefined();
    expect(state.resume?.id).toBe("1");
    expect(state.resume?.file).toBe(file);
    expect(typeof state.resume?.uploadedAt).toBe("string");
  });

  it("parseResume toggles isParsing true→false and sets resume.parsed on success", async () => {
    const get = renderWithProvider();
    const file = new File(["hello"], "resume.txt", { type: "text/plain" });

    const parsed: ResumeParsed = {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "",
      location: "",
      summary: "",
      skills: ["React"],
      experiences: [],
      education: [],
      confidence: { personalInfo: 1, experience: 1, skills: 1, education: 1 },
      rawText: "",
      fileName: "resume.txt",
    };

    let resolveFn: ((v: ResumeParsed) => void) | null = null;
    const deferred = new Promise<ResumeParsed>((res) => (resolveFn = res));
    const geminiSpy = vi.spyOn(gemini, "parseResumeWithGemini").mockReturnValue(deferred);

    await act(async () => {
      get().uploadFile(file);
    });

    // Start parsing and verify flag flips to true, then back to false
    await act(async () => {
      expect(get().resume?.file).toBe(file);
      const p = get().parseResume();
      await waitFor(() => expect(geminiSpy).toHaveBeenCalled());
      resolveFn!(parsed);
      await p;
    });

    const state = get();
    expect(state.isParsing).toBe(false);
    expect(state.resume?.parsed).toEqual(parsed);
  });

  it("parseResume no-ops safely when resume.file is missing", async () => {
    const get = renderWithProvider();
    const spy = vi.spyOn(gemini, "parseResumeWithGemini");

    await act(async () => {
      await get().parseResume();
    });

    expect(spy).not.toHaveBeenCalled();
    const state = get();
    expect(state.isParsing).toBe(false);
    expect(state.resume).toBeUndefined();
  });

  it("parseResume propagates failures and resets isParsing to false on error", async () => {
    const get = renderWithProvider();
    const file = new File(["hello"], "resume.txt", { type: "text/plain" });

    // Reject parsing
    vi.spyOn(gemini, "parseResumeWithGemini").mockRejectedValue(new Error("parse failed"));

    await act(async () => {
      get().uploadFile(file);
    });

    // Expect rejection and flag reset
    await expect(
      act(async () => {
        await get().parseResume();
      })
    ).rejects.toThrow();

    const state = get();
    expect(state.isParsing).toBe(false);
    expect(state.resume?.parsed).toBeUndefined();
  });
});

describe("ResumeContext: Generate Roles & Locations", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("updates generatedJobRoles and generatedLocations; handles code-fenced JSON", async () => {
    const get = renderWithProvider();

    // Mock Gemini model two sequential calls: roles then locations
    const generateContent = vi
      .fn()
      .mockResolvedValueOnce({
        response: { text: vi.fn().mockResolvedValue("```json [\"Role A\", \"Role B\"] ```") },
      })
      .mockResolvedValueOnce({
        response: { text: vi.fn().mockResolvedValue("```json [\"City X\", \"City Y\"] ```") },
      });

    vi.spyOn(gemini.genAI, "getGenerativeModel").mockReturnValue({
      generateContent,
    } as any);

    const editedResume: ResumeData = {
      id: "1",
      file: null,
      parsed: {
        name: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        skills: ["React"],
        experiences: [],
        education: [],
        confidence: { personalInfo: 1, experience: 1, skills: 1, education: 1 },
        rawText: "",
        fileName: "resume.txt",
      },
      uploadedAt: new Date().toISOString(),
    };

    await act(async () => {
      await get().generateJobRolesFromEditedResume(editedResume);
    });

    const state = get();
    expect(state.generatedJobRoles).toEqual(["Role A", "Role B"]);
    expect(state.generatedLocations).toEqual(["City X", "City Y"]);
  });
});

describe("ResumeContext: Run Matching (Context Integration)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("with parsed resume, sets isMatching true→false and populates matches", async () => {
    const get = renderWithProvider();
    const file = new File(["hello"], "resume.txt", { type: "text/plain" });

    // First parse to populate resume.parsed
    const parsed: ResumeParsed = {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      skills: ["React"],
      experiences: [],
      education: [],
      confidence: { personalInfo: 1, experience: 1, skills: 1, education: 1 },
      rawText: "",
      fileName: "resume.txt",
    };
    vi.spyOn(gemini, "parseResumeWithGemini").mockResolvedValue(parsed);

    await act(async () => {
      get().uploadFile(file);
    });

    await act(async () => {
      await get().parseResume();
    });

    // Wait for state to update
    await waitFor(() => {
      expect(get().resume?.parsed).toBeDefined();
    });

    // Verify the parsed resume was set
    expect(get().resume?.parsed?.skills).toEqual(["React"]);

    const fakeMatches = [
      { jobId: "j1", title: "A", company: "C1", score: 0.9, matchedSkills: ["React"] },
      { jobId: "j2", title: "B", company: "C2", score: 0.5, matchedSkills: ["JS"] },
    ];
    let resolveMatches: ((v: any) => void) | null = null;
    const deferredMatches = new Promise((res) => (resolveMatches = res));
    vi.spyOn(jobMatcher, "matchJobs").mockReturnValue(deferredMatches as any);

    await act(async () => {
      const p = get().runMatching();
      resolveMatches!(fakeMatches);
      await p;
    });

    const state = get();
    expect(state.isMatching).toBe(false);
    expect(state.matches).toEqual(fakeMatches);
  });

  it("accepts an override resume and persists it before matching", async () => {
    const get = renderWithProvider();

    const override: ResumeData = {
      id: "override",
      file: null,
      parsed: {
        name: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        skills: ["Vue"],
        experiences: [],
        education: [],
        confidence: { personalInfo: 1, experience: 1, skills: 1, education: 1 },
        rawText: "",
        fileName: "override.txt",
      },
      uploadedAt: new Date().toISOString(),
    };

    const fakeMatches = [{ jobId: "j1", title: "Vue Dev", company: "C1", score: 0.8, matchedSkills: ["Vue"] }];
    const matchSpy = vi.spyOn(jobMatcher, "matchJobs").mockResolvedValue(fakeMatches as any);

    await act(async () => {
      await get().runMatching(override);
    });

    expect(matchSpy).toHaveBeenCalled();
    expect(matchSpy.mock.calls[0][0]).toBe(override.parsed);
    await waitFor(() => {
      expect(get().resume?.parsed?.skills).toEqual(["Vue"]);
      expect(get().matches).toEqual(fakeMatches);
    });
  });

  it("safe early-return when resume.parsed is missing", async () => {
    const get = renderWithProvider();
    const spy = vi.spyOn(jobMatcher, "matchJobs");
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await act(async () => {
      await get().runMatching();
    });

    const state = get();
    expect(state.isMatching).toBe(false);
    expect(state.matches).toEqual([]);
    expect(spy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });
});
