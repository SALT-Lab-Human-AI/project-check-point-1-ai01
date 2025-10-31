# Implement_Spec: Hire-Shark Website — Detailed Implementation Plan & Template

Purpose: Provide a detailed, actionable, and reusable implementation plan for the hire-shark demo. This document is intended as both a concrete implementation guide and a template for future similar projects. It also includes a GitHub-first deployment approach and a ready-to-add GitHub Actions workflow for deploying to GitHub Pages.

---

## 1. High-level goals
- Reproduce and harden the demo flow: Landing → Upload → Review → Matches → Success → NotFound.
- Implement robust client-side resume ingestion and preview.
- Implement a modular resume parsing pipeline (swappable for backend).
- Implement a deterministic, explainable matching algorithm with clear interfaces.
- Provide global state management, typed interfaces, tests, CI, and deployable build.
- Provide a template structure and coding conventions for future projects.
- Enable one-click or CI-driven deploy from GitHub (GitHub Pages) with previews on PRs.

---

## 2. Project structure (recommended additions)
- hire-shark/
  - src/
    - components/
      - ResumePreview.tsx
      - MatchCard.tsx
      - EditableField.tsx
      - UploadForm.tsx
      - JobList.tsx
    - components/ui/ (existing)
    - pages/
      - Landing.tsx
      - Upload.tsx
      - Review.tsx
      - Matches.tsx
      - Success.tsx
      - NotFound.tsx
    - context/
      - ResumeContext.tsx
    - lib/
      - parser.ts
      - matcher.ts
      - storage.ts
      - api.ts (adapter)
    - hooks/
      - useResume.ts
    - types/
      - index.ts
    - tests/
      - lib/
      - pages/
  - public/
  - package.json

---

## 3. Data models (TypeScript interfaces)
Use strict typing. Example:

```ts
// types/index.ts
export type ResumeParsed = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: string[];
  experiences?: Array<{
    company?: string;
    title?: string;
    start?: string;
    end?: string;
    bullets?: string[];
  }>;
  rawText: string;
  fileName: string;
};

export type ResumeData = {
  id: string;
  file: File | null;
  parsed?: ResumeParsed;
  uploadedAt?: string;
};

export type MatchResult = {
  jobId: string;
  title: string;
  company: string;
  score: number; // 0..1
  matchedSkills: string[];
  snippet?: string;
};
```

---

## 4. State & routing design
- Use React Router for pages (if not already present).
- Single Context: `ResumeContext` holds ResumeData and MatchResults.
- Context API responsibilities:
  - store file and parsed data
  - provide actions: uploadFile(file), parseResume(), runMatching(), clear()
- Persist to sessionStorage for page refresh recovery.

Sample context skeleton:

```ts
// context/ResumeContext.tsx
import React, { createContext, useState, useContext } from "react";
import { ResumeData, MatchResult } from "../types";

type ResumeContextType = {
  resume?: ResumeData;
  matches: MatchResult[];
  uploadFile: (file: File) => Promise<void>;
  parseResume: () => Promise<void>;
  runMatching: () => Promise<void>;
  clear: () => void;
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC = ({ children }) => {
  const [resume, setResume] = useState<ResumeData | undefined>();
  const [matches, setMatches] = useState<MatchResult[]>([]);

  // implement uploadFile, parseResume, runMatching, clear

  return (
    <ResumeContext.Provider value={{ resume, matches, uploadFile, parseResume, runMatching, clear }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
};
```

---

## 5. File upload & preview pipeline
1. UI: `UploadForm` component
   - Accept PDF / DOCX / TXT (MIME checks) and max size limit (e.g., 10MB).
   - Drag-and-drop + file input with accessible labels.
   - Immediately show filename, size, preview placeholder, and "Analyze" CTA.

2. On upload:
   - Save File object to Context.
   - Display client-side preview:
     - For PDF: render first page image using `pdfjs-dist` or generate text preview.
     - For DOCX: use `mammoth` to extract HTML/text.
     - For TXT: read as UTF-8.
   - Provide "Continue to Review" once parsed or "Analyze" button triggers parsing.

3. Libraries:
   - PDF: `pdfjs-dist` (client)
   - DOCX: `mammoth` (browser bundle)
   - Fallback: read file as text for unsupported types
   - For performance: parse in a WebWorker (future enhancement)

Security: Never upload files to external servers by default. If using a server, use signed uploads.

---

## 6. Resume parsing pipeline (detailed)
Design parser with a pipeline of interchangeable stages.

