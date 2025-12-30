import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { parseNumericValue } from '../../services/dataService';

export default function ComparisonView({ companies }) {
  if (!companies || companies.length === 0) {
    return <div className="view-container">Select companies to compare</div>;
  }

  // Helper function to format company names for display
  const formatCompanyName = (name) => {
    // Keep full names for better readability
    return name;
  };

  // Prepare data for follower comparison
  const followerData = companies.map(company => ({
    name: formatCompanyName(company.name),
    YouTube: parseNumericValue(company.youtube?.subscriber_count) || 0,
    Twitter: parseNumericValue(company.twitter?.follower_count || company.twitter?.Followers) || 0,
    Instagram: parseNumericValue(company.instagram?.follower_count || company.instagram?.Followers) || 0,
    Total: company.derived?.totalFollowers || 0
  }));

  // Prepare data for engagement rate comparison
  const engagementData = companies.map(company => {
    const twitterER = parseNumericValue(company.twitter?.engagement_rate || company.twitter?.['Engagement Rate']) || 0;
    const instaER = parseNumericValue(company.instagram?.engagement_rate || company.instagram?.['Engagement Rate']) || 0;
    
    return {
      name: formatCompanyName(company.name),
      'Twitter': twitterER * 100,
      'Instagram': instaER * 100,
      'Avg': (company.derived?.avgEngagementRate || 0) * 100
    };
  });

  // Prepare data for posts per week comparison
  const contentData = companies.map(company => ({
    name: formatCompanyName(company.name),
    YouTube: parseNumericValue(company.youtube?.videos_per_week) || 0,
    Twitter: parseNumericValue(company.twitter?.posts_per_week || company.twitter?.['Posts/Week']) || 0,
    Instagram: parseNumericValue(company.instagram?.posts_per_week || company.instagram?.['Posts/Week']) || 0,
    LinkedIn: parseNumericValue(company.linkedin?.posts_per_week) || 0
  }));

  // Prepare data for funding comparison
  const fundingData = companies
    .filter(c => c.funding?.total_funding_usd)
    .map(company => ({
      name: formatCompanyName(company.name),
      Funding: parseNumericValue(company.funding?.total_funding_usd) || 0,
      Valuation: parseNumericValue(company.funding?.valuation || company.website?.valuation) || 0
    }));

  // Prepare radar chart data for multi-dimensional comparison
  const radarData = companies.slice(0, 5).map(company => {
    const normalizeToScale = (value, max) => {
      if (!value || !max || max === 0) return 0;
      return Math.min((value / max) * 100, 100);
    };

    const maxFollowers = Math.max(...companies.map(c => c.derived?.totalFollowers || 0));
    const maxEngagement = Math.max(...companies.map(c => (c.derived?.avgEngagementRate || 0) * 100));
    const maxPosts = Math.max(...companies.map(c => c.derived?.totalPostsPerWeek || 0));
    const maxFunding = Math.max(...companies.map(c => parseNumericValue(c.funding?.total_funding_usd) || 0));

    return {
      subject: formatCompanyName(company.name),
      Reach: normalizeToScale(company.derived?.totalFollowers, maxFollowers),
      Engagement: normalizeToScale((company.derived?.avgEngagementRate || 0) * 100, maxEngagement),
      Content: normalizeToScale(company.derived?.totalPostsPerWeek, maxPosts),
      Funding: normalizeToScale(parseNumericValue(company.funding?.total_funding_usd), maxFunding),
      Platforms: (company.derived?.platformCount || 0) * 25 // Scale to 100
    };
  });

  return (
    <div className="comparison-view">
      <h2>Cross-Company Comparison</h2>
      
      {/* Follower Comparison */}
      <section className="chart-section">
        <h3>📊 Follower Count Comparison</h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={followerData} margin={{ top: 20, right: 30, bottom: 120, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(214, 162, 86, 0.2)" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fill: '#d6a256', fontSize: 13 }}
            />
            <YAxis label={{ value: 'Followers', angle: -90, position: 'insideLeft', fill: '#d6a256' }} tick={{ fill: '#d6a256' }} />
            <Tooltip 
              formatter={(value) => value.toLocaleString()}
              contentStyle={{ background: 'rgba(74, 3, 20, 0.95)', border: '1px solid #d6a256', borderRadius: '8px' }}
              labelStyle={{ color: '#ed8c00', fontWeight: 'bold' }}
              itemStyle={{ color: '#d6a256' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
            <Bar dataKey="YouTube" fill="#FF0000" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Twitter" fill="#1DA1F2" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Instagram" fill="#E4405F" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Engagement Rate Comparison */}
      <section className="chart-section">
        <h3>💬 Engagement Rate Comparison (%)</h3>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={engagementData} margin={{ top: 20, right: 30, bottom: 120, left: 60 }}>
            <defs>
              <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E4405F" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#E4405F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(214, 162, 86, 0.2)" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fill: '#d6a256', fontSize: 13 }}
            />
            <YAxis label={{ value: 'Engagement Rate (%)', angle: -90, position: 'insideLeft', fill: '#d6a256' }} tick={{ fill: '#d6a256' }} />
            <Tooltip 
              formatter={(value) => `${value.toFixed(2)}%`}
              contentStyle={{ background: 'rgba(74, 3, 20, 0.95)', border: '1px solid #d6a256', borderRadius: '8px' }}
              labelStyle={{ color: '#ed8c00', fontWeight: 'bold' }}
              itemStyle={{ color: '#d6a256' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
            <Line type="monotone" dataKey="Twitter" stroke="#1DA1F2" strokeWidth={4} dot={{ fill: '#1DA1F2', r: 7, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 9 }} />
            <Line type="monotone" dataKey="Instagram" stroke="#E4405F" strokeWidth={4} dot={{ fill: '#E4405F', r: 7, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 9 }} />
            <Line type="monotone" dataKey="Avg" stroke="#d6a256" strokeWidth={4} strokeDasharray="5 5" dot={{ fill: '#d6a256', r: 7, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 9 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Content Cadence Comparison */}
      <section className="chart-section">
        <h3>📝 Posts Per Week Comparison</h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={contentData} margin={{ top: 20, right: 30, bottom: 120, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(214, 162, 86, 0.2)" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fill: '#d6a256', fontSize: 13 }}
            />
            <YAxis label={{ value: 'Posts Per Week', angle: -90, position: 'insideLeft', fill: '#d6a256' }} tick={{ fill: '#d6a256' }} />
            <Tooltip 
              contentStyle={{ background: 'rgba(74, 3, 20, 0.95)', border: '1px solid #d6a256', borderRadius: '8px' }}
              labelStyle={{ color: '#ed8c00', fontWeight: 'bold' }}
              itemStyle={{ color: '#d6a256' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="square" />
            <Bar dataKey="YouTube" stackId="a" fill="#FF0000" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Twitter" stackId="a" fill="#1DA1F2" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Instagram" stackId="a" fill="#E4405F" radius={[0, 0, 0, 0]} />
            <Bar dataKey="LinkedIn" stackId="a" fill="#0A66C2" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Radar Chart for Multi-dimensional View */}
      {radarData.length > 0 && (
        <section className="chart-section">
          <h3>🎯 Multi-dimensional Performance (Normalized to 100)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Score" dataKey="Reach" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Engagement" dataKey="Engagement" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Radar name="Content" dataKey="Content" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* Comparison Table */}
      <section className="chart-section">
        <h3>📋 Detailed Metrics Table</h3>
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Total Followers</th>
                <th>Avg Engagement</th>
                <th>Posts/Week</th>
                <th>Platforms</th>
                <th>Funding</th>
                <th>Valuation</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.name}>
                  <td><strong>{company.name}</strong></td>
                  <td>{(company.derived?.totalFollowers || 0).toLocaleString()}</td>
                  <td>{((company.derived?.avgEngagementRate || 0) * 100).toFixed(1)}%</td>
                  <td>{(company.derived?.totalPostsPerWeek || 0).toFixed(1)}</td>
                  <td>{company.derived?.platformCount || 0}</td>
                  <td>{company.funding?.total_funding_usd || 'N/A'}</td>
                  <td>{company.funding?.valuation || company.website?.valuation || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
