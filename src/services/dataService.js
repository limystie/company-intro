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

const CORPORATE_METRICS = {
    // 1. Organizational Structure
    orgStructure: {
        holding: { name: 'TOP BRIGHT HOLDING', chinese: '鼎炫控股', code: 'TW.8499' },
        branches: [
            {
                id: 'longyoung',
                name: 'LONG YOUNG ELECTRONICS',
                code: 'SZ.301389',
                children: [
                    { name: 'LY Kunshan', type: 'dark' },
                    { name: 'LY Taipei', type: 'light' },
                    { name: 'Chuanyang CQ', type: 'dark' },
                    { name: 'LY USA', type: 'light' },
                    { name: 'Fuyoung Huai\'an', type: 'dark' },
                    { name: 'GHZ TW', type: 'light' },
                    { name: 'LY Thailand', type: 'dark' },
                    { name: 'LY Vietnam', type: 'light' },
                    { name: 'Dwell', type: 'dark' },
                    { name: 'VSI', type: 'light' }
                ]
            },
            {
                id: 'tscale',
                name: 'T-Scale',
                chinese: '台衡',
                children: [
                    { name: 'T-scale KS', type: 'dark' },
                    { name: 'T-scale TP', type: 'dark' },
                    { name: 'T-scale India', type: 'dark' }
                ]
            }
        ]
    },
    // 2. Revenue and Growth
    revenue: {
        current: "$500M+",
        yoyGrowth: "15%",
        history: [
            { year: '2021', value: 320 },
            { year: '2022', value: 380 },
            { year: '2023', value: 450 },
            { year: '2024', value: 520 },
        ]
    },
    // 3. Customer Base Distribution
    customerDistribution: [
        { sector: 'Consumer Electronics', percentage: 45, color: '#00C6FF' },
        { sector: 'Automotive', percentage: 25, color: '#0072FF' },
        { sector: 'Communication & Server', percentage: 20, color: '#8A2BE2' },
        { sector: 'Others', percentage: 10, color: '#4B0082' }
    ],
    // 4. Dual Listing Information
    dualListing: [
        { exchange: 'Taiwan Stock Exchange', code: 'TW.8499', year: '2017', icon: 'TrendingUp' },
        { exchange: 'Shenzhen Stock Exchange', code: 'SZ.301389', year: '2022', icon: 'BarChart' }
    ],
    // 5. ESG & Sustainability
    esg: {
        target: 'Net Zero by 2050',
        renewableEnergy: '45%',
        certifications: ['ISO 14001', 'ISO 45001', 'ISO 14064']
    }
};

const GLOBAL_FOOTPRINT = [
    {
        id: 'longyoung',
        name: 'LONGYOUNG ELECTRONICS',
        theme: 'Core Electronics & Precision Engineering',
        icon: 'Cpu',
        overview: 'Specializing in advanced electronics manufacturing, high-precision components, and complete system assembly for global technology brands.',
        facilities: [
            { name: 'LONGYOUNG KUNSHAN', location: 'Kunshan, China', size: 'Main Manufacturing Campus', focus: 'Precision Electronics Assembly' },
            { name: 'CHUANYOUNG CHONGQING', location: 'Chongqing, China', size: 'Regional Hub', focus: 'Precision Engineering' },
            { name: 'LONGYOUNG VIETNAM', location: 'Bac Ninh, Vietnam', size: 'Southeast Asia Hub', focus: 'Global Supply Chain Support' },
            { name: 'LONGYOUNG THAILAND', location: 'Chachoengsao, Thailand', size: 'Southeast Asia Hub', focus: 'Global Supply Chain Support' },
            { name: 'LONGYOUNG INTERNATIONAL', location: 'Taipei, Taiwan', size: 'International Office', focus: 'Global Sales & Operations' },
            { name: 'LONGYOUNG USA', location: 'San Jose, USA', size: 'US Branch', focus: 'North America Support & R&D' }
        ],
        capabilities: ['Precision Engineering', 'System Assembly', 'High-Volume Production']
    },
    {
        id: 'ghz',
        name: 'GHZ NEW MATERIAL',
        theme: 'Advanced Material Science',
        icon: 'Layers',
        overview: 'Dedicated to the research, development, and mass production of advanced functional materials used in extreme industrial environments.',
        facilities: [
            { name: 'GHZ NEW MATERIAL HUAI\'AN', location: 'Huai\'an, China', size: 'Mass Production Center', focus: 'Advanced Materials Manufacturing' },
            { name: 'GHZ NEW MATERIAL TAIWAN', location: 'Zhunan, Taiwan', size: 'R&D and Production', focus: 'Material Research & Development' }
        ],
        capabilities: ['Functional Coating', 'Material Science', 'Reliability Testing']
    },
    {
        id: 'dwell',
        name: 'DWELL NEW MATERIAL',
        theme: 'Protective & Thermal Solutions',
        icon: 'Shield',
        overview: 'Focused on creating innovative protective films, thermal management solutions, and eco-friendly packaging materials.',
        facilities: [
            { name: 'DWELL NEW MATERIAL (SUZHOU)', location: 'Suzhou, China', size: 'Main Plant', focus: 'Thermal Management & Protective Films' }
        ],
        capabilities: ['Thermal Insulation', 'Protective Materials', 'Eco-friendly Manufacturing']
    },
    {
        id: 'vsi',
        name: 'VSI TECHNOLOGY',
        theme: 'Smart Integration & Automation',
        icon: 'Cpu',
        overview: 'Providing smart manufacturing integration, automation solutions, and specialized equipment for modern production lines.',
        facilities: [
            { name: 'VSI TECHNOLOGY', location: 'Operations Hub', size: 'Engineering Center', focus: 'Automation & Smart Equipment' }
        ],
        capabilities: ['Smart Automation', 'Equipment Integration', 'Industrial IoT']
    }
];

