import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import * as LucideIcons from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const LOCATION_TYPES = {
    'Die-Cut': { color: 'var(--accent-primary)', label: 'Die-Cut' },
    'Material': { color: '#6FBA2C', label: 'Material' },
    'Service Center': { color: '#FF007A', label: 'Service Center' },
    'All-in-One': { color: '#FFB800', label: 'All-in-One' }
};

const LOCATIONS = [
    { id: 1, name: 'LONGYOUNG ELECTRONICS', type: 'All-in-One', coordinates: [120.98, 31.38], city: 'Kunshan, China' }, // HQ, Kunshan
    { id: 2, name: 'LONGYOUNG ELECTRONICS FACTORY II', type: 'Die-Cut', coordinates: [121.5, 30.5], city: 'Kunshan, China' }, // Kunshan offset significantly to avoid overlap on flat map
    { id: 3, name: 'CHUANYOUNG ELECTRONICS', type: 'Die-Cut', coordinates: [106.55, 29.56], city: 'Chongqing, China' }, // Chongqing
    { id: 4, name: 'Fuyoung Materials', type: 'Material', coordinates: [119.01, 33.62], city: 'Huaian, China' }, // Huaian
    { id: 5, name: 'GHZ Materials', type: 'Material', coordinates: [120.87, 24.68], city: 'Zhunan, Taiwan' }, // Zhunan
    { id: 6, name: 'LONGYOUNG TP', type: 'Service Center', coordinates: [121.56, 26.5], city: 'Taipei, Taiwan' }, // Taipei (offset slightly north)
    { id: 7, name: 'LY USA', type: 'Service Center', coordinates: [-122.03, 37.32], city: 'Cupertino, USA' }, // Cupertino
    { id: 8, name: 'VSI', type: 'Material', coordinates: [119.97, 31.81], city: 'Changzhou, China' }, // Changzhou
    { id: 9, name: 'DWELL', type: 'Material', coordinates: [120.58, 29.8], city: 'Suzhou, China' }, // Suzhou (offset slightly south)
    { id: 10, name: 'LONGYOUNG Vietnam', type: 'Die-Cut', coordinates: [106.05, 21.18], city: 'Bac Ninh, Vietnam' }, // Bac Ninh
    { id: 11, name: 'LONGYOUNG Thailand', type: 'All-in-One', coordinates: [101.07, 13.69], city: 'Chachoengsao, Thailand' } // Chachoengsao
];

