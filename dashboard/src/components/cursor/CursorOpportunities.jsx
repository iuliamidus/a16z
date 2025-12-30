import { motion } from 'framer-motion';
import { cursorData } from '../../data/cursorData';

export default function CursorOpportunities() {
  const { opportunities } = cursorData;

  const getGapColor = (gap) => {
    if (gap.includes('CRITICAL')) return '#ff4444';
    if (gap.includes('HIGH')) return '#ff8800';
    if (gap.includes('MEDIUM')) return '#ffaa00';
    return '#4444ff'; // BLUE OCEAN
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="cursor-section opportunities-section"
    >
      <div className="section-header">
        <h2 className="section-title">Growth Opportunities: Where Cursor Could Do More</h2>
        <p className="section-subtitle">Gaps vs. competitors & untapped channels</p>
      </div>

      <div className="opportunities-grid">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="opportunity-card"
            style={{ borderColor: getGapColor(opportunity.gap) }}
          >
            <div className="opportunity-header">
              <div className="opportunity-number">{opportunity.number}</div>
              <div className="opportunity-gap" style={{ color: getGapColor(opportunity.gap) }}>
                {opportunity.gap}
              </div>
            </div>
            <h3 className="opportunity-title">{opportunity.title}</h3>
            <p className="opportunity-description">{opportunity.description}</p>
            <div className="opportunity-impact">
              <strong>Impact:</strong> {opportunity.impact}
            </div>
            <div className="opportunity-action">
              <strong>Action:</strong> {opportunity.action}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="opportunities-summary"
      >
        <h3>The Opportunity</h3>
        <p className="summary-stat">3x Audience Reach</p>
        <p className="summary-text">
          Cursor dominates Twitter/X and podcasts. By adding visual platforms, creator programs, 
          and professional video, they could reach 90% of target developers (vs 30% currently).
        </p>
        <p className="summary-impact">
          Expected impact: <strong>+$200M ARR within 18 months</strong>
        </p>
      </motion.div>
    </motion.section>
  );
}
