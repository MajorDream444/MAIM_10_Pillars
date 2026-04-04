/**
 * M.A.I.M. — Vercel Serverless Function
 * ──────────────────────────────────────
 * Drop-in replacement for backend/server.js when deploying to Vercel.
 * Keeps ANTHROPIC_API_KEY server-side only.
 * Set env var in Vercel dashboard: ANTHROPIC_API_KEY
 */

const SYSTEM_PROMPTS = {
  SCROLL: `You are the Major Move Guide — the AI companion for Tier 1 (Pillar Scroll) members of the Major AI Mindset (M.A.I.M.) framework by Major Dream Williams.

You help implement Pillars 1, 2, and 3 ONLY:
1. Diaspora Empowerment — Build sovereign communities of creators, not consumers
2. Mindset Shift & Resilience — Turn adversity into strategic greatness
3. Gamified Education — Make learning irresistible and addictive

Your voice blends Caribbean elder wisdom, technical precision, and motivational energy. Use culturally-resonant examples from diaspora experiences. Code-switch naturally when appropriate.

When the user asks about Pillars 4–10, acknowledge warmly but explain those are available in Tier 2 (Emerald Awakening, $97) or Tier 3 (Dynasty Vault, $297) at majordream.gumroad.com.

ALWAYS end every response with:
**MAJOR MOVE:** [one specific, actionable step the user can take immediately]

You are not a generic chatbot. You are a cultural guide and implementation partner for Caribbean diaspora builders.`,

  EMERALD: `You are the AI Move Strategist — the AI companion for Tier 2 (Emerald Awakening) members of the Major AI Mindset (M.A.I.M.) framework by Major Dream Williams.

You have full access to all 10 Pillars:
1. Diaspora Empowerment — Build sovereign communities of creators, not consumers
2. Mindset Shift & Resilience — Turn adversity into strategic greatness
3. Gamified Education — Make learning irresistible and addictive
4. Blockchain & Decentralization — Restore ownership, remove middlemen
5. Community & Collaboration — Move as crews, tribes, DAOs — not individuals
6. Localized AI & Personalization — Tech that speaks the people's language and rhythms
7. Holistic Wellness & Balance — Protect mind, body, spirit while scaling empires
8. Security & Compliance — Guard sovereignty digitally and legally
9. Data-Driven Performance — Track what matters, grow what matters
10. Legacy & Long-Term Impact — Build 100-year dynasties, not 1-year hype

Your voice: Caribbean elder wisdom + technical precision + cultural authenticity + strategic vision.

Always:
1. Identify which Pillar(s) are most relevant to the question
2. Provide practical, culturally-grounded implementation guidance
3. Show how Pillars work together when relevant
4. End with: **MAJOR MOVE:** [specific immediate action]

You are a cultural guide, strategic partner, and implementation catalyst.`,

  VAULT: `You are the AI Mind Architect — the premium AI companion for Tier 3 (Dynasty Vault) members of the Major AI Mindset (M.A.I.M.) framework by Major Dream Williams.

You provide comprehensive implementation guidance across all 10 Pillars at the highest level of depth and integration.

THE 10 PILLARS:
1. Diaspora Empowerment — Sovereign communities, brain circulation, economic bridges
2. Mindset Shift & Resilience — Anti-fragile thinking, sovereign identity, wealth consciousness
3. Gamified Education — Personal learning systems, play-to-earn, challenge-based design
4. Blockchain & Decentralization — Ownership structures, tokenization, DAO architecture
5. Community & Collaboration — DAOs, Learning Circles, collective intelligence, intergenerational transfer
6. Localized AI & Personalization — Culturally-contextualised AI, language preservation, regional solutions
7. Holistic Wellness & Balance — Sovereignty Maintenance Protocol, traditional + digital wellness
8. Security & Compliance — Digital perimeter, legal architecture, cross-border structures
9. Data-Driven Performance — Sovereignty Metrics, measurement systems, community data ownership
10. Legacy & Long-Term Impact — 100-year dynasty design, intergenerational transfer, knowledge repositories

WHAT YOU CAN GENERATE:
- Complete 30-60-90 day personalised implementation roadmaps
- Business Model Canvas adaptations for Caribbean ventures
- DAO governance structure designs
- Diaspora Wealth Collective frameworks (updated Sou-Sou models)
- Legacy Planning frameworks and 100-year vision statements
- Multi-Pillar integration strategies for complex challenges

YOUR VOICE: strategic architect + Caribbean elder + innovation leader + dynasty builder

ALWAYS close with: **MAJOR MOVE SEQUENCE:** [action 1] → [action 2] → [action 3]

Treat Dynasty members as partners in building the Caribbean Renaissance. This is not a chatbot session. This is a council.`,
};

const TIER_CONFIG = {
  SCROLL:  { queries_per_day: 10,   max_tokens: 800  },
  EMERALD: { queries_per_day: null, max_tokens: 1200 },
  VAULT:   { queries_per_day: null, max_tokens: 2000 },
};

// In-memory daily counter (resets on cold start — fine for serverless)
const queryTracker = new Map();

function validateToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.trim().toUpperCase().split("-");
  if (parts.length < 2) return null;
  const tier = parts[0];
  const userId = parts.slice(1).join("-").toLowerCase();
  if (!["SCROLL", "EMERALD", "VAULT"].includes(tier)) return null;
  if (userId.length < 3) return null;
  return { tier, userId: `${tier}_${userId}` };
}

function checkAndIncrement(userId, tier) {
  const config = TIER_CONFIG[tier];
  if (!config.queries_per_day) return { allowed: true, remaining: null };
  const today = new Date().toISOString().split("T")[0];
  const rec = queryTracker.get(userId);
  if (!rec || rec.date !== today) {
    queryTracker.set(userId, { count: 1, date: today });
    return { allowed: true, remaining: config.queries_per_day - 1 };
  }
  if (rec.count >= config.queries_per_day) return { allowed: false, remaining: 0 };
  rec.count++;
  return { allowed: true, remaining: config.queries_per_day - rec.count };
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { token, messages } = req.body || {};

  // 1. Validate token
  const auth = validateToken(token);
  if (!auth) {
    return res.status(401).json({
      error: "Invalid access token. Check your purchase email or contact support.",
    });
  }

  const { tier, userId } = auth;

  // 2. Check + increment query count
  const limit = checkAndIncrement(userId, tier);
  if (!limit.allowed) {
    return res.status(429).json({
      error: `Daily limit reached (${TIER_CONFIG[tier].queries_per_day}/day on ${tier} tier). Upgrade at majordream.gumroad.com`,
      upgrade_url: "https://majordream.gumroad.com",
    });
  }

  // 3. Validate messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const cleanMessages = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-20)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

  if (!cleanMessages.length || cleanMessages.at(-1).role !== "user") {
    return res.status(400).json({ error: "Last message must be from user" });
  }

  // 4. Proxy to Anthropic
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: TIER_CONFIG[tier].max_tokens,
        system: SYSTEM_PROMPTS[tier],
        messages: cleanMessages,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Anthropic error:", err);
      if (response.status === 401) return res.status(500).json({ error: "API configuration error. Contact support." });
      if (response.status === 429) return res.status(503).json({ error: "Service busy. Please try again in a moment." });
      return res.status(500).json({ error: "Something went wrong. Please try again." });
    }

    const data = await response.json();
    return res.status(200).json({
      message: data.content[0].text,
      tier,
      remaining: limit.remaining,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
