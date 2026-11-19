/* ============================================================
   Humanity Nepal AI — FULL SYSTEM Frontend JavaScript
   Courses, lessons, quizzes, AI tutor, challenges, roadmap,
   projects, resources, leaderboard, certificates, profiles,
   dark mode, Nepali/English, admin panel, search.
   ============================================================ */

// State
let courses = [];
let currentCourse = null;
let currentLesson = null;
let currentLessonIndex = 0;
let currentQuizAnswers = {};
let challenges = [];
let completedChallenges = new Set(JSON.parse(localStorage.getItem('hna_challenges') || '[]'));
let studentId = localStorage.getItem('hna_student_id') || generateStudentId();
let studentName = localStorage.getItem('hna_student_name') || '';
let studentCountry = localStorage.getItem('hna_student_country') || 'Nepal';
let completedLessons = new Set(JSON.parse(localStorage.getItem('hna_completed') || '[]'));
let language = localStorage.getItem('hna_language') || 'en';
let languages = {};
let translatedLessons = {}; // cache for translated lesson content

function generateStudentId() {
  const id = 'stu_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  localStorage.setItem('hna_student_id', id);
  return id;
}

// ============================================================
//  THEME & LANGUAGE
// ============================================================

function initTheme() {
  const savedTheme = localStorage.getItem('hna_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('hna_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleLanguage() {
  toggleLangMenu();
}

async function loadLanguages() {
  try {
    const response = await fetch('/api/languages');
    const data = await response.json();
    languages = data.languages || {};
    renderLangDropdown();
    updateLangButton();
  } catch (error) {
    // Fallback to basic languages
    languages = { en: { name: 'English', native: 'English', flag: '🇬🇧' }, ne: { name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' } };
    renderLangDropdown();
    updateLangButton();
  }
}

function renderLangDropdown() {
  const dropdown = document.getElementById('langDropdown');
  if (!dropdown) return;
  dropdown.innerHTML = Object.entries(languages).map(([code, lang]) => `
    <div class="lang-option ${code === language ? 'active' : ''}" onclick="selectLanguage('${code}')">
      <span class="lang-option-flag">${lang.flag}</span>
      <span>${lang.native}</span>
    </div>
  `).join('');
}

function toggleLangMenu() {
  const dropdown = document.getElementById('langDropdown');
  if (dropdown) dropdown.classList.toggle('active');
}

function selectLanguage(code) {
  language = code;
  localStorage.setItem('hna_language', code);
  document.getElementById('langDropdown').classList.remove('active');
  updateLangButton();
  const langInfo = languages[code] || { native: code };
  showToast(`Language: ${langInfo.native} ${langInfo.flag || ''}`);
  // Reload courses to apply translations
  loadCourses();
  loadProfile();
}

function updateLangButton() {
  const btn = document.getElementById('langBtn');
  if (!btn) return;
  const langInfo = languages[language] || { flag: '🌐', native: 'EN' };
  btn.textContent = `${langInfo.flag} ${language.toUpperCase()}`;
}

// Close lang dropdown on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.lang-selector')) {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('active');
  }
});

// ============================================================
//  COURSES
// ============================================================

async function loadCourses() {
  try {
    const response = await fetch('/api/courses');
    const data = await response.json();
    courses = data.courses || [];

    document.getElementById('courseCount').textContent = courses.length;
    const totalLessons = courses.reduce((sum, c) => sum + c.lessonCount, 0);
    document.getElementById('lessonCount').textContent = totalLessons + '+';

    const grid = document.getElementById('courseGrid');
    grid.innerHTML = courses.map(course => {
      const completedCount = course.lessons.filter(l => completedLessons.has(l.id)).length;
      const progress = course.lessons.length > 0 ? (completedCount / course.lessons.length) * 100 : 0;
      return `
        <div class="course-card" onclick="openCourse('${course.id}')">
          <div class="course-icon">${course.icon}</div>
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="course-progress-bar"><div class="course-progress-fill" style="width:${progress}%"></div></div>
          <ul class="lesson-list">
            ${course.lessons.map((lesson, i) => `
              <li onclick="event.stopPropagation(); openLesson('${course.id}', '${lesson.id}')">
                <span class="lesson-num">${i + 1}</span>
                <span>${lesson.title}</span>
                ${completedLessons.has(lesson.id) ? '<span class="lesson-completed">✓</span>' : ''}
                <span class="lesson-duration">${lesson.duration}</span>
              </li>
            `).join('')}
          </ul>
          <div class="course-meta">
            <span class="course-lessons">📖 ${course.lessonCount} lessons</span>
            <span class="course-link">Start →</span>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    document.getElementById('courseGrid').innerHTML = '<div class="loading">Unable to load courses. Please refresh.</div>';
  }
}

// ============================================================
//  LESSON VIEWER & QUIZZES
// ============================================================

function openCourse(courseId) {
  const course = courses.find(c => c.id === courseId);
  if (course && course.lessons.length > 0) openLesson(courseId, course.lessons[0].id);
}

async function openLesson(courseId, lessonId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return;
  currentCourse = course;
  currentLessonIndex = course.lessons.findIndex(l => l.id === lessonId);

  try {
    const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`);
    const lesson = await response.json();
    currentLesson = lesson;
    currentQuizAnswers = {};

    document.getElementById('modalCourseIcon').textContent = course.icon;
    document.getElementById('modalTitle').textContent = lesson.title;
    document.getElementById('modalMeta').textContent = `${course.title} • ${lesson.duration}`;
    document.getElementById('modalBody').innerHTML = lesson.content;

    // Translate lesson if non-English language is selected
    if (language !== 'en') {
      const cacheKey = `${lesson.id}_${language}`;
      if (translatedLessons[cacheKey]) {
        document.getElementById('modalBody').innerHTML = translatedLessons[cacheKey];
      } else {
        translateLesson(lesson.content, language, cacheKey);
      }
    }

    const nav = document.getElementById('lessonNav');
    nav.innerHTML = course.lessons.map((l, idx) => `
      <button class="${l.id === lessonId ? 'active' : ''}" onclick="openLesson('${courseId}', '${l.id}')" title="${l.title}">${idx + 1}</button>
    `).join('');

    const quizSection = document.getElementById('quizSection');
    if (lesson.quiz && lesson.quiz.length > 0) {
      quizSection.style.display = 'block';
      renderQuiz(lesson.quiz);
    } else {
      quizSection.style.display = 'none';
    }

    updateLessonButtons();
    document.getElementById('lessonModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  } catch (error) {
    showToast('Failed to load lesson', 'error');
  }
}

function renderQuiz(quiz) {
  const container = document.getElementById('quizContainer');
  container.innerHTML = quiz.map((q, idx) => `
    <div class="quiz-question" data-idx="${idx}">
      <p>${idx + 1}. ${q.q}</p>
      ${q.options.map((opt, optIdx) => `
        <label class="quiz-option">
          <input type="radio" name="q${idx}" value="${optIdx}" onchange="selectQuizAnswer(${idx}, ${optIdx})">
          ${opt}
        </label>
      `).join('')}
    </div>
  `).join('');
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizResult').className = 'quiz-result';
  document.getElementById('submitQuizBtn').style.display = 'inline-flex';
}

function selectQuizAnswer(questionIdx, optionIdx) {
  currentQuizAnswers[questionIdx] = optionIdx;
}

async function translateLesson(content, targetLang, cacheKey) {
  const body = document.getElementById('modalBody');
  body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-secondary);">🌐 Translating lesson to your language...</div>';
  try {
    const response = await fetch('/api/translate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: content, targetLang }),
    });
    const data = await response.json();
    if (data.translated) {
      translatedLessons[cacheKey] = data.translated;
      body.innerHTML = data.translated;
    } else {
      body.innerHTML = content; // fallback to English
    }
  } catch (error) {
    body.innerHTML = content; // fallback to English
  }
}

async function submitQuiz() {
  if (!currentLesson || !currentLesson.quiz) return;
  const quiz = currentLesson.quiz;
  const answers = [];
  for (let i = 0; i < quiz.length; i++) answers.push(currentQuizAnswers[i] !== undefined ? currentQuizAnswers[i] : -1);

  try {
    const response = await fetch('/api/quiz', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, lessonId: currentLesson.id, answers }),
    });
    const data = await response.json();

    quiz.forEach((q, idx) => {
      const questionEl = document.querySelector(`.quiz-question[data-idx="${idx}"]`);
      const options = questionEl.querySelectorAll('.quiz-option');
      options.forEach((opt, optIdx) => {
        if (optIdx === q.correct) opt.classList.add('correct');
        else if (optIdx === answers[idx] && optIdx !== q.correct) opt.classList.add('wrong');
      });
    });

    const resultEl = document.getElementById('quizResult');
    resultEl.style.display = 'block';
    resultEl.className = `quiz-result show ${data.percentage >= 60 ? 'pass' : 'fail'}`;
    resultEl.textContent = `You scored ${data.score}/${data.total} (${data.percentage}%)`;
    document.getElementById('submitQuizBtn').style.display = 'none';

    loadProfile();
    loadLeaderboard();
    showToast(`Quiz complete! +${data.score * 10} points`, 'success');
  } catch (error) {
    showToast('Failed to submit quiz', 'error');
  }
}

