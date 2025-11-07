import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeParsed } from "../types";
import mammoth from "mammoth";

type GenerativeModel = ReturnType<GoogleGenerativeAI["getGenerativeModel"]>;

const DEFAULT_MODEL = "gemini-2.5-flash";
const LEAKED_KEY_PROMPT =
  "Google flagged the shared Gemini API key as leaked. Please paste your own Gemini API key to continue. It stays in memory only for this browser tab.";
const MISSING_KEY_PROMPT =
  "A Gemini API key is required to continue. Please paste your Gemini API key. It stays in memory only for this browser tab.";

let configuredApiKey = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();
let client: GoogleGenerativeAI | null = configuredApiKey ? new GoogleGenerativeAI(configuredApiKey) : null;

export function hasGeminiApiKeyConfigured(): boolean {
  return Boolean(configuredApiKey);
}

export function setGeminiApiKey(apiKey: string | undefined): void {
  configuredApiKey = (apiKey || "").trim();
  client = configuredApiKey ? new GoogleGenerativeAI(configuredApiKey) : null;
}

export async function runWithGeminiModel<T>(
  executor: (model: GenerativeModel) => Promise<T>,
  options: { model?: string; generationConfig?: Record<string, unknown> } = {},
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const geminiModel = getGeminiModel(options);
      return await executor(geminiModel);
    } catch (error) {
      lastError = error;
      if (!shouldPromptForReplacementKey(error)) {
        break;
      }

      const replacement = promptForGeminiApiKey("leaked");
      if (!replacement) {
        break;
      }
      setGeminiApiKey(replacement);
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error("Gemini request failed.");
}

function getGeminiModel(options: { model?: string; generationConfig?: Record<string, unknown> }) {
  const instance = ensureGeminiClient();
  const request: Record<string, unknown> = {
    model: options.model ?? DEFAULT_MODEL,
  };
  if (options.generationConfig) {
    request.generationConfig = options.generationConfig;
  }
  return instance.getGenerativeModel(request);
}

function ensureGeminiClient(): GoogleGenerativeAI {
  if (!configuredApiKey) {
    const replacement = promptForGeminiApiKey("missing");
    if (!replacement) {
      throw new Error("Gemini API key is required to continue.");
    }
    setGeminiApiKey(replacement);
  }

  if (!client && configuredApiKey) {
    client = new GoogleGenerativeAI(configuredApiKey);
  }

  if (!client) {
    throw new Error("Gemini API key is required to continue.");
  }

  return client;
}

function promptForGeminiApiKey(reason: "missing" | "leaked"): string | null {
  if (typeof window === "undefined" || typeof window.prompt !== "function") {
    return null;
  }
  const message = reason === "leaked" ? LEAKED_KEY_PROMPT : MISSING_KEY_PROMPT;
  const value = window.prompt(message);
  return value?.trim() || null;
}

function shouldPromptForReplacementKey(error: unknown): boolean {
  const message = getErrorMessage(error);
  if (!message) return false;
  return /api key was reported as leaked/i.test(message);
}

function getErrorMessage(error: unknown): string {
  if (!error) return "";
  if (typeof error === "string") return error;
  if (typeof (error as Error).message === "string") {
    return (error as Error).message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return "";
  }
}

function cleanJsonFence(value: string): string {
  return value.replace(/```json/gi, "").replace(/```/g, "");
}

async function buildGenerativePart(file: File) {
  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return { text: result.value };
  }

  if (file.type.startsWith("text/")) {
    const text = await file.text();
    return { text };
  }

  return fileToGenerativePart(file);
}

export const genAI = {
  getGenerativeModel: (options: { model: string; generationConfig?: Record<string, unknown> }) => getGeminiModel(options),
};

function fileToGenerativePart(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve({ inlineData: { data: reader.result.split(",")[1], mimeType: file.type } });
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function parseResumeWithGemini(file: File): Promise<ResumeParsed> {
  try {
    const prompt = `
        Extract the following information from the resume and return it as a JSON object.
        The JSON object should have the following structure:
        {
          "name": "",
          "email": "",
          "phone": "",
          "location": "",
          "summary": "",
          "skills": [],
          "education": [
            {
              "degree": "",
              "field": "",
              "institution": "",
              "location": "",
              "start": "",
              "end": "",
              "gpa": "",
              "honors": []
            }
          ],
          "experiences": [
            {
              "company": "",
              "title": "",
              "start": "",
              "end": "",
              "bullets": []
            }
          ],
          "confidence": {
            "personalInfo": 0.0,
            "experience": 0.0,
            "skills": 0.0,
            "education": 0.0
          }
        }
        
        Important: Extract all education entries including degrees, certifications, and educational qualifications. 
        Include the degree type (e.g., Bachelor's, Master's, PhD), field of study, institution name, location, dates, GPA (if available), and any honors or distinctions.
        If you cannot find any information for a field, leave it as an empty string or an empty array.
        If the uploaded file is not a resume, try your best and you should still return a JSON object.
        When nothing is found for a section, The confidence for that section should be low.
      `;

    const generativePart = await buildGenerativePart(file);

    const parsed = await runWithGeminiModel(async model => {
      const result = await model.generateContent([prompt, generativePart]);
      const response = await result.response;
      const text = await response.text();
      return JSON.parse(cleanJsonFence(text));
    });

    return {
      ...parsed,
      rawText: "",
      fileName: file.name,
    };
  } catch (error) {
    console.error("Error parsing resume with Gemini:", error);
    throw error;
  }
}
