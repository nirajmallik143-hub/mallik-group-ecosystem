-- ============================================================
-- Humanity Nepal AI — FULL SYSTEM D1 Database Schema
-- Run with: wrangler d1 execute humanity_nepal_ai --file=./src/schema.sql
-- ============================================================

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
