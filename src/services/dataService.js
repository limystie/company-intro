// src/services/dataService.js

// Mock data based on the PDF content to ensure zero hardcoding in components
const COMPANY_SNAPSHOT = {
    yearsOfExperience: 25,
    partners: 986,
    locations: 11,
    ipoTaiwan: '2017 TW.8499',
    ipoShenzhen: '2022 SZ.301389'
};

const ADVANTAGES = [
    {
        id: 'material-rd',
        title: 'Material R&D',
        description: 'We develop materials directly for end customers, provide rapid R&D responses for material design, and offer customized solutions.',
        icon: 'FlaskConical'
    },
    {
        id: 'die-cutting',
        title: 'Die-Cutting',
        description: 'Full autonomy over raw materials allows us to control costs and recommend the most suitable materials to enhance design efficiency.',
        icon: 'Scissors'
    },
    {
        id: 'test-verification',
        title: 'Test Verification',
        description: 'Equipped with a comprehensive laboratory verification system to enhance reliability and product stability in both sampling and mass production.',
        icon: 'CheckCircle'
    }
];

const CORE_SERVICES = [
    { id: 'emc', name: 'EMC', icon: 'Radio' },
    { id: 'thermal', name: 'Thermal Management', icon: 'Thermometer' },
    { id: 'bonding', name: 'Bonding', icon: 'Link' },
    { id: 'transmission', name: 'Transmission', icon: 'Activity' }
];

export const dataService = {
    getCompanySnapshot: async () => {
        // Simulate network delay
        return new Promise(resolve => setTimeout(() => resolve(COMPANY_SNAPSHOT), 300));
    },
    
    getAdvantages: async () => {
        return new Promise(resolve => setTimeout(() => resolve(ADVANTAGES), 300));
    },

    getCoreServices: async () => {
        return new Promise(resolve => setTimeout(() => resolve(CORE_SERVICES), 300));
    }
};
