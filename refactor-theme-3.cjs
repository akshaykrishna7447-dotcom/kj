const fs = require('fs');
const path = require('path');

const mappings = [
    // Backgrounds
    { from: /#ffffff/gi, to: '#faf7f2' },
    { from: /#fafafa/gi, to: '#f4efe6' },

    // Texts
    { from: /#3d0c02/gi, to: '#3a2c24' },
    { from: /#4a0e0e/gi, to: '#2c1e16' },

    // Accents (Saffron -> Terracotta/Clay)
    { from: /#ff7a00/gi, to: '#a95c45' },
    { from: /#cc4400/gi, to: '#8b4a36' },

    // Golds (Bright Gold -> Soft Sand/Muted Gold)
    { from: /#ffd700/gi, to: '#d4b895' },
    { from: /#f5b041/gi, to: '#c2a47a' },

    // RGBA Overlays
    { from: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/g, to: 'rgba(250, 247, 242,' },
    { from: /rgba\(\s*61\s*,\s*12\s*,\s*2\s*,/g, to: 'rgba(58, 44, 36,' },
    { from: /rgba\(\s*255\s*,\s*122\s*,\s*0\s*,/g, to: 'rgba(169, 92, 69,' },
    { from: /rgba\(\s*255\s*,\s*215\s*,\s*0\s*,/g, to: 'rgba(212, 184, 149,' },
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            for (const map of mappings) {
                if (map.from.test(content)) {
                    content = content.replace(map.from, map.to);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Resort theme refactor complete!');
