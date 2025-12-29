import React, { useMemo, useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Papa from 'papaparse';
import { parseNumericValue } from '../../services/dataService';

const CorrelationAnalysis = ({ companies }) => {
  const [fundingRounds, setFundingRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load funding rounds data
  useEffect(() => {
    fetch('/funding_rounds.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setFundingRounds(results.data);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing funding rounds CSV:', error);
            setLoading(false);
          }
        });
      })
      .catch(error => {
        console.error('Error loading funding rounds:', error);
        setLoading(false);
      });
  }, []);

  // Analyze company metrics with actual data
  const companyAnalysis = useMemo(() => {
    if (!companies || companies.length === 0) return [];
    return companies.map(company => {
      const twitter = company.twitter || {};
      const instagram = company.instagram || {};
      const youtube = company.youtube || {};
      const linkedin = company.linkedin || {};
      const funding = company.funding || {};

      // Social metrics
      const twitterFollowers = parseNumericValue(twitter.follower_count || twitter.Followers) || 0;
      const instagramFollowers = parseNumericValue(instagram.follower_count || instagram.Followers) || 0;
      const youtubeFollowers = parseNumericValue(youtube.subscriber_count) || 0;
      const linkedinFollowers = parseNumericValue(linkedin.follower_count || linkedin.Followers) || 0;
      const totalFollowers = twitterFollowers + instagramFollowers + youtubeFollowers + linkedinFollowers;

      // Debug all companies
      console.log(`${company.name}: Twitter=${twitterFollowers}, Instagram=${instagramFollowers}, YouTube=${youtubeFollowers}, LinkedIn=${linkedinFollowers}, Total=${totalFollowers}`);

      // Engagement metrics
      const twitterER = parseNumericValue(twitter.engagement_rate) || 0;
      const twitterPostsPerWeek = parseNumericValue(twitter.posts_per_week) || 0;
      const instagramPostsPerWeek = parseNumericValue(instagram.posts_per_week) || 0;
      const youtubePostsPerWeek = parseNumericValue(youtube.videos_per_week) || 0;
      const totalPostsPerWeek = twitterPostsPerWeek + instagramPostsPerWeek + youtubePostsPerWeek;

      // Funding metrics
      const totalFunding = parseNumericValue(funding.total_funding_usd) || 0;
      const valuation = parseNumericValue(funding.valuation || company.performance?.valuation || company.other?.valuation) || 0;
      const employees = parseNumericValue(funding.employee_count || linkedin.employee_count) || 0;

      // Get funding rounds for this company
      const companyRounds = fundingRounds.filter(r => r['Company Name'] === company.name);
      const latestRound = companyRounds.find(r => r['Money Raised']);

      return {
        name: company.name,
        totalFollowers,
        twitterFollowers,
        instagramFollowers,
        youtubeFollowers,
        linkedinFollowers,
        twitterER,
        totalPostsPerWeek,
        totalFunding,
        valuation,
        employees,
        fundingRounds: companyRounds.length,
        latestFundingType: latestRound?.['Funding Type'] || funding.last_funding_type || 'N/A',
        latestFundingAmount: parseNumericValue(latestRound?.['Money Raised']) || 0,
        hasSocialPresence: totalFollowers > 0,
        contentVelocity: totalPostsPerWeek,
        fundingPerEmployee: employees > 0 ? totalFunding / employees : 0,
        followersPerEmployee: employees > 0 ? totalFollowers / employees : 0
      };
    }).filter(c => c.hasSocialPresence || c.totalFunding > 0);
  }, [companies, fundingRounds]);

  // Funding vs Social Media reach
  const fundingVsReachData = useMemo(() => {
    const data = companyAnalysis
      .filter(c => c.totalFunding > 0 || c.totalFollowers > 0)
      .map(c => ({
        name: c.name,
        funding: c.totalFunding / 1000000, // in millions
        followers: c.totalFollowers,
        fundingRounds: c.fundingRounds
      }));
    return data;
  }, [companyAnalysis]);

  // Funding stage distribution
  const fundingStageData = useMemo(() => {
    const stages = {};
    fundingRounds.forEach(round => {
      const stage = round['Funding Type'];
      if (stage) {
        if (!stages[stage]) {
          stages[stage] = { stage, count: 0, totalRaised: 0 };
        }
        stages[stage].count++;
        const amount = parseNumericValue(round['Money Raised']);
        if (amount) stages[stage].totalRaised += amount;
      }
    });
    return Object.values(stages)
      .map(s => ({
        ...s,
        totalRaised: s.totalRaised / 1000000 // in millions
      }))
      .sort((a, b) => b.totalRaised - a.totalRaised);
  }, [fundingRounds]);

  // Platform dominance by company
  const platformData = useMemo(() => {
    return companyAnalysis
      .filter(c => c.totalFollowers > 0)
      .map(c => ({
        name: c.name,
        Twitter: c.twitterFollowers,
        Instagram: c.instagramFollowers,
        YouTube: c.youtubeFollowers,
        LinkedIn: c.linkedinFollowers
      }))
      .sort((a, b) => (b.Twitter + b.Instagram + b.YouTube + b.LinkedIn) - (a.Twitter + a.Instagram + a.YouTube + a.LinkedIn));
  }, [companyAnalysis]);

  // Funding timeline
  const fundingTimeline = useMemo(() => {
    const timeline = {};
    fundingRounds.forEach(round => {
      if (round['Money Raised']) {
        const date = new Date(round['Announced Date']);
        const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (!timeline[month]) {
          timeline[month] = { month, totalRaised: 0, count: 0, date };
        }
        timeline[month].totalRaised += parseNumericValue(round['Money Raised']);
        timeline[month].count++;
      }
    });
    return Object.values(timeline)
      .sort((a, b) => a.date - b.date)
      .map(t => ({
        month: t.month,
        totalRaised: t.totalRaised / 1000000, // in millions
        count: t.count
      }));
  }, [fundingRounds]);

  // Company efficiency metrics
  const efficiencyData = useMemo(() => {
    return companyAnalysis
      .filter(c => c.employees > 0 && c.totalFollowers > 0)
      .map(c => ({
        name: c.name,
        followersPerEmployee: Math.round(c.followersPerEmployee),
        fundingPerEmployee: Math.round(c.fundingPerEmployee / 1000), // in thousands
        contentVelocity: c.contentVelocity
      }))
      .sort((a, b) => b.followersPerEmployee - a.followersPerEmployee);
  }, [companyAnalysis]);

  const formatCurrency = (value) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
    if (value >= 1) return `$${value.toFixed(0)}M`;
    return `$${(value * 1000).toFixed(0)}K`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const COLORS = ['#ed8c00', '#d6a256', '#f4a261', '#e76f51', '#2a9d8f', '#264653', '#e9c46a', '#f4a261'];

  if (loading) {
    return (
      <div className="correlation-analysis">
        <h2>Data Insights & Relationships</h2>
        <p className="section-subtitle">Loading data...</p>
      </div>
    );
  }

  if (!companies || companies.length === 0 || companyAnalysis.length === 0) {
    return (
      <div className="correlation-analysis">
        <h2>Data Insights & Relationships</h2>
        <p className="section-subtitle">No companies selected. Please adjust your filters or load data.</p>
      </div>
    );
  }

  return (
    <div className="correlation-analysis">
      <h2>Funding Info</h2>
      <p className="section-subtitle">
        Analyzing {companies.length} companies across {fundingRounds.length} funding rounds
      </p>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-label">Total Funding Analyzed</div>
          <div className="stat-value">
            {formatCurrency(companyAnalysis.reduce((sum, c) => sum + c.totalFunding, 0) / 1000000)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Social Reach</div>
          <div className="stat-value">
            {formatNumber(companyAnalysis.reduce((sum, c) => sum + c.totalFollowers, 0))}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Funding Rounds</div>
          <div className="stat-value">
            {fundingRounds.length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Companies</div>
          <div className="stat-value">
            {companyAnalysis.filter(c => c.contentVelocity > 0).length}
          </div>
        </div>
      </div>

      {/* Funding vs Social Reach Area Chart */}
      {fundingVsReachData.length > 0 && (
        <div className="chart-container">
          <h3>Funding Amount vs Social Media Reach</h3>
          <p className="chart-subtitle">Relationship between total funding and follower base</p>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={fundingVsReachData.sort((a, b) => a.funding - b.funding)} margin={{ top: 20, right: 80, bottom: 100, left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(214, 162, 86, 0.1)" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={120}
                interval={0}
                tick={{ fill: '#d6a256', fontSize: 13 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'Total Funding ($M)', angle: -90, position: 'insideLeft', dx: -30, fill: '#d6a256' }}
                tick={{ fill: '#d6a256' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                label={{ value: 'Total Followers', angle: 90, position: 'insideRight', dx: 30, fill: '#ed8c00' }}
                tick={{ fill: '#ed8c00' }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p className="tooltip-title">{data.name}</p>
                        <p className="tooltip-label">Funding: {formatCurrency(data.funding)}</p>
                        <p className="tooltip-label">Followers: {formatNumber(data.followers)}</p>
                        <p className="tooltip-label">Rounds: {data.fundingRounds}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="funding" name="Funding ($M)" fill="#d6a256" />
              <Bar yAxisId="right" dataKey="followers" name="Total Followers" fill="#ed8c00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Funding Timeline */}
      {fundingTimeline.length > 0 && (
        <div className="chart-container">
          <h3>Funding Activity Over Time</h3>
          <p className="chart-subtitle">Monthly funding distribution and round count</p>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={fundingTimeline} margin={{ top: 20, right: 80, bottom: 100, left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(214, 162, 86, 0.1)" />
              <XAxis 
                dataKey="month" 
                angle={-45}
                textAnchor="end"
                height={120}
                interval={0}
                tick={{ fill: '#d6a256', fontSize: 13 }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: '#d6a256' }}
                label={{ value: 'Amount ($M)', angle: -90, position: 'insideLeft', dx: -30, fill: '#d6a256' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fill: '#d6a256' }}
                label={{ value: 'Round Count', angle: 90, position: 'insideRight', dx: 30, fill: '#d6a256' }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p className="tooltip-title">{data.month}</p>
                        <p className="tooltip-label">Raised: {formatCurrency(data.totalRaised)}</p>
                        <p className="tooltip-label">Rounds: {data.count}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="totalRaised" fill="#ed8c00" name="Total Raised ($M)" />
              <Bar yAxisId="right" dataKey="count" fill="#d6a256" name="Round Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Platform Distribution */}
      {platformData.length > 0 && (
        <div className="chart-container">
          <h3>Social Media Platform Distribution</h3>
          <p className="chart-subtitle">Follower breakdown across platforms by company</p>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={platformData} margin={{ top: 20, right: 60, bottom: 100, left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(214, 162, 86, 0.1)" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={120}
                interval={0}
                tick={{ fill: '#d6a256', fontSize: 13 }}
              />
              <YAxis 
                tick={{ fill: '#d6a256' }}
                label={{ value: 'Followers', angle: -90, position: 'insideLeft', dx: -30, fill: '#d6a256' }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Twitter" stackId="a" fill="#1DA1F2" />
              <Bar dataKey="Instagram" stackId="a" fill="#E4405F" />
              <Bar dataKey="YouTube" stackId="a" fill="#FF0000" />
              <Bar dataKey="LinkedIn" stackId="a" fill="#0A66C2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Company Efficiency Metrics */}
      {efficiencyData.length > 0 && (
        <div className="chart-container">
          <h3>Company Efficiency Metrics</h3>
          <p className="chart-subtitle">Followers per employee - measuring social reach efficiency</p>
          <div className="table-wrapper">
            <table className="correlation-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Followers/Employee</th>
                  <th>Funding/Employee ($K)</th>
                  <th>Content Velocity (posts/week)</th>
                </tr>
              </thead>
              <tbody>
                {efficiencyData.map((item, index) => (
                  <tr key={index}>
                    <td className="company-name">{item.name}</td>
                    <td>{item.followersPerEmployee.toLocaleString()}</td>
                    <td>{item.fundingPerEmployee.toLocaleString()}</td>
                    <td>{item.contentVelocity.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrelationAnalysis;
