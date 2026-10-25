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

## 2026-10-26 Drive/archive recovery addendum

Scope: read-only recovery of five native Drive documents, two production writing-folder listings and six supplied attachments. Source metadata, page/section references and editorial findings committed; no private corpus or sensitive autobiographical prompts republished. Original files, sharing and organization unchanged. No source manuscript replacement, deployment, checkout or runtime changes.

Tests: six attachment hashes and four physical PDF page counts recorded; P01 source boundaries and incomplete Legacy export checked; JSON manifest parses. Runtime/E2E tests and new telemetry N/A to this documentation-only change. Existing cover manifest and application paths not modified. Git object readback verifies persistence. Character counts refer to fetched native text, not native binary checksums.

Data: authorized source reads -> transient local extraction -> minimized inventory/findings in public Git. Private raw content remains in original Drive/Library locations; no new processing integration or customer data. Editorial provenance is supplied by immutable commit/source IDs. Release decision: recovery checkpoint only; publication/commercial release remains HOLD.

## 2026-10-26 phased publishing / MindFluence review

Scope: source-linked upstream marketing-prompt review and proposed quarterly editorial/bundle plan. No third-party prompt imported, skills installed, runtime paths changed or external marketing/publication performed. Tests/telemetry N/A to a documentation-only review; pinned upstream SHA, inspected license, explicit proposals/source limitations and Git readback provide provenance. No customer data, credentials, private stories or provider configuration added. No deployment/checkout changes. Commercial and publication readiness remain dependent on completed approved artifacts, accurate offers and tested fulfillment.

## 2026-10-26 Pillar 01 manuscript v0.1

Scope: approximately 2,073-word Chapter 1 and reflection; five remaining chapter outlines; source-to-chapter map and editorial receipt. Only the opening chapter is drafted. No completed-book, publication, clinical, financial, legal-compliance or commercial-readiness claim.

Tests: UTF-8/whitespace and explicit draft/illustrative labels verified; six proposed chapter headings checked; eleven existing cover hashes verified unchanged. Runtime/E2E/telemetry N/A to Markdown editorial work; no production behavior or services changed. Source IDs, Git version and editorial receipt supply provenance.

Data: recovered conceptual material -> edited draft and explicitly illustrative example -> public Git. No private interview answers, real third-party identifiers, invented founder biography, testimonials, credentials or customer data added. Originals preserved; founder scene intake remains private before permission-aware editorial insertion. No deployment, checkout, pricing or entitlement changes. Decision: draft for founder voice/story review only; book and commercial release remain HOLD.

## 2026-10-26 recovered publishing master catalogue

Scope: central index and machine-readable metadata for sixteen existing PDFs, six newly relevant native Drive documents and supporting funnel/agent sources. Read-only GitHub/three-account Drive search; source originals and permissions unchanged. An old cross-repo zero-prose conclusion is explicitly corrected using inspected artifacts; no blanket final-book/fulfillment certification replaces it.

Validation: PDF SHA-256/page counts recorded; 46 relative catalogue links resolved against the current Git tree/new manifest; JSON serialized; Git readback verifies persistence. Runtime tests/telemetry N/A to documentation/metadata-only changes. Historical provider/commerce statements remain observations from dated documents, not fresh live verification.

Data: authorized file metadata and bounded source screening -> minimized public catalogue and source pointers. No private transcript corpus, personal founder account, credentials, order/customer data or third-party full text published. No assets moved/deleted, sharing changed, messages sent, new integrations executed, deployments made or checkout activated. Decision: recovered source catalogue only, current writing continues; individual releases still need evidence.
