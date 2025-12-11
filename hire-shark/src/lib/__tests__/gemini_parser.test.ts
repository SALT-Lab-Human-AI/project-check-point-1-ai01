import { describe, it, expect, vi, beforeEach } from "vitest";
import { parseResumeWithGemini, setGeminiApiKey } from "../../lib/gemini_parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Create a mock client instance that will be reused
const mockClient = {
  getGenerativeModel: vi.fn(),
};

// Mock the Google Generative AI client
vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: vi.fn(function() { return mockClient; }),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  // Set a dummy API key to bypass the key check
  setGeminiApiKey("test-api-key");
});

function mockModelWithText(text: string) {
  const generateContent = vi.fn().mockResolvedValue({
    response: { text: vi.fn().mockResolvedValue(text) },
  });

  const mockModel = { generateContent };
  mockClient.getGenerativeModel.mockReturnValue(mockModel);
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
