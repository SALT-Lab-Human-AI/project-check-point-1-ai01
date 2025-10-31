
import React, { createContext, useState, useContext } from "react";
import { ResumeData, MatchResult } from "../types";
import { getMatches } from "../lib/matcher";
import { mockJobs } from "../lib/mockJobs";
import { parseResumeWithGemini } from "../lib/gemini_parser";

type ResumeContextType = {
  isParsing: boolean;
  resume?: ResumeData;
  matches: MatchResult[];
  uploadFile: (file: File) => void;
  parseResume: () => Promise<void>;
  runMatching: () => Promise<void>;
  clear: () => void;
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC = ({ children }) => {
  const [resume, setResume] = useState<ResumeData | undefined>();
  const [isParsing, setIsParsing] = useState(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);

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

  const runMatching = async () => {
    if (resume?.parsed) {
      const matchResults = await getMatches(resume.parsed, mockJobs);
      setMatches(matchResults);
    }
  };

  const clear = () => {
    setResume(undefined);
    setMatches([]);
  };

  return (
    <ResumeContext.Provider value={{ isParsing, resume, matches, uploadFile, parseResume, runMatching, clear }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
