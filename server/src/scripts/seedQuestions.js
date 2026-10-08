/**
 * Seed: Sample Questions (aptitude, technical, HR)
 */
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Question from '../models/Question.js';
import logger from '../utils/logger.js';

const QUESTIONS = [
  // ── Aptitude ──────────────────────────────────────────────────────
  { type: 'aptitude', topic: 'Quantitative Aptitude', subtopic: 'Percentages', difficulty: 2, question: 'If 20% of a number is 40, what is 45% of that number?', options: ['90', '80', '70', '100'], correctAnswer: '90', explanation: '20% = 40 → number = 200. 45% of 200 = 90.' },
  { type: 'aptitude', topic: 'Quantitative Aptitude', subtopic: 'Speed & Distance', difficulty: 3, question: 'A train 200m long passes a pole in 10 seconds. Find the speed of the train in km/h.', options: ['72', '60', '80', '54'], correctAnswer: '72', explanation: 'Speed = 200/10 = 20 m/s = 20 × 18/5 = 72 km/h' },
  { type: 'aptitude', topic: 'Logical Reasoning', subtopic: 'Series', difficulty: 2, question: 'Find the next term: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctAnswer: '42', explanation: 'Differences: 4,6,8,10,12. Next term: 30+12=42.' },
  { type: 'aptitude', topic: 'Verbal Ability', subtopic: 'Reading Comprehension', difficulty: 2, question: 'Choose the synonym of "Benevolent"', options: ['Malicious', 'Kind', 'Indifferent', 'Hostile'], correctAnswer: 'Kind', explanation: 'Benevolent means well-meaning and kindly.' },

  // ── Technical ─────────────────────────────────────────────────────
  { type: 'technical', topic: 'DSA', subtopic: 'Arrays', difficulty: 2, question: 'What is the time complexity of finding an element in an unsorted array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswer: 'O(n)', explanation: 'Linear search is needed for unsorted arrays — O(n).' },
  { type: 'technical', topic: 'DSA', subtopic: 'Trees', difficulty: 3, question: 'What is the height of a complete binary tree with n nodes?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctAnswer: 'O(log n)', explanation: 'A complete binary tree has height ⌊log₂(n)⌋.' },
  { type: 'technical', topic: 'DBMS', subtopic: 'SQL', difficulty: 2, question: 'Which SQL clause is used to filter groups returned by GROUP BY?', options: ['WHERE', 'HAVING', 'ORDER BY', 'SELECT'], correctAnswer: 'HAVING', explanation: 'HAVING filters after grouping; WHERE filters before aggregation.' },
  { type: 'technical', topic: 'OS', subtopic: 'Processes', difficulty: 3, question: 'What is the difference between a process and a thread?', options: ['No difference', 'Thread has its own memory space', 'Process is lighter than thread', 'Thread shares memory with other threads of the same process'], correctAnswer: 'Thread shares memory with other threads of the same process', explanation: 'Threads share heap and code segments; each process has its own address space.' },
  { type: 'technical', topic: 'Computer Networks', subtopic: 'TCP/IP', difficulty: 3, question: 'What does the OSI session layer (Layer 5) do?', options: ['Physical data transmission', 'Manages sessions between applications', 'Logical addressing', 'Data encoding'], correctAnswer: 'Manages sessions between applications', explanation: 'Layer 5 establishes, manages, and terminates sessions between applications.' },
  { type: 'technical', topic: 'OOP', subtopic: 'SOLID', difficulty: 3, question: 'Which SOLID principle states that a class should have only one reason to change?', options: ['Open/Closed', 'Liskov Substitution', 'Single Responsibility', 'Interface Segregation'], correctAnswer: 'Single Responsibility', explanation: 'SRP: A class should do only one thing, and have only one reason to change.' },

  // ── HR ────────────────────────────────────────────────────────────
  { type: 'hr', topic: 'Behavioural', subtopic: 'Teamwork', difficulty: 2, question: 'Tell me about a time you had a conflict with a team member. How did you handle it?', options: [], correctAnswer: '', explanation: 'Use STAR format: Situation, Task, Action, Result. Focus on resolution and learning.' },
  { type: 'hr', topic: 'Behavioural', subtopic: 'Leadership', difficulty: 3, question: 'Describe a situation where you took initiative beyond your assigned role.', options: [], correctAnswer: '', explanation: 'Highlight ownership, impact, and what you learned from going beyond expectations.' },
  { type: 'hr', topic: 'Motivational', subtopic: 'Career Goals', difficulty: 2, question: 'Where do you see yourself in 5 years?', options: [], correctAnswer: '', explanation: 'Answer should align with the company\'s growth trajectory and your genuine career goals.' },
];

export async function main() {
  let inserted = 0;
  for (const q of QUESTIONS) {
    try {
      await Question.findOneAndUpdate(
        { question: q.question },
        { $setOnInsert: { ...q, isVerified: true, source: 'seed' } },
        { upsert: true, new: false },
      );
      inserted++;
    } catch (_) {}
  }
  logger.info({ inserted }, `✅ Questions seeded`);
}

if (process.argv[1].includes('seedQuestions')) {
  connectDB()
    .then(main)
    .then(() => mongoose.disconnect())
    .catch((e) => { logger.error(e); process.exit(1); });
}
