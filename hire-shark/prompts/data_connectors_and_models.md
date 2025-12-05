# Data Connectors & Model Settings

This reference summarizes every external connector and model configuration that powers HireShark’s prompt flows..

---

## 1. Google Gemini (LLM)
- **Used for:**  
  - Resume parsing (`hire-shark/src/lib/gemini_parser.ts`)  
  - Job-role ideation (`hire-shark/src/store/ResumeContext.tsx`)
- **SDK:** `@google/generative-ai`
- **Model ID:** `gemini-2.5-flash`
- **Auth:** Browser prompts for a shared password, decrypts the `VITE_ENCODED_SECRET` payload via `secretVault.ts`, and loads Gemini + Adzuna credentials entirely in-memory (users can still paste their own key when prompted).
- **Invocation pattern:**  
  ```ts
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(promptOrParts);
  const text = await result.response.text();
  ```
- **Output handling:** strip ``` ``` fences, parse JSON with `JSON.parse`.
- **Notes:** prompts expect concise JSON arrays.

---

## 2. Adzuna Jobs API (Data Connector)
- **Used for:** Real job listings during matching (`hire-shark/src/lib/adzunaApi.ts`)
- **Base URL:** `https://api.adzuna.com/v1/api/jobs`
- **Region path:** `/us/search/1`
- **Auth query params:**  
  - `app_id = VITE_ADZUNA_APP_ID`  
  - `app_key = VITE_ADZUNA_APP_KEY`
- **Other query params set by app:**  
  - `results_per_page=10`  
  - `what` (job role/custom role; hyphens normalized to spaces)  
  - `salary_min`, `salary_max` (optional)  
  - `full_time`, `part_time`, `contract` (mutually exclusive flags)
- **Response mapping:** see `matchJobs` → `MatchResult` (title, company, description snippet, location, salary string, job type, URLs, posted date).
- **Notes:** This connector is purely REST/JSON; no LLM involved, but prompt outputs (generated job roles) influence the `what` query.

---

## 3. JD Skill Extraction Flow
- **Used for:** Building the JD skill list that powers match scoring (`hire-shark/src/lib/skillExtractor.ts`).
- **Inputs:** Job title, sanitized Adzuna description (up to ~3.5k chars) and any keywords returned by the API.
- **LLM layer (required when enabled):**
  - Model: `gemini-2.5-flash` via `@google/generative-ai`.
  - Generation config: `temperature=0`, `topK=1`, `topP=0.1` for deterministic output.
  - Prompt: see `prompts.md` ("JD Skill Extraction"). Asks for inferred skills (implied by responsibilities), excludes location/schedule/pay/benefits, outputs JSON array of 1–4 word skill phrases.
- **Fallback when LLM unavailable:** returns provided keywords only (no heuristic phrase parsing).
- **Post-processing:**
  - Sanitization + deduping of LLM output; stable ordering by first appearance in the JD text, then alphabetically.
  - In-memory cache keyed by title/description/keywords/limit so repeated matches reuse the same list.
