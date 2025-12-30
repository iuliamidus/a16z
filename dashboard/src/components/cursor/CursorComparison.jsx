import { motion } from 'framer-motion';
import { cursorData } from '../../data/cursorData';

export default function CursorComparison() {
  const { comparison } = cursorData;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="cursor-section cursor-comparison-section"
    >
      <div className="section-header">
        <h2 className="section-title">The Zero Marketing Paradox</h2>
      </div>

      <div className="comparison-grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="comparison-card traditional"
        >
          <h3 className="comparison-header strikethrough">Traditional SaaS Marketing</h3>
          <div className="comparison-items">
            {comparison.traditional.map((item, index) => (
              <div key={index} className="comparison-row">
                <span className="comparison-label">{item.icon} {item.item}:</span>
                <span className="comparison-value">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="comparison-total">
            <span>Total:</span>
            <span>{comparison.traditionalTotal}</span>
          </div>
          <div className="comparison-result traditional-result">
            Result: {comparison.traditionalResult}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="comparison-card cursor-approach"
        >
          <h3 className="comparison-header cursor-header">Cursor's Approach</h3>
          <div className="comparison-items">
            {comparison.cursor.map((item, index) => (
              <div key={index} className="comparison-row">
                <span className="comparison-label">{item.icon} {item.item}:</span>
                <span className="comparison-value cursor-value">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="comparison-total cursor-total">
            <span>Total:</span>
            <span className="cursor-total-value">{comparison.cursorTotal}</span>
          </div>
          <div className="comparison-result cursor-result">
            Result: {comparison.cursorResult}
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="comparison-tagline"
      >
        Cursor proves that in 2024, <span className="emphasis">exceptional product + authentic founder + organic community</span> beats any marketing budget.
      </motion.p>
    </motion.section>
  );
}
