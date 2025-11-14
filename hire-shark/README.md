# HireShark
AI-assisted resume analysis and job matching. Upload a résumé, let Gemini extract structured data, tune your preferences, and pull live roles from Adzuna to see the best-fit opportunities.

## Try it live
[Github Page Deployment](https://salt-lab-human-ai.github.io/project-check-point-1-ai01/)

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
cp .env.example .env   # then add VITE_ENCODED_SECRET or local keys
npm run dev
```

### Environment Variables (`.env`)
| Name | Description |
| --- | --- |
| `VITE_ENCODED_SECRET` | Base64 blob produced by `scripts/encrypt_secrets.py`; contains Gemini + Adzuna credentials. |
| `VITE_GEMINI_API_KEY`, `VITE_ADZUNA_APP_ID`, `VITE_ADZUNA_APP_KEY` | Optional plain-text entries used only for local encryption or manual overrides. |

Restart the dev server after editing `.env`.

### Shared password workflow
Client-side API keys now live in a single encrypted payload:
1. Populate `.env` with `VITE_GEMINI_API_KEY`, `VITE_ADZUNA_APP_ID`, and `VITE_ADZUNA_APP_KEY`.
2. Run `python scripts/encrypt_secrets.py`, enter a shared password when prompted, and copy the printed password + encoded string.
3. Store the encoded value locally as `VITE_ENCODED_SECRET` (and in the GitHub repo secret `VITE_ENCODED_SECRET`), then remove the plain-text keys from `.env`.
4. Share the password only with trusted testers. When the site needs credentials, it prompts for that password, decrypts the blob in-memory, and never writes the plaintext anywhere persistent.

Users without the shared password can still paste their own Gemini/Adzuna keys when prompted.

## Deployment
GitHub Actions (`.github/workflows/deploy-gh-pages.yml`) builds on pushes to `main`, writes `VITE_ENCODED_SECRET` into `hire-shark/.env`, and publishes `dist/` to the `gh-pages` branch. Generate a new payload with `scripts/encrypt_secrets.py` whenever keys rotate and update the GitHub secret `ENCODED_SECRET` before triggering a deploy.

---

## Safety & Privacy
- **Resume data stay local:** Uploads live in browser memory (`ResumeContext`). Refreshing clears all resume data; there is no backend persistence in this repo.  
- **LLM disclosure:** The full parsed résumé is sent to Google Gemini for extraction and job-role ideation. The information is not stored by HireShark, but review Google’s data policies for Gemini.
- **API keys:** Gemini and Adzuna credentials live inside an AES-GCM encrypted blob (`VITE_ENCODED_SECRET`). They’re only decrypted in-memory after the user enters the shared password or supplies personal keys.  
- **External calls:** Adzuna requests only include preference data (role, salary, job type); we never transmit résumé content to Adzuna.  
- **Google Gemini usage:** API calls using Gemini may be blocked if quota limits are exceeded.
