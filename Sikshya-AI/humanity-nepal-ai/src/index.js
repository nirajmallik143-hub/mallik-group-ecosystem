/**
 * Humanity Nepal AI — Educational Platform
 * A learning platform where students can learn AI and coding
 * to upgrade their lives and skills.
 *
 * Features:
 *  - Learning paths (AI Fundamentals, JavaScript, Python)
 *  - Interactive lessons with code examples
 *  - AI Tutor chatbot powered by Workers AI
 *  - Progress tracking via D1 database
 *  - Beautiful, responsive, multi-language (EN/NP) interface
 */

// ============================================================
//  HTML PAGE TEMPLATES
// ============================================================

const PAGE_HEAD = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Humanity Nepal AI</title>
  <meta name="description" content="Learn AI and coding to upgrade your life. Free educational platform for students and humanity.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>`;

// ============================================================
//  COURSE & LESSON DATA
// ============================================================

const COURSES = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    icon: "🤖",
    description: "Understand what AI is, how it works, and build your first AI-powered application.",
    lessons: [
      {
        id: "ai-01",
        title: "What is Artificial Intelligence?",
        duration: "15 min",
        content: `<h2>What is Artificial Intelligence?</h2>
<p>Artificial Intelligence (AI) is the ability of a computer program to learn, reason, and make decisions — similar to how humans think.</p>
<h3>Types of AI</h3>
<ul>
<li><strong>Narrow AI:</strong> Designed for specific tasks (e.g., spam filters, voice assistants)</li>
<li><strong>General AI:</strong> Hypothetical AI that can do any intellectual task a human can</li>
<li><strong>Superintelligence:</strong> AI that surpasses human intelligence in every field</li>
</ul>
<h3>Why Learn AI?</h3>
<p>AI is transforming every industry — healthcare, education, agriculture, finance, and more. By understanding AI, you can:</p>
<ul>
<li>Build smarter applications</li>
<li>Automate repetitive tasks</li>
<li>Create solutions for real-world problems in your community</li>
<li>Access high-paying career opportunities</li>
</ul>
<h3>Key Concepts</h3>
<ul>
<li><strong>Machine Learning:</strong> Teaching computers to learn from data</li>
<li><strong>Deep Learning:</strong> Neural networks with many layers</li>
<li><strong>Natural Language Processing (NLP):</strong> Understanding human language</li>
<li><strong>Computer Vision:</strong> Understanding images and video</li>
</ul>`,
      },
      {
        id: "ai-02",
        title: "How AI Models Learn",
        duration: "20 min",
        content: `<h2>How AI Models Learn</h2>
<p>AI models learn through a process called <strong>training</strong>. Here's how it works:</p>
<h3>The Training Process</h3>
<ol>
<li><strong>Data Collection:</strong> Gather examples (e.g., thousands of labeled images)</li>
<li><strong>Feature Extraction:</strong> Identify important patterns in the data</li>
<li><strong>Model Training:</strong> The model adjusts its internal parameters to minimize errors</li>
<li><strong>Evaluation:</strong> Test the model on new, unseen data</li>
<li><strong>Deployment:</strong> Use the trained model in real applications</li>
</ol>
<h3>Supervised vs Unsupervised Learning</h3>
<ul>
<li><strong>Supervised:</strong> Learn from labeled examples (input → known output)</li>
<li><strong>Unsupervised:</strong> Find patterns in unlabeled data</li>
<li><strong>Reinforcement:</strong> Learn through trial and error with rewards</li>
</ul>
<h3>Code Example: Simple Training Loop (Python)</h3>
<pre><code># A simplified training loop
for epoch in range(100):
    predictions = model(training_data)
    loss = calculate_error(predictions, labels)
    loss.backward()  # Calculate gradients
    optimizer.step()  # Update model weights
    print(f"Epoch {epoch}: Loss = {loss.item():.4f}")</code></pre>`,
      },
      {
        id: "ai-03",
        title: "Building Your First AI App",
        duration: "30 min",
        content: `<h2>Building Your First AI App</h2>
<p>Let's build a simple AI-powered text classifier that can detect whether a message is positive or negative.</p>
<h3>Step 1: Define the Problem</h3>
<p>We want to classify text messages as "positive" or "negative" based on their content.</p>
<h3>Step 2: Prepare Data</h3>
<pre><code>training_data = [
    ("I love this course!", "positive"),
    ("This is terrible", "negative"),
    ("Amazing work, keep it up!", "positive"),
    ("I hate this", "negative"),
    ("Wonderful experience", "positive"),
    ("Worst day ever", "negative"),
]</code></pre>
<h3>Step 3: Use a Pre-trained Model</h3>
<p>Instead of training from scratch, we can use Workers AI to leverage powerful pre-trained models:</p>
<pre><code>// Using Cloudflare Workers AI
const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
    messages: [
        { role: "system", content: "Classify the sentiment of this text as positive or negative." },
        { role: "user", content: userMessage }
    ]
});
console.log(response.response);</code></pre>
<h3>Step 4: Deploy</h3>
<p>Deploy your AI app to Cloudflare Workers — it runs on the edge, close to your users, anywhere in the world!</p>`,
      },
    ],
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    icon: "⚡",
    description: "Learn the language of the web — from basics to building interactive applications.",
    lessons: [
      {
        id: "js-01",
        title: "Introduction to JavaScript",
        duration: "15 min",
        content: `<h2>Introduction to JavaScript</h2>
<p>JavaScript is the programming language of the web. It runs in every web browser and powers interactive websites, web apps, servers, and more.</p>
<h3>Your First Program</h3>
<pre><code>console.log("Hello, Nepal! 🇳🇵");

// Variables
let name = "Student";
const country = "Nepal";

// Functions
function greet(person) {
    return "Welcome, " + person + "!";
}

console.log(greet(name));</code></pre>
<h3>Why JavaScript?</h3>
<ul>
<li>Runs everywhere — browsers, servers, mobile apps, IoT devices</li>
<li>Huge community and job market</li>
<li>Easy to start, powerful enough for complex apps</li>
<li>Can build full-stack applications with a single language</li>
</ul>`,
      },
      {
        id: "js-02",
        title: "Variables, Types, and Operators",
        duration: "20 min",
        content: `<h2>Variables, Types, and Operators</h2>
<h3>Declaring Variables</h3>
<pre><code>let age = 25;        // Can be changed
const PI = 3.14159;  // Cannot be changed
var oldStyle = "legacy"; // Old way, avoid</code></pre>
<h3>Data Types</h3>
<pre><code>// Numbers
let score = 100;
let price = 49.99;

// Strings
let greeting = "Namaste!";

// Booleans
let isStudent = true;

// Arrays
let colors = ["red", "green", "blue"];

// Objects
let student = {
    name: "Aarav",
    age: 20,
    course: "AI Fundamentals"
};

// null and undefined
let nothing = null;
let notDefined;</code></pre>
<h3>Operators</h3>
<pre><code>// Arithmetic
let sum = 10 + 5;      // 15
let diff = 10 - 3;     // 7
let product = 4 * 6;   // 24
let quotient = 20 / 4; // 5
let remainder = 10 % 3; // 1

// Comparison
let isEqual = (5 === 5);  // true
let isGreater = (10 > 5); // true

// Logical
let canEnroll = isStudent && (age >= 18);</code></pre>`,
      },
      {
        id: "js-03",
        title: "Functions and Control Flow",
        duration: "25 min",
        content: `<h2>Functions and Control Flow</h2>
<h3>Functions</h3>
<pre><code>// Function declaration
function calculateGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    return "F";
}

// Arrow function (modern syntax)
const add = (a, b) => a + b;
const square = x => x * x;

// Function with default parameters
function greet(name = "Friend") {
    return "Namaste, " + name + "!";
}</code></pre>
<h3>Conditional Statements</h3>
<pre><code>let hour = 14;

if (hour < 12) {
    console.log("Good morning!");
} else if (hour < 18) {
    console.log("Good afternoon!");
} else {
    console.log("Good evening!");
}

// Switch statement
let day = "Monday";
switch (day) {
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Weekday — keep learning!");
}</code></pre>
<h3>Loops</h3>
<pre><code>// For loop
for (let i = 1; i <= 5; i++) {
    console.log("Lesson " + i);
}

// While loop
let count = 0;
while (count < 3) {
    console.log("Count: " + count);
    count++;
}

// For...of (arrays)
let courses = ["AI", "JavaScript", "Python"];
for (let course of courses) {
    console.log("Learning: " + course);
}</code></pre>`,
      },
      {
        id: "js-04",
        title: "Working with the DOM",
        duration: "30 min",
        content: `<h2>Working with the DOM</h2>
<p>The DOM (Document Object Model) lets JavaScript interact with HTML elements on a webpage.</p>
<h3>Selecting Elements</h3>
<pre><code>// By ID
let heading = document.getElementById("title");

// By class
let buttons = document.getElementsByClassName("btn");

// By CSS selector
let card = document.querySelector(".course-card");
let allCards = document.querySelectorAll(".course-card");</code></pre>
<h3>Modifying Elements</h3>
<pre><code>let title = document.getElementById("title");
title.textContent = "Welcome to Humanity Nepal AI!";
title.style.color = "#2563eb";
title.classList.add("highlight");</code></pre>
<h3>Event Handling</h3>
<pre><code>let button = document.getElementById("enrollBtn");

button.addEventListener("click", function() {
    alert("You're enrolled! Let's start learning 🎓");
});

// Form submission
let form = document.getElementById("signupForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("nameInput").value;
    console.log("Welcome, " + name + "!");
});</code></pre>
<h3>Mini Project: Dynamic Lesson List</h3>
<pre><code>let lessons = ["AI Basics", "JavaScript", "Python", "Web Dev"];
let list = document.getElementById("lessonList");

lessons.forEach(lesson => {
    let item = document.createElement("li");
    item.textContent = lesson;
    list.appendChild(item);
});</code></pre>`,
      },
    ],
  },
  {
    id: "python-basics",
    title: "Python Basics",
    icon: "🐍",
    description: "Python is the most popular language for AI, data science, and automation. Start here!",
    lessons: [
      {
        id: "py-01",
        title: "Getting Started with Python",
        duration: "15 min",
        content: `<h2>Getting Started with Python</h2>
<p>Python is a beginner-friendly programming language used for AI, data science, web development, automation, and more.</p>
<h3>Your First Python Program</h3>
<pre><code># Hello World
print("Namaste, Nepal! 🇳🇵")

# Variables
name = "Student"
age = 20
is_enrolled = True

# String formatting
print(f"My name is {name} and I am {age} years old.")</code></pre>
<h3>Why Python for AI?</h3>
<ul>
<li>Simple, readable syntax — easy to learn</li>
<li>Massive ecosystem: NumPy, Pandas, TensorFlow, PyTorch</li>
<li>Most AI/ML libraries are Python-first</li>
<li>Great community support and tutorials</li>
</ul>`,
      },
      {
        id: "py-02",
        title: "Data Structures in Python",
        duration: "25 min",
        content: `<h2>Data Structures in Python</h2>
<h3>Lists</h3>
<pre><code>fruits = ["apple", "banana", "mango"]
fruits.append("orange")
fruits[0] = "green apple"

for fruit in fruits:
    print(fruit)

# List comprehension
squares = [x**2 for x in range(10)]
print(squares)</code></pre>
<h3>Dictionaries</h3>
<pre><code>student = {
    "name": "Aarav",
    "course": "AI Fundamentals",
    "progress": 75
}

# Access values
print(student["name"])
print(student.get("course"))

# Add/update
student["grade"] = "A"
student["progress"] = 80

# Iterate
for key, value in student.items():
    print(f"{key}: {value}")</code></pre>
<h3>Tuples and Sets</h3>
<pre><code># Tuples (immutable)
coordinates = (27.7172, 85.3240)  # Kathmandu

# Sets (unique values)
unique_courses = {"AI", "JS", "Python", "AI"}
print(unique_courses)  # {'AI', 'JS', 'Python'}</code></pre>`,
      },
      {
        id: "py-03",
        title: "Functions and Modules",
        duration: "20 min",
        content: `<h2>Functions and Modules</h2>
<h3>Defining Functions</h3>
<pre><code>def greet(name, greeting="Namaste"):
    return f"{greeting}, {name}!"

print(greet("Aarav"))           # Namaste, Aarav!
print(greet("Sita", "Hello"))    # Hello, Sita!

# Function with multiple returns
def get_grade(score):
    if score >= 90:
        return "A", "Excellent"
    elif score >= 70:
        return "B", "Good"
    return "C", "Keep practicing"

grade, message = get_grade(85)
print(f"Grade: {grade} — {message}")</code></pre>
<h3>Importing Modules</h3>
<pre><code>import math
import random
import datetime

# Use math functions
radius = 5
area = math.pi * radius ** 2
print(f"Area: {area:.2f}")

# Random numbers
lucky = random.randint(1, 100)
print(f"Your lucky number: {lucky}")

# Current date
today = datetime.date.today()
print(f"Today: {today}")</code></pre>
<h3>Creating Your Own Module</h3>
<pre><code># Save as: mymath.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

# In another file:
# from mymath import add, multiply
# print(add(5, 3))  # 8</code></pre>`,
      },
    ],
  },
];

