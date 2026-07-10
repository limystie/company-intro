// src/store/useAppStore.js
import { create } from 'zustand';
import { dataService } from '../services/dataService';

export const useAppStore = create((set) => ({
    snapshot: null,
    advantages: [],
    services: [],
    isLoading: false,
    error: null,

    fetchHomeData: async () => {
        set({ isLoading: true, error: null });
        try {
            const [snapshot, advantages, services] = await Promise.all([
                dataService.getCompanySnapshot(),
                dataService.getAdvantages(),
                dataService.getCoreServices()
            ]);
            set({ snapshot, advantages, services, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    }
}));
