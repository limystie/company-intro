import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const CORE_TECHNOLOGIES = [
    {
        id: 'vacuum',
        title: 'Vacuum Coating Technology',
        subtitle: '真空镀膜技术',
        span: 2,
        icon: <LucideIcons.Atom size={32} strokeWidth={1.5} />,
        color: '#00B4D8',
        items: ['Physical Vapor Deposition (PVD)', 'Magnetron Sputtering', 'Vacuum Evaporation', 'Plasma Surface Treatment']
    },
    {
        id: 'plating',
        title: 'Electroplating Technology',
        subtitle: '电镀',
        span: 1,
        icon: <LucideIcons.Droplets size={32} strokeWidth={1.5} />,
        color: '#1E6CD9',
        items: ['Electroless Plating', 'Passivation & Anti-oxidation']
    },
    {
        id: 'coating',
        title: 'Coating Technology',
        subtitle: '涂布技术',
        span: 1,
        icon: <LucideIcons.Layers size={32} strokeWidth={1.5} />,
        color: '#31C48D',
        items: ['Precision Coating', 'Drying & Curing']
    },
    {
        id: 'calendering',
        title: 'Calendering Technology',
        subtitle: '压延技术',
        span: 1,
        icon: <LucideIcons.Settings size={32} strokeWidth={1.5} />,
        color: '#F59E0B',
        items: []
    },
    {
        id: 'die-cutting',
        title: 'Precision Die-Cutting',
        subtitle: '精密模切技术',
        span: 1,
        icon: <LucideIcons.Scissors size={32} strokeWidth={1.5} />,
        color: '#8B5CF6',
        items: ['Lamination & Bonding', 'FOF Molding & Extrusion']
    }
];

