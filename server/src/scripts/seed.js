/**
 * Master seed runner.
 * Run: node src/scripts/seed.js
 * Or:  npm run seed
 */
import { connectDB } from '../config/db.js';
import logger from '../utils/logger.js';
import mongoose from 'mongoose';

async function run() {
  logger.info('🌱 Starting full seed…');
  await connectDB();

  const { main: seedSkills }     = await import('./seedSkills.js');
  const { main: seedCompanies }  = await import('./seedCompanies.js');
  const { main: seedQuestions }  = await import('./seedQuestions.js');
  const { main: seedResources }  = await import('./seedResources.js');

  await seedSkills();
  await seedCompanies();
  await seedQuestions();
  await seedResources();

  logger.info('✅ All seeds complete');
  await mongoose.disconnect();
}

run().catch((err) => {
  logger.error(err, 'Seed runner failed');
  process.exit(1);
});
