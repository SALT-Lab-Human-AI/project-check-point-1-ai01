# Code Flow

This document summarizes the end-to-end UI flow and where core logic lives. A screenshot of the flow can be placed at `docs/screenshots/code-flow/` and is referenced below.

## App routes (SPA)
- Entry router: `src/App.tsx`
- Pages:
  - Landing → `src/pages/Landing.tsx`
  - Upload → `src/pages/Upload.tsx`
  - Review → `src/pages/Review.tsx`
  - Preferences → `src/pages/Preferences.tsx`
  - Matches → `src/pages/Matches.tsx`

## State and context
- Resume state: `src/store/ResumeContext.tsx`
- Preferences state: `src/store/PreferencesContext.tsx`

## Core libraries
- Resume parsing & extraction: `src/lib/parser.ts`, `src/lib/skillExtractor.ts`, `src/lib/gemini_parser.ts`
- Matching logic: `src/lib/matcher.ts`, `src/lib/word_match_skipgram.ts`, `src/lib/skipgramAdapter.ts`
- Jobs data & adapters: `src/lib/adzunaApi.ts`, `src/lib/mockJobs.ts`
- Utilities & embeddings: `src/lib/utils.ts`, `src/lib/embeddings.ts`

## Flow summary
1) User lands on Landing and proceeds to Upload.
2) Upload accepts a resume; parsing/skill extraction runs (parser + skill extractor + optional Gemini parser).
3) Review shows parsed content for confirmation.
4) Preferences collects job filters (location, role, etc.).
5) Matches runs the matcher against job sources and presents ranked results with reasoning.

## Screenshot
If you have a captured diagram/screenshot of the code flow, place it here as `code-flow.png`:
`docs/screenshots/code-flow/code-flow.png`

Markdown embed (will render once the file exists at the path):

![Code Flow](./screenshots/code-flow/code-flow.png)

Note: The provided path `/var/folders/.../Screenshot 2025-11-07 at 12.33.09 PM.png` is a temporary system path on your machine. Copy that file into the path above and optionally rename it to `code-flow.png` (recommended to avoid special characters/spaces). If you keep the original filename, update the image link accordingly.

