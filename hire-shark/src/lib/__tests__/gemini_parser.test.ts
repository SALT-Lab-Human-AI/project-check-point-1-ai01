import { describe, it, expect, vi, beforeEach } from "vitest";
import { parseResumeWithGemini, genAI } from "../../lib/gemini_parser";

beforeEach(() => {
  vi.restoreAllMocks();
});

function mockModelWithText(text: string) {
  const generateContent = vi.fn().mockResolvedValue({
    response: { text: vi.fn().mockResolvedValue(text) },
  });
  vi.spyOn(genAI, "getGenerativeModel").mockReturnValue({ generateContent } as any);
}

describe("Gemini JSON Cleaning", () => {
  it("strips code-fences and parses object when model returns fenced json", async () => {
    mockModelWithText("```json {\n  \"skills\": [\"TS\", \"React\"]\n} ```");

    const file = new File(["dummy"], "resume.pdf", { type: "application/pdf" });
    const result = await parseResumeWithGemini(file);

    expect(result.skills).toEqual(["TS", "React"]);
    expect(result.fileName).toBe("resume.pdf");
    expect(result.rawText).toBe("");
  });

  it("parses correctly when model returns plain JSON string", async () => {
    mockModelWithText('{"skills":["Go","K8s"]}');

    const file = new File(["dummy"], "cv.pdf", { type: "application/pdf" });
    const result = await parseResumeWithGemini(file);

    expect(result.skills).toEqual(["Go", "K8s"]);
    expect(result.fileName).toBe("cv.pdf");
    expect(result.rawText).toBe("");
  });
});
