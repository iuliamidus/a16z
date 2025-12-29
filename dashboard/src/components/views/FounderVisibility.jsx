import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import Papa from 'papaparse';

const FounderVisibility = () => {
  const [founders, setFounders] = useState([]);

  useEffect(() => {
    fetch('/founders.csv')
      .then(response => response.text())
      .then(csv => {
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
        const foundersData = parsed.data;
        
        // Process founder data
        const processed = foundersData.map(founder => {
          const twitterFollowers = founder['Twitter Followers (Est)'] 
            ? parseInt(founder['Twitter Followers (Est)'].replace(/\D/g, '')) || 0 
            : 0;
          
          const openness = parseInt(founder['Openness Score (1-10)']) || 0;
          const company = founder.Company;
          const name = founder['Founder Name'];
          const role = founder.Role;
          const publicPresence = founder['Public Presence'];
          const fundingCorrelation = founder['Funding Correlation'];
          const summary = founder.Summary;
          
          return {
            company,
            name,
            role,
            twitterFollowers,
            openness,
            publicPresence,
            fundingCorrelation,
            summary,
            visibility: twitterFollowers > 0 ? 
              (openness >= 7 ? 'High' : openness >= 4 ? 'Medium' : 'Low') : 
              'Unknown'
          };
        }).filter(f => f.name && f.name !== 'Unknown Founders' && f.name !== 'Multiple Founders');
        
        setFounders(processed);
      });
  }, []);

  // Aggregate by company (take primary/CEO founder)
  const companyFounders = useMemo(() => {
    const companies = {};
    founders.forEach(founder => {
      if (!companies[founder.company] || founder.role.includes('CEO')) {
        companies[founder.company] = founder;
      }
    });
    return Object.values(companies).sort((a, b) => b.openness - a.openness);
  }, [founders]);

  // Top visible founders
  const topFounders = useMemo(() => {
    return [...companyFounders]
      .filter(f => f.twitterFollowers > 0)
      .sort((a, b) => b.twitterFollowers - a.twitterFollowers)
      .slice(0, 5);
  }, [companyFounders]);

  if (!founders || founders.length === 0) {
    return <div className="loading-container">Loading founder data...</div>;
  }

  return (
    <div className="founder-visibility">
      <h2>The Founder Factor</h2>
      <p className="section-description">
        Analyzing how founder visibility correlates with funding success and growth strategies
      </p>

      {/* Key Patterns */}
      <div className="patterns-section patterns-hero">
        <h3>Key Patterns Discovered</h3>
        <div className="pattern-grid pattern-grid-single">
          <div className="pattern-card pattern-highlight">
            <div className="pattern-title">🎯 Consumer AI = High Visibility</div>
            <div className="pattern-description">
              Companies selling to consumers/developers have founders who are 3-4x more visible.
              ElevenLabs, Cursor, and Hippocratic AI founders post 6-20x per month.
            </div>
          </div>
          <div className="pattern-card pattern-highlight">
            <div className="pattern-title">🏢 B2B = Lower Visibility Works</div>
            <div className="pattern-description">
              Applied Intuition reached $15B valuation with medium founder visibility.
              Enterprise sales don't require founder celebrity.
            </div>
          </div>
          <div className="pattern-card pattern-highlight">
            <div className="pattern-title">🎓 Technical Depth &gt; Social Media</div>
            <div className="pattern-description">
              PhD/research backgrounds can substitute for high social presence.
              Piotr (ElevenLabs) has moderate visibility but strong ML credentials.
            </div>
          </div>
          <div className="pattern-card pattern-highlight">
            <div className="pattern-title">🔄 Serial Entrepreneurs Win</div>
            <div className="pattern-description">
              Founders with previous exits get 2x more media attention per post.
              Munjal Shah's 4th startup, previous exits to Google/Alibaba.
            </div>
          </div>
        </div>
      </div>

      {/* Top Visible Founders */}
      <div className="chart-section">
        <h3>Most Visible Founders</h3>
        <div className="founder-list">
          {topFounders.map((founder, index) => (
            <div key={index} className="founder-card">
              <div className="founder-rank">#{index + 1}</div>
              <div className="founder-info">
                <div className="founder-name">{founder.name}</div>
                <div className="founder-company">{founder.company}</div>
                <div className="founder-role">{founder.role}</div>
              </div>
              <div className="founder-stats">
                <div className="stat-item">
                  <span className="stat-label">Twitter</span>
                  <span className="stat-value">{founder.twitterFollowers.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Openness</span>
                  <span className="stat-value">{founder.openness}/10</span>
                </div>
              </div>
              <div className="founder-correlation">
                {founder.fundingCorrelation.split(' - ')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FounderVisibility;
