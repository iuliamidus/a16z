import { motion } from 'framer-motion';
import { cursorData } from '../../data/cursorData';

export default function CursorPodcasts() {
  const { podcasts } = cursorData;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="cursor-section"
    >
      <div className="section-header">
        <h2 className="section-title">Founder-Led Media Strategy</h2>
        <p className="section-subtitle">Selective, High-Impact, Long-Form</p>
      </div>

      <div className="podcast-grid">
        {podcasts.map((podcast, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="podcast-card"
            whileHover={{ scale: 1.05 }}
          >
            <div className="podcast-logo">🎙️</div>
            <h3 className="podcast-name">{podcast.name}</h3>
            <div className="podcast-host">{podcast.host}</div>
            <div className="podcast-metrics">
              <div className="podcast-metric">
                <span className="metric-label">Reach:</span>
                <span className="metric-value">{podcast.reach}</span>
              </div>
              <div className="podcast-metric">
                <span className="metric-label">Duration:</span>
                <span className="metric-value">{podcast.duration}</span>
              </div>
            </div>
            <div className="podcast-impact">{podcast.impact}</div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileHover={{ height: "auto", opacity: 1 }}
              className="podcast-quote"
            >
              "{podcast.quote}"
            </motion.div>
            <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="podcast-link">
              View Episode →
            </a>
          </motion.div>
        ))}
      </div>

      <p className="podcast-note">+ 3 more tier-1 appearances</p>
      <p className="podcast-strategy">Strategy: Only appears on podcasts with 500K+ reach or premium audience</p>
    </motion.section>
  );
}
