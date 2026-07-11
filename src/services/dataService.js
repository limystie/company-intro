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
        description: 'Develop materials tailored for end-users with rapid R&D turnarounds to fit specific application requirements. Unlike standard die-cutters, we directly adjust raw material formulations. Unlike traditional material suppliers, our die-cutting expertise enables rapid sampling and practical, application-driven recommendations.',
        icon: 'FlaskConical',
        keyword: 'INNOVATION'
    },
    {
        id: 'die-cutting',
        title: 'Die-Cutting',
        description: 'Maintain independence in raw material sourcing to control origin costs and recommend optimal solutions, enhancing design cost and time efficiency.',
        icon: 'Scissors',
        keyword: 'EFFICIENCY'
    },
    {
        id: 'test-verification',
        title: 'Test Verification',
        description: 'Utilize internal laboratory verification to assure consistent quality and reliability from sampling to mass production. During the design and sampling phases, we provide multiple solutions and comprehensive test results to ensure your optimal selection.',
        icon: 'CheckCircle',
        keyword: 'RELIABILITY'
    }
];

const CORE_SERVICES = [
    { id: 'emc', name: 'EMC', icon: 'Radio' },
    { id: 'thermal', name: 'Thermal Management', icon: 'Thermometer' },
    { id: 'bonding', name: 'Bonding', icon: 'Link' },
    { id: 'transmission', name: 'Transmission', icon: 'Activity' }
];

const CORE_TECHNOLOGIES = [
    {
        id: 'tech-1',
        title: 'Precision Die-Cutting Tech',
        description: 'Advanced die-cutting processes capable of handling complex composite materials with micron-level accuracy.',
        icon: 'Cpu'
    },
    {
        id: 'tech-2',
        title: 'Advanced Material Coating',
        description: 'Proprietary coating formulations that enhance thermal conductivity and electromagnetic shielding properties.',
        icon: 'Layers'
    },
    {
        id: 'tech-3',
        title: 'High-Frequency Transmission',
        description: 'Specialized material solutions designed to minimize signal loss in 5G and high-frequency applications.',
        icon: 'Wifi'
    },
    {
        id: 'tech-4',
        title: 'Automated Optical Inspection (AOI)',
        description: 'AI-driven quality control systems ensuring 100% defect-free output for critical components.',
        icon: 'Eye'
    }
];

const QUALITY_SUSTAINABILITY = [
    {
        id: 'qs-1',
        title: 'ISO 14001 Certified',
        description: 'Strict adherence to global environmental management standards, reducing our carbon footprint.',
        value: 'Eco-Friendly',
        icon: 'Leaf'
    },
    {
        id: 'qs-2',
        title: 'Zero-Defect Policy',
        description: 'Implementing rigorous Six Sigma methodologies to ensure the highest reliability for our clients.',
        value: 'Reliability',
        icon: 'ShieldCheck'
    },
    {
        id: 'qs-3',
        title: 'Sustainable Sourcing',
        description: 'Partnering with suppliers who share our commitment to ethical and green material sourcing.',
        value: 'Ethics',
        icon: 'Recycle'
    }
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
    },

    getCoreTechnologies: async () => {
        return new Promise(resolve => setTimeout(() => resolve(CORE_TECHNOLOGIES), 300));
    },

    getQualitySustainability: async () => {
        return new Promise(resolve => setTimeout(() => resolve(QUALITY_SUSTAINABILITY), 300));
    }
};