function updateLessonButtons() {
  const completeBtn = document.getElementById('completeBtn');
  if (completedLessons.has(currentLesson.id)) {
    completeBtn.textContent = '✓ Completed';
    completeBtn.classList.add('completed');
  } else {
    completeBtn.textContent = '✓ Mark as Complete';
    completeBtn.classList.remove('completed');
  }
  document.getElementById('prevLessonBtn').style.visibility = currentLessonIndex > 0 ? 'visible' : 'hidden';
  document.getElementById('nextLessonBtn').style.visibility = currentLessonIndex < currentCourse.lessons.length - 1 ? 'visible' : 'hidden';
}

function prevLesson() { if (currentLessonIndex > 0) openLesson(currentCourse.id, currentCourse.lessons[currentLessonIndex - 1].id); }
function nextLesson() { if (currentLessonIndex < currentCourse.lessons.length - 1) openLesson(currentCourse.id, currentCourse.lessons[currentLessonIndex + 1].id); }
function closeLesson() { document.getElementById('lessonModal').classList.remove('active'); document.body.style.overflow = ''; }

async function completeLesson() {
  if (!currentLesson || !currentCourse) return;
  completedLessons.add(currentLesson.id);
  localStorage.setItem('hna_completed', JSON.stringify([...completedLessons]));

  const btn = document.getElementById('completeBtn');
  btn.textContent = '✓ Completed';
  btn.classList.add('completed');

  try {
    await fetch('/api/progress', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, courseId: currentCourse.id, lessonId: currentLesson.id }),
    });
  } catch (e) {}

  loadCourses();
  loadProfile();
  checkCertificate(currentCourse);
  showToast('Lesson completed! 🎉', 'success');
}

