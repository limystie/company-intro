// src/store/useAppStore.js
import { create } from 'zustand';
import { dataService } from '../services/dataService';

export const useAppStore = create((set) => ({
    snapshot: null,
    advantages: [],
    services: [],
    technologies: [],
    quality: [],
    isLoading: false,
    error: null,

    fetchHomeData: async () => {
        set({ isLoading: true, error: null });
        try {
            const [snapshot, advantages, services, technologies, quality] = await Promise.all([
                dataService.getCompanySnapshot(),
                dataService.getAdvantages(),
                dataService.getCoreServices(),
                dataService.getCoreTechnologies(),
                dataService.getQualitySustainability()
            ]);
            set({ snapshot, advantages, services, technologies, quality, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    }
}));
