# Recruit AI — Design Specification

## 1. Overview
Goal: Help job seekers match resumes to job descriptions and receive prioritized, actionable feedback. The LLM performs both extraction and scoring. A separate explanation pass produces human-facing recommendations and phrasing.

Core pipeline:
1. Preprocessor: parse and normalize resume + job description text.
2. LLM-Extract: produce structured entities (roles, skills, years, seniority, growth stage, spans, confidences).  
3. LLM-Score: compute normalized match metrics (overall % and axis breakdown) using low-temperature, schema-enforced prompts and a scoring rubric.  
4. LLM-Explain: generate prioritized edits, suggested phrasing, and mapped evidence.

## 2. Primary Actors / Personas
- Candidate / Job Seeker (primary): uploads/pastes resume, selects job(s), receives match metrics and prioritized edits, can accept edits and export tailored resume/cover letter.


## 3. Candidate User Journeys

1) Single Job Match & Optimize
- Candidate uploads/pastes resume and inputs/selects a job description or URL.
- System runs LLM-Extract → LLM-Score → LLM-Explain.
- Candidate reviews extraction, confirms edits if needed, applies suggested edits and downloads tailored assets.

2) Multi-Job Scan & Prioritize
- Candidate supplies multiple jobs or categories.
- System runs the LLM pipeline for each job (batched/parallel), clusters similar matches, and ranks jobs by fit with per-job edit suggestions.

3) Resume Improvement & Career Guidance
- Candidate picks a goal; LLM analyzes resume + goal and returns rewrites, reframed achievements, role growth guidance, and interview prep.

## 4. Task Flows

Flow A — Single Resume → Single Job
1. Input: Resume (PDF/DOC/TXT/pasted text) + Job Description/URL.
2. Preprocess: parse and normalize the resume
3. LLM-Extract:
   - Prompted with extraction schema; returns JSON: roles, skills (with spans & confidences), growth_stage, years_experience.
   - Server-side: validate JSON; if invalid, retry with constrained prompt or ask candidate to confirm.
4. LLM-Score:
   - Deterministic prompt (temperature=0), includes scoring rubric (weights for skills, experience, role_fit, seniority).
   - Returns JSON: overall_score (0-100), axis_scores, per_skill_matches, confidence.
5. LLM-Explain:
   - Prompted to produce human-readable summary, Top-3 prioritized edits with impact estimates, suggested phrasing, and mapping to evidence spans/rationale.
6. UI: show results; edits or confirmations trigger a re-run of LLM-Score and LLM-Explain.

Flow B — Multi-Job Scan
- Parallelize Flow A for each job with queuing and rate controls.

## 5. Key Screens & Interactions (candidate-first)

1. Landing Page
   - Title: "Match My Resume"; guest mode or sign-in.

2. Upload / Paste Screen
   - Drag/drop, paste, file picker; job input (paste/select/URL).
   - Parsing progress indicator, consent.

3. Extraction Review Inline
   - Shows extracted roles and top skills with confidence bars and linked resume highlights.
   - Interactions: tap-to-edit, mark primary role, add missing skills.

4. Match Results
   - Header: overall match % + LLM confidence badge.
   - Panels:
     - Axis breakdown: skills, experience, role-fit, seniority alignment.
     - Highlighted evidence: clickable resume spans.
     - Top-3 prioritized edits: one-click apply (invokes LLM-Edit).
     - Suggested headline, 3 rephrased bullets, sample cover letter paragraph.
     - Actions: download tailored resume, copy cover letter, save job.

5. Multi-Job Dashboard
   - Ranked jobs table with match score, required edits count, and per-job customize action.

6. Resume Editor Mode
   - Live preview; accept/reject suggestions inline; re-run scoring instantly.
