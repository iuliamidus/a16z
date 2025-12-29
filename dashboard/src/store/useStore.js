import { create } from 'zustand';

const useStore = create((set) => ({
  companies: [],
  selectedCompanies: [],
  selectedPlatforms: ['youtube', 'instagram', 'twitter', 'linkedin'],
  compareMode: false,
  currentView: 'snapshot', // 'snapshot', 'comparison', 'trends'
  loading: true,
  
  setCompanies: (companies) => set({ companies, loading: false }),
  setSelectedCompanies: (selectedCompanies) => set({ selectedCompanies }),
  setSelectedPlatforms: (selectedPlatforms) => set({ selectedPlatforms }),
  toggleCompareMode: () => set((state) => ({ compareMode: !state.compareMode })),
  setCurrentView: (view) => set({ currentView: view }),
  
  // Helper to get filtered companies
  getFilteredCompanies: () => {
    const state = useStore.getState();
    if (state.selectedCompanies.length === 0) {
      return state.companies;
    }
    return state.companies.filter(c => state.selectedCompanies.includes(c.name));
  }
}));

export default useStore;
