
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeParsed } from "../types";
import mammoth from "mammoth";

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

        let generativePart;

        if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            generativePart = { text: result.value };
        } else if (file.type.startsWith("text/")) {
            const text = await file.text();
            generativePart = { text };
        } else {
            generativePart = await fileToGenerativePart(file);
        }
      
        const result = await model.generateContent([prompt, generativePart]);
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
