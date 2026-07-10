const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    path.join(__dirname, 'src', 'views', 'HomeView.jsx'),
    path.join(__dirname, 'src', 'components', 'LocationsGlobeView.jsx'),
    path.join(__dirname, 'src', 'components', 'HistoryModal.jsx')
];

const replacements = [
    { pattern: /'#00C6FF'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /"#00C6FF"/g, replacement: '"var(--accent-primary)"' },
    { pattern: /#00C6FF/g, replacement: "var(--accent-primary)" },
    
    // Glass Backgrounds
    { pattern: /'rgba\(3,\s*8,\s*22,\s*0.6\)'/g, replacement: "'var(--bg-glass-medium)'" },
    { pattern: /'rgba\(3,\s*8,\s*22,\s*0.85\)'/g, replacement: "'var(--bg-glass-heavy)'" },
    { pattern: /'rgba\(3,\s*8,\s*22,\s*0.8\)'/g, replacement: "'var(--bg-glass-heavy)'" },
    
    // Light Blue Glass Backgrounds
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.05\)'/g, replacement: "'var(--bg-glass-light)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.1\)'/g, replacement: "'var(--bg-glass-light)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.2\)'/g, replacement: "'var(--border-subtle)'" },
    
    // Borders
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.1\)'/g, replacement: "'var(--border-subtle)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.05\)'/g, replacement: "'var(--border-subtle)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.2\)'/g, replacement: "'var(--border-strong)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.3\)'/g, replacement: "'var(--border-accent)'" },
    
    // Text Colors
    { pattern: /'#ffffff'/g, replacement: "'var(--text-primary)'" },
    { pattern: /'#fff'/g, replacement: "'var(--text-primary)'" },
    { pattern: /'white'/g, replacement: "'var(--text-primary)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.9\)'/g, replacement: "'var(--text-primary)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.85\)'/g, replacement: "'var(--text-primary)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.8\)'/g, replacement: "'var(--text-primary)'" },
    
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.6\)'/g, replacement: "'var(--text-secondary)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.5\)'/g, replacement: "'var(--text-secondary)'" },
    
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.4\)'/g, replacement: "'var(--text-muted)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.3\)'/g, replacement: "'var(--text-muted)'" },
    
    // Accent Text/Glows
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.5\)'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.6\)'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.8\)'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.9\)'/g, replacement: "'var(--accent-primary)'" },
    
    // Specific Shadows & Gradients
    { pattern: /'0 0 15px rgba\(0, 198, 255, 0.5\)'/g, replacement: "'var(--accent-glow)'" },
    { pattern: /'0 0 10px rgba\(0, 198, 255, 0.8\)'/g, replacement: "'var(--accent-glow)'" },
    { pattern: /'0 0 10px rgba\(0,198,255,0.5\)'/g, replacement: "'var(--accent-glow)'" },
    { pattern: /'0 0 25px rgba\(0, 198, 255, 0.8\), 0 0 5px rgba\(255, 255, 255, 0.5\)'/g, replacement: "'var(--accent-glow-strong)'" },
    
    { pattern: /'0 2px 4px rgba\(0,0,0,0.8\)'/g, replacement: "'var(--accent-shadow)'" },
    
    { pattern: /'linear-gradient\(90deg, rgba\(0,198,255,0.1\) 0%, rgba\(0,198,255,0\) 100%\)'/g, replacement: "'var(--gradient-accent-fade)'" },
    { pattern: /'linear-gradient\(270deg, rgba\(0,198,255,0.1\) 0%, rgba\(0,198,255,0\) 100%\)'/g, replacement: "'var(--gradient-accent-fade-rev)'" },
];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        replacements.forEach(({ pattern, replacement }) => {
            content = content.replace(pattern, replacement);
        });
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.warn(`File not found: ${file}`);
    }
});
