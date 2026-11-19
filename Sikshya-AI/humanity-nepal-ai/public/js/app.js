/* ©Nirajmallik@hub */
/* ============================================================
   Humanity Nepal AI — Frontend JavaScript
   Handles course loading, lesson viewing, AI tutor chat,
   and progress tracking.
   ============================================================ */

// State
let courses = [];
let currentCourse = null;
let currentLesson = null;
let studentId = localStorage.getItem('hna_student_id') || generateStudentId();
let studentName = localStorage.getItem('hna_student_name') || 'Student';
let completedLessons = new Set(
  JSON.parse(localStorage.getItem('hna_completed') || '[]')
);

// Generate a unique student ID
function generateStudentId() {
  const id = 'stu_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  localStorage.setItem('hna_student_id', id);
  return id;
}

// ============================================================
//  Course Loading
// ============================================================

async function loadCourses() {
  try {
    const response = await fetch('/api/courses');
    const data = await response.json();
    courses = data.courses || [];

    const grid = document.getElementById('courseGrid');
    grid.innerHTML = courses.map(course => `
      <div class="course-card" onclick="openCourse('${course.id}')">
        <div class="course-icon">${course.icon}</div>
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <ul class="lesson-list">
          ${course.lessons.map((lesson, i) => `
            <li onclick="event.stopPropagation(); openLesson('${course.id}', '${lesson.id}')">
              <span class="lesson-num">${i + 1}</span>
              <span>${lesson.title}</span>
              <span class="lesson-duration">${lesson.duration}</span>
            </li>
          `).join('')}
        </ul>
        <div class="course-meta">
          <span class="course-lessons">📖 ${course.lessonCount} lessons</span>
          <span class="course-link">Start course →</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    document.getElementById('courseGrid').innerHTML =
      '<div class="loading">Unable to load courses. Please refresh the page.</div>';
  }
}

// ============================================================
//  Lesson Viewer
// ============================================================

function openCourse(courseId) {
  const course = courses.find(c => c.id === courseId);
  if (course && course.lessons.length > 0) {
    openLesson(courseId, course.lessons[0].id);
  }
}

async function openLesson(courseId, lessonId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return;

  currentCourse = course;

  try {
    const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`);
    const lesson = await response.json();
    currentLesson = lesson;

    // Populate modal
    document.getElementById('modalCourseIcon').textContent = course.icon;
    document.getElementById('modalTitle').textContent = lesson.title;
    document.getElementById('modalMeta').textContent = `${course.title} • ${lesson.duration}`;

    // Render lesson content
    document.getElementById('modalBody').innerHTML = lesson.content;

    // Build lesson navigation
    const nav = document.getElementById('lessonNav');
    nav.innerHTML = course.lessons.map(l => `
      <button class="${l.id === lessonId ? 'active' : ''}"
        onclick="openLesson('${courseId}', '${l.id}')">
        ${l.title}
      </button>
    `).join('');

    // Update complete button
    const completeBtn = document.getElementById('completeBtn');
    if (completedLessons.has(lessonId)) {
      completeBtn.textContent = '✓ Completed';
      completeBtn.classList.add('completed');
    } else {
      completeBtn.textContent = '✓ Mark as Complete';
      completeBtn.classList.remove('completed');
    }

    // Show modal
    document.getElementById('lessonModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error('Failed to load lesson:', error);
  }
}

function closeLesson() {
  document.getElementById('lessonModal').classList.remove('active');
  document.body.style.overflow = '';
}

async function completeLesson() {
  if (!currentLesson || !currentCourse) return;

  completedLessons.add(currentLesson.id);
  localStorage.setItem('hna_completed', JSON.stringify([...completedLessons]));

  // Update button
  const btn = document.getElementById('completeBtn');
  btn.textContent = '✓ Completed';
  btn.classList.add('completed');

  // Save to backend
  try {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId,
        courseId: currentCourse.id,
        lessonId: currentLesson.id,
      }),
    });
  } catch (e) {
    // Progress saved locally even if backend fails
  }
}

// Close modal on overlay click
document.getElementById('lessonModal').addEventListener('click', function(e) {
  if (e.target === this) closeLesson();
});

// Escape key closes modal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLesson();
});

// ============================================================
//  AI Tutor Chat
// ============================================================

async function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  addChatMessage('user', message);
  input.value = '';

  // Show typing indicator
  const typingId = showTyping();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        studentId,
        studentName,
      }),
    });

    const data = await response.json();
    removeTyping(typingId);

    if (data.response) {
      addChatMessage('bot', data.response);
    } else {
      addChatMessage('bot', 'Sorry, I could not process your message. Please try again.');
    }
  } catch (error) {
    removeTyping(typingId);
    addChatMessage('bot', 'Connection error. Please check your internet and try again.');
  }
}

function sendSuggestion(text) {
  document.getElementById('chatInput').value = text;
  sendMessage({ preventDefault: () => {} });
}

function addChatMessage(role, content) {
  const messages = document.getElementById('chatMessages');
  const messageEl = document.createElement('div');
  messageEl.className = `chat-message ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'chat-avatar';
  avatar.textContent = role === 'bot' ? '🤖' : '👤';

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';

  // Parse content for code blocks and basic formatting
  bubble.innerHTML = formatChatContent(content);

  messageEl.appendChild(avatar);
  messageEl.appendChild(bubble);
  messages.appendChild(messageEl);

  // Scroll to bottom
  messages.scrollTop = messages.scrollHeight;
}

function formatChatContent(content) {
  // Escape HTML
  let html = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (```...```)
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold (**text**)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Line breaks
  html = html.replace(/\n/g, '<br>');

  return html;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = 'chat-message bot';
  el.id = 'typing-' + Date.now();

  const avatar = document.createElement('div');
  avatar.className = 'chat-avatar';
  avatar.textContent = '🤖';

  const typing = document.createElement('div');
  typing.className = 'chat-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';

  el.appendChild(avatar);
  el.appendChild(typing);
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;

  return el.id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ============================================================
//  Navbar
// ============================================================

function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('active');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ============================================================
//  Init
// ============================================================

// Ask for student name on first visit
if (!localStorage.getItem('hna_student_name')) {
  setTimeout(() => {
    const name = prompt('Welcome to Humanity Nepal AI! 🎓\n\nWhat is your name?');
    if (name && name.trim()) {
      studentName = name.trim();
      localStorage.setItem('hna_student_name', studentName);

      // Register with backend
      fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName, country: 'Nepal' }),
      }).catch(() => {});
    }
  }, 1000);
}

// Load courses on page load
loadCourses();