function checkCertificate(course) {
  if (course.lessons.every(l => completedLessons.has(l.id))) {
    showCertificate(course);
  }
}

// ============================================================
//  AI TUTOR
// ============================================================

async function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  addChatMessage('user', message);
  input.value = '';
  const typingId = showTyping();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, studentId, studentName: studentName || 'Student', language }),
    });
    const data = await response.json();
    removeTyping(typingId);
    if (data.response) addChatMessage('bot', data.response);
    else addChatMessage('bot', 'Sorry, I could not process your message.');
  } catch (error) {
    removeTyping(typingId);
    addChatMessage('bot', 'Connection error. Please try again.');
  }
}

function sendSuggestion(text) {
  document.getElementById('chatInput').value = text;
  sendMessage({ preventDefault: () => {} });
}

function addChatMessage(role, content) {
  const messages = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = `chat-message ${role}`;
  el.innerHTML = `<div class="chat-avatar">${role === 'bot' ? '🤖' : '👤'}</div><div class="chat-bubble">${formatChatContent(content)}</div>`;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function formatChatContent(content) {
  let html = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (m, l, c) => `<pre><code>${c.trim()}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\n/g, '<br>');
  return html;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = 'chat-message bot';
  el.id = 'typing-' + Date.now();
  el.innerHTML = '<div class="chat-avatar">🤖</div><div class="chat-typing"><span></span><span></span><span></span></div>';
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  return el.id;
}

function removeTyping(id) { const el = document.getElementById(id); if (el) el.remove(); }

// ============================================================
//  DAILY CHALLENGES
// ============================================================

async function loadChallenges() {
  try {
    const response = await fetch('/api/challenges');
    const data = await response.json();
    challenges = data.challenges || [];
    document.getElementById('challengeCount').textContent = challenges.length;

    const grid = document.getElementById('challengeGrid');
    grid.innerHTML = challenges.map(ch => {
      const isCompleted = completedChallenges.has(ch.id);
      const typeIcon = ch.type === 'code' ? '💻' : ch.type === 'think' ? '🧠' : '🎯';
      return `
        <div class="challenge-card ${isCompleted ? 'completed' : ''}">
          <div class="challenge-header">
            <span class="challenge-type">${typeIcon}</span>
            <span class="challenge-difficulty ${ch.difficulty.toLowerCase()}">${ch.difficulty}</span>
          </div>
          <h3>${ch.title}</h3>
          <p>${ch.description}</p>
          <div class="challenge-footer">
            <span class="challenge-points">+${ch.points} pts</span>
            <button class="challenge-btn ${isCompleted ? 'done' : ''}" onclick="completeChallenge('${ch.id}')">
              ${isCompleted ? '✓ Done' : 'Complete'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    document.getElementById('challengeGrid').innerHTML = '<div class="loading">Unable to load challenges.</div>';
  }
}

async function completeChallenge(challengeId) {
  if (completedChallenges.has(challengeId)) return;
  completedChallenges.add(challengeId);
  localStorage.setItem('hna_challenges', JSON.stringify([...completedChallenges]));

  try {
    const response = await fetch('/api/challenges/complete', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, challengeId }),
    });
    const data = await response.json();
    if (data.success) {
      showToast(`Challenge complete! +${data.points} points`, 'success');
      loadChallenges();
      loadProfile();
      loadLeaderboard();
    }
  } catch (error) {
    showToast('Failed to complete challenge', 'error');
  }
}