parser.ts responsibilities:
- Accept File -> returns ResumeParsed
- Steps:
  1. Extract raw text
     - If PDF: use pdfjs to extract text page-by-page
     - If DOCX: mammoth to HTML -> strip HTML -> text
     - If plain text: FileReader text
  2. Normalize text (lowercase, unify quotes, remove non-text artifacts)
  3. Extract structured fields:
     - Email: regex
     - Phone: regex (international-aware)
     - Name: heuristics (first non-empty N lines, capitalized tokens) — allow user override
     - Experience sections: split by regex patterns (Experience|Work History|Professional Experience)
     - Skills: use small keyword dictionary (configurable) + NER heuristics; return de-duplicated list
  4. Return ResumeParsed with rawText and extracted fields and confidence scores per field

Parser function signature:

```ts
export async function parseResume(file: File): Promise<ResumeParsed> { ... }
```

Testing: unit tests for parsing text samples in `tests/lib/parser.test.ts`.

---

## 7. Matching algorithm (detailed & explainable)
Goals: deterministic, explainable, tunable, fast for client-side.

Design (in matcher.ts):
- Inputs: ResumeParsed, JobCatalog[] (mocked)
- Steps:
  1. Normalize skill tokens for resume and job (stemming or lowercasing)
  2. Compute skill overlap score:
     score_skills = matched_skills_count / job_required_skills_count
  3. Compute keyword TF score:
     - Build small TF vector for resume and job description; compute cosine similarity
  4. Weight scores:
     final_score = w_skill * score_skills + w_text * tf_cosine (e.g., w_skill=0.7, w_text=0.3)
  5. Produce MatchResult objects with matchedSkills and highlight snippets for UI

Matcher signature:

```ts
export async function getMatches(parsed: ResumeParsed, jobs: JobPosting[], limit = 10): Promise<MatchResult[]> { ... }
```

Mock job postings stored in `src/lib/mockJobs.ts` for demo; replaceable by API call.

Explainability:
- Provide matchedSkills list and a short explanation string per match: e.g. "Matched 4 of 6 required skills (67%) — important skills: React, TypeScript".

Testing: tests for scoring behavior with small examples.

---

## 8. Pages: responsibilities & key interactions
- Upload.tsx
  - Renders UploadForm
  - Handles file selection and calls uploadFile
  - Shows `ResumePreview` and "Continue to Review" when parsed

- Review.tsx
  - Shows parsed fields in `EditableField` components
  - Each edit updates Context parsed object
  - "Run Matching" button calls runMatching in context

- Matches.tsx
  - Displays list of `MatchCard` components sorted by score
  - Each card shows matchedSkills and a small explanation
  - Actions: Save (persist to localStorage), Reject, View Job Details (opens modal)

- Success.tsx
  - Final confirmation with links to Matches or Upload again

- Index/Landing.tsx
  - Marketing text, CTA → Upload

---

## 9. Component list & responsibilities (detailed)
- UploadForm.tsx
  - Handles drag/drop, file validation, shows errors
- ResumePreview.tsx
  - Displays first-page preview for PDF or cleaned HTML for docx/txt
  - Shows parse status and confidence indicators
- EditableField.tsx
  - Inline editable text with validation and accessible labels
- MatchCard.tsx
  - Job summary, score badge, matched skills, action buttons
- JobList.tsx
  - Virtualized list for performance (if job catalog large)
- Header.tsx (existing)
  - Global nav and brand
- ProgressSteps.tsx (existing)
  - Show current page/state

---

## 10. Storage & persistence
- Session persistence: sessionStorage for in-progress ResumeData
- Saved matches: localStorage with simple JSON + TTL if desired
- If server integration planned: design APIs
  - POST /upload (multipart) -> returns resumeId
  - GET /resume/:id -> parsed data
  - POST /match/:resumeId -> returns MatchResult[]
  - Secure endpoints and rate-limit

---

## 11. Accessibility (A11y)
- Use semantic HTML (form, label, button).
- Ensure keyboard-accessible drag & drop fallback.
- Focus management after navigation & form errors.
- ARIA for live regions (parse progress), modal dialogs must trap focus.
- Color contrast checked against WCAG AA.

---

## 12. Testing strategy
- Unit tests: parser, matcher, utils (Vitest)
- Component tests: Upload flow, Review edits, Matches rendering (React Testing Library)
- Integration test: simulate Upload -> Review -> Match using mocks
- Optional E2E: Playwright basic flow (upload sample file, run matches)
- Coverage targets: critical modules >= 80%

Example test paths:
- tests/lib/parser.test.ts — verify email/phone/skills extraction for sample texts
- tests/lib/matcher.test.ts — verify scoring weights and explainability
- tests/pages/flow.test.tsx — simulate UI flow with mocking of parse/match functions

---

## 13. CI/CD & Repo automation (GitHub-first)
Goal: Continuous deploy from main branch to GitHub Pages. Provide PR checks (install/build/test) and auto-deploy on merge. Alternative: Vercel/Netlify if branch previews required.

