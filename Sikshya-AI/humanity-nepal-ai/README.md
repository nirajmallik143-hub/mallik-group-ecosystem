# 🎓 Humanity Nepal AI

A free educational platform where students and humanity can learn AI and coding to upgrade their lives.

Built on **Cloudflare Workers** + **Workers AI** + **D1 Database**.

## ✨ Features

- **3 Learning Paths**: AI Fundamentals, JavaScript Essentials, Python Basics
- **10 Interactive Lessons** with code examples
- **AI Tutor Chatbot** — 24/7 AI-powered teaching assistant (powered by Workers AI / Llama 3)
- **Progress Tracking** — mark lessons complete, track your learning journey
- **Student Registration** — stored in D1 database
- **Beautiful, Responsive UI** — works on mobile, tablet, and desktop
- **100% Free** — education for everyone

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works!)

### Setup

```bash
# 1. Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Create the D1 database
wrangler d1 create humanity_nepal_ai
# → Copy the database_id from the output

# 4. Update wrangler.toml with your database_id
#    Replace "placeholder-create-database-first" in wrangler.toml

# 5. Initialize the database
wrangler d1 execute humanity_nepal_ai --file=./src/schema.sql

# 6. Run locally
npm run dev
# → Open http://localhost:8787

# 7. Deploy to the world!
npm run deploy
```

## 📁 Project Structure

```
humanity-nepal-ai/
├── src/
│   ├── index.js          # Worker: API routes, AI tutor, course data
│   └── schema.sql        # D1 database schema
├── public/
│   ├── index.html        # Main page
│   ├── css/
│   │   └── styles.css     # All styling
│   └── js/
│       └── app.js        # Frontend logic (courses, chat, progress)
├── wrangler.toml         # Cloudflare Workers config
└── package.json
```

## 🤖 AI Tutor

The AI tutor uses Cloudflare's **Workers AI** with the Llama 3 8B model. It can:
- Explain AI/ML concepts in simple terms
- Teach JavaScript and Python with code examples
- Answer questions about technology careers
- Respond in both English and Nepali

## 🌐 Adding More Courses

Edit `src/index.js` and add new courses to the `COURSES` array:

```javascript
{
  id: "your-course-id",
  title: "Your Course Title",
  icon: "📘",
  description: "Course description",
  lessons: [
    {
      id: "lesson-01",
      title: "Lesson Title",
      duration: "15 min",
      content: `<h2>Lesson Heading</h2><p>Your content here...</p>`,
    },
  ],
}
```

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Cloudflare Workers |
| AI | Workers AI (Llama 3 8B) |
| Database | Cloudflare D1 (SQLite) |
| Frontend | Vanilla HTML/CSS/JS |
| Hosting | Cloudflare's global edge network |

## 📜 License

MIT — Free for everyone, forever.

---

Built with ❤️ for students and humanity. Education is a right, not a privilege.
