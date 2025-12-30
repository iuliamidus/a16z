import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { cursorData } from '../../data/cursorData';

export default function CursorHero({ onExpand, isExpanded }) {
  const { hero } = cursorData;

  const handleExpand = () => {
    if (!isExpanded) {
      onExpand();
      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight * 0.8,
          behavior: 'smooth'
        });
      }, 300);
    }
  };

  const handleScrollDown = () => {
    if (isExpanded) {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    } else {
      handleExpand();
    }
  };

  return (
    <div className="cursor-hero">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="hero-badge"
      >
        🏆 New Media Done Right
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="hero-title"
      >
        {hero.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="hero-intro"
      >
        <p>
          As an AI engineer in my 20s, obsessed with social media, there is nothing I love more than hearing what fellow developers have to say about new products. Therefore, my media channels tend to be filled with all the latest tech trends and vetted products, so it is needless to say Cursor has been up there ever since the beginning. Therefore, I followed their progress more in depth for this, with some data collection, as I was aware they were an edge case and wanted to see their playbook. I also did analysis for a select few other companies from a16z, at different funding stages and in different industries, to uncover possible insights.
        </p>
      </motion.div>

      <div className="hero-stats">
        {hero.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            className="stat-card-hero"
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">
              {stat.display}
            </div>
            <div className="stat-label-hero">{stat.label}</div>
            <div className="stat-subtext">{stat.subtext}</div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={handleExpand}
        className="expand-button"
      >
        Expand Full Analysis
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={handleScrollDown}
        className="scroll-indicator"
        style={{ cursor: 'pointer' }}
      >
        <div className="scroll-text">Scroll to see how they did it</div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="scroll-arrow"
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
}