// ============================================================
//  DATABASE SCHEMA (for D1)
// ============================================================

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    country TEXT DEFAULT 'Nepal',
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

CREATE TABLE IF NOT EXISTS chat_history (
    id TEXT PRIMARY KEY,
    student_id TEXT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);
`;

// ============================================================
//  HELPER FUNCTIONS
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
  try {
    await env.DB.exec(SCHEMA_SQL);
  } catch (e) {
    // Database might already be initialized
  }
}

// ============================================================
//  API ROUTES
// ============================================================

async function handleApi(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');
  const method = request.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // GET /api/courses — list all courses
  if (path === '/courses' && method === 'GET') {
    const courseList = COURSES.map(c => ({
      id: c.id,
      title: c.title,
      icon: c.icon,
      description: c.description,
      lessonCount: c.lessons.length,
      lessons: c.lessons.map(l => ({
        id: l.id,
        title: l.title,
        duration: l.duration,
      })),
    }));
    return jsonResponse({ courses: courseList });
  }

  // GET /api/courses/:courseId/lessons/:lessonId — get lesson content
  const lessonMatch = path.match(/^\/courses\/([^\/]+)\/lessons\/([^\/]+)$/);
  if (lessonMatch && method === 'GET') {
    const courseId = lessonMatch[1];
    const lessonId = lessonMatch[2];
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return jsonResponse({ error: 'Course not found' }, 404);
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (!lesson) return jsonResponse({ error: 'Lesson not found' }, 404);
    return jsonResponse({ course: course.title, ...lesson });
  }

  // POST /api/chat — AI Tutor chatbot
  if (path === '/chat' && method === 'POST') {
    try {
      const body = await request.json();
      const userMessage = body.message || '';
      const studentName = body.studentName || 'student';

      if (!userMessage) {
        return jsonResponse({ error: 'Message is required' }, 400);
      }

      // Use Workers AI to generate a response
      const systemPrompt = `You are an AI tutor on the "Humanity Nepal AI" educational platform. 
