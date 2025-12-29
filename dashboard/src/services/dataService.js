import Papa from 'papaparse';

// Utility function to parse numeric values like "~12K", "$1.5B+", etc.
export const parseNumericValue = (value) => {
  if (!value || value === 'nan' || value === 'N/A') return null;
  
  const str = String(value).trim();
  
  // Remove ~ and other non-numeric prefixes
  let cleaned = str.replace(/^[~$€£¥]/, '').replace(/\+$/, '');
  
  // Handle K, M, B suffixes
  if (cleaned.includes('K')) {
    return parseFloat(cleaned.replace('K', '')) * 1000;
  }
  if (cleaned.includes('M')) {
    return parseFloat(cleaned.replace('M', '')) * 1000000;
  }
  if (cleaned.includes('B')) {
    return parseFloat(cleaned.replace('B', '')) * 1000000000;
  }
  
  // Try to parse as float
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
};

// Transform CSV data into structured company objects
export const transformData = (csvData) => {
  const companies = {};
  
  csvData.forEach(row => {
    const companyName = row['Company Name'];
    const category = row['Category'];
    const metric = row['Metric'];
    const value = row['Value'];
    
    if (!companyName) return;
    
    // Initialize company object if it doesn't exist
    if (!companies[companyName]) {
      companies[companyName] = {
        name: companyName,
        youtube: {},
        instagram: {},
        twitter: {},
        linkedin: {},
        news: {},
        funding: {},
        website: {},
        other: {}
      };
    }
    
    // Map category to property
    const categoryMap = {
      'YouTube': 'youtube',
      'Instagram': 'instagram',
      'X/Twitter': 'twitter',
      'LinkedIn': 'linkedin',
      'News': 'news',
      'Funding': 'funding',
      'Website Metrics': 'website',
      'Other': 'other',
      'Performance': 'performance',
      'Metric': 'metrics'
    };
    
    const categoryKey = categoryMap[category] || category.toLowerCase().replace(/\s+/g, '_');
    
    if (!companies[companyName][categoryKey]) {
      companies[companyName][categoryKey] = {};
    }
    
    // Store the metric
    companies[companyName][categoryKey][metric] = value;
  });
  
  return Object.values(companies);
};

// Calculate derived metrics for a company
export const calculateDerivedMetrics = (company) => {
  const derived = {
    totalFollowers: 0,
    avgEngagementRate: 0,
    totalPostsPerWeek: 0,
    platformCount: 0
  };
  
  // YouTube
  if (company.youtube?.subscriber_count) {
    const subs = parseNumericValue(company.youtube.subscriber_count);
    if (subs) derived.totalFollowers += subs;
    derived.platformCount++;
  }
  
  // Instagram
  if (company.instagram?.follower_count) {
    const followers = parseNumericValue(company.instagram.follower_count);
    if (followers) derived.totalFollowers += followers;
    derived.platformCount++;
  }
  
  // Twitter
  if (company.twitter?.follower_count || company.twitter?.Followers) {
    const followers = parseNumericValue(company.twitter.follower_count || company.twitter.Followers);
    if (followers) derived.totalFollowers += followers;
    derived.platformCount++;
  }
  
  // LinkedIn - employee count (different metric)
  if (company.linkedin?.follower_count) {
    const followers = parseNumericValue(company.linkedin.follower_count);
    if (followers) {
      derived.totalFollowers += followers;
      derived.platformCount++;
    }
  }
  
  // Calculate average engagement rate
  let engagementRates = [];
  ['instagram', 'twitter', 'youtube'].forEach(platform => {
    const er = company[platform]?.engagement_rate || company[platform]?.['Engagement Rate'];
    if (er) {
      const rate = parseNumericValue(er);
      if (rate !== null) engagementRates.push(rate);
    }
  });
  
  if (engagementRates.length > 0) {
    derived.avgEngagementRate = engagementRates.reduce((a, b) => a + b, 0) / engagementRates.length;
  }
  
  // Calculate total posts per week
  ['youtube', 'instagram', 'twitter', 'linkedin'].forEach(platform => {
    const ppw = company[platform]?.posts_per_week || company[platform]?.videos_per_week || company[platform]?.['Posts/Week'];
    if (ppw) {
      const val = parseNumericValue(ppw);
      if (val) derived.totalPostsPerWeek += val;
    }
  });
  
  return derived;
};

// Load and parse CSV data
export const loadData = async () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/consolidated_data.csv', {
      download: true,
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: (results) => {
        const companies = transformData(results.data);
        
        // Add derived metrics to each company
        companies.forEach(company => {
          company.derived = calculateDerivedMetrics(company);
        });
        
        resolve(companies);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Get unique company names
export const getCompanyNames = (companies) => {
  return companies.map(c => c.name).sort();
};

// Get metrics for cross-platform comparison
export const getCrossCompanyMetrics = (companies) => {
  return companies.map(company => ({
    name: company.name,
    ...company.derived
  }));
};