// ============================================================
//  ROADMAP
// ============================================================

async function loadRoadmap() {
  try {
    const response = await fetch('/api/roadmap');
    const data = await response.json();
    const roadmap = data.roadmap || [];

    const container = document.getElementById('roadmapContainer');
    container.innerHTML = roadmap.map(phase => `
      <div class="roadmap-phase" style="border-left-color: ${phase.color}">
        <div class="roadmap-phase-header">
          <span class="roadmap-phase-icon">${phase.icon}</span>
          <div>
            <div class="roadmap-phase-title">${phase.phase}</div>
            <div class="roadmap-phase-duration">${phase.duration}</div>
          </div>
        </div>
        <ul class="roadmap-items">
          ${phase.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  } catch (error) {
    document.getElementById('roadmapContainer').innerHTML = '<div class="loading">Unable to load roadmap.</div>';
  }
}

// ============================================================
//  PROJECTS
// ============================================================

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    const data = await response.json();
    const projects = data.projects || [];

    const grid = document.getElementById('projectGrid');
    if (projects.length === 0) {
      grid.innerHTML = '<div class="loading">No projects yet. Be the first to share!</div>';
      return;
    }

    grid.innerHTML = projects.map(p => `
      <div class="project-card">
        <h3>${p.title}</h3>
        <div class="project-author">By ${p.student_name}</div>
        <p class="project-desc">${p.description}</p>
        ${p.problem ? `<div class="project-problem"><strong>Problem:</strong> ${p.problem}</div>` : ''}
        ${p.solution ? `<div class="project-solution"><strong>Solution:</strong> ${p.solution}</div>` : ''}
        ${p.tech_stack ? `<div class="project-tech">${p.tech_stack.split(',').map(t => `<span class="tech-tag">${t.trim()}</span>`).join('')}</div>` : ''}
        ${p.url ? `<a href="${p.url}" target="_blank" class="project-url">View Project →</a>` : ''}
      </div>
    `).join('');
  } catch (error) {
    document.getElementById('projectGrid').innerHTML = '<div class="loading">Unable to load projects.</div>';
  }
}

function showProjectForm() {
  document.getElementById('projectModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectForm() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
}

async function submitProject(event) {
  event.preventDefault();
  const title = document.getElementById('projectTitle').value;
  const description = document.getElementById('projectDescription').value;
  const problem = document.getElementById('projectProblem').value;
  const solution = document.getElementById('projectSolution').value;
  const techStack = document.getElementById('projectTech').value;
  const url = document.getElementById('projectUrl').value;

  try {
    const response = await fetch('/api/projects', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, studentName: studentName || 'Student', title, description, problem, solution, techStack, url }),
    });

    if (response.ok) {
      showToast('Project submitted! 🎉', 'success');
      closeProjectForm();
      event.target.reset();
      loadProjects();
    } else {
      showToast('Failed to submit project', 'error');
    }
  } catch (error) {
    showToast('Connection error', 'error');
  }
}

// ============================================================
//  RESOURCES
// ============================================================

async function loadResources() {
  try {
    const response = await fetch('/api/resources');
    const data = await response.json();
    const resources = data.resources || [];

    const grid = document.getElementById('resourceGrid');
    grid.innerHTML = resources.map(r => `
      <a href="${r.url}" target="_blank" class="resource-card">
        <span class="resource-icon">${r.icon}</span>
        <span class="resource-category">${r.category}</span>
        <h3>${r.title}</h3>
        <p>${r.description}</p>
      </a>
    `).join('');
  } catch (error) {
    document.getElementById('resourceGrid').innerHTML = '<div class="loading">Unable to load resources.</div>';
  }
}

// ============================================================
//  PROFILE & LEADERBOARD
// ============================================================

async function loadProfile() {
  try {
    const response = await fetch(`/api/students/${studentId}`);
    const data = await response.json();
    const student = data.student || {};

    document.getElementById('profileName').textContent = student.name || studentName || 'Student';
    document.getElementById('profileCountry').textContent = student.country || studentCountry || 'Nepal';
    document.getElementById('profilePoints').textContent = student.points || 0;
    document.getElementById('profileCompleted').textContent = data.completedLessons || 0;
    document.getElementById('profileQuizzes').textContent = Math.round((student.points || 0) / 10);
    document.getElementById('profileChallenges').textContent = data.challengesCompleted || completedChallenges.size;

    const points = student.points || 0;
    let level = 1;
    if (points >= 1000) level = 6;
    else if (points >= 500) level = 5;
    else if (points >= 300) level = 4;
    else if (points >= 150) level = 3;
    else if (points >= 50) level = 2;
    document.getElementById('profileLevel').textContent = `Level ${level}`;

    if (studentName) {
      const banner = document.getElementById('welcomeBanner');
      banner.style.display = 'block';
      document.getElementById('welcomeText').textContent = `Welcome back, ${studentName}! 🎉`;
      document.getElementById('userPoints').textContent = `${points} points`;
      document.getElementById('userProgress').textContent = `${data.completedLessons || 0} lessons completed`;
    }

    renderCertificates();
  } catch (error) { console.error('Profile load error:', error); }
}

function renderCertificates() {
  const container = document.getElementById('certificates');
  const earned = courses.filter(c => c.lessons.every(l => completedLessons.has(l.id)));

  if (earned.length === 0) {
    container.innerHTML = '<h4>Certificates</h4><p class="empty-state">Complete all lessons in a course to earn a certificate.</p>';
    return;
  }
  container.innerHTML = `<h4>Certificates</h4>${earned.map(c => `
    <div class="certificate-badge" onclick="showCertificateById('${c.id}')"><span>🏆</span><span>${c.title}</span></div>
  `).join('')}`;
}

function editProfile() {
  const name = prompt('What is your name?', studentName);
  if (name && name.trim()) {
    studentName = name.trim();
    localStorage.setItem('hna_student_name', studentName);
    const country = prompt('What is your country?', studentCountry);
    if (country && country.trim()) {
      studentCountry = country.trim();
      localStorage.setItem('hna_student_country', studentCountry);
    }
    fetch('/api/students', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: studentName, country: studentCountry }),
    }).then(() => loadProfile()).catch(() => loadProfile());
  }
}

async function loadLeaderboard() {
  try {
    const response = await fetch('/api/leaderboard');
    const data = await response.json();
    const leaderboard = data.leaderboard || [];
    const podium = document.getElementById('leaderboardPodium');
    const list = document.getElementById('leaderboardList');

    if (leaderboard.length === 0) {
      podium.innerHTML = '';
      list.innerHTML = '<div class="loading">No leaderboard data yet. Start learning to appear here!</div>';
      return;
    }

    const top3 = leaderboard.slice(0, 3);
    const order = top3.length >= 2 ? [1, 0, 2] : [0];
    podium.innerHTML = order.map(idx => {
      const person = top3[idx];
      if (!person) return '';
      const rank = idx + 1;
      const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';
      return `<div class="podium-item ${rank === 1 ? 'first' : rank === 2 ? 'second' : 'third'}">
        <div class="podium-rank">${medal}</div><div class="podium-name">${person.name}</div><div class="podium-points">${person.points} pts</div>
      </div>`;
    }).join('');

    list.innerHTML = leaderboard.map((p, idx) => `
      <div class="leaderboard-row">
        <span class="leaderboard-rank">#${idx + 1}</span>
        <span class="leaderboard-name">${p.name}</span>
        <span class="leaderboard-country">${p.country || 'Nepal'}</span>
        <span class="leaderboard-points">${p.points} pts</span>
      </div>
    `).join('');
  } catch (error) {
    document.getElementById('leaderboardList').innerHTML = '<div class="loading">Unable to load leaderboard.</div>';
  }
}

// ============================================================
//  SEARCH
// ============================================================

let searchTimeout;
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    const query = this.value.trim();
    if (query.length < 2) { document.getElementById('searchResults').classList.remove('active'); return; }
    searchTimeout = setTimeout(() => performSearch(query), 300);
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-search')) document.getElementById('searchResults').classList.remove('active');
  });
}

async function performSearch(query) {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const results = data.results || [];
    const container = document.getElementById('searchResults');
    if (results.length === 0) {
      container.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
      container.innerHTML = results.map(r => `
        <div class="search-result-item" onclick="handleSearchResult('${r.type}', '${r.id}', '${r.courseId || ''}')">
          <span>${r.icon}</span>
          <div><div style="font-weight:600;">${r.title}</div><div style="font-size:0.8rem;color:var(--text-secondary);">${r.type === 'course' ? 'Course' : r.course}</div></div>
        </div>
      `).join('');
    }
    container.classList.add('active');
  } catch (error) {}
}

function handleSearchResult(type, id, courseId) {
  document.getElementById('searchResults').classList.remove('active');
  document.getElementById('searchInput').value = '';
  if (type === 'course') openCourse(id);
  else openLesson(courseId, id);
}

// ============================================================
//  CONTACT & NEWSLETTER
// ============================================================

async function submitContact(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;
  try {
    const response = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });
    if (response.ok) { showToast('Message sent! 📬', 'success'); event.target.reset(); }
    else showToast('Failed to send message', 'error');
  } catch (error) { showToast('Connection error', 'error'); }
}

async function subscribeNewsletter(event) {
  event.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (response.ok) { showToast('Subscribed! 📧', 'success'); event.target.reset(); }
    else showToast('Failed to subscribe', 'error');
  } catch (error) { showToast('Connection error', 'error'); }
}

// ============================================================
//  ADMIN
// ============================================================

function openAdmin(event) {
  event.preventDefault();
  const password = prompt('Enter admin password:');
  if (password !== 'admin123') { showToast('Incorrect password', 'error'); return; }
  document.getElementById('adminModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  loadAdminData();
}

function closeAdmin() { document.getElementById('adminModal').classList.remove('active'); document.body.style.overflow = ''; }

async function loadAdminData() {
  try {
    const statsRes = await fetch('/api/admin/stats');
    const stats = await statsRes.json();
    document.getElementById('adminStats').innerHTML = `
      <div class="admin-stat"><span class="admin-stat-num">${stats.students}</span><span class="admin-stat-label">Students</span></div>
      <div class="admin-stat"><span class="admin-stat-num">${stats.completedLessons}</span><span class="admin-stat-label">Lessons Done</span></div>
      <div class="admin-stat"><span class="admin-stat-num">${stats.quizzesTaken}</span><span class="admin-stat-label">Quizzes</span></div>
      <div class="admin-stat"><span class="admin-stat-num">${stats.challengesCompleted}</span><span class="admin-stat-label">Challenges</span></div>
      <div class="admin-stat"><span class="admin-stat-num">${stats.projectsSubmitted}</span><span class="admin-stat-label">Projects</span></div>
      <div class="admin-stat"><span class="admin-stat-num">${stats.contacts}</span><span class="admin-stat-label">Contacts</span></div>
      <div class="admin-stat"><span class="admin-stat-num">${stats.newsletterSubscribers}</span><span class="admin-stat-label">Subscribers</span></div>
    `;

    const studentsRes = await fetch('/api/admin/students');
    const studentsData = await studentsRes.json();
    const students = studentsData.students || [];
    const tbody = document.querySelector('#adminStudentsTable tbody');
    tbody.innerHTML = students.map(s => `<tr><td>${s.name}</td><td>${s.email || '-'}</td><td>${s.country}</td><td>${s.points}</td><td>${new Date(s.created_at).toLocaleDateString()}</td></tr>`).join('');
  } catch (error) { showToast('Failed to load admin data', 'error'); }
}

// ============================================================
//  CERTIFICATES
// ============================================================

function showCertificateById(courseId) {
  const course = courses.find(c => c.id === courseId);
  if (course) showCertificate(course);
}

function showCertificate(course) {
  document.getElementById('certStudentName').textContent = studentName || 'Student';
  document.getElementById('certCourseName').textContent = course.title;
  document.getElementById('certDate').textContent = new Date().toLocaleDateString();
  document.getElementById('certificateModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertificate() { document.getElementById('certificateModal').classList.remove('active'); document.body.style.overflow = ''; }

function downloadCertificate() {
  const cert = document.getElementById('certificateContent');
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`<html><head><title>Certificate</title><style>
    body{font-family:Inter,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f1f5f9;}
    .certificate{background:linear-gradient(135deg,#fff9e6,#fff);border:8px solid #d4af37;border-radius:16px;padding:60px;text-align:center;width:700px;}
    .certificate-icon{font-size:3rem;}h2{color:#1e293b;}.certificate-name{font-size:2rem;color:#1e293b;}
    .certificate-course{font-size:1.5rem;color:#2563eb;}.certificate-seal{display:inline-block;margin-top:24px;padding:12px 32px;border:2px solid #d4af37;border-radius:100px;font-weight:700;color:#d4af37;}
  </style></head><body>${cert.outerHTML}</body></html>`);
  printWindow.document.close();
  printWindow.print();
}

// ============================================================
//  UI HELPERS
// ============================================================

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  navbar.style.boxShadow = window.scrollY > 50 ? '0 2px 12px rgba(0,0,0,0.08)' : 'none';
});

// Close modals on overlay click
['lessonModal', 'adminModal', 'certificateModal', 'projectModal'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', function(e) { if (e.target === this) { this.classList.remove('active'); document.body.style.overflow = ''; } });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    ['lessonModal', 'adminModal', 'certificateModal', 'projectModal'].forEach(id => {
      document.getElementById(id)?.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// ============================================================
//  INIT
// ============================================================

function init() {
  initTheme();
  loadLanguages();
  loadCourses();
  loadChallenges();
  loadRoadmap();
  loadProjects();
  loadResources();
  loadLeaderboard();

  if (!studentName) {
    setTimeout(() => {
      const name = prompt('Welcome to Humanity Nepal AI! 🎓\n\nWhat is your name?');
      if (name && name.trim()) {
        studentName = name.trim();
        localStorage.setItem('hna_student_name', studentName);
        fetch('/api/students', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: studentName, country: studentCountry }),
        }).then(() => loadProfile()).catch(() => loadProfile());
      } else { loadProfile(); }
    }, 1000);
  } else { loadProfile(); }
}

init();
