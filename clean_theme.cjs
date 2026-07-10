const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    path.join(__dirname, 'src', 'views', 'HomeView.jsx'),
    path.join(__dirname, 'src', 'components', 'LocationsGlobeView.jsx'),
    path.join(__dirname, 'src', 'components', 'HistoryModal.jsx')
];

const replacements = [
    // Colors without spaces
    { pattern: /'rgba\(0,198,255,0.3\)'/g, replacement: "'var(--border-accent)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.3\)'/g, replacement: "'var(--border-accent)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.4\)'/g, replacement: "'var(--border-accent)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.8\)'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /'rgba\(0,198,255,0.8\)'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /'rgba\(0,198,255,0.9\)'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.9\)'/g, replacement: "'var(--accent-primary)'" },
    { pattern: /rgba\(0,198,255,0\)/g, replacement: "transparent" },
    { pattern: /rgba\(0,198,255,0.5\)/g, replacement: "var(--accent-primary)" },
    
    { pattern: /'rgba\(255,255,255,0.3\)'/g, replacement: "'var(--text-muted)'" },
    { pattern: /'rgba\(255,255,255,0.2\)'/g, replacement: "'var(--border-strong)'" },
    { pattern: /'rgba\(255,255,255,0.1\)'/g, replacement: "'var(--border-subtle)'" },
    { pattern: /'rgba\(255,\s*255,\s*255,\s*0.1\)'/g, replacement: "'var(--border-subtle)'" },
    
    // Hex colors
    { pattern: /'#ffffff'/ig, replacement: "'var(--text-primary)'" },
    { pattern: /"#ffffff"/ig, replacement: '"var(--text-primary)"' },
    
    // Text shadows
    { pattern: /'0 0 20px rgba\(0, 198, 255, 0.4\)'/g, replacement: "'var(--accent-glow)'" },
    { pattern: /'0 0 10px rgba\(0, 198, 255, 0.8\)'/g, replacement: "'var(--accent-glow)'" },
];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        replacements.forEach(({ pattern, replacement }) => {
            content = content.replace(pattern, replacement);
        });
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned ${file}`);
    } else {
        console.warn(`File not found: ${file}`);
    }
});
