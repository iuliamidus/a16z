import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cursorData } from '../../data/cursorData';

export default function CursorTimeline() {
  const { timeline } = cursorData;

  const formatValue = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
    return `$${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="cursor-tooltip">
          <p className="tooltip-event">{data.event}</p>
          <p className="tooltip-date">{data.year} {data.quarter}</p>
          {data.investor && <p className="tooltip-investor">{data.investor}</p>}
          <p className="tooltip-valuation">{formatValue(data.valuation)}</p>
          {data.funding && <p className="tooltip-funding">Raised: {formatValue(data.funding)}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="cursor-section"
    >
      <div className="section-header">
        <h2 className="section-title">The Journey: 73x Growth in 24 Months</h2>
        <p className="section-subtitle">From MIT dorm room to $29.3B company</p>
      </div>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={timeline} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="valuationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="year" 
              stroke="#888" 
              tick={{ fill: '#888' }}
            />
            <YAxis 
              tickFormatter={formatValue}
              stroke="#888"
              tick={{ fill: '#888' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="valuation" 
              stroke="#d4af37" 
              strokeWidth={3}
              fill="url(#valuationGradient)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="milestone-grid">
        {timeline.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="milestone-card"
          >
            <div className="milestone-date">{milestone.year} {milestone.quarter}</div>
            <div className="milestone-event">{milestone.event}</div>
            {milestone.investor && <div className="milestone-investor">{milestone.investor}</div>}
            <div className="milestone-description">{milestone.description}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
