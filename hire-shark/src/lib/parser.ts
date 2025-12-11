
import * as pdfjs from "pdfjs-dist";
import mammoth from "mammoth";
import { ResumeParsed } from "../types";

// Worker source needed for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export async function parseResume(file: File): Promise<ResumeParsed> {
  let rawText = "";

  if (file.type === "application/pdf") {
    const reader = new FileReader();
    await new Promise<void>((resolve, reject) => {
        reader.onload = async (event) => {
            if (event.target?.result) {
                try {
                    const pdf = await pdfjs.getDocument({ data: event.target.result as ArrayBuffer }).promise;
                    let text = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map((item: any) => item.str).join("\n");
                    }
                    rawText = text;
                    resolve();
                } catch (error) {
                    console.error("Error parsing PDF:", error);
                    reject(error);
                }
            }
        };
        reader.onerror = (error) => {
            console.error("Error reading PDF file:", error);
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
  } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const reader = new FileReader();
    await new Promise<void>((resolve) => {
        reader.onload = async (event) => {
            if (event.target?.result) {
                const result = await mammoth.extractRawText({ arrayBuffer: event.target.result as ArrayBuffer });
                rawText = result.value;
                resolve();
            }
        };
        reader.readAsArrayBuffer(file);
    });
  } else {
    rawText = await file.text();
  }

  // Basic parsing logic (can be improved)
  const skills = rawText.match(/skills[:\s-]*([\s\S]*?)(experience|education|summary|$)/i)?.[1].split(/[\n,]/).map(s => s.trim()).filter(s => s) || [];
  const name = rawText.split('\n')[0].trim();
  const email = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || "";
  const phone = rawText.match(/(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0] || "";


  return {
    name,
    email,
    phone,
    skills,
    rawText,
    fileName: file.name,
  };
}
