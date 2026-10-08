import {
  RadarChart as ReRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface RadarDataPoint {
  skill: string;
  score: number;
  target?: number;
}

interface Props {
  data: RadarDataPoint[];
  height?: number;
}

export default function SkillRadarChart({ data, height = 300 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReRadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
        />
        {/* Target overlay */}
        {data[0]?.target !== undefined && (
          <Radar
            name="Target"
            dataKey="target"
            stroke="var(--border)"
            fill="var(--primary-50)"
            fillOpacity={0.3}
            strokeDasharray="4 2"
          />
        )}
        {/* Current score */}
        <Radar
          name="Your Score"
          dataKey="score"
          stroke="var(--primary-600)"
          fill="var(--primary-500)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: 13,
            color: 'var(--text-primary)',
          }}
          formatter={(value) => [`${value}/100`, '']}
        />
      </ReRadarChart>
    </ResponsiveContainer>
  );
}
