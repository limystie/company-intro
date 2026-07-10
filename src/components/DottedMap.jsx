import React, { useEffect, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const DottedMap = () => {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch(geoUrl)
      .then(response => response.json())
      .then(topology => {
        const { countries } = topology.objects;
        setGeographies(feature(topology, countries).features);
      })
      .catch(err => console.error("Could not load map data", err));
  }, []);

  const width = 800;
  const height = 600;
  
  const projection = geoMercator()
    .scale(130)
    .translate([width / 2, height / 1.5]);

  const pathGenerator = geoPath().projection(projection);

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, left: 0, width: '100%', height: '100%', 
      zIndex: -1, overflow: 'hidden', opacity: 0.6,
      pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', minWidth: '800px' }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="var(--brand-secondary)" opacity="0.6" />
          </pattern>
        </defs>
        <g>
          {geographies.map((geo, i) => (
            <path
              key={`geo-${i}`}
              d={pathGenerator(geo)}
              fill="url(#dots)"
              stroke="none"
            />
          ))}
        </g>
      </svg>
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'radial-gradient(circle at center, transparent 0%, var(--bg-color) 80%)', zIndex: 1 
      }}></div>
    </div>
  );
};

export default DottedMap;
