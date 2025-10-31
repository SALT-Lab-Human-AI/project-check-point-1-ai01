
import React, { createContext, useState, useContext } from "react";
import { ResumeData, MatchResult } from "../types";
import { getMatches } from "../lib/matcher";
import { mockJobs } from "../lib/mockJobs";
import { parseResumeWithGemini } from "../lib/gemini_parser";

type ResumeContextType = {
  resume?: ResumeData;
  matches: MatchResult[];
  uploadFile: (file: File) => Promise<void>;
  runMatching: () => Promise<void>;
  clear: () => void;
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC = ({ children }) => {
  const [resume, setResume] = useState<ResumeData | undefined>();
  const [matches, setMatches] = useState<MatchResult[]>([]);

  const uploadFile = async (file: File) => {
    const parsed = await parseResumeWithGemini(file);
    setResume({ id: "1", file, parsed, uploadedAt: new Date().toISOString() });
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
    <ResumeContext.Provider value={{ resume, matches, uploadFile, runMatching, clear }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
