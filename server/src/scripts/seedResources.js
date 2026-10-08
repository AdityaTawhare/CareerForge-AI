/**
 * Seed: Free learning resources
 */
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Resource from '../models/Resource.js';
import logger from '../utils/logger.js';

const RESOURCES = [
  { title: 'LeetCode — Top Interview 150',          url: 'https://leetcode.com/studyplan/top-interview-150/',           type: 'problem',  topic: 'DSA',            platform: 'LeetCode',   difficulty: 'medium', isFree: true },
  { title: 'NeetCode 150',                          url: 'https://neetcode.io/practice',                                type: 'problem',  topic: 'DSA',            platform: 'NeetCode',   difficulty: 'medium', isFree: true },
  { title: 'Striver\'s A2Z DSA Sheet',              url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', type: 'article', topic: 'DSA', platform: 'TakeUForward', difficulty: 'all', isFree: true },
  { title: 'CS50 — Introduction to Computer Science', url: 'https://cs50.harvard.edu/x/',                              type: 'course',   topic: 'CS Fundamentals', platform: 'Harvard/edX', difficulty: 'easy',  isFree: true },
  { title: 'MIT OCW 6.006 Algorithms',              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/', type: 'course', topic: 'DSA', platform: 'MIT OCW', difficulty: 'hard', isFree: true },
  { title: 'System Design Primer (GitHub)',          url: 'https://github.com/donnemartin/system-design-primer',        type: 'article',  topic: 'System Design',  platform: 'GitHub',     difficulty: 'hard',  isFree: true },
  { title: 'Gaurav Sen — System Design YouTube',    url: 'https://www.youtube.com/@gkcs',                              type: 'video',    topic: 'System Design',  platform: 'YouTube',    difficulty: 'medium', isFree: true },
  { title: 'Abdul Bari — Algorithms YouTube',       url: 'https://www.youtube.com/@abdul_bari',                        type: 'video',    topic: 'DSA',            platform: 'YouTube',    difficulty: 'medium', isFree: true },
  { title: 'Jenny\'s Lectures CS/IT',               url: 'https://www.youtube.com/@JennyslecturesCSIT',               type: 'video',    topic: 'CS Fundamentals', platform: 'YouTube',   difficulty: 'easy',  isFree: true },
  { title: 'GeeksForGeeks — DBMS',                  url: 'https://www.geeksforgeeks.org/dbms/',                        type: 'article',  topic: 'DBMS',           platform: 'GFG',        difficulty: 'medium', isFree: true },
  { title: 'GeeksForGeeks — OS Concepts',           url: 'https://www.geeksforgeeks.org/operating-systems/',           type: 'article',  topic: 'OS',             platform: 'GFG',        difficulty: 'medium', isFree: true },
  { title: 'Roadmap.sh — Backend Developer',        url: 'https://roadmap.sh/backend',                                 type: 'article',  topic: 'Backend',        platform: 'roadmap.sh', difficulty: 'all',   isFree: true },
  { title: 'IndiaBix — Aptitude',                   url: 'https://www.indiabix.com/',                                  type: 'problem',  topic: 'Aptitude',       platform: 'IndiaBix',   difficulty: 'easy',  isFree: true },
  { title: 'TCS NQT Prep — GeeksForGeeks',          url: 'https://www.geeksforgeeks.org/tcs-nqt-national-qualifier-test/', type: 'article', topic: 'Aptitude', platform: 'GFG', difficulty: 'easy', isFree: true },
  { title: 'InterviewBit — Mock Interviews',        url: 'https://www.interviewbit.com/mock-interview/',               type: 'tool',     topic: 'Behavioural',    platform: 'InterviewBit', difficulty: 'medium', isFree: true },
];

export async function main() {
  let inserted = 0;
  for (const r of RESOURCES) {
    try {
      await Resource.findOneAndUpdate(
        { url: r.url },
        { $setOnInsert: { ...r, isVerified: true, isUrlAlive: true, lastChecked: new Date() } },
        { upsert: true, new: false },
      );
      inserted++;
    } catch (_) {}
  }
  logger.info({ inserted }, `✅ Resources seeded`);
}

if (process.argv[1].includes('seedResources')) {
  connectDB()
    .then(main)
    .then(() => mongoose.disconnect())
    .catch((e) => { logger.error(e); process.exit(1); });
}
