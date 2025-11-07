Architecture Diagrams

This folder contains Mermaid source files (.mmd) that describe HireShark’s technical architecture, flows, and data model.

Files
- docs/architecture.mmd – Component view (SPA, contexts, libs, external services)
- docs/sequence-upload.mmd – Upload + parse flow
- docs/sequence-matching.mmd – Roles/locations + matching flow
- docs/deployment.mmd – Deployment view (Vite build, hosting, pdf.js worker)
- docs/data-model.mmd – Type relationships

Generate SVGs
1) Install Mermaid CLI locally (dev only):
   npm i -D @mermaid-js/mermaid-cli

2) Render all diagrams to SVG:
   npm run diagram:build

Outputs will be written next to each .mmd file (e.g., architecture.svg).

Tips
- Update these diagrams whenever you change pages, contexts, or parsing/matching flows.
- If you add new external services (e.g., real job APIs), extend the component and sequence diagrams to reflect those calls.
- Keep environment usage explicit (e.g., VITE_GEMINI_API_KEY is client-side) and call out security considerations in PRs.

