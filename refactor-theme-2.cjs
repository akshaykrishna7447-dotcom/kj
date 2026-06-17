const fs = require('fs');
const path = require('path');

const mappings = [
    // Backgrounds (Cream -> Ethereal White)
    { from: /#fcfbf9/gi, to: '#ffffff' },
    { from: /#f8f6f0/gi, to: '#fafafa' },
    { from: /#f5f3ec/gi, to: '#ffffff' },

    // Text (Dark Wood -> Deep Maroon / Crimson Ink)
    { from: /#2c1b18/gi, to: '#3d0c02' },
    { from: /#3a251e/gi, to: '#4a0e0e' },

    // Accents (Terracotta -> Radiant Saffron)
    { from: /#8f3521/gi, to: '#ff7a00' },
    { from: /#6e2818/gi, to: '#cc4400' },

    // Gold (Deep Terracotta -> Bright Gold)
    { from: /#5e2414/gi, to: '#ffd700' },
    { from: /#a0412a/gi, to: '#f5b041' },

    // RGBA Overlays (Cream -> Pure White)
    { from: /rgba\(\s*252\s*,\s*251\s*,\s*249\s*,/g, to: 'rgba(255, 255, 255,' },
    { from: /rgba\(\s*248\s*,\s*246\s*,\s*240\s*,/g, to: 'rgba(255, 255, 255,' },
    { from: /rgba\(\s*245\s*,\s*243\s*,\s*236\s*,/g, to: 'rgba(255, 255, 255,' },

    // RGBA Accents (Terracotta/Wood -> Saffron/Gold)
    { from: /rgba\(\s*44\s*,\s*27\s*,\s*24\s*,/g, to: 'rgba(61, 12, 2,' }, // 3D0C02
    { from: /rgba\(\s*143\s*,\s*53\s*,\s*33\s*,/g, to: 'rgba(255, 122, 0,' }, // FF7A00
    { from: /rgba\(\s*94\s*,\s*36\s*,\s*20\s*,/g, to: 'rgba(255, 215, 0,' }, // FFD700
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
console.log('Bright theme refactor complete!');
