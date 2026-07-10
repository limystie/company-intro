// src/views/HomeView.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import * as LucideIcons from 'lucide-react';
import DottedMap from '../components/DottedMap';

const HomeView = () => {
    const { fetchHomeData, snapshot, advantages, services, isLoading, error } = useAppStore();

    useEffect(() => {
        fetchHomeData();
    }, [fetchHomeData]);

    if (isLoading) {
        return <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>Error: {error}</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {/* Hero Section */}
            <section style={{ 
                minHeight: '80vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 2rem',
                position: 'relative'
            }}>
                <DottedMap />
                
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: '4rem', maxWidth: '800px', marginBottom: '1rem' }}
                >
                    INSPIRE <span className="text-gradient">TECHNOLOGY</span> AND LIFE
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}
                >
                    Provide Functional Solution to accelerate the design process and the growth of technology for the safety and good of humankind.
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    <button className="glass-panel hover-glow" style={{ padding: '0.8rem 2rem', fontSize: '1rem', color: 'white', cursor: 'pointer', background: 'var(--brand-primary)', border: 'none', transition: 'all 0.3s' }}>
                        Company Snapshot
                    </button>
                    <button className="glass-panel hover-glow" style={{ padding: '0.8rem 2rem', fontSize: '1rem', color: 'white', cursor: 'pointer', transition: 'all 0.3s' }}>
                        Global Footprint
                    </button>
                    <button className="glass-panel hover-glow" style={{ padding: '0.8rem 2rem', fontSize: '1rem', color: 'white', cursor: 'pointer', transition: 'all 0.3s' }}>
                        Competitive Offerings
                    </button>
                    <button className="glass-panel hover-glow" style={{ padding: '0.8rem 2rem', fontSize: '1rem', color: 'white', cursor: 'pointer', transition: 'all 0.3s' }}>
                        Our Brands & Products
                    </button>
                </motion.div>

                {services && services.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}
                    >
                        {services.map((service) => {
                            const IconComponent = LucideIcons[service.icon] || LucideIcons.Circle;
                            return (
                                <div key={service.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} className="service-icon-group">
                                    <div className="glass-panel" style={{ padding: '1.2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                                        <IconComponent size={28} color="var(--brand-secondary)" />
                                    </div>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>{service.name}</span>
                                </div>
                            )
                        })}
                    </motion.div>
                )}
            </section>

            {/* Snapshot Section */}
            {snapshot && (
                <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Company <span className="text-gradient">Snapshot</span></h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--brand-secondary)' }}>{snapshot.yearsOfExperience}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Years of Experience</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--brand-secondary)' }}>{snapshot.partners}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Partners</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--brand-secondary)' }}>{snapshot.locations}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Locations</div>
                        </div>
                    </div>
                </section>
            )}

            {/* Advantages Section */}
            {advantages && advantages.length > 0 && (
                <section style={{ padding: '5rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Our <span className="text-gradient">Advantages</span></h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {advantages.map((adv, index) => {
                                const IconComponent = LucideIcons[adv.icon] || LucideIcons.Circle;
                                return (
                                    <motion.div 
                                        key={adv.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="glass-panel" 
                                        style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                    >
                                        <div style={{ background: 'rgba(7, 39, 126, 0.5)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                            <IconComponent size={24} color="var(--brand-secondary)" />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{adv.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{adv.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default HomeView;
