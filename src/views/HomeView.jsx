import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import * as LucideIcons from 'lucide-react';
import DottedMap from '../components/DottedMap';
import LocationsGlobeView from '../components/LocationsGlobeView';
import BrandsView from '../components/BrandsView';

const historyData = [
    { year: '2000', event: 'Company Foundation', desc: 'Established the core business and vision.', status: 'COMPLETED' },
    { year: '2017', event: 'IPO in Taiwan', desc: 'Successfully listed on the Taiwan Stock Exchange (TW.8499).', status: 'COMPLETED' },
    { year: '2022', event: 'IPO in Shenzhen', desc: 'Expanded market presence with listing on the Shenzhen Stock Exchange (SZ.301389).', status: 'COMPLETED' },
    { year: '2025', event: 'Global Expansion & Future', desc: 'Looking towards a future of continuous technological innovation and sustainable growth.', status: 'IN PROGRESS' }
];

const INDUSTRY_DATA = [
    { name: 'Consumer Electronics', image: '/longyoung-profile/images/industries/ce_bg_1783679265204.png' },
    { name: 'Communication', image: '/longyoung-profile/images/industries/comm_bg_1783679277194.png' },
    { name: 'Automotive', image: '/longyoung-profile/images/industries/auto_bg_1783679253328.png' },
    { name: 'IOT', image: '/longyoung-profile/images/industries/iot_bg_1783679288434.png' },
    { name: 'AI & Server', image: '/longyoung-profile/images/industries/ai_bg_1783679304120.png' },
    { name: 'Wearable Device', image: '/longyoung-profile/images/industries/wearable_bg_1783679315874.png' }
];
const INDUSTRIES = INDUSTRY_DATA.map(i => i.name);
const ROLES = ['All', '终端客户', '系统厂FATP', '软硬板厂', '散热模组厂', '车用客户', '面板厂', '其他'];

const mockPartners = Array.from({ length: 50 }).map((_, i) => ({
    id: `partner-${i}`,
    name: `PARTNER-${(i+1).toString().padStart(2, '0')}`,
    industry: INDUSTRIES[Math.floor(Math.random() * (INDUSTRIES.length - 1)) + 1],
    role: ROLES[Math.floor(Math.random() * (ROLES.length - 1)) + 1]
}));

const AnimatedCounter = ({ value }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value);
    
    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        
        return () => clearInterval(timer);
    }, [target]);

    return <>{count}</>;
};

