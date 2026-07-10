const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    path.join(__dirname, 'src', 'components', 'LocationsGlobeView.jsx'),
];

const replacements = [
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.3\)'/g, replacement: "'var(--border-accent)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.4\)'/g, replacement: "'var(--border-accent)'" },
    { pattern: /"rgba\(0,\s*198,\s*255,\s*0.4\)"/g, replacement: '"var(--border-accent)"' },
    { pattern: /'rgba\(255,255,255,0.03\)'/g, replacement: "'var(--bg-glass-card)'" },
    { pattern: /'rgba\(255,255,255,0.1\)'/g, replacement: "'var(--border-subtle)'" },
    { pattern: /rgba\(255,255,255,0.1\)/g, replacement: "var(--border-subtle)" },
    { pattern: /'rgba\(255,255,255,0.15\)'/g, replacement: "'var(--border-strong)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.02\)'/g, replacement: "'var(--bg-glass-card)'" },
    { pattern: /'rgba\(0,\s*198,\s*255,\s*0.1\)'/g, replacement: "'var(--border-subtle)'" },
    { pattern: /'rgba\(0,198,255,0.1\)'/g, replacement: "'var(--border-subtle)'" },
    { pattern: /"rgba\(0,\s*198,\s*255,\s*0.05\)"/g, replacement: '"var(--bg-glass-light)"' },
    { pattern: /"rgba\(0,\s*198,\s*255,\s*0.15\)"/g, replacement: '"var(--bg-glass-light)"' },
    { pattern: /'0 0 20px rgba\(0,198,255,0.1\)'/g, replacement: "'var(--accent-glow)'" },
];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        replacements.forEach(({ pattern, replacement }) => {
            content = content.replace(pattern, replacement);
        });
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Cleaned Map ${file}`);
    } else {
        console.warn(`File not found: ${file}`);
    }
});
