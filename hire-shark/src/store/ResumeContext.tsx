
import React, { createContext, useState, useContext, useCallback } from "react";
import { ResumeData, MatchResult } from "../types";
import { getMatches } from "../lib/matcher";
import { mockJobs } from "../lib/mockJobs";
import { parseResumeWithGemini, genAI } from "../lib/gemini_parser";
import { usePreferences } from "./PreferencesContext";
import { matchResumeWithGreenhouseCsv } from "../lib/jobMatcher";

type ResumeContextType = {
  isParsing: boolean;
  isMatching: boolean;
  resume?: ResumeData;
  matches: MatchResult[];
  generatedJobRoles: string[];
  generatedLocations: string[];
  uploadFile: (file: File) => void;
  parseResume: () => Promise<void>;
  runMatching: () => Promise<void>;
  clear: () => void;
  cancelParse: () => void;
  generateJobRolesFromEditedResume: (editedResume: ResumeData) => Promise<void>;
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clearPreferences } = usePreferences();
  const [resume, setResume] = useState<ResumeData | undefined>();
  const [isParsing, setIsParsing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [generatedJobRoles, setGeneratedJobRoles] = useState<string[]>([]);
  const [generatedLocations, setGeneratedLocations] = useState<string[]>([]);

  const uploadFile = (file: File) => {
    setResume({ id: "1", file, uploadedAt: new Date().toISOString() });
  };

  const parseResume = async () => {
    if (resume?.file) {
      setIsParsing(true);
      try {
        const parsed = await parseResumeWithGemini(resume.file);
        setResume(prevResume => prevResume ? { ...prevResume, parsed } : undefined);
      } finally {
        setIsParsing(false);
      }
    }
  };

  const generateLocations = async (parsedResume: ResumeParsed) => {
    // @ts-ignore
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Based on the user's location in the resume, generate a list of 5 nearby cities or states that would be relevant for a job search. Return the list as a JSON array of strings.

Resume:
${JSON.stringify(parsedResume, null, 2)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const json = JSON.parse(text.replace(/```json/g, "").replace(/```/g, ""));
    setGeneratedLocations(json);
  };

  const runMatching = useCallback(async () => {
    if (!resume?.parsed) {
      console.error("Cannot run matching: Resume not parsed");
      return;
    }

    setIsMatching(true);
    try {
      const matchResults = await matchResumeWithGreenhouseCsv(resume.parsed);
      setMatches(matchResults);
    } catch (error) {
      console.error("Error running matching:", error);
      setMatches([]);
    } finally {
      setIsMatching(false);
    }
  }, [resume?.parsed]);

  const clear = () => {
    setResume(undefined);
    setMatches([]);
    clearPreferences();
  };

  const cancelParse = () => {
    setIsParsing(false);
  };

  const generateJobRolesFromEditedResume = async (editedResume: ResumeData) => {
    // @ts-ignore
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Based on the following resume, generate a list of 5-10 potential job roles that would be a good fit for this person. Return the list as a JSON array of strings.

Resume:
${JSON.stringify(editedResume.parsed, null, 2)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const json = JSON.parse(text.replace(/```json/g, "").replace(/```/g, ""));
    setGeneratedJobRoles(json);
    await generateLocations(editedResume.parsed);
  };

  return (
    <ResumeContext.Provider value={{ isParsing, isMatching, resume, matches, generatedJobRoles, generatedLocations, uploadFile, parseResume, runMatching, clear, cancelParse, generateJobRolesFromEditedResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
