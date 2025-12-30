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
          Hi to whoever is reading this from a16z! I am an AI engineer, obsessed with media and with data, so I took this question as a challenge: I wanted to see if there really are aspects of new media that can quantitatively show companies performing better. I selected a few companies, at different stages of growth and in different industries, and tried to gain insights from social media data I could get. These included details like founder presence, engagement rate, and looking at funding as well, or industry relevance.
        </p>
        <p>
          I ended up responding to this particular question about Cursor - as I was aware they are notoriously not spending on social media or marketing, I thought to use data to highlight what they are doing amazingly well, as well as some growth opportunities I thought of while analyzing the rest of the companies.
        </p>
        <p>
          To me, new media is all about being human and feeling authentic in a world where media priorities are dictated by outside forces, so most of the things I would do to improve that focus on centering people. Please have a skim through the below, and the dashboard with all the companies can also be found here.
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
