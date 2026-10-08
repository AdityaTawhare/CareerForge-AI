export const sampleRoadmap = {
  totalDays: 60,
  completedDays: 18,
  tracks: [
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      color: '#6366F1',
      progress: 60,
      topics: [
        { id: 't1', name: 'Arrays & Strings',   status: 'done',        week: 1 },
        { id: 't2', name: 'Linked Lists',         status: 'done',        week: 1 },
        { id: 't3', name: 'Trees & BST',          status: 'done',        week: 2 },
        { id: 't4', name: 'Graphs (BFS/DFS)',      status: 'in-progress', week: 3 },
        { id: 't5', name: 'Dynamic Programming',  status: 'not-started', week: 4 },
        { id: 't6', name: 'Advanced Graphs',       status: 'not-started', week: 5 },
      ],
    },
    {
      id: 'sd',
      name: 'System Design',
      color: '#14B8A6',
      progress: 15,
      topics: [
        { id: 't7',  name: 'Design Principles',      status: 'done',        week: 2 },
        { id: 't8',  name: 'URL Shortener',           status: 'in-progress', week: 3 },
        { id: 't9',  name: 'Rate Limiter',            status: 'not-started', week: 4 },
        { id: 't10', name: 'Distributed Cache',       status: 'not-started', week: 5 },
        { id: 't11', name: 'Notification System',     status: 'not-started', week: 6 },
      ],
    },
    {
      id: 'beh',
      name: 'Behavioural & HR',
      color: '#F59E0B',
      progress: 10,
      topics: [
        { id: 't12', name: 'STAR Framework',          status: 'in-progress', week: 3 },
        { id: 't13', name: 'Google Leadership Stories', status: 'not-started', week: 4 },
      ],
    },
  ],
};