const HomeView = () => {
    const { fetchHomeData, snapshot, advantages, services, isLoading, error } = useAppStore();
    const [activeSection, setActiveSection] = useState(() => sessionStorage.getItem('home_activeSection') || null);
    const [transitionKey, setTransitionKey] = useState(0);
    const [showHistory, setShowHistory] = useState(() => sessionStorage.getItem('home_showHistory') === 'true');
    const [showPartners, setShowPartners] = useState(() => sessionStorage.getItem('home_showPartners') === 'true');
    const [showLocations, setShowLocations] = useState(() => sessionStorage.getItem('home_showLocations') === 'true');
    const [showBrands, setShowBrands] = useState(() => sessionStorage.getItem('home_showBrands') === 'true');
    const [activeIndustry, setActiveIndustry] = useState('All');
    const [activeRole, setActiveRole] = useState('All');

    useEffect(() => {
        if (activeSection) sessionStorage.setItem('home_activeSection', activeSection);
        else sessionStorage.removeItem('home_activeSection');
    }, [activeSection]);

    useEffect(() => { sessionStorage.setItem('home_showHistory', showHistory); }, [showHistory]);
    useEffect(() => { sessionStorage.setItem('home_showPartners', showPartners); }, [showPartners]);
    useEffect(() => { sessionStorage.setItem('home_showLocations', showLocations); }, [showLocations]);
    useEffect(() => { sessionStorage.setItem('home_showBrands', showBrands); }, [showBrands]);

    const filteredPartners = mockPartners.filter(p => {
        const matchIndustry = activeIndustry === 'All' || p.industry === activeIndustry;
        const matchRole = activeRole === 'All' || p.role === activeRole;
        return matchIndustry && matchRole;
    });

    useEffect(() => {
        fetchHomeData();
    }, [fetchHomeData]);

    if (isLoading) {
        return <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>Error: {error}</div>;
    }

    const isExpanded = activeSection !== null;

    const handleSectionClick = (sectionKey) => {
        setActiveSection(activeSection === sectionKey ? null : sectionKey);
        setTransitionKey(prev => prev + 1);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {/* Hero Section */}
            <section style={{ 
                minHeight: '80vh', 
                display: 'flex', 
                flexDirection: isExpanded ? 'row' : 'column', 
                justifyContent: isExpanded ? 'flex-start' : 'center', 
                alignItems: isExpanded ? 'flex-start' : 'center',
                textAlign: isExpanded ? 'left' : 'center',
                padding: isExpanded ? '6rem 2rem 2rem 1rem' : '0 2rem',
                position: 'relative',
                gap: isExpanded ? '2rem' : '0',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <DottedMap />


                {/* SVG Filter for Pixel Decomposition Glitch */}
                <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                    <filter id="pixel-glitch">
                        {/* High frequency on X to create digital horizontal scanning blocks */}
                        <feTurbulence type="fractalNoise" baseFrequency="0.1 0.05" numOctaves="1" result="noise" />
                        <feComponentTransfer in="noise" result="chunkyNoise">
                            <feFuncR type="discrete" tableValues="0 1"/>
                            <feFuncG type="discrete" tableValues="0 1"/>
                        </feComponentTransfer>
                        <feDisplacementMap in="SourceGraphic" in2="chunkyNoise" scale="0" xChannelSelector="R" yChannelSelector="G">
                            {transitionKey > 0 && (
                                <animate key={transitionKey} attributeName="scale" values="0; 120; 0" dur="0.8s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" begin="0s" />
                            )}
                        </feDisplacementMap>
                    </filter>
                </svg>
                
                {/* Left Side: Header & Buttons */}
                <motion.div 
                    layout
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: isExpanded ? 'flex-start' : 'center',
                        flex: isExpanded ? '0 0 200px' : 'none',
                        maxWidth: isExpanded ? '200px' : '100%',
                        zIndex: 10,
                        filter: transitionKey > 0 ? 'url(#pixel-glitch)' : 'none'
                    }}
                >
                    <AnimatePresence>
                        {!isExpanded && (
                            <motion.h1 
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                transition={{ duration: 0.4 }}
                                style={{ fontSize: '4rem', maxWidth: '800px', marginBottom: '1rem' }}
                            >
                                INSPIRE <span className="text-gradient">TECHNOLOGY</span> AND LIFE
                            </motion.h1>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {!isExpanded && (
                            <motion.p 
                                layout
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: '2rem' }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', overflow: 'hidden', fontWeight: 'bold', letterSpacing: '2px', textAlign: 'center', lineHeight: 1.6 }}
                            >
                                LONGYOUNG ELECTRONICS COMPANY PROFILE<br />
                                <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.8, letterSpacing: '4px' }}>2026</span>
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <motion.div 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{ display: 'flex', flexDirection: isExpanded ? 'column' : 'row', gap: isExpanded ? '0.5rem' : '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: isExpanded ? 'flex-start' : 'center', width: isExpanded ? '100%' : 'auto' }}
                    >
                        {['snapshot', 'global', 'competitive', 'brands'].map((sectionKey, idx) => {
                            const labels = {
                                'snapshot': 'Company Snapshot',
                                'global': 'Global Footprint',
                                'competitive': 'Competitive Offerings',
                                'brands': 'Our Brands & Products'
                            };
                            return (
                                <motion.button 
                                    key={sectionKey}
                                    onClick={() => handleSectionClick(sectionKey)}
                                    whileHover={{ 
                                        y: -3,
                                        backgroundColor: activeSection === sectionKey ? 'var(--accent-primary)' : 'var(--bg-glass-light)',
                                        borderRadius: '50px',
                                        textShadow: 'var(--accent-glow)'
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                    style={{ 
                                        position: 'relative',
                                        padding: isExpanded ? '1rem 1rem 1rem 2rem' : '0.8rem 2rem', 
                                        fontSize: '0.85rem', 
                                        color: activeSection === sectionKey ? '#ffffff' : 'var(--text-secondary)', 
                                        cursor: 'pointer', 
                                        backgroundColor: activeSection === sectionKey ? 'var(--accent-primary)' : 'var(--bg-glass-card)', 
                                        border: 'none', 
                                        borderLeft: activeSection === sectionKey ? 'none' : '1px solid var(--border-strong)',
                                        borderRadius: '50px',
                                        textAlign: isExpanded ? 'left' : 'center',
                                        width: isExpanded ? '100%' : 'auto',
                                        fontFamily: 'monospace',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        boxShadow: activeSection === sectionKey ? '0 10px 25px rgba(25, 101, 163, 0.4)' : 'none',
                                    }}>
                                    <span style={{ color: activeSection === sectionKey ? '#ffffff' : 'var(--text-secondary)', transition: 'color 0.3s', opacity: activeSection === sectionKey ? 0.9 : 1 }}>0{idx + 1} //</span>
                                    <span style={{ color: activeSection === sectionKey ? '#ffffff' : 'var(--text-primary)', fontWeight: activeSection === sectionKey ? '700' : '500', letterSpacing: '2px', transition: 'all 0.3s' }}>{labels[sectionKey].toUpperCase()}</span>
                                    {activeSection === sectionKey && (
                                        <motion.div layoutId="navIndicator" style={{ position: 'absolute', right: '15px', top: '50%', translateY: '-50%', width: '8px', height: '8px', backgroundColor: '#ffffff', borderRadius: '50%', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
                                    )}
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    <AnimatePresence>
                        {!isExpanded && services && services.length > 0 && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: 20, height: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', overflow: 'visible', padding: '1rem' }}
                            >
                                {services.map((service) => {
                                    const IconComponent = LucideIcons[service.icon] || LucideIcons.Circle;
                                    return (
                                        <div key={service.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} className="service-icon-group">
                                            <div className="service-icon-circle">
                                                <IconComponent size={28} color="currentColor" />
                                            </div>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>{service.name}</span>
                                        </div>
                                    )
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Right Side: Content Area */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ flex: 1, zIndex: 10, padding: '1rem 0 0 0', minHeight: '500px', display: 'flex', flexDirection: 'column' }}
                        >
                            {activeSection === 'snapshot' ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '5rem', padding: '0 2rem 2rem' }}
                                >
                                    <AnimatePresence mode="wait">
                                        {!showHistory && !showPartners && !showLocations && !showBrands ? (
                                            <motion.div 
                                                key="snapshot-grid"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4 }}
                                                style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}
                                            >

                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
                                                    {[
                                                        { num: '26', label: 'Years of Experience', sysId: '0x8F22A', isExp: true },
                                                        { num: '986', label: 'Global Partners', sysId: '0xB719C' },
                                                        { num: '11', label: 'Worldwide Locations', sysId: '0xC499D' },
                                                        { num: '5', label: 'Brands', sysId: '0x1A44E' }
                                                    ].map((item, idx) => {
                                                        const getLayoutIdPrefix = () => {
                                                            if(item.isExp) return 'experience';
                                                            if(item.label === 'Global Partners') return 'partners';
                                                            if(item.label === 'Worldwide Locations') return 'locations';
                                                            if(item.label === 'Brands') return 'brands';
                                                            return undefined;
                                                        };
                                                        const prefix = getLayoutIdPrefix();
                                                        return (
                                                        <motion.div 
                                                            key={idx}
                                                            layoutId={prefix ? `${prefix}-card` : undefined}
                                                            onClick={() => { 
                                                                if (item.isExp) setShowHistory(true); 
                                                                if (item.label === 'Global Partners') setShowPartners(true);
                                                                if (item.label === 'Worldwide Locations') setShowLocations(true);
                                                                if (item.label === 'Brands') setShowBrands(true);
                                                            }}
                                                            whileHover={{ y: -10, scale: 1.03, boxShadow: 'var(--accent-glow-strong)', borderTop: '3px solid var(--accent-primary)' }}
                                                            className="glass-panel snapshot-card" 
                                                            style={{ 
                                                                padding: '3.5rem 1rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                                                                position: 'relative', overflow: 'hidden', border: '1px solid var(--color-shadow)', borderTop: '3px solid var(--color-shadow)', 
                                                                background: 'var(--bg-glass-card)', clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                                                                cursor: prefix ? 'pointer' : 'default'
                                                            }}
                                                        >
                                                            <motion.span className="snapshot-num" layoutId={prefix ? `${prefix}-num` : undefined} style={{ fontSize: '4.5rem', fontWeight: '900', zIndex: 1, textShadow: 'var(--accent-glow-strong)', lineHeight: 1, fontFamily: 'monospace' }}>
                                                                {prefix ? item.num : <AnimatedCounter value={item.num} />}
                                                            </motion.span>
                                                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
                                                                <span className="snapshot-bracket">[</span>
                                                                <motion.span className="snapshot-label" layoutId={prefix ? `${prefix}-label` : undefined} style={{ fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center', fontWeight: '500' }}>{item.label}</motion.span>
                                                                <span className="snapshot-bracket">]</span>
                                                            </div>
                                                        </motion.div>
                                                    )})}
                                                </div>
                                                
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', width: '100%', maxWidth: '1100px', margin: '1rem auto 0' }}>
                                                    {[
                                                        { year: '2017', desc: 'IPO in Taiwan', code: 'TW.8499', align: 'left' },
                                                        { year: '2022', desc: 'IPO in Shenzhen', code: 'SZ.301389', align: 'right' }
                                                    ].map((item, idx) => (
                                                        <motion.div key={idx} whileHover={{ y: -8, scale: 1.02, boxShadow: 'var(--accent-glow-strong)', borderColor: 'var(--accent-primary)' }} className="glass-panel" 
                                                            style={{ 
                                                                padding: '2.5rem 3rem', display: 'flex', flexDirection: item.align === 'left' ? 'row' : 'row-reverse', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', 
                                                                border: '1px solid var(--border-subtle)', borderLeft: item.align === 'left' ? '4px solid var(--accent-primary)' : '1px solid var(--border-subtle)', borderRight: item.align === 'right' ? '4px solid var(--accent-primary)' : '1px solid var(--border-subtle)', 
                                                                background: 'var(--bg-glass-card)', 
                                                                clipPath: item.align === 'left' ? 'polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)' : 'polygon(20px 0, 100% 0, 100% 100%, 0 100%)', transition: 'all 0.4s ease' 
                                                            }}
                                                        >
                                                            <span style={{ color: 'var(--text-primary)', fontSize: '3.5rem', fontWeight: '900', letterSpacing: '2px', textShadow: '0 0 20px rgba(255,255,255,0.3)', fontFamily: 'monospace' }}><AnimatedCounter value={item.year} /></span>
                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: item.align === 'left' ? 'flex-end' : 'flex-start', textAlign: item.align === 'left' ? 'right' : 'left' }}>
                                                                <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{item.desc}</span>
                                                                <span style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '3px', fontFamily: 'monospace' }}>{item.code}</span>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                <div style={{ width: '100%', maxWidth: '1100px', margin: '2rem auto 0', textAlign: 'center', padding: '1.5rem 2rem' }}>
                                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, letterSpacing: '1px', margin: 0 }}>
                                                        "Provide Functional Solution to accelerate the design process and the growth of technology for the safety and good of humankind."
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ) : showBrands ? (
                                            <BrandsView onClose={() => setShowBrands(false)} />
                                        ) : showLocations ? (
                                            <LocationsGlobeView onClose={() => setShowLocations(false)} />
                                        ) : showPartners ? (
                                            <motion.div 
                                                key="snapshot-partners"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4 }}
                                                style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1300px', margin: '0 auto', marginTop: '-30px', gap: '2rem' }}
                                            >
                                                {/* Header morphing from card */}
                                                <motion.div 
                                                    layoutId="partners-card"
                                                    className="glass-panel"
                                                    onClick={() => { 
                                                        setShowPartners(false);
                                                        setActiveIndustry('All');
                                                        setActiveRole('All');
                                                    }}
                                                    whileHover={{ scale: 1.02 }}
                                                    style={{ 
                                                        padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem',
                                                        border: 'none', background: 'var(--accent-primary)',
                                                        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <motion.span layoutId="partners-num" style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', fontFamily: 'monospace', textShadow: 'none' }}>
                                                        986
                                                    </motion.span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>[</span>
                                                        <motion.span layoutId="partners-label" style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '500' }}>
                                                            Global Partners
                                                        </motion.span>
                                                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>]</span>
                                                    </div>
                                                    <div style={{ marginLeft: 'auto', color: '#ffffff', fontSize: '0.8rem', letterSpacing: '2px' }}>
                                                        [ CLICK TO RETURN ]
                                                    </div>
                                                </motion.div>

                                                {/* Main Layout Area */}
                                                <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
                                                    
                                                    {/* Left Area: Map & Grid */}
                                                    <div style={{ position: 'relative', flex: 1, padding: '0 0 1rem 0' }}>
                                                        {/* Faded Background Map */}
                                                        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', top: '-100px' }}>
                                                            <DottedMap />
                                                        </div>
                                                        
                                                        {/* Logo Grid */}
                                                        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.8rem', position: 'relative', zIndex: 5, paddingBottom: '1rem' }} className="custom-scrollbar">
                                                            <AnimatePresence>
                                                                {filteredPartners.map(p => (
                                                                    <motion.div
                                                                        key={p.id}
                                                                        layout
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className="glass-panel"
                                                                        style={{
                                                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                                            padding: '0.5rem', border: '1px solid rgba(0, 198, 255, 0.1)', borderRadius: '8px',
                                                                            background: 'var(--bg-glass-medium)', backdropFilter: 'blur(10px)', height: '75px', gap: '0.4rem'
                                                                        }}
                                                                    >
                                                                        <div style={{ width: '24px', height: '24px', background: 'var(--bg-glass-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(0,198,255,0.3)' }}>
                                                                            <LucideIcons.Box size={14} color="var(--accent-primary)" />
                                                                        </div>
                                                                        <span style={{ fontSize: '0.55rem', color: 'var(--text-primary)', fontFamily: 'monospace', textAlign: 'center', letterSpacing: '0.5px' }}>{p.name}</span>
                                                                    </motion.div>
                                                                ))}
                                                            </AnimatePresence>
                                                        </motion.div>
                                                    </div>

                                                    {/* Right Area: Vertical Industry Filter */}
                                                    <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '10px', zIndex: 10 }} className="custom-scrollbar">
                                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>Industry</span>
                                                        {INDUSTRY_DATA.map(ind => (
                                                            <motion.div
                                                                key={ind.name}
                                                                onClick={() => setActiveIndustry(activeIndustry === ind.name ? 'All' : ind.name)}
                                                                whileHover={{ x: -5, scale: 1.02 }}
                                                                style={{
                                                                    width: '100%', minHeight: '90px', borderRadius: '8px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                                                                    border: activeIndustry === ind.name ? '2px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.1)',
                                                                    boxShadow: activeIndustry === ind.name ? 'var(--accent-glow)' : 'none',
                                                                    transition: 'all 0.3s ease',
                                                                    backgroundImage: ind.image ? `url('${ind.image}')` : 'none',
                                                                    backgroundSize: 'cover', backgroundPosition: 'center',
                                                                    backgroundColor: ind.image ? 'transparent' : (activeIndustry === ind.name ? 'var(--border-subtle)' : 'var(--border-subtle)'),
                                                                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                                }}
                                                            >
                                                                {ind.image && (
                                                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
                                                                )}
                                                                <span style={{ 
                                                                    color: ind.image ? '#ffffff' : 'var(--text-primary)', 
                                                                    fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center', textShadow: ind.image ? '0 2px 5px rgba(0,0,0,0.8)' : 'none',
                                                                    position: 'relative', zIndex: 2, padding: '0 10px', letterSpacing: '1px'
                                                                }}>
                                                                    {ind.name}
                                                                </span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="snapshot-history"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4 }}
                                                style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1300px', margin: '0 auto', marginTop: '-30px', gap: '2rem' }}
                                            >
                                                {/* Header morphing from card */}
                                                <motion.div 
                                                    layoutId="experience-card"
                                                    className="glass-panel"
                                                    onClick={() => setShowHistory(false)}
                                                    whileHover={{ scale: 1.02 }}
                                                    style={{ 
                                                        padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem',
                                                        border: 'none', background: 'var(--accent-primary)',
                                                        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <motion.span layoutId="experience-num" style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', fontFamily: 'monospace', textShadow: 'none' }}>
                                                        26
                                                    </motion.span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>[</span>
                                                        <motion.span layoutId="experience-label" style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '500' }}>
                                                            Years of Experience
                                                        </motion.span>
                                                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>]</span>
                                                    </div>
                                                    <div style={{ marginLeft: 'auto', color: '#ffffff', fontSize: '0.8rem', letterSpacing: '2px' }}>
                                                        [ CLICK TO RETURN ]
                                                    </div>
                                                </motion.div>

                                                {/* Timeline Content */}
                                                <div style={{ position: 'relative', paddingLeft: '200px' }}>
                                                    <div style={{ position: 'absolute', left: '160px', top: '10px', bottom: '10px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }} />
                                                    {historyData.map((item, index) => (
                                                        <motion.div 
                                                            key={index}
                                                            initial={{ opacity: 0, x: -30 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.15 + 0.2 }}
                                                            style={{ position: 'relative', marginBottom: index === historyData.length - 1 ? 0 : '3rem', minHeight: '90px' }}
                                                        >
                                                            {/* Image Placeholder area */}
                                                            <div style={{ position: 'absolute', left: '-200px', top: '0', width: '140px', height: '90px', background: 'rgba(0,198,255,0.02)', border: '1px dashed rgba(0,198,255,0.3)', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'all 0.3s' }} className="timeline-img-placeholder">
                                                                <LucideIcons.Image size={24} color="rgba(0,198,255,0.3)" style={{ marginBottom: '8px' }} />
                                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace', letterSpacing: '1px' }}>IMG_SRC_REQ</span>
                                                            </div>
                                                            
                                                            <div style={{ position: 'absolute', left: '-47px', top: '5px', width: '16px', height: '16px', borderRadius: '50%', background: '#030816', border: '2px solid var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }} />
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)', fontFamily: 'monospace' }}>{item.year}</span>
                                                                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', border: `1px solid ${item.status === 'COMPLETED' ? 'var(--accent-primary)' : 'var(--border-strong)'}`, color: item.status === 'COMPLETED' ? 'var(--accent-primary)' : 'var(--text-secondary)', borderRadius: '4px', fontFamily: 'monospace' }}>
                                                                        {item.status}
                                                                    </span>
                                                                </div>
                                                                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', letterSpacing: '1px' }}>{item.event}</h3>
                                                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                <div style={{ flex: 1, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* Content placeholder */}
                                    <p style={{ fontSize: '1.2rem', opacity: 0.5 }}>Content for {activeSection} is coming soon...</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
};

export default HomeView;
