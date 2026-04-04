# 🌊 M.A.I.M. — The 10 Pillars of the Major AI Mindset

> *"The world is not ready. But we are."* — Major Dream Williams

**Building AI-Driven Resilience, Legacy & Ownership for the Caribbean Diaspora — and Beyond.**

---

## What This Is

The **Major AI Mindset (M.A.I.M.)** is a complete digital empowerment system built on 10 interconnected Pillars. This repository is the full technical and content infrastructure behind the M.A.I.M. product ecosystem — from the digital books and assets to the tiered AI agent and web portal.

---

## Repository Structure

```
MAIM_10_Pillars/
│
├── docs/                          # Core framework documentation
│   ├── framework/
│   │   ├── 10_Pillars_Framework.md       # The complete 10 Pillars framework
│   │   └── Visual_Concept_Map.mermaid    # Pillar mind map (Mermaid syntax)
│   ├── branding/
│   │   └── Branding_Guidelines.md        # Colors, fonts, voice, tone
│   ├── community/
│   │   └── Community_Building_Frameworks.md
│   └── curricula/
│       └── Course_Curricula.md           # 5 course tracks
│
├── web/                           # Frontend applications
│   ├── portal/
│   │   └── index.html                    # Token-gated access portal
│   └── agent/
│       ├── agent.html                    # Standalone AI agent chat UI
│       └── DEPLOY.md                     # Deploy guide
│
├── backend/                       # Node.js API proxy server
│   ├── server.js                         # Express server + tier logic
│   ├── package.json
│   └── .env.example
│
└── assets/                        # Product deliverables by tier
    ├── tier1/                            # The Pillar Scroll ($27)
    ├── tier2/                            # The Emerald Awakening ($97)
    └── tier3/                            # The Pillar Code Vault ($297)
```

---

## The 10 Pillars

| # | Pillar | Core Principle |
|---|--------|---------------|
| 01 | Diaspora Empowerment | Build sovereign communities of creators, not consumers |
| 02 | Mindset Shift & Resilience | Turn adversity into strategic greatness |
| 03 | Gamified Education | Make learning irresistible and addictive |
| 04 | Blockchain & Decentralization | Restore ownership, remove middlemen |
| 05 | Community & Collaboration | Move as crews, tribes, DAOs — not individuals |
| 06 | Localized AI & Personalization | Tech that speaks the people's language and rhythms |
| 07 | Holistic Wellness & Balance | Protect mind, body, spirit while scaling empires |
| 08 | Security & Compliance | Guard sovereignty digitally and legally |
| 09 | Data-Driven Performance | Track what matters, grow what matters |
| 10 | Legacy & Long-Term Impact | Build 100-year dynasties, not 1-year hype |

---

## Product Tiers

| Tier | Name | Price | Included |
|------|------|-------|----------|
| 1 | **The Pillar Scroll** | $27 | Book · Quiz · Concept Map · Wallpapers · AI Guide (Pillars 1–3) |
| 2 | **The Emerald Awakening** | $97 | Everything in T1 + All 10 Pillars book · Journal · Artwork · Vision Poster · 5 Course Tracks · AI Strategist |
| 3 | **The Pillar Code Vault** | $297 | Everything in T1+T2 + Roadmap · Canvas · DAO Guide · Wealth Collective · Legacy Doc · AI Mind Architect (lifetime) |
| + | **Meditations & Music** | $17 | Binaural beats · ambient AI meditations |

---

## Quick Start — Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
node server.js
```

### Test

```bash
curl http://localhost:3001/health

curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "token": "SCROLL-TEST1",
    "messages": [{"role": "user", "content": "What is Pillar 1?"}],
    "stream": false
  }'
```

---

## Quick Start — Frontend

Open `web/portal/index.html` in any browser.

Demo tokens:
- `SCROLL-DEMO` — Pillar Scroll
- `EMERALD-DEMO` — Emerald Awakening
- `VAULT-DEMO` — Dynasty Vault

---

## Token Flow

```
Customer buys on Gumroad
  → Gumroad webhook → n8n
  → n8n generates: VAULT-A1B2C3
  → Email with link: /agent.html?token=VAULT-A1B2C3
  → Dynasty tier unlocked
```

---

## Roadmap

- [ ] Phase 4: Lead magnet funnel + email sequence
- [ ] n8n automated token generation workflow
- [ ] Redis for production query tracking
- [ ] JWT token upgrade
- [ ] Mobile app (Capacitor wrapper)
- [ ] M.A.I.M. Community Discord bot

---

## Brand

**Colors:** Sunrise Gold `#F0A500` · Caribbean Blue `#0077CC` · Digital Green `#27AE60`

**Fonts:** Syne (headings) · DM Sans (body)

---

**Major Dream Williams** — [majordream.gumroad.com](https://majordream.gumroad.com)

*"Freedom was never supposed to be a favor. It was supposed to be our starting point."*
