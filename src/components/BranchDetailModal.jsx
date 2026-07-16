import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const BranchDetailModal = ({ isOpen, onClose, branchData }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for right, -1 for left

    // Reset slide when a new modal opens
    React.useEffect(() => {
        if (isOpen) {
            setCurrentSlide(0);
            setDirection(0);
        }
    }, [isOpen, branchData]);

    if (!branchData) return null;

    const { id, en, desc, details } = branchData;
    const totalSlides = 3;

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentSlide((prev) => {
            let nextSlide = prev + newDirection;
            if (nextSlide >= totalSlides) nextSlide = 0;
            if (nextSlide < 0) nextSlide = totalSlides - 1;
            return nextSlide;
        });
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 800 : -800,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 800 : -800,
            opacity: 0
        })
    };

    // Helper to render Info Rows
    const InfoRow = ({ icon, label, value }) => {
        const Icon = LucideIcons[icon] || LucideIcons.Info;
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(255,255,255,0.7)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '0.8rem', borderRadius: '50%' }}>
                    <Icon size={24} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value || 'N/A'}</span>
                </div>
            </div>
        );
    };

    // Slides Content
    const renderSlideContent = () => {
        switch (currentSlide) {
            case 0:
                return (
                    <div style={{ display: 'flex', gap: '3rem', height: '100%', alignItems: 'stretch' }}>
                        {/* Photos (Staggered Masonry Layout) */}
                        <div style={{ flex: 1, display: 'flex', gap: '1rem', height: '100%' }}>
                            {/* Left Column */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ flex: 1.5, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', position: 'relative' }}>
                                    <img 
                                        src={details?.photoUrl || '/longyoung-profile/vietnam_branch.jpg'} 
                                        alt="Main Facility" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                                    />
                                </div>
                                <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', position: 'relative' }}>
                                    <img 
                                        src={details?.photoUrl2 || '/longyoung-profile/assembly.png'} 
                                        alt="Interior 1" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                                    />
                                </div>
                            </div>
                            {/* Right Column */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', position: 'relative' }}>
                                    <img 
                                        src={details?.photoUrl3 || '/longyoung-profile/cnc.png'} 
                                        alt="Interior 2" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                                    />
                                </div>
                                <div style={{ flex: 1.5, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', position: 'relative' }}>
                                    <img 
                                        src={details?.photoUrl4 || '/longyoung-profile/qa.png'} 
                                        alt="Interior 3" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Info (Bento Grid Layout) */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Address Card - Full Width */}
                            <div style={{ display: 'flex', gap: '1.5rem', background: 'white', padding: '1.5rem 2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', alignItems: 'center' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(0, 119, 255, 0.08)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                    <LucideIcons.MapPin size={28} color="var(--accent-primary)" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '0.5rem' }}>Company Address</div>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5 }}>{details?.location}</div>
                                </div>
                            </div>

                            {/* Grid for other stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                
                                {/* Established */}
                                {details?.established && (
                                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <LucideIcons.Calendar size={24} color="var(--text-secondary)" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '0.5rem' }}>Established</div>
                                            <div style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700 }}>{details.established}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Headcount */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <LucideIcons.Users size={24} color="var(--text-secondary)" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '0.5rem' }}>Headcount</div>
                                        <div style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700 }}>{details?.headcount}</div>
                                    </div>
                                </div>

                                {/* Facility Area */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: details?.cleanroom ? 'auto' : '1 / -1' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <LucideIcons.Maximize size={24} color="var(--text-secondary)" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '0.5rem' }}>Facility Area</div>
                                        <div style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                                            {details?.area ? details.area.split('(')[0].trim() : ''}
                                        </div>
                                        {details?.area && details.area.includes('(') && (
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontWeight: 500 }}>
                                                ({details.area.split('(')[1]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Cleanroom */}
                                {details?.cleanroom && (
                                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <LucideIcons.Sparkles size={24} color="white" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '0.5rem' }}>Cleanroom</div>
                                            <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700 }}>{details.cleanroom.level}</div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.25rem' }}>{details.cleanroom.area}</div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '3rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <LucideIcons.Users size={64} color="var(--accent-primary)" />
                            <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-primary)' }}>Main Clients</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Key Partners</p>
                        </div>
                        <div style={{ 
                            background: 'white', 
                            padding: '4rem 6rem', 
                            borderRadius: '24px', 
                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            maxWidth: '800px',
                            width: '100%'
                        }}>
                            <div style={{ fontSize: '2rem', color: '#16315c', fontWeight: 700, lineHeight: 1.6 }}>
                                {details?.mainClients || 'N/A'}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={{ display: 'flex', gap: '3rem', height: '100%', alignItems: 'stretch' }}>
                        {/* Equipment */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#16315c' }}>
                                <LucideIcons.Cpu size={32} />
                                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Equipment</h3>
                            </div>
                            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', margin: '-1rem 0 1rem 0' }}>Machinery Specs</p>
                            <div style={{ fontSize: '1.4rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
                                {details?.equipment || 'N/A'}
                            </div>
                        </div>
                        {/* Capacity */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', background: 'linear-gradient(135deg, #16315c, #0072FF)', color: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0, 119, 255, 0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <LucideIcons.TrendingUp size={32} />
                                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Production Capacity</h3>
                            </div>
                            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', textTransform: 'uppercase', margin: '-1rem 0 1rem 0' }}>Output Metrics</p>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '2rem' }}>
                                {details?.capacity || 'N/A'}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        background: '#fafbfc', 
                        zIndex: 9999, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        backgroundImage: 'radial-gradient(#e5e7eb 2px, transparent 2px)',
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0'
                    }}
                >
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '8rem 4rem 2rem 4rem', boxSizing: 'border-box', minHeight: '850px' }}>
                        
                        {/* Header Area */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', zIndex: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                                <div style={{ 
                                    fontSize: '1.2rem', 
                                    fontFamily: 'monospace', 
                                    color: '#9ca3af',
                                    fontWeight: 600,
                                    letterSpacing: '2px',
                                    marginTop: '0.5rem'
                                }}>
                                    [{id}]
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <h1 style={{ 
                                        fontSize: '2.5rem', 
                                        fontWeight: 900, 
                                        color: '#111827', 
                                        margin: 0,
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {en}
                                    </h1>
                                    <h3 style={{ 
                                        fontSize: '1.2rem', 
                                        color: '#6b7280', 
                                        margin: 0,
                                        fontWeight: 500
                                    }}>
                                        {desc}
                                    </h3>
                                </div>
                            </div>
                            
                            {/* Return Button */}
                            <button 
                                onClick={onClose}
                                style={{ 
                                    background: 'white', 
                                    border: '1px solid #e5e7eb', 
                                    color: '#111827', 
                                    cursor: 'pointer', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem',
                                    padding: '0.8rem 1.2rem',
                                    borderRadius: '50px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    marginTop: '0.2rem'
                                }}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, { transform: 'scale(1.02)', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' })}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'scale(1)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' })}
                            >
                                <LucideIcons.ArrowLeft size={18} />
                                <span>Return</span>
                            </button>
                        </div>

                        {/* Carousel Content Area */}
                        <div style={{ flex: 1, position: 'relative', overflowX: 'hidden', minHeight: '550px' }}>
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={currentSlide}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        padding: '1rem 0',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    {renderSlideContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '2rem', zIndex: 10 }}>
                            <button 
                                onClick={() => paginate(-1)}
                                style={{
                                    background: 'white', border: '1px solid #e5e7eb', width: '50px', height: '50px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)', transition: 'all 0.2s', color: '#111827'
                                }}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, { transform: 'scale(1.05)', background: '#f9fafb' })}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'scale(1)', background: 'white' })}
                            >
                                <LucideIcons.ChevronLeft size={24} />
                            </button>

                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                {[0, 1, 2].map(idx => (
                                    <div 
                                        key={idx}
                                        onClick={() => {
                                            setDirection(idx > currentSlide ? 1 : -1);
                                            setCurrentSlide(idx);
                                        }}
                                        style={{
                                            width: currentSlide === idx ? '30px' : '10px',
                                            height: '10px',
                                            borderRadius: '5px',
                                            background: currentSlide === idx ? 'var(--accent-primary)' : '#d1d5db',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                ))}
                            </div>

                            <button 
                                onClick={() => paginate(1)}
                                style={{
                                    background: 'white', border: '1px solid #e5e7eb', width: '50px', height: '50px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)', transition: 'all 0.2s', color: '#111827'
                                }}
                                onMouseEnter={e => Object.assign(e.currentTarget.style, { transform: 'scale(1.05)', background: '#f9fafb' })}
                                onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'scale(1)', background: 'white' })}
                            >
                                <LucideIcons.ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BranchDetailModal;
