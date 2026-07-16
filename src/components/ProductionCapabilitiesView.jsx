import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const ProductionCapabilitiesView = ({ gallery, equipment, testing }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div style={{ flex: 1, width: '100%', maxWidth: '1400px', margin: '-4rem auto 0', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 800, letterSpacing: '2px' }}>
                    PRODUCTION & EQUIPMENT
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                    State-of-the-art facilities equipped with advanced robotics, precision CNC, and rigorous optical testing capabilities.
                </p>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                
                {/* 1. Factory Glimpse (公司一角) */}
                <motion.div variants={itemVariants}>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        <LucideIcons.Camera size={24} /> Glimpse of the Factory
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {gallery.map((img) => (
                            <motion.div 
                                key={img.id}
                                whileHover={{ scale: 1.02 }}
                                style={{ 
                                    position: 'relative', 
                                    borderRadius: '16px', 
                                    overflow: 'hidden',
                                    height: '250px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                }}
                            >
                                <img src={img.imageUrl} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ 
                                    position: 'absolute', 
                                    bottom: 0, 
                                    left: 0, 
                                    width: '100%', 
                                    padding: '2rem 1rem 1rem', 
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.3rem'
                                }}>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px' }}>{img.title}</span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{img.description}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 2 & 3 Container: Equipment and Testing side-by-side on large screens */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
                    
                    {/* 2. Production Equipment List & Capacity */}
                    <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <LucideIcons.Settings size={24} /> Equipment & Capacity
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {equipment.map((eq, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>{eq.name}</h4>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {eq.features.map((feat, idx) => (
                                                    <span key={idx} style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', background: 'rgba(0,198,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                                                        {feat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00ff88' }}>{eq.quantity} Units</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Capacity: {eq.capacity}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. Testing Capabilities */}
                    <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <LucideIcons.Microscope size={24} /> Testing Capabilities
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {testing.map((test, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    style={{ 
                                        padding: '1.2rem', 
                                        background: 'rgba(0,0,0,0.2)', 
                                        border: '1px solid rgba(255,255,255,0.05)', 
                                        borderRadius: '12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <div style={{ color: 'var(--accent-primary)' }}>
                                        <LucideIcons.ShieldCheck size={20} />
                                    </div>
                                    <h4 style={{ color: 'var(--text-primary)', margin: '0', fontSize: '1rem', lineHeight: 1.3 }}>{test.name}</h4>
                                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.2rem 0' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Target:</span> <span style={{ color: 'var(--text-primary)' }}>{test.target}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Precision:</span> <span style={{ color: '#00ff88' }}>{test.precision}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Standard:</span> <span style={{ color: 'var(--text-primary)' }}>{test.standard}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
};

export default ProductionCapabilitiesView;
