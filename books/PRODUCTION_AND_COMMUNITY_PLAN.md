# Ten Pillars production and community plan

Checkpoint: 19 October 2026. Founder approved 11 cover concepts for 10 pillars: one each for 01–08 and 10; corporate and athlete options both retained for 09. Original easy mountain (02) and casino-like compass (09) are discarded from the production set and not uploaded. Originals are not destroyed. Cover approval does not establish completed manuscripts or print-ready files. Print wraps, bleed, spine width, final type/artifact inspection and accessible EPUB covers remain production work.

## Sources and organization

Google Drive: existing MAIM 10 Pillars e-Books folder, ArtMobAGI account. Preserve historical documents in place.
- Existing archive: https://drive.google.com/drive/folders/1Tcbwrxu3-t-S4fvvvt6D2ESsWleFm5In
- Production root: https://drive.google.com/drive/folders/1QxeSPamnpQelOHu3370nWvSgPJcmUBvL
- Book Covers: https://drive.google.com/drive/folders/1iCTcNr492bWrfKR6HC78BCs3M6uJFhQ2
- Chapters: https://drive.google.com/drive/folders/13ZPAZmnM7UiDCkaTWeqPMAKwB73FxOPr
- Manuscripts: https://drive.google.com/drive/folders/1J4bLcNSPsb5yn275xBdp_v81amax9oR6
- Images: https://drive.google.com/drive/folders/1TjRYX5dPabGXDF5N_0d9c18HK9GE3iYW

Use Pillar 01–10 subfolders as manuscripts are populated, mirrored by numbered filenames in Git. Cover manifest includes SHA-256 checksums. Both 09 options represent one book, not two editions yet. Generated people are illustrative, not founder portraits or actual customers.

Recovery leads (titles and locations only, contents not yet audited): historical Drive documents The 10 Pillars of the Major AI Mindset and I'd be happy to help you start writing the first book in your e-book series on the 10 Pillars of the Major AI Mindset. Recover before drafting replacements.

## Repeatable book standard — proposed

Audience: Caribbean diaspora creators, entrepreneurs and community builders, with useful examples for athletes and allies. One specific reader, problem and achievable outcome per book. Preserve canonical pillar titles.

Target 6,000–9,000 edited words; approximate 35–55 mobile-readable PDF pages, layout-dependent. PDF plus reflowable EPUB. Length is a production target, not filler quota.

Front matter: cover, author/copyright, reader promise, linked contents, how to use.
Six chapters:
1. Recognize the pattern: reader's current problem and self-audit.
2. Shift the mindset: core principle in plain language.
3. Build the system: repeatable practical framework.
4. Put it to work: culturally grounded worked example; label fictional composites.
5. Protect the progress: mistakes, boundaries, maintenance and relevant specialist caveats.
6. Make your Major Move: seven-day implementation and 30-day continuation.
Each chapter: one idea, one example, one exercise, one Major Move. Closing: worksheet, checklist, references, next pillar and optional community invitation. No invented quotes, biographies or endorsements. Verify time-sensitive claims and third-party reuse rights.

Workflow: recover -> map existing text -> outline -> founder voice input -> draft -> evidence/edit -> layout -> proof -> approve -> package -> delivery test -> release. Pilot Pillar 01 before multiplying the template. Version filenames: MAIM_P01_Diaspora_Empowerment_v0.1.md; released files use v1.0.

## Offer ladder — proposal, not live products

Founder indicated approximately $9 per book. Working currency USD, subject to confirmation before commerce creation.

| Offer | Proposed price | Contents |
|---|---:|---|
| Single pillar | $9 | PDF + EPUB, worksheet, seven-day action plan, optional reader-community invitation |
| Focus bundle | $24 | Three related books, combined workbook and shared challenge |
| Complete collection | $69 | Ten books, master workbook and ten-week self-guided roadmap |
| Guided cohort | $149 | Collection plus four scheduled weekly Google Meet sessions; launch only once dates, capacity and host are confirmed |

Focus bundles: Creator Ownership (04,06,08); Resilient Builder (02,07,09); Community Legacy (01,05,10). Pillar 03 is an optional education add-on or a later learner bundle (02,03,06). Avoid launching too many choices: single books plus collection first. Standalone total $90; collection $69. No unapproved recurring subscription, lifetime coaching or perpetual replay promise. Physical editions need separate pricing and production.

## Community and recurring experience — proposal

One MAIM Ten Pillars reader community, not ten disconnected groups. WhatsApp for opt-in conversation and announcements; Google Meet for weekly live learning. Weekly session proposed at 45 minutes: 10-minute pillar lesson, 20-minute application, 10-minute questions, 5-minute commitments. Rotate ten pillars. Publish a rolling schedule; distinguish community sessions from paid small-cohort support. Initial weekly pilot: ten weeks, subject to founder schedule approval; do not promise indefinite calls with a $9 purchase.

Onboarding: successful payment -> durable order/entitlement -> delivery email -> optional community join page -> explicit WhatsApp consent -> welcome/rules -> choose pillar interest and one goal -> next session invitation -> seven-day progress prompt. No automatic group addition. Explain member phone-number visibility before joining WhatsApp. Define moderation, recording consent and replay access; don't record personal discussion by default. Community access is separate from marketing email consent.

Selected stack: Vercel purchase/member experience, Stripe payment, Airtable order/entitlement/community operations, Resend transactional delivery and permitted reminders. Google Drive is private production storage, not public paid download hosting. WhatsApp automation requires a supported official integration and separate implementation; manual opt-in moderation is enough for pilot. No community or meeting has been created by this plan.

Airtable design (not created): Products, Orders, Entitlements, Members, Consent, Sessions and Delivery Events. Customer PII stays out of Git. Use Stripe checkout-session/event IDs for idempotency; verify webhook signatures; tolerate retries; reconcile payment before access; handle delivery failure, refunds, revoked entitlements and access recovery. Store only necessary names/email, consent evidence and optional pillar preference. Owner sets retention/deletion schedule before launch; keep required financial records separately. Never send full payment details to Airtable or chat tools.

Readiness: existing checkout remains disabled. Cover storage does not enable sales. Prices, currencies, finished deliverables, account/entity, host schedule, community rules and tested payment/delivery are required before launch. Track completion and useful outcomes, not just attendance or clicks.

## Next-agent instruction

Continue in MajorDream444/MAIM_10_Pillars. Read AGENTS.md, CLAUDE.md and books/PRODUCTION_AND_COMMUNITY_PLAN.md. Eleven approved concepts are in books/covers with checksums; retain both P09 options and exclude discarded P02/P09 art. Recover the older Drive manuscripts before replacing writing. Produce Pillar 01's six-chapter outline and reusable chapter/worksheet template for review. Keep live website and disabled checkout unchanged. $9 single, $24 focus bundle, $69 collection and $149 guided cohort are proposed prices, not implemented offers. Community is opt-in; weekly sessions are a proposed ten-week pilot, not a perpetual entitlement. Record new findings and exact remaining blockers.