const TechBentoCard = ({ tech, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                gridColumn: `span ${tech.span}`,
                background: 'var(--bg-glass-card)',
                border: '1px solid',
                borderColor: isHovered ? `${tech.color}50` : 'var(--border-subtle)',
                borderRadius: '20px',
                padding: '1.2rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isHovered ? `0 10px 30px -10px ${tech.color}40` : '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                minHeight: '160px'
            }}
        >
            {/* Background Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle, ${tech.color}20 0%, transparent 70%)`,
                opacity: isHovered ? 1 : 0.3,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Header: Icon & Titles */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <motion.div 
                        animate={{ 
                            scale: isHovered ? 1.1 : 1,
                            color: isHovered ? tech.color : 'var(--text-secondary)',
                            borderColor: isHovered ? `${tech.color}50` : 'var(--border-subtle)'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ 
                            background: 'rgba(255, 255, 255, 0.03)', 
                            padding: '12px', 
                            borderRadius: '16px',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.3s ease, border-color 0.3s ease'
                        }}
                    >
                        {tech.icon}
                    </motion.div>
                    
                    <div>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '0.5px' }}>
                            {tech.title}
                        </h4>
                    </div>
                </div>

                {/* Sub-items (Pills) */}
                {tech.items.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {tech.items.map((item, i) => (
                            <motion.span 
                                key={i}
                                animate={{ 
                                    background: isHovered ? `${tech.color}15` : 'rgba(255, 255, 255, 0.03)',
                                    borderColor: isHovered ? `${tech.color}40` : 'var(--border-subtle)',
                                    color: isHovered ? tech.color : 'var(--text-secondary)'
                                }}
                                style={{
                                    padding: '4px 10px',
                                    borderRadius: '15px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    border: '1px solid',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {item}
                            </motion.span>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Optional empty state for calendering to keep layout balanced */}
            {tech.items.length === 0 && (
                <div style={{ height: '26px' }}></div> 
            )}
        </motion.div>
    );
};

const CompetitiveOfferingsView = ({ advantages, technologies, quality }) => {
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem('competitive_activeTab') || 'advantages';
    });
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [selectedSlice, setSelectedSlice] = useState(null);

    useEffect(() => {
        sessionStorage.setItem('competitive_activeTab', activeTab);
    }, [activeTab]);

    const tabs = [
        { id: 'advantages', label: 'Core Advantages' },
        { id: 'technologies', label: 'Core Technologies' },
        { id: 'quality', label: 'Quality & Sustainability' }
    ];

    // Helper components to render each tab's content
    const renderAdvantages = () => {
        if (!advantages || advantages.length === 0) return null;
        
        // Center of the triangle is (0,0). Radius R.
        const R = 280;
        
        // Vertices
        const T = { x: 0, y: -R };
        const BR = { x: R * 0.866, y: R * 0.5 };
        const BL = { x: -R * 0.866, y: R * 0.5 };

        // We will map data to:
        // [0] Material R&D (INNOVATION) -> Right Slice (Teal)
        // [1] Die-Cutting (EFFICIENCY) -> Left Slice (Blue)
        // [2] Test Verification (RELIABILITY) -> Bottom Slice (Green)
        
        const SLICES = [
            {
                // Material R&D (Innovation)
                index: 0,
                color: 'url(#grad-teal)', // Premium Teal Gradient
                glowColor: '#10D5C9',
                points: `0,0 ${T.x},${T.y} ${BR.x},${BR.y}`,
                text: advantages[0].keyword || 'INNOVATION',
                title: advantages[0].title,
                textPos: { x: R * 0.35, y: -R * 0.15 },
                textAngle: 60,
                hoverTranslate: { x: 15, y: -8.66 }, // translate 30 deg up-right
                titlePos: { left: '90.4%', top: '73.3%' } // Bottom Right Vertex
            },
            {
                // Die-Cutting (Efficiency)
                index: 1,
                color: 'url(#grad-blue)', // Premium Blue Gradient
                glowColor: '#1E6CD9',
                points: `0,0 ${BL.x},${BL.y} ${T.x},${T.y}`,
                text: advantages[1].keyword || 'EFFICIENCY',
                title: advantages[1].title,
                textPos: { x: -R * 0.35, y: -R * 0.15 },
                textAngle: -60,
                hoverTranslate: { x: -15, y: -8.66 }, // translate 150 deg up-left
                titlePos: { left: '50%', top: '3.3%', transform: 'translate(-50%, -100%)' } // Top Vertex
            },
            {
                // Test Verification (Reliability)
                index: 2,
                color: 'url(#grad-green)', // Premium Green Gradient
                glowColor: '#31C48D',
                points: `0,0 ${BR.x},${BR.y} ${BL.x},${BL.y}`,
                text: advantages[2].keyword || 'RELIABILITY',
                title: advantages[2].title,
                textPos: { x: 0, y: R * 0.4 },
                textAngle: 0,
                hoverTranslate: { x: 0, y: 17.32 }, // translate down
                titlePos: { right: '90.4%', top: '73.3%' } // Bottom Left Vertex
            }
        ];

        // Variants for the assemble animation
        const panelVariants = {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            },
            exit: { opacity: 0, transition: { duration: 0.2 } }
        };

        const itemVariants = {
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
        };

        return (
            <motion.div 
                key="advantages-triforce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '2rem 2% 1rem'
                }}
            >
                {/* LEFT COLUMN: The Interactive Triforce Matrix */}
                <div style={{ position: 'relative', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                        style={{ position: 'relative', width: '92%', maxWidth: '850px', aspectRatio: '1 / 1', zIndex: 10 }}
                    >
                        <svg viewBox="-300 -300 600 600" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="grad-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#0A438A" />
                                    <stop offset="100%" stopColor="#1E6CD9" />
                                </linearGradient>
                                <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0694A2" />
                                    <stop offset="100%" stopColor="#10D5C9" />
                                </linearGradient>
                                <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#057A55" />
                                    <stop offset="100%" stopColor="#31C48D" />
                                </linearGradient>
                                <filter id="glow-triforce">
                                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            {SLICES.map((slice, i) => {
                                const isHovered = hoveredSlice === i;
                                const isDimmed = hoveredSlice !== null && !isHovered;
                                
                                // Base gap for breathing room
                                const gapX = slice.hoverTranslate.x * 0.5;
                                const gapY = slice.hoverTranslate.y * 0.5;
                                
                                const tx = gapX + (isHovered ? slice.hoverTranslate.x * 1.5 : 0);
                                const ty = gapY + (isHovered ? slice.hoverTranslate.y * 1.5 : 0);

                                return (
                                    <motion.g 
                                        key={i}
                                        onMouseEnter={() => setHoveredSlice(i)}
                                        onMouseLeave={() => setHoveredSlice(null)}
                                        animate={{ 
                                            x: tx, 
                                            y: ty,
                                            opacity: isDimmed ? 0.3 : 1,
                                        }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {/* The Triangle Slice */}
                                        <polygon 
                                            points={slice.points} 
                                            fill={slice.color} 
                                            stroke="var(--bg-primary)"
                                            strokeWidth="4"
                                            style={{ 
                                                filter: isHovered ? 'url(#glow-triforce)' : 'none',
                                                transition: 'filter 0.3s'
                                            }} 
                                        />
                                        {/* The Text embedded in the slice */}
                                        <text 
                                            x={slice.textPos.x} 
                                            y={slice.textPos.y} 
                                            fill="#ffffff" 
                                            fontSize="22" 
                                            fontWeight="700" 
                                            letterSpacing="3" 
                                            textAnchor="middle" 
                                            alignmentBaseline="middle"
                                            transform={`rotate(${slice.textAngle}, ${slice.textPos.x}, ${slice.textPos.y})`}
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            {slice.text}
                                        </text>
                                    </motion.g>
                                );
                            })}
                        </svg>

                        {/* Always Visible Floating Titles */}
                        {SLICES.map((slice, i) => (
                            <div 
                                key={`title-${i}`}
                                style={{
                                    position: 'absolute',
                                    ...slice.titlePos,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(12px)',
                                    border: `1px solid ${slice.glowColor}40`,
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '30px',
                                    color: 'var(--text-primary)',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    boxShadow: `0 8px 32px rgba(0,0,0,0.2)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    zIndex: 15,
                                    pointerEvents: 'none',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: slice.glowColor, boxShadow: `0 0 12px ${slice.glowColor}` }} />
                                {slice.title}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Dedicated Dynamic Reading Area (No Box, Pure Typography) */}
                <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '2rem', marginTop: '-10rem' }}>
                    <AnimatePresence mode="wait">
                        {hoveredSlice === null ? (
                            <motion.div
                                key="default-state"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '1px' }}>
                                    The Synergy Matrix
                                </h3>
                                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 400, marginBottom: '1.2rem' }}>
                                    Longyoung Electronics delivers an <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>integrated, one-stop service</strong> through our core matrix. 
                                </p>
                                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 400 }}>
                                    From <span style={{ color: '#00B4D8', fontWeight: 600 }}>raw material design</span> and <span style={{ color: '#1E6CD9', fontWeight: 600 }}>precision die-cutting</span> to <span style={{ color: '#31C48D', fontWeight: 600 }}>rigorous performance testing</span>, we provide customers with rapid responses and premium solutions perfectly tailored to their needs.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`panel-${hoveredSlice}`}
                                variants={panelVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                {/* Active Value Indicator Line */}
                                <motion.div 
                                    variants={itemVariants}
                                    style={{ width: '60px', height: '4px', background: SLICES[hoveredSlice].glowColor, borderRadius: '2px', marginBottom: '0.75rem', boxShadow: `0 0 15px ${SLICES[hoveredSlice].glowColor}80` }}
                                />

                                {/* Section Title */}
                                <motion.h3 
                                    variants={itemVariants} 
                                    style={{ margin: '0 0 0.75rem 0', fontSize: '2.8rem', color: SLICES[hoveredSlice].glowColor, fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase' }}
                                >
                                    {SLICES[hoveredSlice].text}
                                </motion.h3>

                                {/* Mathematical Synergy Equation */}
                                <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ padding: '8px 18px', background: 'var(--bg-glass-card)', borderRadius: '25px', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700, border: `1px solid ${SLICES[hoveredSlice].glowColor}40` }}>
                                        {hoveredSlice === 0 ? advantages[1].title : (hoveredSlice === 1 ? advantages[1].title : advantages[0].title)}
                                    </span>
                                    <LucideIcons.Plus size={20} color="var(--text-secondary)" strokeWidth={3} />
                                    <span style={{ padding: '8px 18px', background: 'var(--bg-glass-card)', borderRadius: '25px', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700, border: `1px solid ${SLICES[hoveredSlice].glowColor}40` }}>
                                        {hoveredSlice === 0 ? advantages[0].title : (hoveredSlice === 1 ? advantages[2].title : advantages[2].title)}
                                    </span>
                                </motion.div>

                                {/* Refined Description */}
                                <motion.div variants={itemVariants}>
                                    <p style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 400 }}>
                                        {advantages[hoveredSlice].description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    };

    const renderTechnologies = () => {
        return (
            <motion.div 
                key="technologies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', padding: '0 0 1rem 0' }}
            >
                {/* Header for the section */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '1px' }}>
                        Core Manufacturing Capabilities
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
                        A comprehensive ecosystem of vertically integrated manufacturing technologies, providing end-to-end solutions from raw materials to precision components.
                    </p>
                </div>

                {/* Bento Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '1rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {CORE_TECHNOLOGIES.map((tech, index) => (
                        <TechBentoCard key={tech.id} tech={tech} index={index} />
                    ))}
                </div>
            </motion.div>
        );
    };

    const renderQuality = () => {
        if (!quality || quality.length === 0) return null;
        return (
            <motion.div 
                key="quality"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', padding: '2rem 0' }}
            >
                {quality.map((q, i) => {
                    const Icon = LucideIcons[q.icon] || LucideIcons.ShieldCheck;
                    return (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '3rem', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                                background: 'var(--bg-glass-heavy)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '2.5rem'
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', minWidth: '150px' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--accent-glow)' }}>
                                    <Icon size={36} color="#ffffff" />
                                </div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{q.value}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.6rem', color: 'var(--text-primary)', fontWeight: 700 }}>{q.title}</h3>
                                <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{q.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: '1250px', margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '0 1rem 0' }}
        >
            {/* Stylized Header was removed here per user request */}

            {/* Pill-shaped Segmented Control */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', marginTop: '-4rem' }}>
                <div style={{ 
                    display: 'flex', background: 'var(--bg-glass-card)', border: '1px solid var(--border-subtle)', 
                    borderRadius: '50px', padding: '8px', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}>
                    {tabs.map(tab => (
                        <div 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{ position: 'relative', padding: '1rem 2.5rem', cursor: 'pointer', borderRadius: '40px', zIndex: 1 }}
                        >
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="activeTabBg"
                                    style={{ position: 'absolute', inset: 0, background: 'var(--accent-primary)', borderRadius: '40px', boxShadow: 'var(--accent-glow)' }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                />
                            )}
                            <span style={{ 
                                position: 'relative', 
                                zIndex: 2, 
                                fontSize: '1rem', 
                                letterSpacing: '2px', 
                                fontWeight: 500, 
                                textTransform: 'uppercase', 
                                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)', 
                                transition: 'color 0.3s' 
                            }}>
                                {tab.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {activeTab === 'advantages' && renderAdvantages()}
                {activeTab === 'technologies' && renderTechnologies()}
                {activeTab === 'quality' && renderQuality()}
            </AnimatePresence>
        </motion.div>
    );
};

export default CompetitiveOfferingsView;
