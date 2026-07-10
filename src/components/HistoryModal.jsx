import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const historyData = [
    { year: '2000', event: 'Company Foundation', desc: 'Established the core business and vision.', status: 'COMPLETED' },
    { year: '2017', event: 'IPO in Taiwan', desc: 'Successfully listed on the Taiwan Stock Exchange (TW.8499).', status: 'COMPLETED' },
    { year: '2022', event: 'IPO in Shenzhen', desc: 'Expanded market presence with listing on the Shenzhen Stock Exchange (SZ.301389).', status: 'COMPLETED' },
    { year: '2025', event: 'Global Expansion & Future', desc: 'Looking towards a future of continuous technological innovation and sustainable growth.', status: 'IN PROGRESS' }
];

const HistoryModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100vw', height: '100vh',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
                    />
                    
                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="glass-panel"
                        style={{
                            position: 'relative',
                            width: '90%',
                            maxWidth: '800px',
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            padding: '3rem',
                            background: 'var(--bg-glass-heavy)',
                            border: '1px solid rgba(0, 198, 255, 0.3)',
                            boxShadow: '0 0 50px rgba(0, 198, 255, 0.1)',
                            borderRadius: '20px'
                        }}
                    >
                        {/* Close button */}
                        <button 
                            onClick={onClose}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '1.5rem', cursor: 'pointer', transition: 'all 0.3s' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            ✕
                        </button>
                        
                        <h2 style={{ fontSize: '2rem', fontFamily: 'monospace', color: 'var(--text-primary)', marginBottom: '3rem', letterSpacing: '2px', borderBottom: '1px solid rgba(0,198,255,0.3)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <span>HISTORY_LOG //</span>
                            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>SYS.RECORD</span>
                        </h2>

                        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                            {/* Vertical Line */}
                            <div style={{ position: 'absolute', left: '0', top: '10px', bottom: '10px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }} />
                            
                            {historyData.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.15 + 0.2 }}
                                    style={{ position: 'relative', marginBottom: index === historyData.length - 1 ? 0 : '3rem' }}
                                >
                                    {/* Node */}
                                    <div style={{ position: 'absolute', left: '-2.45rem', top: '5px', width: '16px', height: '16px', borderRadius: '50%', background: '#030816', border: '2px solid var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }} />
                                    
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
                </div>
            )}
        </AnimatePresence>
    );
};

export default HistoryModal;