const FACTORY_GALLERY = [
    {
        id: 'assembly-01',
        title: 'Automated Assembly Line',
        description: 'State-of-the-art robotic assembly ensuring precision and high-volume output.',
        imageUrl: '/longyoung-profile/assembly.png'
    },
    {
        id: 'cnc-01',
        title: 'Precision CNC Machining',
        description: 'Advanced 5-axis CNC machines for aerospace and high-end automotive components.',
        imageUrl: '/longyoung-profile/cnc.png'
    },
    {
        id: 'qa-01',
        title: 'Quality Assurance Lab',
        description: 'Class 100 cleanroom testing facility with strict optical inspection.',
        imageUrl: '/longyoung-profile/qa.png'
    }
];

const PRODUCTION_EQUIPMENT = [
    { name: '5-Axis CNC Machines', quantity: 120, capacity: '500K units/month', features: ['±0.005mm Precision', 'Automated Tool Change'] },
    { name: 'SMT Production Lines', quantity: 45, capacity: '2M boards/month', features: ['High-speed Placement', '3D AOI Integration'] },
    { name: 'Laser Cutting Systems', quantity: 30, capacity: '1M parts/month', features: ['Fiber Laser Technology', 'Zero Burr Edge'] },
    { name: 'Injection Molding', quantity: 85, capacity: '5M parts/month', features: ['50T to 800T Range', 'Automated Unloading'] },
    { name: 'Automated Stamping', quantity: 60, capacity: '10M units/month', features: ['Progressive Dies', 'In-line Inspection'] },
    { name: 'Cleanroom Coating', quantity: 15, capacity: '300K sqm/month', features: ['Class 1000 Environment', 'Roll-to-roll Process'] }
];

const TESTING_CAPABILITIES = [
    { name: '3D Optical Inspection (AOI)', target: 'PCB & Assembly', precision: '1 Micron', standard: 'IPC-A-610 Class 3' },
    { name: 'Scanning Electron Microscope', target: 'Material Analysis', precision: 'Nanometer scale', standard: 'ISO 17025' },
    { name: 'Thermal Shock Chambers', target: 'Reliability', precision: '-70°C to +150°C', standard: 'MIL-STD-810G' },
    { name: 'CMM Dimension Measurement', target: 'Precision Parts', precision: '0.001 mm', standard: 'ISO 10360' },
    { name: 'RoHS Compliance Testing', target: 'Eco-Materials', precision: 'PPM level', standard: 'IEC 62321' },
    { name: 'Vibration & Drop Testing', target: 'Durability', precision: 'Up to 100G', standard: 'ISTA 3A' }
];

export const dataService = {
    getGlobalFootprint: async () => {
        return new Promise(resolve => setTimeout(() => resolve(GLOBAL_FOOTPRINT), 300));
    },
    getCorporateMetrics: async () => {
        return new Promise(resolve => setTimeout(() => resolve(CORPORATE_METRICS), 300));
    },
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
    },

    getFactoryGallery: async () => {
        return new Promise(resolve => setTimeout(() => resolve(FACTORY_GALLERY), 300));
    },

    getProductionEquipment: async () => {
        return new Promise(resolve => setTimeout(() => resolve(PRODUCTION_EQUIPMENT), 300));
    },

    getTestingCapabilities: async () => {
        return new Promise(resolve => setTimeout(() => resolve(TESTING_CAPABILITIES), 300));
    }
};
