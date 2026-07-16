import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const subBrands = [
    { 
        id: 'EMC', 
        name: 'EMC Materials', 
        brand: 'Flextron', 
        bgImg: '/longyoung-profile/images/materials/conductive_fabric.png', 
        logo: '/longyoung-profile/images/brands/Flextron.png' 
    },
    { 
        id: 'THM', 
        name: 'Thermal Materials', 
        brand: 'futherma', 
        bgImg: '/longyoung-profile/images/materials/thermal_pad.png', 
        logo: '/longyoung-profile/images/brands/futherma.png' 
    },
    { 
        id: 'BND', 
        name: 'Bonding Materials', 
        brand: 'Dwell', 
        bgImg: '/longyoung-profile/images/materials/transparent_tape.png', 
        logo: '/longyoung-profile/images/brands/DWELL logo.png' 
    },
    { 
        id: 'COP', 
        name: 'Composite Copper', 
        brand: 'GHZ', 
        bgImg: '/longyoung-profile/images/materials/copper_foil.png', 
        logo: '/longyoung-profile/images/brands/GHZ logo.png' 
    }
];

const BrandsView = ({ onClose }) => {
    const [hoveredId, setHoveredId] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', maxWidth: '1300px', margin: '0 auto', marginTop: '-30px', display: 'flex', flexDirection: 'column' }}
        >
            {/* Morphing Header Card */}
            <motion.div 
                layoutId="brands-card"
                className="glass-panel"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                style={{ 
                    padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem',
                    border: 'none', background: 'var(--accent-primary)',
                    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                    width: '100%', cursor: 'pointer', marginBottom: '2rem'
                }}
            >
                <motion.span layoutId="brands-num" style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', fontFamily: 'monospace', textShadow: 'none' }}>
                    5
                </motion.span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>[</span>
                    <motion.span layoutId="brands-label" style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '500' }}>
                        Brands
                    </motion.span>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>]</span>
                </div>
                <div style={{ marginLeft: 'auto', color: '#ffffff', fontSize: '0.8rem', letterSpacing: '2px' }}>
                    [ CLICK TO RETURN ]
                </div>
            </motion.div>

            {/* Content Structure */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                
                {/* 1. Umbrella Brand (Top Row) */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel" 
                    style={{ 
                        background: 'var(--bg-glass-card)', 
                        padding: '2.5rem 3rem', 
                        borderRadius: '4px', 
                        border: '1px solid rgba(0, 119, 255, 0.15)', 
                        borderTop: '3px solid var(--accent-primary)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
                        <img src="/longyoung-profile/images/brands/LY LOGO英文.png" alt="Long Young Electronics" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <div style={{ fontWeight: '800', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                            Core Holding Company
                        </div>
                        <div style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                            COMPOSITE MATERIALS + PRECISE DIE-CUT + FUNCTIONAL DESIGN SOLUTIONS
                        </div>
                    </div>
                </motion.div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Subsidiary Material Brands</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(0,119,255,0.15), transparent)' }} />
                </div>

                {/* 2. Sub-brands Grid (Bottom Row) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}
                >
                    {subBrands.map((brand) => {
                        const isHovered = hoveredId === brand.id;
                        
                        return (
                            <motion.div 
                                key={brand.id}
                                variants={cardVariants}
                                onMouseEnter={() => setHoveredId(brand.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="glass-panel" 
                                style={{ 
                                    position: 'relative', 
                                    overflow: 'hidden', 
                                    background: isHovered ? 'rgba(0, 119, 255, 0.05)' : 'var(--bg-glass-card)', 
                                    minHeight: '280px', 
                                    padding: '2rem 1.5rem', 
                                    borderRadius: '4px', 
                                    border: '1px solid',
                                    borderColor: isHovered ? 'rgba(0, 119, 255, 0.3)' : 'rgba(255,255,255,0.05)',
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    cursor: 'crosshair',
                                    transition: 'all 0.4s ease',
                                    boxShadow: isHovered ? 'var(--accent-glow-strong)' : 'none'
                                }}
                            >
                                {/* Background Image Reveal with Tech Filter */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 0.15, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                zIndex: 0,
                                                backgroundImage: `url('${brand.bgImg}')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(300%) contrast(1.2) brightness(0.8)',
                                                mixBlendMode: 'screen'
                                            }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Top Accent Line */}
                                <motion.div 
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: isHovered ? 1 : 0 }}
                                    style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--accent-primary)', transformOrigin: 'left', zIndex: 1 }}
                                />

                                {/* Header text */}
                                <div style={{ zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ 
                                        fontFamily: 'monospace', 
                                        fontSize: '0.75rem', 
                                        color: isHovered ? 'var(--accent-primary)' : 'var(--text-muted)',
                                        letterSpacing: '2px',
                                        marginBottom: '0.5rem',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        [{brand.id}]
                                    </span>
                                    <h4 style={{ 
                                        textAlign: 'center', 
                                        fontSize: '0.9rem', 
                                        fontWeight: '700', 
                                        color: isHovered ? 'var(--accent-primary)' : 'var(--text-primary)', 
                                        letterSpacing: '1px', 
                                        textTransform: 'uppercase',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        {brand.name}
                                    </h4>
                                </div>

                                {/* Logo */}
                                <div style={{ zIndex: 1, width: '100%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', filter: isHovered ? 'none' : 'grayscale(1) opacity(0.5)', transition: 'all 0.3s ease' }}>
                                    <img src={brand.logo} alt={brand.brand} style={{ height: '100%', objectFit: 'contain' }} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BrandsView;
