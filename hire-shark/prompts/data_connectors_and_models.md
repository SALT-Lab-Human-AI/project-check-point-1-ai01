# Data Connectors & Model Settings

This reference summarizes every external connector and model configuration that powers HireShark’s prompt flows..

---

## 1. Google Gemini (LLM)
- **Used for:**  
  - Resume parsing (`hire-shark/src/lib/gemini_parser.ts`)  
  - Job-role ideation (`hire-shark/src/store/ResumeContext.tsx`)
- **SDK:** `@google/generative-ai`
- **Model ID:** `gemini-2.5-flash`
- **Auth:** `VITE_GEMINI_API_KEY` (client-side, set in `.env`)
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