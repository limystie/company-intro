import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const CorporateMetricsView = ({ metrics }) => {
    const [isOrgChartOpen, setIsOrgChartOpen] = useState(false);

    if (!metrics) return null;

    const { orgStructure, revenue, customerDistribution, dualListing, esg } = metrics;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '-4rem auto 0', position: 'relative' }}>
            <AnimatePresence mode="wait">
                {!isOrgChartOpen ? (
                    // ==========================================
                    // 1. GRID VIEW (When Chart is Closed)
                    // ==========================================
                    <motion.div 
                        key="grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                            gap: '1.5rem', 
                            padding: '0.5rem 1rem',
                            width: '100%'
                        }}
                    >
                        {/* 1. Company Structure Card (Preview) */}
                        <motion.div 
                            layoutId="org-card"
                            variants={itemVariants} 
                            className="glass-panel" 
                            onClick={() => setIsOrgChartOpen(true)}
                            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 198, 255, 0.15)', borderColor: 'var(--accent-primary)' }}
                            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', position: 'relative', background: 'var(--bg-glass-card)' }}
                        >
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--accent-primary)', opacity: 0.5 }}>
                                <LucideIcons.Maximize2 size={16} />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <LucideIcons.Network size={20} /> Company Structure
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '0.5rem' }}>
                                <div style={{ padding: '0.8rem 1rem', background: 'linear-gradient(90deg, rgba(0, 198, 255, 0.15) 0%, transparent 100%)', borderLeft: '4px solid var(--accent-primary)', borderRadius: '0 4px 4px 0', zIndex: 2 }}>
                                    <strong style={{ fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '1px' }}>{orgStructure.holding.name}</strong>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{orgStructure.holding.chinese} - {orgStructure.holding.code}</div>
                                </div>
                                <div style={{ display: 'flex', paddingLeft: '1.2rem', marginTop: '-0.2rem' }}>
                                    <div style={{ width: '2px', background: 'var(--border-strong)', marginRight: '1.5rem', marginTop: '0.2rem', marginBottom: '1.5rem' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0', flex: 1 }}>
                                        {orgStructure.branches.map((branch, i) => (
                                            <div key={branch.id} style={{ position: 'relative', padding: '0.8rem 1rem', background: 'var(--bg-glass-heavy)', border: '1px solid var(--border-subtle)', borderRadius: '4px' }}>
                                                <div style={{ position: 'absolute', left: '-1.5rem', top: '50%', width: '1.5rem', height: '2px', background: 'var(--border-strong)' }} />
                                                <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.3rem 0', fontSize: '0.95rem' }}>{branch.name}</h4>
                                                <div style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontFamily: 'monospace' }}>{branch.code || branch.chinese}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{branch.children.length} Subsidiaries</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Revenue and Growth */}
                        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <LucideIcons.TrendingUp size={20} /> Revenue & Growth
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Annual Revenue</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', textShadow: '0 0 20px rgba(0,198,255,0.5)', lineHeight: 1 }}>{revenue.current}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>YoY Growth</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#00ff88', lineHeight: 1 }}>+{revenue.yoyGrowth}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '100px', gap: '0.8rem', marginTop: 'auto' }}>
                                {revenue.history.map((item, i) => {
                                    const maxVal = Math.max(...revenue.history.map(d => d.value));
                                    const height = (item.value / maxVal) * 100;
                                    return (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                style={{ width: '100%', background: 'linear-gradient(to top, rgba(0,198,255,0.2), var(--accent-primary))', borderRadius: '4px 4px 0 0', position: 'relative' }}
                                            >
                                                <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    {item.value}M
                                                </div>
                                            </motion.div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.year}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* 3. Customer Base Distribution */}
                        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <LucideIcons.PieChart size={20} /> Customer Base
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                                {customerDistribution.map((item, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.sector}</span>
                                            <span style={{ fontSize: '0.85rem', color: item.color, fontWeight: 'bold' }}>{item.percentage}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.percentage}%` }}
                                                transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
                                                style={{ height: '100%', background: item.color, borderRadius: '4px', boxShadow: `0 0 10px ${item.color}` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 4. Dual Listing Information */}
                        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <LucideIcons.Globe2 size={20} /> Dual Listing
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4, margin: 0 }}>
                                Publicly traded on two major exchanges, ensuring strict financial compliance, global transparency, and robust corporate governance.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto' }}>
                                {dualListing.map((listing, i) => {
                                    const Icon = LucideIcons[listing.icon] || LucideIcons.Building;
                                    return (
                                        <motion.div 
                                            key={i}
                                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'default' }}
                                        >
                                            <div style={{ background: 'rgba(0,198,255,0.1)', padding: '0.6rem', borderRadius: '50%' }}>
                                                <Icon size={20} color="var(--accent-primary)" />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.1rem' }}>{listing.exchange}</div>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', letterSpacing: '0.5px' }}>{listing.code}</span>
                                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Since {listing.year}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* 5. ESG & Sustainability */}
                        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--brand-secondary)', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <LucideIcons.Leaf size={20} /> ESG & Sustainability
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                                <div style={{ padding: '0.8rem', background: 'rgba(0, 255, 136, 0.1)', borderRadius: '8px', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Carbon Target</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#00ff88', letterSpacing: '1px' }}>{esg.target}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.2rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Renewable Energy</span>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{esg.renewableEnergy}</span>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>ISO Certifications</div>
                                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                        {esg.certifications.map((cert, i) => (
                                            <span key={i} style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-strong)', borderRadius: '50px', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                ) : (
                    // ==========================================
                    // 2. FULL VIEW (When Chart is Open) - MATCHING SNAPSHOT STYLE
                    // ==========================================
                    <motion.div 
                        key="full-chart"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4 }}
                        style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '0' }}
                    >
                        {/* Header morphing from card */}
                        <motion.div 
                            layoutId="org-card"
                            className="glass-panel"
                            onClick={() => setIsOrgChartOpen(false)}
                            whileHover={{ scale: 1.01 }}
                            style={{ 
                                padding: '1.2rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem',
                                border: 'none', background: 'var(--accent-primary)',
                                clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                                cursor: 'pointer',
                                marginBottom: '4rem',
                                width: '100%'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <LucideIcons.Network size={28} color="#ffffff" />
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>[</span>
                                <span style={{ color: '#ffffff', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>
                                    COMPANY STRUCTURE
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>]</span>
                            </div>
                            <div style={{ marginLeft: 'auto', color: '#ffffff', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                [ CLICK TO RETURN ]
                            </div>
                        </motion.div>

                        {/* Architecture Tree (Directly on page) */}
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            
                            <div style={{ position: 'absolute', top: '10%', right: '-5%', opacity: 0.02, pointerEvents: 'none' }}>
                                <LucideIcons.Globe size={800} strokeWidth={0.5} color="#ffffff" />
                            </div>

                            {/* Root Node: Holding Company */}
                            <div style={{ textAlign: 'center', zIndex: 2, marginBottom: '4rem' }}>
                                <img src="/longyoung-profile/images/brands/鼎炫logo.png" alt="Top Bright Holding Logo" style={{ height: '70px', objectFit: 'contain', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
                                <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>{orgStructure.holding.code}</div>
                            </div>

                            {/* Spine and Branches Container */}
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', gap: '3rem', zIndex: 2, position: 'relative' }}>
                                
                                {/* The connecting lines (styled for dark mode page background) */}
                                <div style={{ position: 'absolute', top: '-2rem', left: '25%', right: '25%', height: '2px', background: 'var(--border-strong)', zIndex: 1 }} />
                                <div style={{ position: 'absolute', top: '-4rem', left: '50%', width: '2px', height: '2rem', background: 'var(--border-strong)', zIndex: 1, transform: 'translateX(-50%)' }} />
                                <div style={{ position: 'absolute', top: '-2rem', left: '25%', width: '2px', height: '2rem', background: 'var(--border-strong)', zIndex: 1, transform: 'translateX(-50%)' }} />
                                <div style={{ position: 'absolute', top: '-2rem', right: '25%', width: '2px', height: '2rem', background: 'var(--border-strong)', zIndex: 1, transform: 'translateX(50%)' }} />

                                {orgStructure.branches.map((branch, branchIdx) => (
                                    <div key={branch.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '500px', zIndex: 2 }}>
                                        
                                        {/* Branch Header - Centered to align with the vertical line */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', borderBottom: '2px solid var(--border-strong)', paddingBottom: '1rem', marginBottom: '1.5rem', minHeight: '70px' }}>
                                            {branch.id === 'longyoung' && (
                                                <div style={{ background: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', marginRight: '0.5rem' }}>
                                                    <img src="/longyoung-profile/images/brands/LY LOGO英文.png" alt="LY Logo" style={{ height: '35px', objectFit: 'contain' }} />
                                                </div>
                                            )}
                                            {branch.id === 'tscale' && (
                                                <div style={{ background: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                    <img src="/longyoung-profile/images/brands/台衡 [转换].png" alt="T-Scale Logo" style={{ height: '35px', objectFit: 'contain' }} />
                                                </div>
                                            )}
                                            {branch.id === 'longyoung' && (
                                                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '1px' }}>{branch.name}</div>
                                                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>{branch.code}</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Subsidiaries Flow Layout */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                                            {branch.children.map((child, i) => (
                                                <div 
                                                    key={i} 
                                                    style={{ 
                                                        background: child.type === 'dark' ? 'rgba(0,198,255,0.2)' : 'rgba(255,255,255,0.05)', 
                                                        color: 'var(--text-primary)',
                                                        border: `1px solid ${child.type === 'dark' ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
                                                        padding: '0.6rem 1.2rem', 
                                                        borderRadius: '50px', 
                                                        textAlign: 'center', 
                                                        fontSize: '0.85rem', 
                                                        fontWeight: '600',
                                                        whiteSpace: 'nowrap',
                                                        boxShadow: child.type === 'dark' ? '0 0 10px rgba(0,198,255,0.1)' : 'none',
                                                        transition: 'all 0.3s ease',
                                                        cursor: 'default'
                                                    }}
                                                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = child.type === 'dark' ? '0 4px 15px rgba(0,198,255,0.3)' : '0 4px 15px rgba(255,255,255,0.1)'; }}
                                                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = child.type === 'dark' ? '0 0 10px rgba(0,198,255,0.1)' : 'none'; }}
                                                >
                                                    {child.name}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CorporateMetricsView;
