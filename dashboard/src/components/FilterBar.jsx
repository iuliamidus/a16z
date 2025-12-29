import useStore from '../store/useStore';

export default function FilterBar({ currentView }) {
  const { 
    companies, 
    selectedCompanies, 
    setSelectedCompanies,
    selectedPlatforms,
    setSelectedPlatforms,
    compareMode,
    toggleCompareMode 
  } = useStore();

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: '▶️' },
    { id: 'twitter', name: 'X/Twitter', icon: '𝕏' },
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' }
  ];

  const handleCompanyToggle = (companyName) => {
    // For snapshot view, only allow single selection
    if (currentView === 'snapshot') {
      setSelectedCompanies([companyName]);
    } else {
      if (selectedCompanies.includes(companyName)) {
        setSelectedCompanies(selectedCompanies.filter(c => c !== companyName));
      } else {
        setSelectedCompanies([...selectedCompanies, companyName]);
      }
    }
  };

  const handlePlatformToggle = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <h3>Companies</h3>
        <div className="filter-options">
          <button 
            className={selectedCompanies.length === 0 ? 'active' : ''}
            onClick={() => setSelectedCompanies([])}
          >
            All Companies
          </button>
          {companies.map(company => (
            <button
              key={company.name}
              className={selectedCompanies.includes(company.name) ? 'active' : ''}
              onClick={() => handleCompanyToggle(company.name)}
            >
              {company.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
