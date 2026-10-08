export const sampleGapReport = {
  overallReadiness: 72,
  radarData: [
    { skill: 'DSA',              score: 85, target: 90 },
    { skill: 'System Design',    score: 55, target: 85 },
    { skill: 'OOPS/LLD',         score: 70, target: 80 },
    { skill: 'Databases',        score: 72, target: 80 },
    { skill: 'OS/Networking',    score: 48, target: 75 },
    { skill: 'Behavioural',      score: 60, target: 80 },
  ],
  heatmap: {
    rounds:  ['OA', 'Tech 1', 'Tech 2', 'Behavioural'],
    topics:  ['Arrays', 'Trees', 'Graphs', 'DP', 'System Design', 'OS', 'SQL', 'Behavioural STAR'],
    // 0=not covered, 0-1 score
    cells: [
      [0.9, 0.8, 0.6, 0.7, 0.1, 0.3, 0.5, 0.0],
      [0.8, 0.9, 0.7, 0.9, 0.2, 0.4, 0.6, 0.1],
      [0.3, 0.5, 0.6, 0.4, 0.9, 0.5, 0.7, 0.2],
      [0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.9],
    ],
  },
  gaps: [
    { topic: 'System Design (HLD)', severity: 'critical', round: 'Tech 2', details: 'Never attempted distributed design questions' },
    { topic: 'OS Internals',        severity: 'high',     round: 'Tech 1', details: 'Weak on scheduling, memory management' },
    { topic: 'Graph Algorithms',    severity: 'medium',   round: 'OA',     details: 'BFS/DFS ok; Dijkstra/Bellman-Ford weak' },
    { topic: 'Behavioural STAR',    severity: 'medium',   round: 'Behavioural', details: 'No structured STAR stories prepared' },
    { topic: 'SQL Advanced',        severity: 'low',      round: 'Tech 1', details: 'Window functions and CTEs not practiced' },
  ],
};
