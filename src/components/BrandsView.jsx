import React from 'react';
import { motion } from 'framer-motion';

const BrandsView = ({ onClose }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', maxWidth: '1300px', margin: '0 auto', marginTop: '-30px', display: 'flex', flexDirection: 'column' }}
        >
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Top Row: 4 Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    
                    {/* Col 1: Flextron */}
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', background: '#f8fafc', minHeight: '280px', padding: '4rem 1.5rem 2rem 1.5rem', borderRadius: '8px', color: '#333', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/materials/conductive_fabric.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, mixBlendMode: 'multiply', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)' }} />
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569', letterSpacing: '2px', textTransform: 'uppercase' }}>EMC Materials</h4>
                            <div style={{ textAlign: 'center', width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="/images/brands/Flextron.png" alt="Flextron" style={{ height: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>

                    {/* Col 2: futherma */}
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', background: '#f8fafc', minHeight: '280px', padding: '4rem 1.5rem 2rem 1.5rem', borderRadius: '8px', color: '#333', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/materials/thermal_pad.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, mixBlendMode: 'multiply', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)' }} />
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569', letterSpacing: '2px', textTransform: 'uppercase' }}>Thermal Materials</h4>
                            <div style={{ textAlign: 'center', width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="/images/brands/futherma.png" alt="futherma" style={{ height: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>

                    {/* Col 3: Dwell */}
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', background: '#f8fafc', minHeight: '280px', padding: '4rem 1.5rem 2rem 1.5rem', borderRadius: '8px', color: '#333', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/materials/transparent_tape.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, mixBlendMode: 'multiply', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)' }} />
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569', letterSpacing: '2px', textTransform: 'uppercase' }}>Bonding Materials</h4>
                            <div style={{ textAlign: 'center', width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="/images/brands/DWELL logo.png" alt="Dwell" style={{ height: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>

                    {/* Col 4: GHZ */}
                    <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', background: '#f8fafc', minHeight: '280px', padding: '4rem 1.5rem 2rem 1.5rem', borderRadius: '8px', color: '#333', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/materials/copper_foil.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, mixBlendMode: 'multiply', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 90%)' }} />
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569', letterSpacing: '2px', textTransform: 'uppercase' }}>Composite Copper</h4>
                            <div style={{ textAlign: 'center', width: '100%', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="/images/brands/GHZ logo.png" alt="GHZ" style={{ height: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: LONG YOUNG ELECTRONICS */}
                <div className="glass-panel" style={{ background: '#f8fafc', padding: '2rem 3rem', borderRadius: '8px', color: '#333', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
                        <img src="/images/brands/LY LOGO英文.png" alt="Long Young Electronics" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.5px', color: '#1e293b' }}>
                        Composite Materials + Precise Die-cut + Functional Design Solutions
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BrandsView;
