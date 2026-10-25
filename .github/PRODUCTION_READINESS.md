# Production Readiness Gate

This gate applies to every new feature, integration, agent, workflow, API, data pipeline, and deployment.

## 1. Automated tests

Required evidence:

- [ ] Changed behavior has unit and/or integration coverage.
- [ ] Critical user journey has an end-to-end or contract test.
- [ ] Failure, retry, timeout, authorization, and invalid-input paths are covered where relevant.
- [ ] Tests use synthetic or irreversibly anonymized data.
- [ ] Relevant test commands pass in CI.

Evidence (commands, CI link, coverage, exceptions):

> Add evidence here.

## 2. Observability

Required evidence:

- [ ] Structured logs exist for important state transitions and failures.
- [ ] Errors are captured with actionable context and correlation IDs.
- [ ] Health, latency, error-rate, and dependency signals exist where relevant.
- [ ] Alerts have an owner and a useful threshold.
- [ ] Logs, traces, metrics, and error reports contain no secrets or unnecessary personal data.
- [ ] A rollback or containment path is documented.

Evidence (dashboards, alerts, sample sanitized event, owner):

> Add evidence here.

## 3. Data, privacy, and PII

Required evidence:

- [ ] Data inventory identifies inputs, purpose, storage, processors/subprocessors, and outputs.
- [ ] Collection is limited to what the feature actually needs.
- [ ] PII and secrets are classified before implementation.
- [ ] Sensitive fields are encrypted in transit and at rest.
- [ ] Access follows least privilege and is auditable.
- [ ] Retention and deletion rules are defined and testable.
- [ ] PII is redacted from prompts, logs, traces, analytics, fixtures, screenshots, and support artifacts.
- [ ] Third-party/model-provider data use is approved and documented.
- [ ] User consent, export, correction, and deletion requirements are handled where applicable.
- [ ] Incident response owner and notification path are known.

Data-flow summary and evidence:

> Data source → processing → storage → subprocessors → output → retention/deletion.

## Release decision

- [ ] PASS — all required controls have evidence.
- [ ] EXCEPTION — named owner, written risk acceptance, compensating control, and expiry date are recorded.
- [ ] BLOCKED — do not merge or deploy.

Owner:

Review date:

Exception expiry (if any):

## Definition of done for coding agents

Codex, Claude Code, and other coding agents must treat this gate as part of the task. They must not claim completion when any applicable item lacks evidence. “Not applicable” requires a written reason.

## 2026-10-18 public catalogue release evidence
Scope: static catalogue only; commerce and legacy AI portal are not released.
Tests: python3 scripts/build_catalog.py; python3 -m unittest discover -s tests -p '*_test.py' -v; git diff --check. Covers 10 product paths, series, fail-closed checkout, exclusion of paid PDFs/demo tokens/retired links and static health.
Observability: build emits structured catalog_build event; /health.json exposes service and checkout state, no personal data. Vercel deployment/build receipts supply release failures. Owner Major Dream Williams; containment: roll back deployment or revert catalogue commit. Dynamic error correlation and provider alerts N/A to static content without JS/API processing.
Data: public framework markdown -> local static build -> Vercel CDN -> browser. No forms, cookies, analytics, customer records, model calls or payment collection are added. Hosting receives standard request metadata under Vercel account retention/access policy. No paid binaries are copied to public. Legacy source assets remain preserved in Git; pre-existing Git exposure is not solved by catalogue isolation.
Decision: static catalogue can ship after tests pass; sales remain BLOCKED pending individual edition verification, approved prices, checkout and durable entitlement/delivery tests. New project's public output is restricted to public/; legacy api/chat.js must be disabled in deployment config before release.

## 2026-10-19 approved cover archive and editorial plan
Scope: 11 founder-approved generated cover concepts plus editorial/community proposal; no application behavior, live catalogue or checkout changes.
Tests: cover count, PNG decoding and SHA-256 manifest verified; git diff --check. Runtime/E2E and failure-path tests N/A because no runtime implementation changed.
Observability: checksum manifest and Git commit provide artifact provenance. Runtime logs/alerts N/A to static source asset archival.
Data: generated illustrative artwork -> Git source archive and existing private Drive production folder. No customer data, credentials, actual athlete data or new collection. Sharing permissions unchanged. Existing rejected source images excluded from approved copies, retained only as original generation history. Proposed commerce data flows and consent boundaries documented in books/PRODUCTION_AND_COMMUNITY_PLAN.md; not implemented.
Decision: asset/document archival only; commercial release remains BLOCKED pending finished editions and tested fulfillment.

## 2026-10-26 Pillar 01 editorial recovery checkpoint

Scope: source inventory, recovered repository-native PDF passages, source hash manifest, evidence ledger, proposed outline and founder questions only. No runtime behavior, deployment configuration, public catalogue, checkout or product/entitlement changes.

Tests: source SHA-256 fingerprints, recovered physical page locators, eleven approved-cover manifest checksums and `git diff --check` verified. New automated behavior/E2E/failure-path tests N/A: documentation-only change. Existing catalogue suite run as regression verification; no build output regenerated.

Observability: Git history, immutable base SHA, source IDs, page references and fingerprint manifest provide editorial provenance. New runtime telemetry/alerts N/A: no new execution path or service.

Data/PII: supplied documents -> local text extraction -> source inventory and limited editorial findings in public Git. Full user attachments and third-party banking deck not republished. Existing repository-native P01 passages extracted into Markdown; originals preserved. No customer records, contact lists, raw interview answers, credentials or new processors added. Founder questions explicitly require private intake and permission before publication of third-party stories. Public Git is durable: never use this checkpoint folder as private intake storage; minimize any later approved story publication and follow repository-owner policy for removal requests.

Decision: editorial checkpoint only. Commercial release remains HOLD pending finished approved editions and tested fulfillment; no deployment or checkout activation authorized.

## 2026-10-26 shared MAIM publishing team

Scope: six source-controlled editorial skills, six Codex agent role definitions/registrations, working collection map, registry and validation receipt. Existing skills reused for voice and design. No application, web deployment, checkout or manuscript release changes.

Tests: six skill structural validations; six TOML role files plus Codex configuration parsed; five fresh-context qualitative workflow scenarios; existing catalogue regression suite; eleven approved cover hashes; git diff --check. Config loading in a new host session and external publishing workflows remain untested, so no operational autonomy or commercial release claim is made.

Observability: versioned role/skill registry, Git commits and validation receipt. No new production runtime path, scheduled process, telemetry or alerts; those controls are N/A for these instruction/configuration artifacts.

Data/PII: public collection metadata and editorial instructions -> Skills Git workspace and repository. No private founder interviews, customer records, child disclosures, credentials or uploaded third-party full text included. Future private intake stays outside public Git. No new external processor/API integration or account permissions created.

Decision: instruction/configuration delivery only. Manuscript publication, print certification and commercial release remain separate and blocked until their actual evidence is available. No deployment or checkout activation authorized.
