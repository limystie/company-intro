import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const OrgChartModal = ({ isOpen, onClose, orgStructure }) => {
    if (!orgStructure) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(250, 250, 252, 0.98)', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '3rem 4rem', backdropFilter: 'blur(20px)', overflowY: 'auto' }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#16315c', margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <LucideIcons.Network size={24} />
                                COMPANY STRUCTURE
                            </h2>
                        </div>
                        <button 
                            onClick={onClose}
                            style={{ background: 'transparent', border: 'none', color: '#16315c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <LucideIcons.X size={32} />
                        </button>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                        
                        {/* Background Abstract Globe (similar to screenshot) */}
                        <div style={{ position: 'absolute', top: '10%', right: '-10%', opacity: 0.05, pointerEvents: 'none' }}>
                            <LucideIcons.Globe size={800} strokeWidth={0.5} />
                        </div>

                        {/* Root Node: Holding Company */}
                        <motion.div 
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{ textAlign: 'center', zIndex: 2, marginBottom: '4rem' }}
                        >
                            <img src="/longyoung-profile/images/brands/鼎炫logo.png" alt="Top Bright Holding Logo" style={{ height: '80px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                            <div style={{ fontSize: '1.1rem', color: '#d95321', fontWeight: 'bold' }}>{orgStructure.holding.code}</div>
                        </motion.div>

                        {/* Branches Container */}
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '4rem', marginTop: '1rem', zIndex: 2 }}>
                            {orgStructure.branches.map((branch, branchIdx) => (
                                <div key={branch.id} style={{ flex: branch.id === 'longyoung' ? 1.4 : 1, display: 'flex', flexDirection: 'column' }}>
                                    
                                    {/* Branch Header */}
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '2rem', minHeight: '80px' }}
                                    >
                                        {branch.id === 'longyoung' && (
                                            <img src="/longyoung-profile/images/brands/LY LOGO英文.png" alt="LY Logo" style={{ height: '50px', objectFit: 'contain', marginRight: '0.5rem' }} />
                                        )}
                                        {branch.id === 'tscale' && (
                                            <img src="/longyoung-profile/images/brands/台衡 [转换].png" alt="T-Scale Logo" style={{ height: '50px', objectFit: 'contain' }} />
                                        )}
                                        {branch.id === 'longyoung' && (
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1664a7', letterSpacing: '1px' }}>{branch.name}</div>
                                                <div style={{ fontSize: '1rem', color: '#d95321', fontWeight: 'bold' }}>{branch.code}</div>
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Pills Grid */}
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        style={{ display: 'grid', gridTemplateColumns: branch.id === 'longyoung' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)', gap: '1rem' }}
                                    >
                                        {branch.children.map((child, i) => (
                                            <div 
                                                key={i} 
                                                style={{ 
                                                    background: child.type === 'dark' ? '#1664a7' : '#7baae1', 
                                                    color: '#fff', 
                                                    padding: '0.8rem 0.5rem', 
                                                    borderRadius: '50px', 
                                                    textAlign: 'center', 
                                                    fontSize: '0.9rem', 
                                                    fontWeight: '600',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                                }}
                                            >
                                                {child.name}
                                            </div>
                                        ))}
                                    </motion.div>

                                </div>
                            ))}
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OrgChartModal;