const LocationsGlobeView = ({ onClose }) => {
    const [geographies, setGeographies] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [panOffset, setPanOffset] = useState([0, 0]);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0, pan: [0,0] });

    useEffect(() => {
        fetch(geoUrl)
            .then(response => response.json())
            .then(topology => {
                const { countries } = topology.objects;
                setGeographies(feature(topology, countries).features);
            })
            .catch(err => console.error("Could not load map data", err));
    }, []);

    const width = 1000;
    const height = 500;
    
    // Mercator projection for a flat map, centered on East Asia
    const projection = geoMercator()
        .scale(600)
        .center([115, 25]) // Center heavily on China/Taiwan area
        .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    const handlePanStart = (e, info) => {
        setIsDragging(true);
        dragStart.current = { x: info.point.x, y: info.point.y, pan: panOffset };
    };

    const handlePan = (e, info) => {
        if (!isDragging) return;
        const dx = info.point.x - dragStart.current.x;
        
        setPanOffset([
            dragStart.current.pan[0] + dx,
            dragStart.current.pan[1] // Lock vertical panning
        ]);
    };

    const handlePanEnd = () => {
        setIsDragging(false);
    };

    const filteredLocations = LOCATIONS.filter(loc => activeFilter === 'All' || loc.type === activeFilter);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '1300px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0', marginTop: '-30px' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                {/* Header morphing from card */}
                <motion.div 
                    layoutId="locations-card"
                    className="glass-panel"
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    style={{ 
                        padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem',
                        border: 'none', background: 'var(--accent-primary)',
                        clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                        width: '100%', cursor: 'pointer'
                    }}
                >
                    <motion.span layoutId="locations-num" style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', fontFamily: 'monospace', textShadow: 'none' }}>
                        11
                    </motion.span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>[</span>
                        <motion.span layoutId="locations-label" style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '500' }}>
                            Worldwide Locations
                        </motion.span>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>]</span>
                    </div>
                    <div style={{ marginLeft: 'auto', color: '#ffffff', fontSize: '0.8rem', letterSpacing: '2px' }}>
                        [ CLICK TO RETURN ]
                    </div>
                </motion.div>

                {/* Filter Bar */}
                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-glass-card)', padding: '0.5rem', borderRadius: '50px', border: '1px solid var(--border-subtle)', alignSelf: 'center' }}>
                    <button 
                        onClick={() => setActiveFilter('All')}
                        style={{
                            padding: '0.5rem 1.2rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px',
                            background: activeFilter === 'All' ? 'var(--border-strong)' : 'transparent',
                            color: activeFilter === 'All' ? 'var(--text-primary)' : 'var(--text-secondary)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        ALL
                    </button>
                    {Object.entries(LOCATION_TYPES).map(([type, config]) => (
                        <button 
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            style={{
                                padding: '0.5rem 1.2rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px',
                                background: activeFilter === type ? `${config.color}33` : 'transparent', 
                                color: activeFilter === type ? config.color : 'var(--text-secondary)',
                                boxShadow: activeFilter === type ? `0 0 10px ${config.color}40` : 'none',
                                transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }} />
                            {config.label.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: '16px', background: 'var(--bg-glass-card)', border: '1px solid rgba(0, 198, 255, 0.1)' }}>
                {/* Region Toggle */}
                <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', background: 'var(--bg-glass-heavy)', border: '1px solid rgba(0,198,255,0.3)', borderRadius: '50px', padding: '6px', backdropFilter: 'blur(10px)', boxShadow: 'var(--accent-glow)' }}>
                    <button 
                        onClick={() => setPanOffset([0, panOffset[1]])}
                        style={{ padding: '8px 24px', borderRadius: '50px', border: 'none', background: panOffset[0] < 1000 ? 'var(--border-subtle)' : 'transparent', color: panOffset[0] < 1000 ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '1px', fontSize: '0.85rem' }}
                    >
                        ASIA PACIFIC
                    </button>
                    <button 
                        onClick={() => setPanOffset([2480, panOffset[1]])}
                        style={{ padding: '8px 24px', borderRadius: '50px', border: 'none', background: panOffset[0] >= 1000 ? 'var(--border-subtle)' : 'transparent', color: panOffset[0] >= 1000 ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '1px', fontSize: '0.85rem' }}
                    >
                        AMERICAS
                    </button>
                </div>

                {/* Static Background grid */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--bg-glass-light)" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Flat Map Container */}
                <motion.div 
                    onPanStart={handlePanStart}
                    onPan={handlePan}
                    onPanEnd={handlePanEnd}
                    animate={{ x: panOffset[0], y: panOffset[1] }}
                    transition={{ type: 'spring', stiffness: 100, damping: 25 }}
                    style={{ width: `${width}px`, height: `${height}px`, cursor: isDragging ? 'grabbing' : 'grab', position: 'absolute' }}
                >
                    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
                        {/* Landmasses */}
                        <g>
                            {geographies.map((geo, i) => (
                                <path
                                    key={`geo-${i}`}
                                    d={pathGenerator(geo)}
                                    fill="var(--border-subtle)"
                                    stroke="var(--border-accent)"
                                    strokeWidth="1"
                                />
                            ))}
                        </g>

                        {/* Location Pins */}
                        {filteredLocations.map((loc) => {
                            const projected = projection(loc.coordinates);
                            if (!projected) return null;
                            
                            const [x, y] = projected;
                            const color = LOCATION_TYPES[loc.type].color;
                            const isSelected = selectedLocation?.id === loc.id;

                            return (
                                <g 
                                    key={loc.id} 
                                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                                    onMouseEnter={() => setSelectedLocation(loc)}
                                    onMouseLeave={() => setSelectedLocation(null)}
                                >
                                    {/* Invisible hit area for stable hover */}
                                    <circle cx={x} cy={y} r="20" fill="transparent" />
                                    
                                    {/* Pulse effect */}
                                    <circle cx={x} cy={y} r="15" fill="transparent" stroke={color} strokeWidth="1" className="pulse-circle" style={{ animation: 'pulse 2s infinite', transformOrigin: `${x}px ${y}px`, pointerEvents: 'none' }} />
                                    
                                    {/* Pin Core */}
                                    <circle 
                                        cx={x} cy={y} r={isSelected ? "8" : "5"} 
                                        fill={color} 
                                        filter={`drop-shadow(0 0 10px ${color})`}
                                        style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* CSS Animation for Pulse */}
                    <style>{`
                        @keyframes pulse {
                            0% { transform: scale(0.5); opacity: 1; }
                            100% { transform: scale(2.5); opacity: 0; }
                        }
                    `}</style>

                    {/* Floating Info Card */}
                    <AnimatePresence>
                        {selectedLocation && (
                            <FloatingCard 
                                location={selectedLocation} 
                                projection={projection} 
                                onClose={() => setSelectedLocation(null)}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
};

const FloatingCard = ({ location, projection, onClose }) => {
    const projected = projection(location.coordinates);
    if (!projected) return null; 
    
    const [x, y] = projected;
    const color = LOCATION_TYPES[location.type].color;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{
                position: 'absolute',
                left: x + 20, 
                top: y - 40,
                width: '280px',
                background: 'var(--bg-glass-heavy)',
                backdropFilter: 'blur(10px)',
                border: `1px solid var(--border-subtle)`,
                borderTop: `3px solid ${color}`,
                boxShadow: `0 15px 40px ${color}33`,
                borderRadius: '12px',
                padding: '1.5rem',
                zIndex: 50,
                pointerEvents: 'auto',
                color: 'var(--text-primary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ color, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}` }} />
                    {location.type}
                </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '1px', textShadow: `0 0 10px ${color}80` }}>{location.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <LucideIcons.MapPin size={14} color={color} />
                <span style={{ letterSpacing: '1px' }}>{location.city}</span>
            </div>
            
            {/* Connecting line to pin */}
            <svg style={{ position: 'absolute', left: '-20px', top: '40px', width: '20px', height: '2px', pointerEvents: 'none', overflow: 'visible' }}>
                <line x1="0" y1="0" x2="20" y2="0" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
            </svg>
        </motion.div>
    );
};

export default LocationsGlobeView;
