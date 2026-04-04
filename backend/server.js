/**
 * M.A.I.M. — AI Agent Backend Proxy
 * ──────────────────────────────────
 * Keeps your Anthropic API key server-side only.
 * Enforces tier-based access, query limits, and system prompts.
 *
 * Deploy options (all free tier available):
 *   • Render.com  → connect GitHub repo, set env vars, done
 *   • Railway.app → railway up
 *   • Vercel      → rename to api/chat.js (see DEPLOY.md)
 *   • Cloudflare Workers → see workers/ folder
 *
 * Local dev:
 *   npm install
 *   cp .env.example .env  (add your ANTHROPIC_API_KEY)
 *   node server.js
 */

import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── ANTHROPIC CLIENT ──────────────────────────────────────────────
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── MIDDLEWARE ────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: ["POST", "GET"],
  })
);

// Global rate limit — 100 requests per 15 min per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests. Please slow down." },
});
app.use(globalLimiter);

// ── TIER SYSTEM PROMPTS ───────────────────────────────────────────
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

// ── TIER CONFIG ───────────────────────────────────────────────────
const TIER_CONFIG = {
  SCROLL: {
    allowed_pillars: [1, 2, 3],
    queries_per_day: 10,
    max_tokens: 800,
  },
  EMERALD: {
    allowed_pillars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    queries_per_day: null, // unlimited
    max_tokens: 1200,
  },
  VAULT: {
    allowed_pillars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    queries_per_day: null, // unlimited
    max_tokens: 2000,
  },
};

// ── IN-MEMORY QUERY TRACKER (use Redis in production) ─────────────
// Resets daily — for production use Redis with TTL
const queryTracker = new Map(); // key: userId, value: {count, date}

function checkQueryLimit(userId, tier) {
  const config = TIER_CONFIG[tier];
  if (!config.queries_per_day) return { allowed: true, remaining: null };

  const today = new Date().toISOString().split("T")[0];
  const record = queryTracker.get(userId);

  if (!record || record.date !== today) {
    queryTracker.set(userId, { count: 0, date: today });
    return {
      allowed: true,
      remaining: config.queries_per_day,
    };
  }

  if (record.count >= config.queries_per_day) {
    return { allowed: false, remaining: 0 };
  }

  return {
    allowed: true,
    remaining: config.queries_per_day - record.count,
  };
}

function incrementQuery(userId) {
  const today = new Date().toISOString().split("T")[0];
  const record = queryTracker.get(userId) || { count: 0, date: today };
  record.count++;
  record.date = today;
  queryTracker.set(userId, record);
}

// ── TOKEN VALIDATION ──────────────────────────────────────────────
// In production: validate JWT from Gumroad webhook
// For now: validates token format and extracts tier
function validateToken(token) {
  if (!token || typeof token !== "string") return null;
  token = token.trim().toUpperCase();

  // Format: TIER-USERID (e.g. VAULT-A1B2C3)
  const parts = token.split("-");
  if (parts.length < 2) return null;

  const tier = parts[0];
  const userId = parts.slice(1).join("-").toLowerCase();

  if (!["SCROLL", "EMERALD", "VAULT"].includes(tier)) return null;
  if (userId.length < 3) return null;

  return { tier, userId: `${tier}_${userId}` };
}

// ── HEALTH CHECK ──────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "MAIM Agent API", version: "1.0.0" });
});

// ── MAIN CHAT ENDPOINT ────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { token, messages, stream = false } = req.body;

  // 1. Validate token
  const auth = validateToken(token);
  if (!auth) {
    return res.status(401).json({
      error:
        "Invalid access token. Check your purchase email or contact support.",
    });
  }

  const { tier, userId } = auth;
  const config = TIER_CONFIG[tier];

  // 2. Check query limit
  const limitCheck = checkQueryLimit(userId, tier);
  if (!limitCheck.allowed) {
    return res.status(429).json({
      error: `Daily query limit reached (${config.queries_per_day}/day on ${tier} tier). Upgrade at majordream.gumroad.com for unlimited access.`,
      upgrade_url: "https://majordream.gumroad.com",
    });
  }

  // 3. Validate messages
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  // 4. Sanitize messages — only user/assistant roles, max 20 turns
  const cleanMessages = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-20)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 4000), // max 4k chars per message
    }));

  if (cleanMessages.length === 0 || cleanMessages[cleanMessages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Last message must be from user" });
  }

  // 5. Call Claude API
  try {
    if (stream) {
      // Streaming response
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await anthropic.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: config.max_tokens,
        system: SYSTEM_PROMPTS[tier],
        messages: cleanMessages,
      });

      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
        }
      }

      incrementQuery(userId);
      const remaining = limitCheck.remaining
        ? limitCheck.remaining - 1
        : null;
      res.write(
        `data: ${JSON.stringify({ done: true, remaining, tier })}\n\n`
      );
      res.end();
    } else {
      // Standard response
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: config.max_tokens,
        system: SYSTEM_PROMPTS[tier],
        messages: cleanMessages,
      });

      incrementQuery(userId);
      const remaining = limitCheck.remaining
        ? limitCheck.remaining - 1
        : null;

      res.json({
        message: response.content[0].text,
        tier,
        remaining,
        usage: response.usage,
      });
    }
  } catch (err) {
    console.error("Claude API error:", err.message);

    if (err.status === 401) {
      return res
        .status(500)
        .json({ error: "API configuration error. Contact support." });
    }
    if (err.status === 429) {
      return res
        .status(503)
        .json({ error: "Service busy. Please try again in a moment." });
    }

    res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});

// ── TIER INFO ENDPOINT ────────────────────────────────────────────
app.get("/api/tier", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const auth = validateToken(token);

  if (!auth) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const { tier, userId } = auth;
  const config = TIER_CONFIG[tier];
  const limitCheck = checkQueryLimit(userId, tier);

  res.json({
    tier,
    allowed_pillars: config.allowed_pillars,
    queries_per_day: config.queries_per_day,
    queries_remaining: limitCheck.remaining,
    agent_name:
      tier === "SCROLL"
        ? "Major Move Guide"
        : tier === "EMERALD"
        ? "AI Move Strategist"
        : "AI Mind Architect",
  });
});

// ── START ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌊 M.A.I.M. Agent API running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`🤖 Chat:   POST http://localhost:${PORT}/api/chat`);
  console.log(`🔑 Tier:   GET  http://localhost:${PORT}/api/tier\n`);
});

export default app;
