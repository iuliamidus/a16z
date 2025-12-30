import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CursorHero from './CursorHero';
import CursorTimeline from './CursorTimeline';
import CursorComparison from './CursorComparison';
import CursorPodcasts from './CursorPodcasts';
import CursorSocialProof from './CursorSocialProof';
import CursorPlaybook from './CursorPlaybook';
import CursorOpportunities from './CursorOpportunities';

export default function CursorCaseStudy({ onExplore }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="cursor-case-study">
      <CursorHero onExpand={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-expanded"
          >
            <CursorPlaybook />
            <CursorOpportunities />
            <CursorComparison />
            <CursorPodcasts />
            <CursorSocialProof />
            <CursorTimeline />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="explore-dashboard-section"
            >
              <p className="explore-text">Ready to explore the full dashboard?</p>
              <button onClick={onExplore} className="explore-button">
                Explore All Companies →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
