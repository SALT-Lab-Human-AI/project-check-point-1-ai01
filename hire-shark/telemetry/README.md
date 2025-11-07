**Telemetry Guide**

- This guide explains what we persist to a database (or log store), how to debug failing tests effectively, and a concise code-flow overview to ground where signals originate.

**Database Logging**
- Event model (recommended fields if persisting to a DB/log store):
  - `id` (UUID)
  - `timestamp` (ISO-8601, UTC)
  - `level` (debug|info|warn|error)
  - `component` (e.g., `ui`, `parser`, `matching`, `connectors`)
  - `event` (e.g., `resume_uploaded`, `parse_success`, `match_success`, `fetch_failed`)
  - `sessionId` (anonymous client/session identifier)
  - `resumeId` (hashed/opaque token; never raw PII)
  - `requestId` (to correlate across hops)
  - `elapsedMs` (latency for the operation when applicable)
  - `status` (HTTP or custom status codes where relevant)
  - `message` (human-readable summary)
  - `data` (JSON; small, PII-scrubbed details like top titles, counts)
  - `error` (stack/message only for errors; no PII)
- Typical events emitted
  - UI navigation and CTAs: page views, upload click, find matches, apply
  - Parsing pipeline: `parse_started`, `parse_success`, `parse_failed`
  - Matching pipeline: `match_started`, `match_success` (top titles, counts), `match_failed`
  - Connectors: `fetch_started`, `fetch_success` (counts), `fetch_failed` (status)
- Storage notes
  - Dev: console/stdout only. See docs/observability.md:1 for context.
  - Prod: send JSON logs to a log store (e.g., Elastic/Logtail) or a DB table `event_logs` with fields above. Retain for ~30 days; scrub PII before persistence.

**Debugging Test Cases**
- Run tests
  - `npm run test` (Vitest) or `npx vitest --run`
  - Watch mode: `npx vitest`
  - Scope: `npx vitest src/lib/__tests__/matcher.test.ts`
- Focus and inspect
  - Use `.only`/`.skip` on individual tests to isolate failures.
  - Add targeted `console.log` for inputs/intermediate values; remove before commit.
  - Spy on errors: `vi.spyOn(console, 'error').mockImplementation(() => {})` and assert calls.
- Common suites in this repo
  - Matching: src/lib/__tests__/matcher.test.ts:1 — verify deterministic ranking; check tokenization/skipgram settings if order shifts.
  - Gemini parser: src/lib/__tests__/gemini_parser.test.ts:1 — mock network/LLM calls; ensure tests don’t rely on real API keys.
  - Resume context: src/store/__tests__/resume_context.test.tsx:1 — ensure provider state/updates are covered.
- Typical failure triage
  - Non-deterministic scores: pin random seeds, ensure stable sort, compare normalized scores.
  - Parser differences: verify input text normalization; test minimal repro with a small resume snippet.
  - Timeout/network: replace real calls with mocks/stubs; assert shapes, not remote content.

**High-Level Code Flow**
- Router and pages
  - Router: src/App.tsx:1
  - Landing → Upload → Review → Preferences → Matches (src/pages/*.tsx)
- State
  - Resume state: src/store/ResumeContext.tsx:1
  - Preferences: src/store/PreferencesContext.tsx:1
- Core logic
  - Parsing/skills: src/lib/parser.ts:1, src/lib/skillExtractor.ts:1, src/lib/gemini_parser.ts:1
  - Matching: src/lib/matcher.ts:1, src/lib/word_match_skipgram.ts:1, src/lib/skipgramAdapter.ts:1
  - Jobs data: src/lib/adzunaApi.ts:1, src/lib/mockJobs.ts:1

**Privacy & Retention**
- Never store raw resume text or emails. Use hashed IDs and truncated keywords.
- Keep `data` small and scrubbed; prefer counts/top titles over full payloads.
- Retain logs for a limited period (e.g., 30 days) and restrict access.

**Related Docs**
- Observability plan and schemas: docs/observability.md:1
- Code flow overview and screenshot reference: docs/code-flow.md:1
