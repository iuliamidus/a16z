import { parseNumericValue } from '../services/dataService';

export default function KPICard({ title, value, subtitle, trend, icon }) {
  const displayValue = () => {
    if (value === null || value === undefined || value === 'nan') {
      return 'N/A';
    }
    
    if (typeof value === 'number') {
      if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(2)}B`;
      }
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toFixed(0);
    }
    
    return String(value);
  };

  return (
    <div className="kpi-card">
      {icon && <div className="kpi-icon">{icon}</div>}
      <div className="kpi-content">
        <h4>{title}</h4>
        <div className="kpi-value">{displayValue()}</div>
        {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
        {trend && <div className={`kpi-trend ${trend > 0 ? 'positive' : 'negative'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>}
      </div>
    </div>
  );
}
