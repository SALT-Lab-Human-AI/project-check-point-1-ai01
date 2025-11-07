# HireShark
AI-assisted resume analysis and job matching. Upload a résumé, let Gemini extract structured data, tune your preferences, and pull live roles from Adzuna to see the best-fit opportunities.

---

## Tech Stack
- **Frontend:** Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **State/Data:** React Context (resume & preferences), TanStack Query for future data hooks
- **AI & APIs:** Google Gemini (`@google/generative-ai`) for parsing + ideation, Adzuna Jobs API for live listings
- **Tooling:** ESLint, Mermaid diagrams, GitHub Actions → GH Pages deploy

---

## Key Flows
1. **Upload** – Users drag/drop PDF/DOC/DOCX; files stored in `ResumeContext`.
2. **Review** – Gemini prompt extracts personal info, experience, education, and skills for in-app editing.
3. **Preferences** – Users select AI-suggested roles or a custom role, job type, and salary bands.
4. **Matches** – Preferences + parsed resume trigger Adzuna searches; results are sortable and include detail modals.

Supporting resources:
- `docs/` – architecture & sequence Mermaid diagrams (render via `npm run diagram:build`).
- `prompts/prompts.md` – complete text of every LLM prompt.
- `prompts/data_connectors_and_models.md` – model IDs, API endpoints, and auth notes.

---

## Getting Started
Detailed install steps live in [`INSTALL.md`](./INSTALL.md). Quick version:

```sh
git clone <repo>
cd hire-shark
npm install
cp .env.example .env   # then add real keys
npm run dev
```

### Environment Variables (`.env`)
| Name | Description |
| --- | --- |
| `VITE_GEMINI_API_KEY` | Google Gemini API key used client-side for parsing + suggestions. |
| `VITE_ADZUNA_APP_ID`, `VITE_ADZUNA_APP_KEY` | Credentials for Adzuna REST API calls. |

Restart the dev server after editing `.env`.

## Deployment
GitHub Actions (`.github/workflows/deploy-gh-pages.yml`) builds on pushes to `main`, injects secrets into `hire-shark/.env`, and publishes `dist/` to the `gh-pages` branch. Ensure the repo secrets `VITE_GEMINI_API_KEY`, `VITE_ADZUNA_APP_ID`, and `VITE_ADZUNA_APP_KEY` are configured before enabling the workflow.

---

## Safety & Privacy
- **Resume data stay local:** Uploads live in browser memory (`ResumeContext`). Refreshing clears all resume data; there is no backend persistence in this repo.  
- **LLM disclosure:** The full parsed résumé is sent to Google Gemini for extraction and job-role ideation. The information is not stored by HireShark, but review Google’s data policies for Gemini.
- **API keys:** `VITE_GEMINI_API_KEY`, `VITE_ADZUNA_APP_ID`, and `VITE_ADZUNA_APP_KEY` are bundled at build time. Treat them as secrets—keep them in `.env`.  
- **External calls:** Adzuna requests only include preference data (role, salary, job type); we never transmit résumé content to Adzuna.  