# 🎓 Humanity Nepal AI — Open Source Educational Platform

> **Problem + Solve = Success | Think = Do**
> **Organization: MallikGroup** — Free Education for World Students

A complete free, open-source educational platform where students worldwide learn AI, coding, automation, and technology **in their native language** to upgrade their lives.

Built on **Cloudflare Workers** + **Workers AI** + **D1 Database**.

## 🌍 Learn in Your Native Language

The platform supports **30+ languages** with AI-powered real-time translation:

| Flag | Code | Language | Flag | Code | Language |
|------|------|----------|------|------|----------|
| 🇬🇧 | en | English | 🇳🇵 | ne | Nepali |
| 🇮🇳 | hi | Hindi | 🇪🇸 | es | Spanish |
| 🇫🇷 | fr | French | 🇸🇦 | ar | Arabic |
| 🇨🇳 | zh | Chinese | 🇵🇹 | pt | Portuguese |
| 🇧🇩 | bn | Bengali | 🇵🇰 | ur | Urdu |
| 🇮🇩 | id | Indonesian | 🇰🇪 | sw | Swahili |
| 🇷🇺 | ru | Russian | 🇯🇵 | ja | Japanese |
| 🇰🇷 | ko | Korean | 🇹🇷 | tr | Turkish |
| 🇻🇳 | vi | Vietnamese | 🇹🇭 | th | Thai |
| 🇮🇷 | fa | Persian | 🇮🇳 | pa | Punjabi |
| 🇩🇪 | de | German | 🇮🇹 | it | Italian |
| 🇳🇱 | nl | Dutch | 🇵🇱 | pl | Polish |
| 🇲🇲 | my | Burmese | 🇮🇳 | ta | Tamil |
| 🇮🇳 | te | Telugu | 🇮🇳 | mr | Marathi |
| 🇵🇭 | fil | Filipino | 🇪🇹 | am | Amharic |

**How it works:** When a student selects their language, all lesson content is translated in real-time using Workers AI. The AI tutor also responds in the student's selected language.

## ✨ Complete Feature List

### 📚 Learning System
- **10 Courses** with 40+ lessons
- **Interactive Quizzes** with scoring
- **Certificates** on course completion
- **30+ Language Support** with AI translation

### 🧠 Problem-Solve-Success Framework
- Visual 4-step: Problem → Think → Do → Success

### 🎯 Daily Challenges (Think = Do)
- 12 challenges across coding, thinking, and action

### 🗺️ Life Upgrade Roadmap
- 4-phase journey: Foundation → Build → Apply → Grow

### 🤖 AI Tutor
- 24/7 powered by Workers AI (Llama 3)
- Responds in student's native language

### 🏆 Community
- Leaderboard, Project Showcase, Profiles, Points System

### 🛠️ Platform
- Resources Library, Search, Dark Mode, Admin Panel, PWA

## 🚀 Quick Start

```bash
# 1. Clone
git clone <your-repo-url>
cd humanity-nepal-ai

# 2. Install Wrangler
npm install -g wrangler
wrangler login

# 3. Set up environment
cp .env.example .env
# Edit .env with your values

# 4. Create D1 database
wrangler d1 create humanity_nepal_ai
# Copy database_id into wrangler.toml

# 5. Initialize database
wrangler d1 execute humanity_nepal_ai --file=./src/schema.sql

# 6. Set API key as secret
wrangler secret put API_KEY

# 7. Run locally
npm run dev

# 8. Deploy
npm run deploy
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ORG_NAME` | Organization name | `mallikgroup` |
| `API_KEY` | API key (secret) | Set via `wrangler secret put` |
| `DEFAULT_LANGUAGE` | Default language code | `en` |
| `AI_MODEL` | Workers AI model | `@cf/meta/llama-3-8b-instruct` |

## 🌐 Adding a New Language

1. Add to `LANGUAGES` in `src/index.js`:
```javascript
xx: { name: "Language Name", native: "Native Name", flag: "🏳️" },
```
2. The AI translation system handles the rest automatically!

## 🤝 Contributing

This is an open-source project. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT — Free for everyone, forever. See [LICENSE](LICENSE).

---

**Problem + Solve = Success | Think = Do**

Built with ❤️ by **MallikGroup** for world students. Education is a right, not a privilege.
