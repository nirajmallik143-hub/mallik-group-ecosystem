/* ©Nirajmallik@hub */
/**
 * Humanity Nepal AI — FULL SYSTEM (Open Source)
 * "Problem + Solve = Success | Think = Do"
 * Organization: MallikGroup — Free Education for World Students
 *
 * A complete educational platform where humanity learns:
 * Education, Coding, AI, Automation, and Technology
 * in their NATIVE LANGUAGE — to upgrade their lives and solve real-world problems.
 *
 * 10 Courses | 40+ Lessons | AI Tutor | Quizzes | Certificates
 * Daily Challenges | Problem-Solve Framework | Project Showcase
 * Leaderboard | Resources | Dark Mode | 20+ Languages
 * Multi-language AI Translation | Open Source (MIT)
 */

// ============================================================
//  SUPPORTED LANGUAGES (World Students — Native Language Learning)
// ============================================================

const LANGUAGES = {
  en: { name: "English", native: "English", flag: "🇬🇧" },
  ne: { name: "Nepali", native: "नेपाली", flag: "🇳🇵" },
  hi: { name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  es: { name: "Spanish", native: "Español", flag: "🇪🇸" },
  fr: { name: "French", native: "Français", flag: "🇫🇷" },
  ar: { name: "Arabic", native: "العربية", flag: "🇸🇦" },
  zh: { name: "Chinese", native: "中文", flag: "🇨🇳" },
  pt: { name: "Portuguese", native: "Português", flag: "🇵🇹" },
  bn: { name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  ur: { name: "Urdu", native: "اردو", flag: "🇵🇰" },
  id: { name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  sw: { name: "Swahili", native: "Kiswahili", flag: "🇰🇪" },
  ru: { name: "Russian", native: "Русский", flag: "🇷🇺" },
  ja: { name: "Japanese", native: "日本語", flag: "🇯🇵" },
  ko: { name: "Korean", native: "한국어", flag: "🇰🇷" },
  tr: { name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  vi: { name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  th: { name: "Thai", native: "ไทย", flag: "🇹🇭" },
  fa: { name: "Persian", native: "فارسی", flag: "🇮🇷" },
  pa: { name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  de: { name: "German", native: "Deutsch", flag: "🇩🇪" },
  it: { name: "Italian", native: "Italiano", flag: "🇮🇹" },
  nl: { name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  pl: { name: "Polish", native: "Polski", flag: "🇵🇱" },
  my: { name: "Burmese", native: "မြန်မာ", flag: "🇲🇲" },
  ta: { name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  te: { name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  mr: { name: "Marathi", native: "मराठी", flag: "🇮🇳" },
  fil: { name: "Filipino", native: "Filipino", flag: "🇵🇭" },
  am: { name: "Amharic", native: "አማርኛ", flag: "🇪🇹" },
};

// ============================================================
//  COURSES, LESSONS & QUIZZES (10 Courses, 40+ Lessons)
// ============================================================

const COURSES = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    icon: "🤖",
    color: "#8b5cf6",
    description: "Master Artificial Intelligence, Machine Learning, and build your first AI-powered applications.",
    lessons: [
      {
        id: "ai-01", title: "What is Artificial Intelligence?", duration: "15 min",
        content: `<h2>What is Artificial Intelligence?</h2>
<p>Artificial Intelligence (AI) is the ability of a computer program to learn, reason, and make decisions — similar to how humans think.</p>
<h3>Types of AI</h3>
<ul><li><strong>Narrow AI:</strong> Designed for specific tasks (spam filters, voice assistants)</li>
<li><strong>General AI:</strong> Hypothetical AI that can do any intellectual task a human can</li>
<li><strong>Superintelligence:</strong> AI that surpasses human intelligence</li></ul>
<h3>Why Learn AI?</h3>
<p>AI is transforming every industry — healthcare, education, agriculture, finance, and more. Understanding AI helps you build smarter applications, automate tasks, and create solutions for real-world problems in your community.</p>
<h3>Key Concepts</h3>
<ul><li><strong>Machine Learning:</strong> Teaching computers to learn from data</li>
<li><strong>Deep Learning:</strong> Neural networks with many layers</li>
<li><strong>NLP:</strong> Understanding human language</li>
<li><strong>Computer Vision:</strong> Understanding images and video</li></ul>`,
        quiz: [
          { q: "What type of AI powers Siri and Alexa?", options: ["General AI", "Narrow AI", "Superintelligence", "Reactive AI"], correct: 1 },
          { q: "Which field uses AI to understand human language?", options: ["Computer Vision", "Robotics", "Natural Language Processing", "Blockchain"], correct: 2 },
        ],
      },
      {
        id: "ai-02", title: "How AI Models Learn", duration: "20 min",
        content: `<h2>How AI Models Learn</h2>
<p>AI models learn through a process called <strong>training</strong>.</p>
<h3>The Training Process</h3>
<ol><li><strong>Data Collection:</strong> Gather examples</li>
<li><strong>Feature Extraction:</strong> Identify patterns</li>
<li><strong>Model Training:</strong> Adjust parameters to minimize errors</li>
<li><strong>Evaluation:</strong> Test on unseen data</li>
<li><strong>Deployment:</strong> Use in real applications</li></ol>
<h3>Types of Learning</h3>
<ul><li><strong>Supervised:</strong> Learn from labeled examples</li>
<li><strong>Unsupervised:</strong> Find patterns in unlabeled data</li>
<li><strong>Reinforcement:</strong> Learn through trial and error with rewards</li></ul>`,
        quiz: [
          { q: "What is the process called where AI learns from data?", options: ["Programming", "Training", "Debugging", "Compiling"], correct: 1 },
          { q: "Learning from labeled examples is called?", options: ["Supervised", "Unsupervised", "Reinforcement", "Deep"], correct: 0 },
        ],
      },
      {
        id: "ai-03", title: "Building Your First AI App", duration: "30 min",
        content: `<h2>Building Your First AI App</h2>
<p>Let's build a simple AI-powered text classifier using Cloudflare Workers AI.</p>
<pre><code>const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    messages: [
        { role: "system", content: "Classify sentiment as positive or negative." },
        { role: "user", content: userMessage }
    ]
});
console.log(response.response);</code></pre>
<h3>Deploy</h3>
<p>Deploy to Cloudflare Workers — it runs on the edge, close to your users, anywhere in the world!</p>`,
        quiz: [
          { q: "What does Workers AI allow you to use?", options: ["Pre-trained AI models", "Only custom models", "Hardware GPUs", "Local databases"], correct: 0 },
        ],
      },
      {
        id: "ai-04", title: "Ethics & Future of AI", duration: "20 min",
        content: `<h2>Ethics & Future of AI</h2>
<h3>Key Ethical Concerns</h3>
<ul><li><strong>Bias:</strong> AI can learn unfair patterns from biased data</li>
<li><strong>Privacy:</strong> AI systems use large amounts of personal data</li>
<li><strong>Job Displacement:</strong> Automation may replace some jobs</li>
<li><strong>Misinformation:</strong> AI can generate convincing fake content</li></ul>
<h3>The Future</h3>
<p>AI will continue to grow. The best way to prepare is to understand it and use it for good — to help people, protect the environment, and build a better society.</p>`,
        quiz: [
          { q: "Which is an important ethical concern in AI?", options: ["Bias", "Speed", "Color", "Size"], correct: 0 },
        ],
      },
    ],
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    icon: "⚡",
    color: "#f59e0b",
    description: "Learn the language of the web — from basics to building interactive applications.",
    lessons: [
      {
        id: "js-01", title: "Introduction to JavaScript", duration: "15 min",
        content: `<h2>Introduction to JavaScript</h2>
<p>JavaScript is the programming language of the web. It runs in every browser and powers interactive websites, web apps, servers, and more.</p>
<pre><code>console.log("Hello, Nepal! 🇳🇵");
let name = "Student";
const country = "Nepal";
function greet(person) {
    return "Welcome, " + person + "!";
}
console.log(greet(name));</code></pre>`,
        quiz: [
          { q: "Where does JavaScript run?", options: ["Only on servers", "In browsers and servers", "Only on phones", "Only in databases"], correct: 1 },
        ],
      },
      {
        id: "js-02", title: "Variables, Types, and Operators", duration: "20 min",
        content: `<h2>Variables, Types, and Operators</h2>
<pre><code>let age = 25;
const PI = 3.14159;
let greeting = "Namaste!";
let isStudent = true;
let colors = ["red", "green", "blue"];
let student = { name: "Aarav", age: 20 };</code></pre>
<h3>Operators</h3>
<pre><code>let sum = 10 + 5;
let isEqual = (5 === 5);
let canEnroll = isStudent && (age >= 18);</code></pre>`,
        quiz: [
          { q: "Which keyword declares a constant variable?", options: ["let", "var", "const", "static"], correct: 2 },
          { q: "What is the result of 10 % 3?", options: ["1", "3", "0", "10"], correct: 0 },
        ],
      },
      {
        id: "js-03", title: "Functions and Control Flow", duration: "25 min",
        content: `<h2>Functions and Control Flow</h2>
<pre><code>function calculateGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    return "F";
}
const add = (a, b) => a + b;
for (let i = 1; i <= 5; i++) {
    console.log("Lesson " + i);
}</code></pre>`,
        quiz: [
          { q: "What is the output of calculateGrade(85)?", options: ["A", "B", "C", "F"], correct: 1 },
        ],
      },
      {
        id: "js-04", title: "Working with the DOM", duration: "30 min",
        content: `<h2>Working with the DOM</h2>
<pre><code>let title = document.getElementById("title");
title.textContent = "Welcome!";
title.style.color = "#2563eb";
button.addEventListener("click", function() {
    alert("You're enrolled!");
});</code></pre>`,
        quiz: [
          { q: "Which method selects an element by ID?", options: ["querySelectorAll", "getElementById", "getElementsByClassName", "findElement"], correct: 1 },
        ],
      },
    ],
  },
  {
    id: "python-basics",
    title: "Python Basics",
    icon: "🐍",
    color: "#10b981",
    description: "Python is the most popular language for AI, data science, and automation.",
    lessons: [
      {
        id: "py-01", title: "Getting Started with Python", duration: "15 min",
        content: `<h2>Getting Started with Python</h2>
<pre><code>print("Namaste, Nepal! 🇳🇵")
name = "Student"
age = 20
is_enrolled = True
print(f"My name is {name} and I am {age} years old.")</code></pre>
<h3>Why Python for AI?</h3>
<ul><li>Simple, readable syntax</li>
<li>Massive ecosystem: NumPy, Pandas, TensorFlow, PyTorch</li>
<li>Most AI/ML libraries are Python-first</li></ul>`,
        quiz: [
          { q: "Which function prints output in Python?", options: ["echo", "print", "console.log", "write"], correct: 1 },
        ],
      },
      {
        id: "py-02", title: "Data Structures in Python", duration: "25 min",
        content: `<h2>Data Structures in Python</h2>
<pre><code>fruits = ["apple", "banana", "mango"]
fruits.append("orange")
student = {"name": "Aarav", "course": "AI", "progress": 75}
squares = [x**2 for x in range(10)]</code></pre>`,
        quiz: [
          { q: "Which data structure uses key-value pairs?", options: ["List", "Tuple", "Dictionary", "Set"], correct: 2 },
        ],
      },
      {
        id: "py-03", title: "Functions and Modules", duration: "20 min",
        content: `<h2>Functions and Modules</h2>
<pre><code>def greet(name, greeting="Namaste"):
    return f"{greeting}, {name}!"
import math
import random
lucky = random.randint(1, 100)</code></pre>`,
        quiz: [
          { q: "How do you import a module in Python?", options: ["include", "require", "import", "using"], correct: 2 },
        ],
      },
      {
        id: "py-04", title: "Python for AI & Data", duration: "30 min",
        content: `<h2>Python for AI & Data</h2>
<pre><code>import pandas as pd
data = {"name": ["Aarav", "Sita", "Rohan"], "score": [85, 92, 78]}
df = pd.DataFrame(data)
print(df.describe())</code></pre>
<p>Python's libraries make it the top choice for AI, machine learning, and data analysis.</p>`,
        quiz: [
          { q: "Which Python library is used for data analysis?", options: ["NumPy", "Pandas", "TensorFlow", "All of the above"], correct: 3 },
        ],
      },
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: "🌐",
    color: "#2563eb",
    description: "Build beautiful, responsive websites with HTML, CSS, and modern web technologies.",
    lessons: [
      {
        id: "web-01", title: "HTML5 Fundamentals", duration: "20 min",
        content: `<h2>HTML5 Fundamentals</h2>
<p>HTML is the skeleton of every webpage.</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;My First Page&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;p&gt;Welcome to my website.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>`,
        quiz: [
          { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Machine Learning", "Home Tool Markup Language"], correct: 0 },
        ],
      },
      {
        id: "web-02", title: "CSS Styling & Layout", duration: "25 min",
        content: `<h2>CSS Styling & Layout</h2>
<pre><code>body { font-family: 'Inter', sans-serif; background: #f8fafc; }
.card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }</code></pre>`,
        quiz: [
          { q: "Which CSS property changes text color?", options: ["text-color", "font-color", "color", "foreground"], correct: 2 },
        ],
      },
      {
        id: "web-03", title: "Responsive Design", duration: "25 min",
        content: `<h2>Responsive Design</h2>
<pre><code>.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}
@media (max-width: 600px) {
    .container { grid-template-columns: 1fr; }
}</code></pre>`,
        quiz: [
          { q: "What makes a website adapt to different screen sizes?", options: ["JavaScript", "Responsive Design", "HTML5", "Python"], correct: 1 },
        ],
      },
    ],
  },
  {
    id: "automation-no-code",
    title: "Automation & No-Code",
    icon: "⚙️",
    color: "#6366f1",
    description: "Learn to automate tasks and build tools without writing code. Save time, multiply your impact.",
    lessons: [
      {
        id: "auto-01", title: "What is Automation?", duration: "15 min",
        content: `<h2>What is Automation?</h2>
<p>Automation is using technology to perform tasks with minimal human intervention. It saves time, reduces errors, and lets you focus on what matters.</p>
<h3>What Can You Automate?</h3>
<ul>
<li>📧 Email responses and follow-ups</li>
<li>📅 Scheduling and reminders</li>
<li>📊 Data entry and report generation</li>
<li>📱 Social media posting</li>
<li>🗂️ File organization and backups</li>
<li>🛒 Order processing for businesses</li>
</ul>
<h3>The Power of Automation</h3>
<p>If you do a task more than twice, automate it. This is the key principle: <strong>Think about the problem → Solve it with automation → Achieve success.</strong></p>`,
        quiz: [
          { q: "What is the main benefit of automation?", options: ["Saves time and reduces errors", "Makes things slower", "Requires more staff", "Increases costs"], correct: 0 },
          { q: "When should you automate a task?", options: ["Never", "If you do it more than twice", "Only for big companies", "Only with coding"], correct: 1 },
        ],
      },
      {
        id: "auto-02", title: "No-Code Tools Overview", duration: "20 min",
        content: `<h2>No-Code Tools Overview</h2>
<p>No-code tools let you build apps, websites, and automations without writing code.</p>
<h3>Popular No-Code Tools</h3>
<ul>
<li><strong>Zapier / Make:</strong> Connect apps and automate workflows</li>
<li><strong>Airtable:</strong> Database + automation in one</li>
<li><strong>Bubble:</strong> Build full web apps visually</li>
<li><strong>Notion:</strong> Notes, databases, and project management</li>
<li><strong>Cloudflare Workers:</strong> Deploy code with minimal setup</li>
</ul>
<h3>Real-World Example</h3>
<pre><code>// Problem: Manually sending welcome emails to new students
// Solution: Automate it!

// Using Zapier or Make:
// Trigger: New student registers
// Action: Send welcome email + add to newsletter
// Result: 100% automated, zero manual work</code></pre>`,
        quiz: [
          { q: "Which tool connects different apps for automation?", options: ["Zapier", "Photoshop", "Excel", "Word"], correct: 0 },
        ],
      },
      {
        id: "auto-03", title: "Building Your First Automation", duration: "30 min",
        content: `<h2>Building Your First Automation</h2>
<p>Let's automate a simple task: sending a daily reminder.</p>
<h3>Using Cloudflare Workers (Cron Triggers)</h3>
<pre><code>// wrangler.toml
[triggers]
crons = ["0 9 * * *"]  // Run at 9 AM daily

// src/index.js
export default {
  async scheduled(event, env) {
    // Send daily learning reminder
    await sendReminderEmail();
  }
};</code></pre>
<h3>Steps to Automate Anything</h3>
<ol>
<li><strong>Identify the problem:</strong> What task is repetitive?</li>
<li><strong>Define the solution:</strong> What should happen automatically?</li>
<li><strong>Choose a tool:</strong> No-code or code-based</li>
<li><strong>Build & test:</strong> Set it up and verify</li>
<li><strong>Deploy & monitor:</strong> Let it run, check periodically</li>
</ol>
<p><strong>Problem + Solve = Success</strong></p>`,
        quiz: [
          { q: "What triggers a Cloudflare Worker cron?", options: ["A button click", "A schedule", "An email", "A file upload"], correct: 1 },
        ],
      },
      {
        id: "auto-04", title: "AI-Powered Automation", duration: "25 min",
        content: `<h2>AI-Powered Automation</h2>
<p>Combine AI with automation for powerful results.</p>
<h3>Examples</h3>
<ul>
<li>🤖 AI chatbot that answers customer questions 24/7</li>
<li>📧 AI that summarizes long emails automatically</li>
<li>📝 AI that generates reports from raw data</li>
<li>🌍 AI that translates content into multiple languages</li>
<li>🔍 AI that categorizes and tags documents</li>
</ul>
<h3>Build an AI Automation with Workers</h3>
<pre><code>export default {
  async fetch(request, env) {
    const question = await request.text();
    const aiResponse = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question }
      ]
    });
    return new Response(aiResponse.response);
  }
};</code></pre>
<p>This is how you turn <strong>Think → Do</strong>: you think of a problem, you build the solution, and it runs automatically.</p>`,
        quiz: [
          { q: "What can AI-powered automation do?", options: ["Answer questions 24/7", "Summarize emails", "Generate reports", "All of the above"], correct: 3 },
        ],
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Science Basics",
    icon: "📊",
    color: "#06b6d4",
    description: "Learn to analyze data, create visualizations, and make data-driven decisions.",
    lessons: [
      {
        id: "ds-01", title: "Introduction to Data Science", duration: "20 min",
        content: `<h2>Introduction to Data Science</h2>
<p>Data Science is the practice of extracting knowledge and insights from data using statistics, programming, and domain expertise.</p>
<h3>The Data Science Process</h3>
<ol><li><strong>Collect:</strong> Gather data from sources</li>
<li><strong>Clean:</strong> Remove errors and inconsistencies</li>
<li><strong>Analyze:</strong> Find patterns and trends</li>
<li><strong>Visualize:</strong> Create charts and graphs</li>
<li><strong>Decide:</strong> Make informed decisions</li></ol>
<h3>Why Data Science Matters</h3>
<p>Every business, government, and organization has data. Those who can understand it have a huge advantage. Data-driven decisions lead to <strong>success</strong>.</p>`,
        quiz: [
          { q: "What is the first step in data science?", options: ["Visualize", "Collect data", "Decide", "Clean"], correct: 1 },
        ],
      },
      {
        id: "ds-02", title: "Data Analysis with Python", duration: "30 min",
        content: `<h2>Data Analysis with Python</h2>
<pre><code>import pandas as pd

# Load data
df = pd.read_csv("students.csv")

# Explore
print(df.head())
print(df.describe())

# Filter
top_students = df[df["score"] > 90]

# Group and aggregate
by_country = df.groupby("country")["score"].mean()
print(by_country)</code></pre>
<p>With just a few lines of Python, you can analyze thousands of records and find insights that would take days manually.</p>`,
        quiz: [
          { q: "Which Python library is essential for data analysis?", options: ["Pandas", "Flask", "Django", "Requests"], correct: 0 },
        ],
      },
      {
        id: "ds-03", title: "Data Visualization", duration: "25 min",
        content: `<h2>Data Visualization</h2>
<p>Visualizations make data easy to understand.</p>
<pre><code>import matplotlib.pyplot as plt

# Bar chart
plt.bar(["AI", "JS", "Python"], [85, 72, 90])
plt.title("Course Completion Rates")
plt.ylabel("Percentage")
plt.show()

# Line chart
plt.plot(months, revenue)
plt.title("Monthly Revenue")
plt.show()</code></pre>
<h3>Types of Charts</h3>
<ul><li><strong>Bar charts:</strong> Compare categories</li>
<li><strong>Line charts:</strong> Show trends over time</li>
<li><strong>Pie charts:</strong> Show proportions</li>
<li><strong>Scatter plots:</strong> Show relationships</li></ul>`,
        quiz: [
          { q: "Which chart is best for showing trends over time?", options: ["Bar chart", "Line chart", "Pie chart", "Scatter plot"], correct: 1 },
        ],
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Basics",
    icon: "🔒",
    color: "#ef4444",
    description: "Protect yourself and others online. Learn security fundamentals for the digital age.",
    lessons: [
      {
        id: "sec-01", title: "Online Safety Fundamentals", duration: "20 min",
        content: `<h2>Online Safety Fundamentals</h2>
<p>In the digital age, cybersecurity is everyone's responsibility.</p>
<h3>Essential Security Practices</h3>
<ul>
<li><strong>Strong passwords:</strong> Use 12+ characters, mix letters, numbers, symbols</li>
<li><strong>Two-factor authentication (2FA):</strong> Add a second layer of security</li>
<li><strong>Be cautious of phishing:</strong> Don't click suspicious links</li>
<li><strong>Keep software updated:</strong> Updates fix security holes</li>
<li><strong>Use HTTPS:</strong> Look for the lock icon in your browser</li>
</ul>
<h3>Common Threats</h3>
<ul><li><strong>Phishing:</strong> Fake emails trying to steal your info</li>
<li><strong>Malware:</strong> Malicious software</li>
<li><strong>Ransomware:</strong> Locks your files for ransom</li>
<li><strong>Identity theft:</strong> Someone steals your personal info</li></ul>`,
        quiz: [
          { q: "What is phishing?", options: ["A type of fish", "Fake emails to steal info", "A password manager", "A security tool"], correct: 1 },
          { q: "What does 2FA stand for?", options: ["Two-Factor Authentication", "Two-File Access", "Two-Form Application", "Two-Function Algorithm"], correct: 0 },
        ],
      },
      {
        id: "sec-02", title: "Protecting Your Data", duration: "25 min",
        content: `<h2>Protecting Your Data</h2>
<h3>Data Protection Tips</h3>
<ul>
<li>Back up important files regularly</li>
<li>Use encrypted connections (VPN, HTTPS)</li>
<li>Don't share personal info on public WiFi</li>
<li>Use a password manager</li>
<li>Review app permissions on your phone</li>
</ul>
<h3>For Developers</h3>
<pre><code>// Never store passwords in plain text
// Use bcrypt or argon2 for hashing
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

// Validate all user input
// Use parameterized queries to prevent SQL injection
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))</code></pre>`,
        quiz: [
          { q: "How should passwords be stored?", options: ["Plain text", "Hashed with bcrypt", "In a CSV file", "In cookies"], correct: 1 },
        ],
      },
      {
        id: "sec-03", title: "Building Secure Apps", duration: "25 min",
        content: `<h2>Building Secure Apps</h2>
<h3>Security Checklist for Developers</h3>
<ul>
<li>✅ Validate and sanitize all input</li>
<li>✅ Use HTTPS everywhere</li>
<li>✅ Hash passwords (never store plain text)</li>
<li>✅ Use parameterized queries</li>
<li>✅ Implement rate limiting</li>
<li>✅ Set secure HTTP headers</li>
<li>✅ Keep dependencies updated</li>
<li>✅ Use Cloudflare for DDoS protection</li>
</ul>
<p>Security is not an afterthought — build it in from the start. <strong>Think security → Do security → Success.</strong></p>`,
        quiz: [
          { q: "What prevents SQL injection?", options: ["Parameterized queries", "Longer passwords", "More RAM", "Faster CPU"], correct: 0 },
        ],
      },
    ],
  },
  {
    id: "problem-solving",
    title: "Problem Solving & Logic",
    icon: "💡",
    color: "#f97316",
    description: "Master the art of breaking down problems and building solutions. The core skill for success.",
    lessons: [
      {
        id: "ps-01", title: "The Problem-Solve-Success Framework", duration: "20 min",
        content: `<h2>The Problem-Solve-Success Framework</h2>
<p>This is the core philosophy of Humanity Nepal AI: <strong>Problem + Solve = Success</strong></p>
<h3>Step 1: Identify the Problem</h3>
<p>Every great solution starts with a clearly defined problem.</p>
<ul>
<li>What exactly is the problem?</li>
<li>Who is affected by it?</li>
<li>Why does it matter?</li>
<li>What happens if it's not solved?</li>
</ul>
<h3>Step 2: Think (Think = Do)</h3>
<p>Before you act, think deeply about the solution.</p>
<ul>
<li>What are possible solutions?</li>
<li>What tools do I need?</li>
<li>What's the simplest approach?</li>
<li>What could go wrong?</li>
</ul>
<h3>Step 3: Solve (Take Action)</h3>
<p>Thinking without action is useless. <strong>Think = Do</strong>.</p>
<ul>
<li>Break the solution into small steps</li>
<li>Start with the simplest version</li>
<li>Test and iterate</li>
<li>Get feedback and improve</li>
</ul>
<h3>Step 4: Success</h3>
<p>When you solve a real problem, you create value — for yourself and others. That's success.</p>
<div style="background: var(--bg-secondary); padding: 20px; border-radius: 12px; border-left: 4px solid var(--primary); margin: 16px 0;">
<p style="margin:0; font-size:1.1rem; font-weight:600;">💡 Remember: Problem + Solve = Success | Think = Do</p>
</div>`,
        quiz: [
          { q: "What is the first step in the framework?", options: ["Solve", "Identify the problem", "Success", "Think"], correct: 1 },
          { q: "What does 'Think = Do' mean?", options: ["Think only, don't act", "Thinking leads to action", "Don't think, just do", "Thinking is doing"], correct: 1 },
        ],
      },
      {
        id: "ps-02", title: "Breaking Down Problems", duration: "25 min",
        content: `<h2>Breaking Down Problems</h2>
<p>The key to solving any big problem is to break it into smaller, manageable pieces.</p>
<h3>The Decomposition Method</h3>
<p><strong>Example: Build a website for a local business</strong></p>
<ol>
<li>📝 Gather requirements (what pages, what content)</li>
<li>🎨 Design the layout (HTML/CSS)</li>
<li>⚙️ Add functionality (JavaScript)</li>
<li>🌐 Deploy it (Cloudflare Pages)</li>
<li>🔄 Get feedback and improve</li>
</ol>
<p>Each step is small and achievable. Complete one step at a time.</p>
<h3>Pseudocode: Think Before You Code</h3>
<pre><code>// Problem: Check if a student passes
// Think:
// 1. Get the student's score
// 2. Compare with passing mark (40)
// 3. If score >= 40, they pass
// 4. Otherwise, they need to retake

// Do:
function checkPass(score) {
    if (score >= 40) {
        return "Passed! 🎉";
    } else {
        return "Keep studying! 📚";
    }
}</code></pre>`,
        quiz: [
          { q: "What is the best way to handle a big problem?", options: ["Give up", "Break it into smaller pieces", "Do it all at once", "Ignore it"], correct: 1 },
        ],
      },
      {
        id: "ps-03", title: "Real-World Problem Solving", duration: "30 min",
        content: `<h2>Real-World Problem Solving</h2>
<h3>Case Study: Automating School Attendance</h3>
<p><strong>Problem:</strong> A school in Nepal takes 30 minutes daily to manually record attendance for 500 students.</p>
<p><strong>Think:</strong> What if we use technology to automate this?</p>
<p><strong>Solve:</strong></p>
<ol>
<li>Build a simple web app where teachers mark attendance</li>
<li>Store data in a database (D1)</li>
<li>Generate reports automatically</li>
<li>Send alerts to parents of absent students</li>
</ol>
<p><strong>Result:</strong> Attendance takes 2 minutes instead of 30. Teachers save 28 minutes daily. <strong>Success!</strong></p>
<h3>Your Turn</h3>
<p>Think of a problem in your community. Apply the framework:</p>
<ul>
<li>What's the <strong>problem</strong>?</li>
<li>How can you <strong>solve</strong> it with technology?</li>
<li>What's the first <strong>step</strong> you'll take today?</li>
</ul>
<p><strong>Problem + Solve = Success | Think = Do</strong></p>`,
        quiz: [
          { q: "What's the key to solving real-world problems?", options: ["Money", "Breaking it down and taking action", "Luck", "Waiting"], correct: 1 },
        ],
      },
      {
        id: "ps-04", title: "Logic & Algorithmic Thinking", duration: "25 min",
        content: `<h2>Logic & Algorithmic Thinking</h2>
<p>Algorithms are step-by-step instructions for solving problems. You use them every day.</p>
<h3>Everyday Algorithm Example</h3>
<pre><code>// Algorithm: Make tea
1. Boil water
2. Put tea leaves in cup
3. Pour hot water into cup
4. Wait 3 minutes
5. Add sugar/milk if desired
6. Stir and enjoy</code></pre>
<h3>Programming Logic</h3>
<pre><code>// Find the largest number in a list
function findLargest(numbers) {
    let largest = numbers[0];
    for (let num of numbers) {
        if (num > largest) {
            largest = num;
        }
    }
    return largest;
}
console.log(findLargest([3, 7, 2, 9, 1])); // 9</code></pre>
<h3>Key Logic Concepts</h3>
<ul><li><strong>Sequencing:</strong> Do steps in order</li>
<li><strong>Selection:</strong> Make choices (if/else)</li>
<li><strong>Iteration:</strong> Repeat (loops)</li>
<li><strong>Decomposition:</strong> Break into parts</li>
<li><strong>Pattern recognition:</strong> Find similarities</li></ul>`,
        quiz: [
          { q: "What is an algorithm?", options: ["A type of computer", "Step-by-step instructions", "A programming language", "A type of data"], correct: 1 },
        ],
      },
    ],
  },
  {
    id: "career-tech",
    title: "Tech Career Guide",
    icon: "🚀",
    color: "#ec4899",
    description: "Build your career in technology — freelancing, remote jobs, startups, and continuous learning.",
    lessons: [
      {
        id: "career-01", title: "Building a Portfolio", duration: "20 min",
        content: `<h2>Building a Portfolio</h2>
<h3>Portfolio Tips</h3>
<ul><li>Show 3-5 strong projects</li>
<li>Include project descriptions and your role</li>
<li>Host projects on GitHub and Cloudflare Pages</li>
<li>Write blog posts explaining what you learned</li></ul>`,
        quiz: [
          { q: "How many strong projects should a beginner portfolio show?", options: ["1", "3-5", "20", "50"], correct: 1 },
        ],
      },
      {
        id: "career-02", title: "Freelancing & Remote Work", duration: "25 min",
        content: `<h2>Freelancing & Remote Work</h2>
<h3>Getting Started</h3>
<ul><li>Choose a skill (web dev, AI, design, writing)</li>
<li>Create profiles on Upwork, Fiverr, LinkedIn</li>
<li>Start with small projects to build reviews</li>
<li>Deliver quality work on time</li></ul>
<p>Technology skills can earn you income from anywhere in the world. <strong>Think about your skills → Do the work → Achieve success.</strong></p>`,
        quiz: [
          { q: "Which platform is popular for freelancers?", options: ["Upwork", "Netflix", "Spotify", "Amazon"], correct: 0 },
        ],
      },
      {
        id: "career-03", title: "Continuous Learning", duration: "15 min",
        content: `<h2>Continuous Learning</h2>
<h3>Tips</h3>
<ul><li>Build projects, not just watch tutorials</li>
<li>Join tech communities</li>
<li>Contribute to open source</li>
<li>Teach what you learn to others</li></ul>
<p>The technology field changes fast. Those who keep learning will always succeed. <strong>Think about what to learn → Do learn it → Success follows.</strong></p>`,
        quiz: [
          { q: "What is the best way to learn coding?", options: ["Only reading books", "Building projects", "Memorizing syntax", "Watching videos only"], correct: 1 },
        ],
      },
    ],
  },
];

// ============================================================
//  DAILY CHALLENGES (Think = Do)
// ============================================================

const DAILY_CHALLENGES = [
  { id: "dc1", title: "Write Your First Line of Code", description: "Open your browser console and type: console.log('Hello, World!')", difficulty: "Easy", points: 10, type: "code" },
  { id: "dc2", title: "Identify a Problem in Your Community", description: "Write down one problem you see daily that technology could solve.", difficulty: "Easy", points: 10, type: "think" },
  { id: "dc3", title: "Create a Variable", description: "Create a variable with your name and print it using JavaScript or Python.", difficulty: "Easy", points: 10, type: "code" },
  { id: "dc4", title: "Write a Function", description: "Write a function that takes a name and returns a greeting message.", difficulty: "Medium", points: 20, type: "code" },
  { id: "dc5", title: "Automate One Task", description: "Pick one repetitive task you do daily and think about how to automate it.", difficulty: "Medium", points: 20, type: "think" },
  { id: "dc6", title: "Build a Simple Webpage", description: "Create an HTML page with a heading and paragraph about yourself.", difficulty: "Medium", points: 20, type: "code" },
  { id: "dc7", title: "Ask the AI Tutor a Question", description: "Use the AI tutor to ask a question about something you want to learn.", difficulty: "Easy", points: 10, type: "action" },
  { id: "dc8", title: "Complete a Quiz", description: "Complete any lesson quiz with a score of 60% or higher.", difficulty: "Medium", points: 20, type: "action" },
  { id: "dc9", title: "Design a Solution", description: "Pick a problem and write a 3-step plan to solve it using technology.", difficulty: "Hard", points: 30, type: "think" },
  { id: "dc10", title: "Share Your Knowledge", description: "Explain one thing you learned today to a friend or family member.", difficulty: "Easy", points: 10, type: "action" },
  { id: "dc11", title: "Write a Loop", description: "Write a loop that prints numbers 1 to 10 in JavaScript or Python.", difficulty: "Easy", points: 10, type: "code" },
  { id: "dc12", title: "Research a Tech Career", description: "Research one tech career path and write 3 things you need to learn.", difficulty: "Medium", points: 20, type: "think" },
];

// ============================================================
//  RESOURCES LIBRARY
// ============================================================

const RESOURCES = [
  { id: "r1", title: "Free Code Camp", url: "https://www.freecodecamp.org", category: "Coding", icon: "💻", description: "Free coding courses with certifications" },
  { id: "r2", title: "MDN Web Docs", url: "https://developer.mozilla.org", category: "Web Dev", icon: "📚", description: "The ultimate web development reference" },
  { id: "r3", title: "Cloudflare Docs", url: "https://developers.cloudflare.com", category: "Cloudflare", icon: "☁️", description: "Official Cloudflare documentation" },
  { id: "r4", title: "Python.org", url: "https://www.python.org", category: "Python", icon: "🐍", description: "Official Python documentation and tutorials" },
  { id: "r5", title: "Khan Academy", url: "https://www.khanacademy.org", category: "Education", icon: "🎓", description: "Free world-class education for anyone, anywhere" },
  { id: "r6", title: "GitHub", url: "https://github.com", category: "Tools", icon: "🐙", description: "Host your code and collaborate with others" },
  { id: "r7", title: "Stack Overflow", url: "https://stackoverflow.com", category: "Coding", icon: "💬", description: "Get answers to your programming questions" },
  { id: "r8", title: "W3Schools", url: "https://www.w3schools.com", category: "Web Dev", icon: "🌐", description: "Free web development tutorials and references" },
  { id: "r9", title: "Coursera", url: "https://www.coursera.org", category: "Education", icon: "📖", description: "Free and paid courses from top universities" },
  { id: "r10", title: "Zapier", url: "https://zapier.com", category: "Automation", icon: "⚙️", description: "Automate tasks without coding" },
  { id: "r11", title: "Notion", url: "https://notion.so", category: "Tools", icon: "📝", description: "Organize your notes, tasks, and projects" },
  { id: "r12", title: "Replit", url: "https://replit.com", category: "Coding", icon: "🔄", description: "Code in your browser, no setup needed" },
];

// ============================================================
//  LIFE UPGRADE ROADMAP
// ============================================================

const ROADMAP = [
  { phase: "Phase 1: Foundation", icon: "🌱", color: "#10b981", items: ["Learn basic coding (JavaScript or Python)", "Complete 3 lessons on this platform", "Ask the AI tutor 5 questions", "Complete your first quiz"], duration: "Week 1-2" },
  { phase: "Phase 2: Build Skills", icon: "🌿", color: "#2563eb", items: ["Complete a full course", "Build your first webpage", "Learn about automation", "Complete 5 daily challenges"], duration: "Week 3-4" },
  { phase: "Phase 3: Apply Knowledge", icon: "🌳", color: "#8b5cf6", items: ["Identify a real problem in your community", "Design a solution using technology", "Build a small project to solve it", "Earn your first certificate"], duration: "Week 5-8" },
  { phase: "Phase 4: Grow & Share", icon: "🚀", color: "#f59e0b", items: ["Create a portfolio of projects", "Start freelancing or apply for jobs", "Teach others what you learned", "Continue learning new technologies"], duration: "Week 9+" },
];

// ============================================================
//  DATABASE SCHEMA
// ============================================================

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    country TEXT DEFAULT 'Nepal',
    points INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS progress (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    completed_at TEXT,
    UNIQUE(student_id, lesson_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS quiz_results (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    answers TEXT,
    completed_at TEXT DEFAULT (datetime('now')),
    UNIQUE(student_id, lesson_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS chat_history (
    id TEXT PRIMARY KEY,
    student_id TEXT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS newsletter (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS challenge_completions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    challenge_id TEXT NOT NULL,
    completed_at TEXT DEFAULT (datetime('now')),
    UNIQUE(student_id, challenge_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    problem TEXT,
    solution TEXT,
    tech_stack TEXT,
    url TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE INDEX IF NOT EXISTS idx_progress_student ON progress(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_student ON quiz_results(student_id);
CREATE INDEX IF NOT EXISTS idx_challenge_student ON challenge_completions(student_id);
CREATE INDEX IF NOT EXISTS idx_projects_student ON projects(student_id);
`;

// ============================================================
//  HELPERS
// ============================================================

function generateId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

async function initDatabase(env) {
  if (!env.DB) return;
  try { await env.DB.exec(SCHEMA_SQL); } catch (e) {}
}

function getLessonById(lessonId) {
  for (const course of COURSES) {
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (lesson) return { course, lesson };
  }
  return null;
}

// ============================================================
//  API ROUTES
// ============================================================

async function handleApi(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // GET /api/courses
  if (path === '/courses' && method === 'GET') {
    const courseList = COURSES.map(c => ({
      id: c.id, title: c.title, icon: c.icon, color: c.color, description: c.description,
      lessonCount: c.lessons.length,
      lessons: c.lessons.map(l => ({ id: l.id, title: l.title, duration: l.duration, hasQuiz: !!l.quiz && l.quiz.length > 0 })),
    }));
    return jsonResponse({ courses: courseList });
  }

  // GET /api/courses/:courseId/lessons/:lessonId
  const lessonMatch = path.match(/^\/courses\/([^\/]+)\/lessons\/([^\/]+)$/);
  if (lessonMatch && method === 'GET') {
    const course = COURSES.find(c => c.id === lessonMatch[1]);
    if (!course) return jsonResponse({ error: 'Course not found' }, 404);
    const lesson = course.lessons.find(l => l.id === lessonMatch[2]);
    if (!lesson) return jsonResponse({ error: 'Lesson not found' }, 404);
    return jsonResponse({ course: { id: course.id, title: course.title, icon: course.icon, color: course.color }, ...lesson });
  }

  // GET /api/languages — list all supported languages
  if (path === '/languages' && method === 'GET') {
    return jsonResponse({ languages: LANGUAGES });
  }

  // POST /api/translate — translate lesson content to student's native language
  if (path === '/translate' && method === 'POST') {
    try {
      const body = await request.json();
      const { text, targetLang, sourceLang } = body;
      if (!text || !targetLang) return jsonResponse({ error: 'text and targetLang are required' }, 400);

      const langInfo = LANGUAGES[targetLang];
      if (!langInfo) return jsonResponse({ error: 'Unsupported language' }, 400);

      // If target is English, no translation needed
      if (targetLang === 'en') return jsonResponse({ translated: text, language: 'en' });

      let translated;
      if (env.AI) {
        const prompt = `Translate the following educational content into ${langInfo.native} (${langInfo.name}). Keep all HTML tags intact. Keep code blocks in English (do not translate code). Translate only the explanatory text. Keep it natural and easy to understand for a beginner student.\n\nContent to translate:\n${text}`;
        const result = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [
            { role: 'system', content: 'You are a professional translator for educational content. Translate accurately while keeping HTML structure and code blocks unchanged.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 2000,
        });
        translated = result.response || text;
      } else {
        translated = text; // Fallback: return original if AI not configured
      }

      return jsonResponse({ translated, language: targetLang, languageName: langInfo.name });
    } catch (error) {
      return jsonResponse({ error: 'Translation failed: ' + error.message }, 500);
    }
  }

  // POST /api/chat — AI Tutor (multi-language)
  if (path === '/chat' && method === 'POST') {
    try {
      const body = await request.json();
      const userMessage = body.message || '';
      const studentName = body.studentName || 'student';
      const lang = body.language || 'en';
      const langInfo = LANGUAGES[lang] || LANGUAGES.en;
      if (!userMessage) return jsonResponse({ error: 'Message is required' }, 400);

      const langInstruction = lang === 'en'
        ? 'Respond in English.'
        : `Respond in ${langInfo.native} (${langInfo.name}). If the student writes in another language, still respond in ${langInfo.name} unless they specifically ask for English.`;

      const systemPrompt = `You are an AI tutor on the "Humanity Nepal AI" educational platform by MallikGroup.
Your role is to help students learn AI, coding (JavaScript, Python), web development, automation, data science, cybersecurity, and technology careers.
You are friendly, encouraging, and explain concepts simply for beginners.
The student's name is ${studentName}. Address them by name when appropriate.
Keep responses concise but informative. Use code examples when teaching coding (keep code in English).
The platform's philosophy is "Problem + Solve = Success | Think = Do" — encourage students to identify problems, think of solutions, and take action.
If the student asks something unrelated to learning, gently guide them back to education.
${langInstruction}
Always be supportive and empowering. Remind students that learning technology can upgrade their lives.`;

      let aiResponse;
      if (env.AI) {
        const result = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 600,
        });
        aiResponse = result.response || 'I apologize, I could not generate a response. Please try again.';
      } else {
        aiResponse = `Hello ${studentName}! I'm your AI tutor. The AI service is not yet configured. Please ensure Workers AI is enabled in the wrangler.toml file.`;
      }

      if (env.DB) {
        try {
          await env.DB.prepare('INSERT INTO chat_history (id, student_id, role, content) VALUES (?, ?, ?, ?)').bind(generateId(), body.studentId || 'anonymous', 'user', userMessage).run();
          await env.DB.prepare('INSERT INTO chat_history (id, student_id, role, content) VALUES (?, ?, ?, ?)').bind(generateId(), body.studentId || 'anonymous', 'assistant', aiResponse).run();
        } catch (e) {}
      }
      return jsonResponse({ response: aiResponse });
    } catch (error) {
      return jsonResponse({ error: 'Failed to process message: ' + error.message }, 500);
    }
  }

  // POST /api/progress
  if (path === '/progress' && method === 'POST') {
    try {
      const body = await request.json();
      const { studentId, courseId, lessonId } = body;
      if (!studentId || !courseId || !lessonId) return jsonResponse({ error: 'studentId, courseId, and lessonId are required' }, 400);
      if (env.DB) {
        await env.DB.prepare(`INSERT INTO progress (id, student_id, course_id, lesson_id, completed, completed_at) VALUES (?, ?, ?, ?, 1, datetime('now')) ON CONFLICT(student_id, lesson_id) DO UPDATE SET completed = 1, completed_at = datetime('now')`).bind(generateId(), studentId, courseId, lessonId).run();
      }
      return jsonResponse({ success: true, message: 'Progress saved!' });
    } catch (error) { return jsonResponse({ error: error.message }, 500); }
  }

  // GET /api/progress/:studentId
  if (path.match(/^\/progress\/[^\/]+$/) && method === 'GET') {
    const studentId = path.split('/')[2];
    if (env.DB) {
      try {
        const result = await env.DB.prepare('SELECT course_id, lesson_id, completed FROM progress WHERE student_id = ?').bind(studentId).all();
        return jsonResponse({ progress: result.results || [] });
      } catch (e) { return jsonResponse({ progress: [] }); }
    }
    return jsonResponse({ progress: [] });
  }

  // POST /api/quiz
  if (path === '/quiz' && method === 'POST') {
    try {
      const body = await request.json();
      const { studentId, lessonId, answers } = body;
      if (!lessonId || !Array.isArray(answers)) return jsonResponse({ error: 'lessonId and answers array are required' }, 400);

      const found = getLessonById(lessonId);
      if (!found || !found.lesson.quiz) return jsonResponse({ error: 'Lesson or quiz not found' }, 404);

      const quiz = found.lesson.quiz;
      let score = 0;
      const results = answers.map((answer, idx) => {
        const question = quiz[idx];
        const correct = question && answer === question.correct;
        if (correct) score++;
        return { question: question?.q, correct, correctAnswer: question?.options[question?.correct], yourAnswer: question?.options[answer] };
      });

      if (env.DB) {
        try {
          await env.DB.prepare(`INSERT INTO quiz_results (id, student_id, lesson_id, score, total, answers) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(student_id, lesson_id) DO UPDATE SET score = excluded.score, total = excluded.total, answers = excluded.answers, completed_at = datetime('now')`).bind(generateId(), studentId || 'anonymous', lessonId, score, quiz.length, JSON.stringify(answers)).run();
          if (studentId && studentId !== 'anonymous') {
            await env.DB.prepare('UPDATE students SET points = points + ? WHERE id = ?').bind(score * 10, studentId).run();
          }
        } catch (e) {}
      }
      return jsonResponse({ success: true, score, total: quiz.length, percentage: Math.round((score / quiz.length) * 100), results });
    } catch (error) { return jsonResponse({ error: error.message }, 500); }
  }

  // POST /api/students
  if (path === '/students' && method === 'POST') {
    try {
      const body = await request.json();
      const { name, email, country } = body;
      const studentId = generateId();
      if (env.DB) {
        await env.DB.prepare('INSERT OR IGNORE INTO students (id, name, email, country) VALUES (?, ?, ?, ?)').bind(studentId, name || 'Student', email || null, country || 'Nepal').run();
      }
      return jsonResponse({ success: true, studentId, name });
    } catch (error) { return jsonResponse({ error: error.message }, 500); }
  }

  // GET /api/students/:studentId
  if (path.match(/^\/students\/[^\/]+$/) && method === 'GET') {
    const studentId = path.split('/')[2];
    if (env.DB) {
      try {
        const student = await env.DB.prepare('SELECT id, name, email, country, points, created_at FROM students WHERE id = ?').bind(studentId).first();
        const progress = await env.DB.prepare('SELECT COUNT(*) as completed FROM progress WHERE student_id = ? AND completed = 1').bind(studentId).first();
        const quizStats = await env.DB.prepare('SELECT SUM(score) as total_score, SUM(total) as total_questions FROM quiz_results WHERE student_id = ?').bind(studentId).first();
        const challenges = await env.DB.prepare('SELECT COUNT(*) as count FROM challenge_completions WHERE student_id = ?').bind(studentId).first();
        return jsonResponse({
          student: student || { id: studentId, name: 'Student', points: 0 },
          completedLessons: progress?.completed || 0,
          quizStats: { totalScore: quizStats?.total_score || 0, totalQuestions: quizStats?.total_questions || 0 },
          challengesCompleted: challenges?.count || 0,
        });
      } catch (e) { return jsonResponse({ error: e.message }, 500); }
    }
    return jsonResponse({ student: { id: studentId, name: 'Student', points: 0 }, completedLessons: 0, challengesCompleted: 0 });
  }

  // GET /api/leaderboard
  if (path === '/leaderboard' && method === 'GET') {
    if (env.DB) {
      try {
        const result = await env.DB.prepare('SELECT name, country, points FROM students ORDER BY points DESC LIMIT 20').all();
        return jsonResponse({ leaderboard: result.results || [] });
      } catch (e) { return jsonResponse({ leaderboard: [] }); }
    }
    return jsonResponse({ leaderboard: [] });
  }

  // GET /api/challenges — daily challenges
  if (path === '/challenges' && method === 'GET') {
    return jsonResponse({ challenges: DAILY_CHALLENGES });
  }

  // POST /api/challenges/complete
  if (path === '/challenges/complete' && method === 'POST') {
    try {
      const body = await request.json();
      const { studentId, challengeId } = body;
      if (!studentId || !challengeId) return jsonResponse({ error: 'studentId and challengeId required' }, 400);

      const challenge = DAILY_CHALLENGES.find(c => c.id === challengeId);
      if (!challenge) return jsonResponse({ error: 'Challenge not found' }, 404);

      if (env.DB) {
        try {
          await env.DB.prepare(`INSERT OR IGNORE INTO challenge_completions (id, student_id, challenge_id) VALUES (?, ?, ?)`).bind(generateId(), studentId, challengeId).run();
          await env.DB.prepare('UPDATE students SET points = points + ? WHERE id = ?').bind(challenge.points, studentId).run();
        } catch (e) {}
      }
      return jsonResponse({ success: true, points: challenge.points, message: `Challenge complete! +${challenge.points} points` });
    } catch (error) { return jsonResponse({ error: error.message }, 500); }
  }

  // GET /api/challenges/:studentId — get completed challenges
  if (path.match(/^\/challenges\/[^\/]+$/) && method === 'GET') {
    const studentId = path.split('/')[2];
    if (env.DB) {
      try {
        const result = await env.DB.prepare('SELECT challenge_id FROM challenge_completions WHERE student_id = ?').bind(studentId).all();
        return jsonResponse({ completed: (result.results || []).map(r => r.challenge_id) });
      } catch (e) { return jsonResponse({ completed: [] }); }
    }
    return jsonResponse({ completed: [] });
  }

  // GET /api/resources
  if (path === '/resources' && method === 'GET') {
    return jsonResponse({ resources: RESOURCES });
  }

  // GET /api/roadmap
  if (path === '/roadmap' && method === 'GET') {
    return jsonResponse({ roadmap: ROADMAP });
  }

  // GET /api/projects — list community projects
  if (path === '/projects' && method === 'GET') {
    if (env.DB) {
      try {
        const result = await env.DB.prepare('SELECT * FROM projects ORDER BY created_at DESC LIMIT 50').all();
        return jsonResponse({ projects: result.results || [] });
      } catch (e) { return jsonResponse({ projects: [] }); }
    }
    return jsonResponse({ projects: [] });
  }

  // POST /api/projects — submit a project
  if (path === '/projects' && method === 'POST') {
    try {
      const body = await request.json();
      const { studentId, studentName, title, description, problem, solution, techStack, url } = body;
      if (!title || !description) return jsonResponse({ error: 'Title and description are required' }, 400);

      if (env.DB) {
        await env.DB.prepare('INSERT INTO projects (id, student_id, student_name, title, description, problem, solution, tech_stack, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(generateId(), studentId || 'anonymous', studentName || 'Student', title, description, problem || null, solution || null, techStack || null, url || null).run();
      }
      return jsonResponse({ success: true, message: 'Project submitted!' });
    } catch (error) { return jsonResponse({ error: error.message }, 500); }
  }

  // POST /api/contact
  if (path === '/contact' && method === 'POST') {
    try {
      const body = await request.json();
      const { name, email, subject, message } = body;
      if (!name || !message) return jsonResponse({ error: 'Name and message are required' }, 400);
      if (env.DB) {
        await env.DB.prepare('INSERT INTO contacts (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)').bind(generateId(), name, email || null, subject || null, message).run();
      }
      return jsonResponse({ success: true, message: 'Thank you for your message!' });
    } catch (error) { return jsonResponse({ error: error.message }, 500); }
  }

  // POST /api/newsletter
  if (path === '/newsletter' && method === 'POST') {
    try {
      const body = await request.json();
      const { email } = body;
      if (!email) return jsonResponse({ error: 'Email is required' }, 400);
      if (env.DB) {
        await env.DB.prepare('INSERT OR IGNORE INTO newsletter (id, email) VALUES (?, ?)').bind(generateId(), email).run();
      }
      return jsonResponse({ success: true, message: 'Subscribed successfully!' });
    } catch (error) { return jsonResponse({ error: error.message }, 500); }
  }

  // GET /api/search
  if (path === '/search' && method === 'GET') {
    const query = url.searchParams.get('q')?.toLowerCase() || '';
    if (!query) return jsonResponse({ results: [] });
    const results = [];
    COURSES.forEach(course => {
      if (course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query)) {
        results.push({ type: 'course', id: course.id, title: course.title, icon: course.icon });
      }
      course.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(query) || lesson.content.toLowerCase().includes(query)) {
          results.push({ type: 'lesson', id: lesson.id, title: lesson.title, course: course.title, courseId: course.id, icon: course.icon });
        }
      });
    });
    return jsonResponse({ results: results.slice(0, 10) });
  }

  // GET /api/admin/stats
  if (path === '/admin/stats' && method === 'GET') {
    if (!env.DB) return jsonResponse({ error: 'Database not configured' }, 500);
    try {
      const students = await env.DB.prepare('SELECT COUNT(*) as count FROM students').first();
      const progress = await env.DB.prepare('SELECT COUNT(*) as count FROM progress WHERE completed = 1').first();
      const quizzes = await env.DB.prepare('SELECT COUNT(*) as count FROM quiz_results').first();
      const contacts = await env.DB.prepare('SELECT COUNT(*) as count FROM contacts').first();
      const newsletter = await env.DB.prepare('SELECT COUNT(*) as count FROM newsletter').first();
      const challenges = await env.DB.prepare('SELECT COUNT(*) as count FROM challenge_completions').first();
      const projects = await env.DB.prepare('SELECT COUNT(*) as count FROM projects').first();
      return jsonResponse({
        students: students?.count || 0, completedLessons: progress?.count || 0,
        quizzesTaken: quizzes?.count || 0, contacts: contacts?.count || 0,
        newsletterSubscribers: newsletter?.count || 0, challengesCompleted: challenges?.count || 0,
        projectsSubmitted: projects?.count || 0,
      });
    } catch (e) { return jsonResponse({ error: e.message }, 500); }
  }

  // GET /api/admin/students
  if (path === '/admin/students' && method === 'GET') {
    if (!env.DB) return jsonResponse({ error: 'Database not configured' }, 500);
    try {
      const result = await env.DB.prepare('SELECT id, name, email, country, points, created_at FROM students ORDER BY created_at DESC LIMIT 100').all();
      return jsonResponse({ students: result.results || [] });
    } catch (e) { return jsonResponse({ error: e.message }, 500); }
  }

  return jsonResponse({ error: 'API endpoint not found' }, 404);
}

// ============================================================
//  MAIN WORKER
// ============================================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    await initDatabase(env);
    if (url.pathname.startsWith('/api')) return handleApi(request, env);
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Humanity Nepal AI — configure static assets in wrangler.toml', { headers: { 'Content-Type': 'text/plain' } });
  },
};
