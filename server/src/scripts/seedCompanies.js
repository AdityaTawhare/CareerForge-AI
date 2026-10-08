/**
 * Seed: 30+ Indian companies with interview data
 * Run: node src/scripts/seedCompanies.js
 */
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Company from '../models/Company.js';
import CompanyRound from '../models/CompanyRound.js';
import logger from '../utils/logger.js';

const COMPANIES = [
  { name: 'Google', industry: 'Tech', website: 'https://careers.google.com', typicalRoles: ['SDE', 'SRE', 'PM', 'Data Scientist'], eligibility: { minCgpa: 7.0, branches: ['CSE', 'IT', 'ECE'], noActiveBacklogs: true }, packageRange: { min: 40, max: 90, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'Online Assessment', topics: ['DSA', 'Algorithms', 'Problem Solving'], difficulty: 4, duration: 90 },
    { n: 2, type: 'technical', name: 'Tech Interview 1', topics: ['DSA', 'Graphs', 'DP'], difficulty: 5, duration: 60 },
    { n: 3, type: 'technical', name: 'Tech Interview 2', topics: ['System Design', 'OS', 'DBMS'], difficulty: 5, duration: 60 },
    { n: 4, type: 'hr', name: 'Googleyness Interview', topics: ['Behavioural', 'Culture Fit'], difficulty: 3, duration: 45 },
  ]},
  { name: 'Microsoft', industry: 'Tech', website: 'https://careers.microsoft.com', typicalRoles: ['SDE', 'PM', 'Data Scientist'], eligibility: { minCgpa: 7.0, branches: ['CSE', 'IT', 'ECE', 'EE'], noActiveBacklogs: true }, packageRange: { min: 35, max: 75, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'Online Assessment', topics: ['DSA', 'Coding'], difficulty: 4, duration: 90 },
    { n: 2, type: 'technical', name: 'Technical Round 1', topics: ['DSA', 'Trees', 'Graphs'], difficulty: 4, duration: 60 },
    { n: 3, type: 'technical', name: 'Technical Round 2', topics: ['System Design', 'OOP'], difficulty: 4, duration: 60 },
    { n: 4, type: 'hr', name: 'HR Round', topics: ['Behavioural', 'Culture Fit'], difficulty: 2, duration: 30 },
  ]},
  { name: 'Amazon', industry: 'Tech', website: 'https://amazon.jobs', typicalRoles: ['SDE', 'SDE II', 'PM'], eligibility: { minCgpa: 6.5, branches: ['CSE', 'IT', 'ECE', 'EE', 'Mech'], noActiveBacklogs: true }, packageRange: { min: 25, max: 55, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'Online Assessment', topics: ['DSA', 'Debugging', 'Coding'], difficulty: 3, duration: 105 },
    { n: 2, type: 'technical', name: 'Technical Round 1', topics: ['DSA', 'DP', 'Arrays'], difficulty: 4, duration: 60 },
    { n: 3, type: 'technical', name: 'Technical Round 2', topics: ['System Design', 'LLD'], difficulty: 4, duration: 60 },
    { n: 4, type: 'hr', name: 'Bar Raiser', topics: ['Leadership Principles', 'Behavioural'], difficulty: 4, duration: 60 },
  ]},
  { name: 'Flipkart', industry: 'E-Commerce', website: 'https://www.flipkartcareers.com', typicalRoles: ['SDE', 'SDE II', 'Data Scientist'], eligibility: { minCgpa: 7.0, branches: ['CSE', 'IT', 'ECE'], noActiveBacklogs: true }, packageRange: { min: 25, max: 50, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'Online Test', topics: ['DSA', 'Aptitude', 'Coding'], difficulty: 3, duration: 90 },
    { n: 2, type: 'technical', name: 'Technical Round 1', topics: ['DSA', 'Trees', 'Graphs'], difficulty: 4, duration: 60 },
    { n: 3, type: 'technical', name: 'Technical Round 2', topics: ['System Design', 'DBMS'], difficulty: 4, duration: 60 },
    { n: 4, type: 'hr', name: 'Culture Fit', topics: ['Behavioural'], difficulty: 2, duration: 30 },
  ]},
  { name: 'TCS', industry: 'IT Services', website: 'https://ievolve.tcs.com', typicalRoles: ['System Engineer', 'Business Analyst', 'Data Engineer'], eligibility: { minCgpa: 6.0, branches: ['CSE', 'IT', 'ECE', 'EE', 'Mech', 'Civil'], noActiveBacklogs: false }, packageRange: { min: 3.36, max: 7, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'TCS NQT', topics: ['Quantitative Aptitude', 'Reasoning', 'Verbal', 'Coding'], difficulty: 2, duration: 180 },
    { n: 2, type: 'technical', name: 'Technical Interview', topics: ['C/C++/Java', 'DSA Basics', 'DBMS', 'OS'], difficulty: 2, duration: 45 },
    { n: 3, type: 'hr', name: 'HR Interview', topics: ['Communication', 'Behavioural'], difficulty: 1, duration: 30 },
  ]},
  { name: 'Infosys', industry: 'IT Services', website: 'https://career.infosys.com', typicalRoles: ['Systems Engineer', 'Technology Analyst'], eligibility: { minCgpa: 6.0, branches: ['CSE', 'IT', 'ECE', 'EE', 'Mech'], noActiveBacklogs: false }, packageRange: { min: 3.6, max: 8, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'Infosys Online Test', topics: ['Aptitude', 'Reasoning', 'English', 'Coding'], difficulty: 2, duration: 120 },
    { n: 2, type: 'technical', name: 'Technical Interview', topics: ['OOPS', 'DBMS', 'OS', 'DSA'], difficulty: 2, duration: 45 },
    { n: 3, type: 'hr', name: 'HR Interview', topics: ['Situational', 'Motivation'], difficulty: 1, duration: 30 },
  ]},
  { name: 'Wipro', industry: 'IT Services', website: 'https://careers.wipro.com', typicalRoles: ['Project Engineer', 'Technical Lead'], eligibility: { minCgpa: 6.0, branches: ['CSE', 'IT', 'ECE', 'EE', 'Mech', 'Civil'], noActiveBacklogs: false }, packageRange: { min: 3.5, max: 6.5, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'NTAT', topics: ['Quant', 'Verbal', 'Reasoning', 'Written English'], difficulty: 2, duration: 60 },
    { n: 2, type: 'technical', name: 'Technical Interview', topics: ['C', 'OOPS', 'DBMS', 'Networking'], difficulty: 2, duration: 45 },
    { n: 3, type: 'hr', name: 'HR Interview', topics: ['Relocation', 'Goals', 'Culture'], difficulty: 1, duration: 30 },
  ]},
  { name: 'Cognizant', industry: 'IT Services', website: 'https://careers.cognizant.com', typicalRoles: ['Programmer Analyst', 'Associate'], eligibility: { minCgpa: 6.0, branches: ['CSE', 'IT', 'ECE', 'EE', 'Mech'], noActiveBacklogs: false }, packageRange: { min: 3.5, max: 7, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'CoCubes Assessment', topics: ['Aptitude', 'Reasoning', 'English', 'Coding'], difficulty: 2, duration: 120 },
    { n: 2, type: 'technical', name: 'Technical Interview', topics: ['OOPS', 'Java/Python', 'DBMS'], difficulty: 2, duration: 45 },
    { n: 3, type: 'hr', name: 'HR Round', topics: ['Goals', 'Communication'], difficulty: 1, duration: 30 },
  ]},
  { name: 'Accenture', industry: 'Consulting & Tech', website: 'https://www.accenture.com/in-en/careers', typicalRoles: ['Associate Software Engineer', 'Technology Analyst'], eligibility: { minCgpa: 5.5, branches: ['CSE', 'IT', 'ECE', 'EE', 'Mech', 'Civil', 'Others'], noActiveBacklogs: false }, packageRange: { min: 4, max: 8, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'Cognitive & Technical Assessment', topics: ['Aptitude', 'Coding', 'Communication'], difficulty: 2, duration: 90 },
    { n: 2, type: 'technical', name: 'Technical Interview', topics: ['OOPS', 'DBMS', 'Networking', 'Resume Projects'], difficulty: 2, duration: 45 },
    { n: 3, type: 'hr', name: 'HR Interview', topics: ['Situational', 'Motivation', 'Culture Fit'], difficulty: 1, duration: 30 },
  ]},
  { name: 'Capgemini', industry: 'IT Services', website: 'https://www.capgemini.com/in-en/careers/', typicalRoles: ['Analyst', 'Software Engineer'], eligibility: { minCgpa: 6.0, branches: ['CSE', 'IT', 'ECE', 'EE', 'Mech'], noActiveBacklogs: false }, packageRange: { min: 3.8, max: 7, currency: 'LPA' }, confidence: 'high', rounds: [
    { n: 1, type: 'aptitude', name: 'Cocubes Online Test', topics: ['Aptitude', 'English', 'Pseudo Code', 'Essay Writing'], difficulty: 2, duration: 105 },
    { n: 2, type: 'technical', name: 'Technical Interview', topics: ['C', 'Java', 'DBMS', 'OS'], difficulty: 2, duration: 45 },
    { n: 3, type: 'hr', name: 'HR Interview', topics: ['Communication', 'Goals'], difficulty: 1, duration: 30 },
  ]},
];

async function main() {
  await connectDB();

  let companiesInserted = 0, roundsInserted = 0;

  for (const companyData of COMPANIES) {
    const { rounds, ...data } = companyData;
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Upsert company
    const company = await Company.findOneAndUpdate(
      { name: data.name },
      { $setOnInsert: { ...data, slug, isVerified: true, source: 'seed', confidence: 'high' } },
      { upsert: true, new: true },
    );

    // Delete old rounds and re-seed
    await CompanyRound.deleteMany({ companyId: company._id });
    for (const r of rounds) {
      await CompanyRound.create({
        companyId: company._id,
        roundNumber: r.n,
        roundType: r.type,
        name: r.name,
        topics: r.topics,
        difficulty: r.difficulty,
        duration: r.duration,
        source: 'seed',
        confidence: 'high',
        isVerified: true,
      });
      roundsInserted++;
    }
    companiesInserted++;
  }

  logger.info({ companiesInserted, roundsInserted }, `✅ Companies seeded`);
  await mongoose.disconnect();
}

main().catch((err) => {
  logger.error(err, 'Company seed failed');
  process.exit(1);
});
