import { useEffect, useState } from 'react'
import './App.css'
import useStore from './store/useStore'
import { loadData } from './services/dataService'
import FilterBar from './components/FilterBar'
import CompanySnapshot from './components/views/CompanySnapshot'
import ComparisonView from './components/views/ComparisonView'
import CorrelationAnalysis from './components/views/CorrelationAnalysis'
import FounderVisibility from './components/views/FounderVisibility'

function App() {
  const { 
    companies, 
    setCompanies, 
    selectedCompanies, 
    compareMode,
    loading 
  } = useStore();
  
  const [currentView, setCurrentView] = useState('snapshot');

  useEffect(() => {
    loadData().then(data => {
      setCompanies(data);
    }).catch(error => {
      console.error('Error loading data:', error);
    });
  }, [setCompanies]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading social media analytics...</p>
      </div>
    );
  }

  const getFilteredCompanies = () => {
    if (selectedCompanies.length === 0) {
      return companies;
    }
    return companies.filter(c => selectedCompanies.includes(c.name));
  };

  const filteredCompanies = getFilteredCompanies();
  const displayCompany = filteredCompanies.length === 1 ? filteredCompanies[0] : 
                         selectedCompanies.length === 1 ? companies.find(c => c.name === selectedCompanies[0]) :
                         companies[0];

  return (
    <div className="app">
      <header className="app-header">
        <h1>a16z Portfolio Media Analytics</h1>
        <p className="subtitle">Prototype analyzing a range of a16z companies, at different stages and in different industries, to notice similarities, which ones are doing better and if that is related to earnings. Also looking at news or virality.</p>
      </header>

      <FilterBar currentView={currentView} />

      <div className="view-selector">
        <button 
          className={currentView === 'snapshot' ? 'active' : ''}
          onClick={() => setCurrentView('snapshot')}
        >
          Company Snapshot
        </button>
        <button 
          className={currentView === 'comparison' ? 'active' : ''}
          onClick={() => setCurrentView('comparison')}
        >
          Cross-Company Comparison
        </button>
        <button 
          className={currentView === 'correlation' ? 'active' : ''}
          onClick={() => setCurrentView('correlation')}
        >
          Funding x Media
        </button>
        <button 
          className={currentView === 'founder' ? 'active' : ''}
          onClick={() => setCurrentView('founder')}
        >
          Founder Factor
        </button>
      </div>

      <main className="app-main">
        {currentView === 'snapshot' ? (
          <CompanySnapshot company={displayCompany} />
        ) : currentView === 'comparison' ? (
          <ComparisonView companies={filteredCompanies} />
        ) : currentView === 'founder' ? (
          <FounderVisibility />
        ) : (
          <CorrelationAnalysis companies={filteredCompanies} />
        )}
      </main>

      <footer className="app-footer">
        <p>Data updated: December 2025 | {companies.length} companies tracked</p>
      </footer>
    </div>
  )
}

export default App
