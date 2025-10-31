
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeParsed } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function fileToGenerativePart(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            resolve({inlineData: { data: reader.result.split(",")[1], mimeType: file.type } });
        }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function parseResumeWithGemini(file: File): Promise<ResumeParsed> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      
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
          "experiences": [
            {
              "company": "",
              "title": "",
              "start": "",
              "end": "",
              "bullets": []
            }
          ]
        }
      `;
      
        const imagePart = await fileToGenerativePart(file);
      
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = await response.text();
        const json = JSON.parse(text.replace(/```json/g, "").replace(/```/g, ""));

        return {
            ...json,
            rawText: "", // Not available with Gemini parsing
            fileName: file.name,
        };
    } catch (error) {
        console.error("Error parsing resume with Gemini:", error);
        throw error;
    }
  }
