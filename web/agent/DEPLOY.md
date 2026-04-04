# M.A.I.M. Agent — Deploy Guide
## Get your AI agent live in under 30 minutes

---

## What You're Deploying

```
maim-agent/
├── server.js          ← Node.js backend (keeps API key secure)
├── agent.html         ← Frontend chat UI
├── package.json       ← Dependencies
├── .env.example       ← Environment variable template
└── DEPLOY.md          ← This file
```

The backend is a proxy server that:
- Holds your Anthropic API key securely
- Enforces tier-based access (SCROLL / EMERALD / VAULT)
- Applies the correct system prompt per tier
- Enforces query limits (10/day for Core, unlimited for others)
- Streams responses for a fast, live typing feel

---

## OPTION A — Render.com (Recommended, Free Tier)

### Step 1: Push to GitHub
```bash
cd maim-agent
git init
git add .
git commit -m "MAIM agent initial deploy"
# Create a repo on github.com and push
git remote add origin https://github.com/yourusername/maim-agent.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to render.com → New → Web Service
2. Connect your GitHub repo
3. Settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add environment variables:
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com
   - `ALLOWED_ORIGIN` = your frontend URL (or * for testing)
   - `NODE_ENV` = production
5. Click Deploy

Your API will be live at: `https://maim-agent-xxxx.onrender.com`

### Step 3: Update agent.html
Open `agent.html` and find line:
```javascript
: 'https://your-maim-api.onrender.com', // ← update this after deploy
```
Replace with your Render URL.

---

## OPTION B — Railway.app (Also Free, Faster Deploys)

```bash
npm install -g @railway/cli
railway login
cd maim-agent
railway init
railway up
# Set env vars in Railway dashboard
```

---

## OPTION C — Vercel Serverless (For Vercel Users)

Rename `server.js` to `api/chat.js` and adapt to Vercel's serverless format:

```javascript
// api/chat.js
export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  // ... paste the POST /api/chat handler logic here
}
```

---

## OPTION D — Host Frontend Only (Simpler for Testing)

You can host `agent.html` on any static host (GitHub Pages, Netlify Drop, etc.)
and point it at any backend. The frontend is 100% self-contained HTML.

For quick testing: just open `agent.html` in a browser and update `API_BASE`
to your running local server.

---

## Connecting Tokens to Gumroad

### Token Format
```
SCROLL-{6chars}    → Tier 1, 10 queries/day
EMERALD-{6chars}   → Tier 2, unlimited
VAULT-{6chars}     → Tier 3, unlimited + premium prompts
```

### Auto-Token Flow (Full Automation)
1. Customer buys on Gumroad
2. Gumroad fires a webhook to your n8n instance
3. n8n generates a token: `VAULT-A1B2C3`
4. n8n sends confirmation email with link:
   `https://yourdomain.com/agent.html?token=VAULT-A1B2C3`
5. Customer clicks link → lands in agent with their tier unlocked

### Manual Token Flow (Launch MVP)
1. Customer buys on Gumroad
2. You generate token manually: `VAULT-` + 6 random chars
3. Send it in a manual follow-up email
4. Customer enters it in the portal

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | From console.anthropic.com |
| `PORT` | Optional | Defaults to 3001 |
| `ALLOWED_ORIGIN` | Recommended | Your frontend domain, e.g. `https://maim.yourdomain.com` |
| `NODE_ENV` | Recommended | Set to `production` |

---

## Upgrading to Production

When you're ready to scale:

1. **Redis for query tracking** — replace the in-memory `queryTracker` Map
   with Redis for persistence across server restarts
2. **JWT tokens** — use the n8n JWT workflow from the Tier-Based Agent
   Access Technical Implementation doc in your project files
3. **Token database** — store issued tokens in a database (Supabase free tier works)
4. **Custom domain** — point your domain at the Render/Railway deployment

---

## Test Your Deployment

```bash
# Health check
curl https://your-api.onrender.com/health

# Test a chat (replace token and message)
curl -X POST https://your-api.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "token": "SCROLL-TEST1",
    "messages": [{"role": "user", "content": "What is Pillar 1?"}],
    "stream": false
  }'
```

---

## Support

- Anthropic API docs: https://docs.claude.com
- Questions: majordream.gumroad.com
