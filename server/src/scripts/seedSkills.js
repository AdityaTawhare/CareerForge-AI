/**
 * Seed: Skills Taxonomy
 * Run: node src/scripts/seedSkills.js
 */
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import SkillsTaxonomy from '../models/SkillsTaxonomy.js';
import logger from '../utils/logger.js';

const SKILLS = [
  // ── Technical / DSA ───────────────────────────────────────────────
  { name: 'Arrays & Strings',      category: 'technical', subcategory: 'DSA', level: 'beginner',     aliases: ['array', 'string', 'arrays'] },
  { name: 'Linked Lists',          category: 'technical', subcategory: 'DSA', level: 'intermediate',  aliases: ['linked list', 'singly linked', 'doubly linked'] },
  { name: 'Stacks & Queues',       category: 'technical', subcategory: 'DSA', level: 'intermediate',  aliases: ['stack', 'queue', 'deque'] },
  { name: 'Trees & BST',           category: 'technical', subcategory: 'DSA', level: 'intermediate',  aliases: ['binary tree', 'bst', 'binary search tree'] },
  { name: 'Graphs',                category: 'technical', subcategory: 'DSA', level: 'advanced',      aliases: ['graph', 'bfs', 'dfs', 'topological sort'] },
  { name: 'Dynamic Programming',   category: 'technical', subcategory: 'DSA', level: 'advanced',      aliases: ['dp', 'memoization', 'tabulation'] },
  { name: 'Sorting & Searching',   category: 'technical', subcategory: 'DSA', level: 'beginner',      aliases: ['sorting', 'binary search', 'merge sort'] },
  { name: 'Heaps & Priority Queue',category: 'technical', subcategory: 'DSA', level: 'intermediate',  aliases: ['heap', 'min heap', 'max heap', 'priority queue'] },
  { name: 'Recursion & Backtracking', category: 'technical', subcategory: 'DSA', level: 'advanced',   aliases: ['recursion', 'backtracking', 'n-queens'] },
  { name: 'Hashing',               category: 'technical', subcategory: 'DSA', level: 'intermediate',  aliases: ['hash map', 'hash table', 'dictionary'] },

  // ── Technical / System Design ──────────────────────────────────────
  { name: 'System Design',         category: 'technical', subcategory: 'System Design', level: 'advanced',  aliases: ['HLD', 'high level design', 'architecture'] },
  { name: 'Database Design',       category: 'technical', subcategory: 'System Design', level: 'intermediate', aliases: ['schema design', 'ER diagram', 'normalization'] },
  { name: 'Caching',               category: 'technical', subcategory: 'System Design', level: 'intermediate', aliases: ['redis', 'memcached', 'cache'] },
  { name: 'Load Balancing',        category: 'technical', subcategory: 'System Design', level: 'advanced',  aliases: ['load balancer', 'reverse proxy', 'nginx'] },
  { name: 'Microservices',         category: 'technical', subcategory: 'System Design', level: 'advanced',  aliases: ['microservice', 'service mesh', 'api gateway'] },

  // ── Technical / OS & Networks ──────────────────────────────────────
  { name: 'Operating Systems',     category: 'technical', subcategory: 'CS Fundamentals', level: 'intermediate', aliases: ['OS', 'process', 'thread', 'scheduling'] },
  { name: 'Computer Networks',     category: 'technical', subcategory: 'CS Fundamentals', level: 'intermediate', aliases: ['networking', 'TCP/IP', 'HTTP', 'DNS'] },
  { name: 'DBMS',                  category: 'technical', subcategory: 'CS Fundamentals', level: 'intermediate', aliases: ['database', 'SQL', 'transactions', 'ACID'] },
  { name: 'Object Oriented Design',category: 'technical', subcategory: 'CS Fundamentals', level: 'intermediate', aliases: ['OOP', 'SOLID', 'design patterns'] },

  // ── Technical / Languages ──────────────────────────────────────────
  { name: 'Python',           category: 'technical', subcategory: 'Languages', level: 'intermediate', aliases: ['python3', 'py'] },
  { name: 'Java',             category: 'technical', subcategory: 'Languages', level: 'intermediate', aliases: ['java8', 'java11'] },
  { name: 'JavaScript',       category: 'technical', subcategory: 'Languages', level: 'intermediate', aliases: ['JS', 'ES6', 'node.js'] },
  { name: 'C++',              category: 'technical', subcategory: 'Languages', level: 'intermediate', aliases: ['cpp', 'c plus plus'] },
  { name: 'SQL',              category: 'technical', subcategory: 'Languages', level: 'beginner',     aliases: ['mysql', 'postgresql', 'sqlite'] },

  // ── Aptitude ──────────────────────────────────────────────────────
  { name: 'Quantitative Aptitude', category: 'technical', subcategory: 'Aptitude', level: 'beginner',    aliases: ['quant', 'maths', 'arithmetic'] },
  { name: 'Logical Reasoning',     category: 'technical', subcategory: 'Aptitude', level: 'beginner',    aliases: ['reasoning', 'puzzles', 'logical'] },
  { name: 'Verbal Ability',        category: 'technical', subcategory: 'Aptitude', level: 'beginner',    aliases: ['english', 'grammar', 'comprehension'] },

  // ── Soft Skills ───────────────────────────────────────────────────
  { name: 'Communication',      category: 'soft', subcategory: 'Interpersonal', level: 'intermediate', aliases: ['communication skills', 'verbal communication'] },
  { name: 'Problem Solving',    category: 'soft', subcategory: 'Analytical',    level: 'intermediate', aliases: ['analytical thinking', 'critical thinking'] },
  { name: 'Teamwork',           category: 'soft', subcategory: 'Interpersonal', level: 'beginner',     aliases: ['collaboration', 'team player'] },
  { name: 'Leadership',         category: 'soft', subcategory: 'Management',    level: 'advanced',     aliases: ['management', 'team lead'] },
  { name: 'Time Management',    category: 'soft', subcategory: 'Personal',      level: 'beginner',     aliases: ['prioritization', 'deadlines'] },
  { name: 'Adaptability',       category: 'soft', subcategory: 'Personal',      level: 'beginner',     aliases: ['flexibility', 'learning agility'] },
];

async function main() {
  await connectDB();

  let inserted = 0;
  let skipped  = 0;

  for (const skill of SKILLS) {
    try {
      await SkillsTaxonomy.findOneAndUpdate(
        { name: skill.name },
        { $setOnInsert: { ...skill, isVerified: true, source: 'seed' } },
        { upsert: true, new: false },
      );
      inserted++;
    } catch (err) {
      if (err.code === 11000) { skipped++; }
      else throw err;
    }
  }

  logger.info({ inserted, skipped }, `✅ Skills seeded — ${inserted} inserted, ${skipped} skipped`);
  await mongoose.disconnect();
}

main().catch((err) => {
  logger.error(err, 'Seed failed');
  process.exit(1);
});
