import KPICard from '../KPICard';
import { parseNumericValue } from '../../services/dataService';

export default function CompanySnapshot({ company }) {
  if (!company) {
    return <div className="view-container">Select a company to view details</div>;
  }

  const getFollowerCount = (platform) => {
    const data = company[platform];
    if (!data) return null;
    
    return parseNumericValue(
      data.follower_count || 
      data.subscriber_count || 
      data.Followers ||
      null
    );
  };

  const getPostsPerWeek = (platform) => {
    const data = company[platform];
    if (!data) return null;
    
    return parseNumericValue(
      data.posts_per_week || 
      data.videos_per_week || 
      data['Posts/Week'] ||
      null
    );
  };

  return (
    <div className="company-snapshot">
      <div className="snapshot-header">
        <h2>{company.name}</h2>
        <div className="company-meta">
          {company.funding?.valuation && (
            <span className="valuation">💰 {company.funding.valuation}</span>
          )}
          {company.funding?.total_funding_usd && (
            <span className="funding">📊 Total Raised: {company.funding.total_funding_usd}</span>
          )}
        </div>
      </div>

      {/* Platform Metrics */}
      <section className="metrics-section">
        <h3>📊 Platform Reach</h3>
        <div className="kpi-grid">
          <KPICard
            icon="▶️"
            title="YouTube"
            value={getFollowerCount('youtube')}
            subtitle={`${getPostsPerWeek('youtube') || 0} videos/week`}
          />
          <KPICard
            icon="𝕏"
            title="X/Twitter"
            value={getFollowerCount('twitter')}
            subtitle={`${getPostsPerWeek('twitter') || 0} posts/week`}
          />
          <KPICard
            icon="📷"
            title="Instagram"
            value={getFollowerCount('instagram')}
            subtitle={`${getPostsPerWeek('instagram') || 0} posts/week`}
          />
          <KPICard
            icon="💼"
            title="LinkedIn"
            value={parseNumericValue(company.linkedin?.employee_count)}
            subtitle="employees"
          />
        </div>
      </section>

      {/* Engagement Metrics */}
      <section className="metrics-section">
        <h3>💬 Engagement</h3>
        <div className="kpi-grid">
          <KPICard
            title="Avg Engagement Rate"
            value={company.derived?.avgEngagementRate ? 
              (company.derived.avgEngagementRate * 100).toFixed(1) + '%' : 
              'N/A'}
            subtitle="Across platforms"
          />
          <KPICard
            title="Total Posts/Week"
            value={company.derived?.totalPostsPerWeek || 0}
            subtitle="Content cadence"
          />
          <KPICard
            title="Platform Count"
            value={company.derived?.platformCount || 0}
            subtitle="Active platforms"
          />
          <KPICard
            title="Total Reach"
            value={company.derived?.totalFollowers || 0}
            subtitle="Combined followers"
          />
        </div>
      </section>

      {/* Funding Information */}
      {company.funding && Object.keys(company.funding).length > 0 && (
        <section className="metrics-section">
          <h3>💰 Funding</h3>
          <div className="funding-details">
            <div className="funding-item">
              <span className="label">Last Round:</span>
              <span className="value">{company.funding.last_funding_type || 'N/A'}</span>
            </div>
            <div className="funding-item">
              <span className="label">Amount:</span>
              <span className="value">{company.funding.total_funding_usd || 'N/A'}</span>
            </div>
            <div className="funding-item">
              <span className="label">Date:</span>
              <span className="value">{company.funding.last_funding_date || 'N/A'}</span>
            </div>
            <div className="funding-item">
              <span className="label">Valuation:</span>
              <span className="value">{company.funding.valuation || company.website?.valuation || 'N/A'}</span>
            </div>
          </div>
        </section>
      )}

      {/* News & Media */}
      {company.news && Object.keys(company.news).length > 0 && (
        <section className="metrics-section">
          <h3>📰 Recent News</h3>
          <div className="news-details">
            {company.news.latest_mention_title && (
              <div className="news-item">
                <h4>{company.news.latest_mention_title}</h4>
                <p>
                  <span className="news-source">{company.news.latest_mention_source || 'Unknown'}</span>
                  {company.news.latest_mention_date && (
                    <span className="news-date"> • {company.news.latest_mention_date}</span>
                  )}
                </p>
              </div>
            )}
            {company.news.top_articles && (
              <div className="news-item">
                <p className="news-summary">{company.news.top_articles}</p>
              </div>
            )}
            <div className="news-stats">
              <span>Mentions (7d): {company.news.mention_count_7days || 0}</span>
              <span>Unique Sources: {company.news.unique_sources || 0}</span>
            </div>
          </div>
        </section>
      )}

      {/* Top Content */}
      <section className="metrics-section">
        <h3>🎯 Top Content</h3>
        <div className="content-grid">
          {company.youtube?.top_videos && (
            <div className="content-item">
              <h4>YouTube</h4>
              <p>{company.youtube.top_videos}</p>
            </div>
          )}
          {company.twitter?.top_posts && (
            <div className="content-item">
              <h4>X/Twitter</h4>
              <p>{company.twitter.top_posts}</p>
            </div>
          )}
          {company.linkedin?.top_posts && (
            <div className="content-item">
              <h4>LinkedIn</h4>
              <p>{company.linkedin.top_posts}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
