# MAIM Ecosystem Repository Relationships — 2026-10-19

Status: Cross-repository architectural reference; no runtime or commercial deployment implied.

## Governance
- **MajorDream444/Major-AI-OS** — umbrella MAIM brand, visual language, teaching accessibility rules, orchestration and owned commerce direction. Canonical reference: docs/architecture/MAIM_VISUAL_STORYTELLING_ECOSYSTEM_V1.md
- **MajorDream444/MAIM_10_Pillars** — canonical ten-pillar doctrine, content and curricula, historical product tiers and implementation materials. This repository's docs/framework/10_Pillars_Framework.md remains the source for pillar names and explanations.
- **MajorDream444/major-moves-series** — original visual manifesto narratives, ebooks, workbooks, story/quest/badge candidates and publishing derivatives. It should reference pillars by stable name or ID, never silently rewrite the pillar framework.

## Content flow
Ten-pillar doctrine → story grounded in Major Dream Williams' lived experience → visual metaphor → beginner-friendly ABC learning step → action/first win → Major Moves micro-book or workbook → community quest → optional badge/collectible → future Captain Lucky puzzle connection, if separately approved.

## Pillar crosswalk examples (editorial proposals, not definitive one-to-one mappings)
- The Iceberg, The Leak, Overloaded → Mindset Shift & Resilience; Holistic Wellness & Balance; Data-Driven Performance & Analytics.
- The Orchestra / Conductor → Community & Collaboration; Localized AI & Personalization.
- The Garden / Ecosystem / Greenhouse → Community & Collaboration; Legacy & Long-Term Impact.
- The Bottleneck / Fire Fighter → Data-Driven Performance & Analytics; Holistic Wellness & Balance.
- Collectibles/quests → Gamified Education, with Blockchain & Decentralization relevant only for optional verified ownership layers.

## Repository non-overlap rule
Keep conceptual source and original pillar content here. Keep original creative manuscripts and image variants in major-moves-series. Keep cross-system policies and current stack decisions in Major-AI-OS. Do not duplicate master files across repos; reference them.

## Required reconciliation before commerce work
The historical README currently references Gumroad, n8n and prices for Pillar Scroll, Emerald Awakening and Pillar Code Vault. Major-AI-OS has since retired Gumroad, Shopify, and Kit for owned operations. Treat old purchase flows and prices as historical until audited. Do not infer deployment from a README.

## Production-readiness gate
For implementation changes follow AGENTS.md and CLAUDE.md: tests, observability and PII/data handling evidence; document in .github/PRODUCTION_READINESS.md. This cross-reference file is documentation-only and introduces no runtime path or user-data processing.
