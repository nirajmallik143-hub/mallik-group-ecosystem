# Contributing to Humanity Nepal AI 🎓

Thank you for your interest in contributing! This is an open-source project built for world students — free education for everyone.

## 🌍 Our Mission

Build a system where students can learn AI, coding, automation, and technology in their **native language** — completely free.

**Problem + Solve = Success | Think = Do**

## How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/humanity-nepal-ai.git
cd humanity-nepal-ai
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Fill in your values

npm install -g wrangler
wrangler login
wrangler d1 create humanity_nepal_ai
wrangler d1 execute humanity_nepal_ai --file=./src/schema.sql
```

### 3. Run Locally

```bash
npm run dev
# Open http://localhost:8787
```

### 4. Make Changes

Pick an area to help:

#### 🌐 Add a Language Translation
1. Add your language code to `LANGUAGES` in `src/index.js`
2. Add UI translations to `i18n` in `public/js/app.js`
3. Test that lessons translate correctly via AI

#### 📚 Add a Course
1. Add course object to `COURSES` array in `src/index.js`
2. Include lessons with `content` (HTML) and `quiz` arrays
3. Test locally

#### 🎯 Add Challenges
1. Add challenge to `DAILY_CHALLENGES` in `src/index.js`
2. Set difficulty and points

#### 🐛 Fix Bugs
1. Check existing issues
2. Create a fix
3. Test thoroughly

### 5. Submit a Pull Request

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: description of your change"
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Supported Languages

We aim to support as many languages as possible. Currently:

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| ne | Nepali | नेपाली |
| hi | Hindi | हिन्दी |
| es | Spanish | Español |
| fr | French | Français |
| ar | Arabic | العربية |
| zh | Chinese | 中文 |
| pt | Portuguese | Português |
| bn | Bengali | বাংলা |
| ur | Urdu | اردو |
| id | Indonesian | Bahasa Indonesia |
| sw | Swahili | Kiswahili |
| ru | Russian | Русский |
| ja | Japanese | 日本語 |
| ko | Korean | 한국어 |
| tr | Turkish | Türkçe |
| vi | Vietnamese | Tiếng Việt |
| th | Thai | ไทย |
| fa | Persian | فارسی |
| pa | Punjabi | ਪੰਜਾਬੀ |

To add a new language, add it to the `LANGUAGES` object in `src/index.js`.

## Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Keep functions small and focused
- Test your changes locally before submitting

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Built with ❤️ by MallikGroup for world students. Free education for everyone.
