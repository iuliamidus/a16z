import { motion } from 'framer-motion';
import { cursorData } from '../../data/cursorData';

export default function CursorPlaybook() {
  const { playbook } = cursorData;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="cursor-section playbook-section"
    >
      <div className="section-header">
        <h2 className="section-title">The Cursor 'New Media' Playbook</h2>
        <p className="section-subtitle">How to Grow Without Marketing</p>
      </div>

      <div className="playbook-steps">
        {playbook.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            <div className="playbook-card">
              <div className="playbook-number">{step.number}</div>
              <h3 className="playbook-title">{step.title}</h3>
              <p className="playbook-description">{step.description}</p>
            </div>
            {index < playbook.length - 1 && (
              <motion.div
                className="playbook-arrow"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="playbook-result"
      >
        Result: $1B ARR, $0 Marketing
      </motion.div>
    </motion.section>
  );
}