Your role is to help students learn AI, coding (JavaScript, Python), and technology skills.
You are friendly, encouraging, and explain concepts simply for beginners.
The student's name is ${studentName}. Address them by name when appropriate.
Keep responses concise but informative. Use code examples when teaching coding.
If the student asks something unrelated to learning, gently guide them back to education.
You support both English and Nepali language. If a student writes in Nepali, respond in Nepali.`;

      let aiResponse;
      if (env.AI) {
        const result = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 512,
        });
        aiResponse = result.response || 'I apologize, I could not generate a response. Please try again.';
      } else {
        aiResponse = `Hello ${studentName}! I'm your AI tutor. The AI service is not yet configured, but I'm here to help you learn AI and coding. Please ensure Workers AI is enabled in the wrangler.toml file.`;
      }

      // Save to chat history if DB is available
      if (env.DB) {
        try {
          await env.DB.prepare(
            'INSERT INTO chat_history (id, student_id, role, content) VALUES (?, ?, ?, ?)'
          ).bind(generateId(), body.studentId || 'anonymous', 'user', userMessage).run();

          await env.DB.prepare(
            'INSERT INTO chat_history (id, student_id, role, content) VALUES (?, ?, ?, ?)'
          ).bind(generateId(), body.studentId || 'anonymous', 'assistant', aiResponse).run();
        } catch (e) { /* DB might not be ready */ }
      }

      return jsonResponse({ response: aiResponse });
    } catch (error) {
      return jsonResponse({ error: 'Failed to process message: ' + error.message }, 500);
    }
  }

  // POST /api/progress — save lesson completion
  if (path === '/progress' && method === 'POST') {
    try {
      const body = await request.json();
      const { studentId, courseId, lessonId } = body;

      if (!studentId || !courseId || !lessonId) {
        return jsonResponse({ error: 'studentId, courseId, and lessonId are required' }, 400);
      }

      if (env.DB) {
        await env.DB.prepare(
          `INSERT INTO progress (id, student_id, course_id, lesson_id, completed, completed_at)
           VALUES (?, ?, ?, ?, 1, datetime('now'))
           ON CONFLICT(student_id, lesson_id) DO UPDATE SET completed = 1, completed_at = datetime('now')`
        ).bind(generateId(), studentId, courseId, lessonId).run();
      }

      return jsonResponse({ success: true, message: 'Progress saved!' });
    } catch (error) {
      return jsonResponse({ error: error.message }, 500);
    }
  }

  // GET /api/progress/:studentId — get student progress
  if (path.match(/^\/progress\/[^\/]+$/) && method === 'GET') {
    const studentId = path.split('/')[2];
    if (env.DB) {
      try {
        const result = await env.DB.prepare(
          'SELECT course_id, lesson_id, completed FROM progress WHERE student_id = ?'
        ).bind(studentId).all();
        return jsonResponse({ progress: result.results || [] });
      } catch (e) {
        return jsonResponse({ progress: [] });
      }
    }
    return jsonResponse({ progress: [] });
  }

  // POST /api/students — register a new student
  if (path === '/students' && method === 'POST') {
    try {
      const body = await request.json();
      const { name, email, country } = body;
      const studentId = generateId();

      if (env.DB) {
        await env.DB.prepare(
          'INSERT INTO students (id, name, email, country) VALUES (?, ?, ?, ?)'
        ).bind(studentId, name || 'Student', email || null, country || 'Nepal').run();
      }

      return jsonResponse({ success: true, studentId, name });
    } catch (error) {
      return jsonResponse({ error: error.message }, 500);
    }
  }

  return jsonResponse({ error: 'API endpoint not found' }, 404);
}

// ============================================================
//  MAIN WORKER ENTRY
// ============================================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Initialize database on first request
    await initDatabase(env);

    // API routes
    if (url.pathname.startsWith('/api')) {
      return handleApi(request, env);
    }

    // Static assets — let the assets binding handle it
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    // Fallback: serve the main page
    return new Response('Humanity Nepal AI — configure static assets in wrangler.toml', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
