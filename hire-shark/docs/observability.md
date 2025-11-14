# Telemetry & Observability Plan

This document describes how we collect, store, and act on operational signals for HireShark.

## Objectives
- Understand how users flow through resume upload → review → matches → apply.
- Detect matching errors (CSV parsing, NLP scoring) quickly.
- Measure job API performance and match quality.
- Provide enough breadcrumbs to debug incidents end to end.

## Instrumentation Overview

| Layer | Signals | Notes |
|-------|---------|-------|
| Frontend | Page views, CTA clicks (Upload Resume, Find Matches, Apply, Express Interest), theme toggle, API latency, client errors | Use `window.analytics` wrapper (e.g., PostHog/Amplitude) + `console.error` intercept. |
| Resume parsing & matching | Structured logs per resume ID: parsing status, total jobs loaded, top match titles and scores, NLP fallback indicator, errors | Already logs top titles in `jobs/search`. We'll enhance by attaching resume hash. |
| Connectors | Time-to-fetch per ATS source, job counts, cache hits/misses | Log to stdout with log level INFO + JSON payload. |
| System health | Vite proxy usage, Express health endpoint 200s, memory usage, process uptime | Exposed via `/api/health`, use PM2/ProcMon for process metrics if deployed. |

## Log Schema (JSON Lines)

```json
{
  "timestamp": "2025-11-07T03:30:00.000Z",
  "level": "info",
  "component": "matching",
  "resumeId": "1",
  "event": "match_success",
  "jobsReturned": 5,
  "topJobs": ["Senior Data Analyst", "Data Scientist", "Machine Learning Engineer"],
  "skipgram": false,
  "elapsedMs": 212
}
```

```json
{
  "timestamp": "2025-11-07T03:35:00.000Z",
  "level": "error",
  "component": "greenhouse_connector",
  "boardToken": "stripe",
  "event": "fetch_failed",
  "status": 503,
  "message": "Service Unavailable"
}
```

## Storage & Retention
- Development: stdout + browser console. Capture logs via `npm run dev:all` and keep until feature complete.
- Production (future): send JSON logs to Logtail/Elastic with 30-day retention, apply data scrubbing to avoid PII.

## Alerting & Dashboards (Future)
- Alert on `match_failure` or `fetch_failed` > 5/min for any source.
- Track `jobsReturned` distribution—should be > 3 in >80% of sessions.
- Dashboards for user funnels (upload → matches → apply button clicks) using analytics tool.

## Debugging Workflow
1. Reproduce with resume ID (hash). Use stored logs to see connectors and match scores.
2. Check `/api/health` and Express logs for systemic issues.
3. If connectors failing, run `curl https://...` manually.
4. Use Jest/Vitest tests (`npm run test`) to ensure tokenization and similarity logic behave.
5. If only UI impacted, inspect network tab for `/api/jobs/search` response payload.

## Test Observability
- Vitest runs include logging top matches for verifying expected order.
- Add snapshot tests for telemetry payload shape (TODO).

## Privacy Considerations
- Do not store raw resume text. Use hashed IDs + truncated keywords.
- Strip PII before sending analytics events (e.g., no email address).

## Enhancements Backlog
- [ ] Ship analytics wrapper with batching + retry.
- [ ] Integrate OpenTelemetry for trace correlation between client and API.
- [ ] Add feature flags to control logging verbosity per environment.