Key notes:
- Vite outputs to `dist`. Build steps in `hire-shark` produce `hire-shark/dist`.
- Always set working-directory to `hire-shark` in Actions.
- Vite base path (vite.config.ts) should be configurable via env var `BASE_URL` for GitHub Pages subpath deployments.

Add this to `vite.config.ts`:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.BASE_URL || "/",
  plugins: [react()],
});
```

Ensure `hire-shark/package.json` includes:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 14. GitHub Actions workflow (deploy to GitHub Pages)
Place this file at `.github/workflows/deploy-gh-pages.yml`. It builds the `hire-shark` app and publishes `hire-shark/dist` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

```yaml
# .github/workflows/deploy-gh-pages.yml
name: Build and Deploy hire-shark to GitHub Pages

on:
  push:
    branches: [ main ]     # change to your default branch
  pull_request:
    branches: [ main ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    outputs:
      build-success: ${{ steps.build.outcome }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci
        working-directory: hire-shark

      - name: Run tests
        run: npm test --if-present
        working-directory: hire-shark
        continue-on-error: false

      - name: Build (set base)
        env:
          BASE_URL: ${{ env.BASE_URL || '' }}
        run: |
          echo "Building with BASE_URL=${BASE_URL}"
          npm run build
        working-directory: hire-shark

  deploy:
    needs: test-and-build
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./hire-shark/dist
          publish_branch: gh-pages
```

Notes:
- If your repo is `github.com/ORG/REPO`, set `BASE_URL` to `/REPO/` (Actions env or repository variable) to make asset paths correct. For user/org pages (username.github.io), use `/`.
- Optionally set `working-directory` on `actions/checkout` steps or adjust paths.

---

## 15. GitHub Pages configuration steps
1. Commit workflow to `.github/workflows/deploy-gh-pages.yml`.
2. Ensure `vite.config.ts` accepts `BASE_URL` (see above).
3. On GitHub, go to Settings → Pages and confirm branch is `gh-pages` (actions will create branch).
4. If deploying to repo path, set `BASE_URL=/REPO/` in GH Actions env or use repo secret.
5. After successful run, site will be available at `https://ORG.github.io/REPO/`.

For single-page-app routing, ensure GitHub Pages serves index.html for 404s (Actions-gh-pages publishes static site; you may need `_redirects` or 404 fallback; see Netlify/Vercel notes if client-side routes fail).

---

## 16. Alternative hosts (Vercel / Netlify)
- Vercel:
  - Connect GitHub repo and set root path to `/hire-shark`.
  - Build command: `npm run build`
  - Output dir: `dist` (if project root is hire-shark) or `hire-shark/dist` depending on setup.
  - Provides automatic PR previews.
- Netlify:
  - Connect GitHub repo; set base directory to `hire-shark`.
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Add `_redirects` file in `hire-shark/public/_redirects`:
    ```
    /*    /index.html   200
    ```

---

## 17. CI/PR checks recommendations
- Minimal PR job: install dependencies and run `npm test` in `hire-shark`.
- Optional: run `npm run build` for faster failure detection.
- Accessibility check: include `pa11y` or Lighthouse CI job.

Example PR job snippet for `.github/workflows/pr-checks.yml`:

```yaml
name: PR checks
on: [pull_request]
jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
      - run: npm ci
        working-directory: hire-shark
      - run: npm test --if-present
        working-directory: hire-shark
      - run: npm run build
        working-directory: hire-shark
```

---

## 18. DNS / Custom domain notes
- GitHub Pages: add CNAME file to `gh-pages` root or configure via repo Settings → Pages.
- Vercel/Netlify: manage via their UI and add DNS records as instructed.

---

## 19. Security & privacy (deployment)
- Do not store PII in repo. Remove any sample resumes from public branches.
- If using server-side parsing later, secure storage and retention policies needed.

---

## 20. Acceptance criteria (deployment)
- On merge to `main`, GH Actions builds `hire-shark` and publishes `hire-shark/dist` to `gh-pages`.
- Published site loads and all client routes work (or redirects to index).
- PRs run tests and block merge if failing.

---

## 21. Step-by-step tasks to add deployment
- [x] Add GitHub-first deployment section to this spec
- [ ] Add `.github/workflows/deploy-gh-pages.yml` (CI deploy workflow)
- [ ] Update `vite.config.ts` to support `BASE_URL` env
- [ ] Ensure `hire-shark/package.json` scripts include `build`
- [ ] Configure repository `BASE_URL` variable if necessary
- [ ] Verify first deployment and enable Pages settings on GitHub

---

## 22. Run & dev commands reminder
```bash
cd hire-shark
npm install
npm run dev
```

---

## 23. Declaration
This implementation specification was generated by AI based on the provided design specification and project requirements. It is intended to guide the development of the hire-shark demo application.

---

