import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { dataService } from '../services/dataService';
import BranchDetailModal from './BranchDetailModal';

const GlobalFootprintView = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    useEffect(() => {
        dataService.getBranchLocations().then(data => {
            setLocations(data);
        });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    const renderGridItem = (loc) => {
        const Icon = LucideIcons[loc.icon] || LucideIcons.MapPin;
        const isHovered = hoveredId === loc.id;
        
        return (
            <motion.div 
                key={loc.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(loc.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedBranch(loc)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.2rem 1.5rem',
                    background: isHovered ? 'rgba(0, 119, 255, 0.05)' : 'transparent',
                    border: '1px solid',
                    borderColor: isHovered ? 'rgba(0, 119, 255, 0.2)' : 'transparent',
                    borderBottom: isHovered ? '1px solid rgba(0, 119, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px',
                    cursor: 'crosshair',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* 1. Background Image Hover Reveal (Duotone) */}
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
                                // Using a high-quality architectural Unsplash image as placeholder
                                backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(300%) contrast(1.2) brightness(0.8)'
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Hover accent line */}
                <motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isHovered ? 1 : 0 }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '3px',
                        backgroundColor: 'var(--accent-primary)',
                        transformOrigin: 'top',
                        zIndex: 1
                    }}
                />

                {/* ID Number */}
                <span style={{ 
                    fontSize: '0.8rem', 
                    fontFamily: 'monospace', 
                    color: isHovered ? 'var(--accent-primary)' : 'var(--text-muted)',
                    marginRight: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease',
                    zIndex: 1, position: 'relative'
                }}>
                    [{loc.id}]
                </span>

                {/* Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, zIndex: 1, position: 'relative' }}>
                    <span style={{ 
                        fontSize: '1rem', 
                        fontWeight: 700, 
                        color: isHovered ? '#ffffff' : 'var(--text-primary)',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                    }}>
                        {loc.en}
                    </span>
                    <span style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.5px'
                    }}>
                        {loc.desc}
                    </span>
                </div>

                {/* Icon */}
                <motion.div 
                    animate={{ 
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                        color: isHovered ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ marginLeft: '1rem' }}
                >
                    <Icon size={20} strokeWidth={isHovered ? 2 : 1.5} />
                </motion.div>
                
            </motion.div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
                flex: 1, 
                width: '100%', 
                maxWidth: '1200px', 
                margin: '-4rem auto 0', 
                display: 'flex', 
                flexDirection: 'column', 
                padding: '0 4rem 2rem', 
                position: 'relative'
            }}
        >
            {/* Header Area */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0, 119, 255, 0.1)', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ 
                        fontSize: '2.5rem', 
                        color: 'var(--text-primary)', 
                        margin: '0 0 0.5rem 0', 
                        fontWeight: 900, 
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Global Footprint
                    </h2>
                    <span style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--accent-primary)', 
                        fontFamily: 'monospace', 
                        letterSpacing: '4px',
                        textTransform: 'uppercase'
                    }}>
                        Worldwide Subsidiary Network
                    </span>
                </div>
                
                {/* Decorative Tech Elements */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {[1, 2, 3].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent-primary)', borderRadius: '50%' }}
                            />
                        ))}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'monospace', border: '1px solid var(--border-subtle)', padding: '0.3rem 0.8rem', borderRadius: '50px' }}>
                        10 SUBSIDIARIES
                    </div>
                </div>
            </div>

            {/* List Area with Divisions */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    flex: 1
                }}
            >
                {/* DIE-CUT DIVISION HEADER */}
                <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Die-Cut Division</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(0,119,255,0.15), transparent)' }} />
                </motion.div>

                {/* DIE-CUT GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '6rem', rowGap: '1.5rem', marginBottom: '2.5rem' }}>
                    {locations.slice(0, 6).map(renderGridItem)}
                </div>

                {/* MATERIAL DIVISION HEADER */}
                <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Material Division</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(0,119,255,0.15), transparent)' }} />
                </motion.div>

                {/* MATERIAL GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '6rem', rowGap: '1.5rem' }}>
                    {locations.slice(6, 10).map(renderGridItem)}
                </div>

            </motion.div>

            {/* Branch Detail Modal */}
            <BranchDetailModal 
                isOpen={!!selectedBranch} 
                onClose={() => setSelectedBranch(null)} 
                branchData={selectedBranch} 
            />
        </motion.div>
    );
};

export default GlobalFootprintView;
