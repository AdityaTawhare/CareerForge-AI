// Sample student profile (mirrors Phase 3 DB schema)
export const sampleProfile = {
  id: 'usr_001',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@bits.edu.in',
  college: 'BITS Pilani, Goa',
  branch: 'Computer Science',
  gradYear: 2025,
  cgpa: 8.4,
  avatar: null,
  skills: [
    { name: 'Data Structures', level: 85, category: 'CS Fundamentals' },
    { name: 'System Design', level: 62, category: 'Architecture' },
    { name: 'React', level: 78, category: 'Frontend' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'SQL', level: 72, category: 'Databases' },
    { name: 'Python', level: 80, category: 'Programming' },
    { name: 'Machine Learning', level: 55, category: 'AI/ML' },
    { name: 'Networking', level: 40, category: 'CS Fundamentals' },
  ],
  experience: [
    {
      title: 'SDE Intern',
      company: 'Razorpay',
      duration: '2 months',
      year: 2024,
      tech: ['Node.js', 'Redis', 'PostgreSQL'],
    },
  ],
  projects: [
    {
      name: 'Distributed Cache',
      description: 'Redis-based LRU cache with TTL eviction',
      tech: ['Go', 'Redis', 'Docker'],
      stars: 47,
    },
  ],
  readinessScore: 72,
  streak: 14,
  mocksCompleted: 6,
};
