import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cursorData } from '../../data/cursorData';

export default function CursorSocialProof() {
  const { socialProof } = cursorData;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="cursor-section"
    >
      <div className="section-header">
        <h2 className="section-title">What Developers Actually Say</h2>
        <p className="section-subtitle">Social Listening Analysis - Last 90 Days</p>
      </div>

      <div className="mentions-grid">
        {socialProof.mentions.map((mention, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="mention-card"
          >
            <div className="mention-icon">{mention.icon}</div>
            <div className="mention-phrase">"{mention.phrase}"</div>
            <div className="mention-count">
              <CountUp end={mention.count} duration={2} separator="," /> tweets
            </div>
          </motion.div>
        ))}
      </div>

      <div className="comparison-chart">
        <h3 className="chart-title">vs. Competitors: 5x More Organic Advocacy</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={socialProof.comparison} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="company" stroke="#888" tick={{ fill: '#888' }} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ background: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px' }}
              labelStyle={{ color: '#d4af37' }}
            />
            <Bar 
              dataKey="mentions" 
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
            >
              {socialProof.comparison.map((entry, index) => (
                <motion.rect
                  key={`bar-${index}`}
                  fill={entry.color}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="audience-analysis">
        <div className="analysis-header">🎯 Audience Analysis</div>
        <div className="analysis-stat">{socialProof.audienceAnalysis.stat}</div>
        <div className="analysis-subtext">{socialProof.audienceAnalysis.conclusion}</div>
        <div className="analysis-conclusion">Product-market fit proven</div>
      </div>
    </motion.section>
  );
}
