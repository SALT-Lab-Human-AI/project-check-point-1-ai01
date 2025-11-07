
import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { ResumeData, MatchResult } from "../types";
import { getMatches } from "../lib/matcher";
import { mockJobs } from "../lib/mockJobs";
import { parseResumeWithGemini, genAI } from "../lib/gemini_parser";
import { usePreferences } from "./PreferencesContext";
import { matchJobs } from "../lib/jobMatcher";

type ResumeContextType = {
  isParsing: boolean;
  isMatching: boolean;
  resume?: ResumeData;
  matches: MatchResult[];
  generatedJobRoles: string[];
  uploadFile: (file: File) => void;
  parseResume: () => Promise<void>;
  runMatching: (override?: ResumeData) => Promise<void>;
  clear: () => void;
  cancelParse: () => void;
  generateJobRolesFromEditedResume: (editedResume: ResumeData) => Promise<void>;
  saveEditedResume: (editedResume: ResumeData) => void;
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clearPreferences, preferences } = usePreferences();
  const [resume, setResume] = useState<ResumeData | undefined>();
  const [isParsing, setIsParsing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [generatedJobRoles, setGeneratedJobRoles] = useState<string[]>([]);

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

  // Warm up skip-gram adapter on provider mount so the model starts initializing early.
  // Warm up skip-gram adapter when we have a parsed resume so the adapter is
  // initialized with resume tokens (avoid initializing with an empty corpus).
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!resume?.parsed) return;

        // Build a compact resume text to seed the skip-gram training.
        const resumeText =
          resume.parsed.rawText ||
          [resume.parsed.summary || "", (resume.parsed.skills || []).join(" "), ...(resume.parsed.experiences || []).flatMap((e: any) => e.bullets || [])].join(" ");

        const mod = await import("../lib/skipgramAdapter");
        if (mounted && mod && typeof mod.warmUpSkipGram === "function") {
          mod.warmUpSkipGram([resumeText]);
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [resume?.parsed]);



  const runMatching = useCallback(async (override?: ResumeData) => {
    const sourceResume = override ?? resume;
    if (!sourceResume?.parsed) {
      console.error("Cannot run matching: Resume not parsed");
      return;
    }

    if (override) {
      setResume(override);
    }

    setIsMatching(true);
    try {
      const matchResults = await matchJobs(sourceResume.parsed, preferences);
      setMatches(matchResults);
    } catch (error) {
      console.error("Error running matching:", error);
      setMatches([]);
    } finally {
      setIsMatching(false);
    }
  }, [resume, preferences]);

  const saveEditedResume = useCallback((editedResumeData: ResumeData) => {
    setResume(editedResumeData);
  }, []);

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

    const prompt = `Based on the following resume, generate a list of 5-10 potential job roles that would be a good fit for this person. Return the list as a JSON array of strings. Job title should be concise and simple.

Resume:
${JSON.stringify(editedResume.parsed, null, 2)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const json = JSON.parse(text.replace(/```json/g, "").replace(/```/g, ""));
    setGeneratedJobRoles(json);
  };

  return (
    <ResumeContext.Provider value={{ isParsing, isMatching, resume, matches, generatedJobRoles, uploadFile, parseResume, runMatching, clear, cancelParse, generateJobRolesFromEditedResume, saveEditedResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
