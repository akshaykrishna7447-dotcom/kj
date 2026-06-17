const fs = require('fs');
const path = require('path');

const mappings = [
    // Backgrounds (Dark -> Light)
    { from: /#140502/gi, to: '#fcfbf9' },
    { from: /#0a0201/gi, to: '#f8f6f0' },
    { from: /#0d0202/gi, to: '#f5f3ec' },
    { from: /#0e0301/gi, to: '#fcfbf9' },
    { from: /#0b0201/gi, to: '#fcfbf9' },
    { from: /#050201/gi, to: '#f8f6f0' },
    { from: /#190804/gi, to: '#fcfbf9' },
    { from: /#3d0c02/gi, to: '#5e2414' },

    // Text (Light -> Dark)
    { from: /#fdf5e6/gi, to: '#2c1b18' },
    { from: /#ebd2a9/gi, to: '#3a251e' },
    { from: /#fff6e0/gi, to: '#2c1b18' },

    // Saffron (Oranges -> Terracotta)
    { from: /#ff9933/gi, to: '#8f3521' },
    { from: /#cc4400/gi, to: '#6e2818' },
    { from: /#ff4500/gi, to: '#8f3521' },

    // Gold (Yellows -> Deep Terracotta)
    { from: /#d4af37/gi, to: '#5e2414' },
    { from: /#f5d76e/gi, to: '#a0412a' },

    // RGBA Overlays (Dark to Light)
    { from: /rgba\(\s*20\s*,\s*5\s*,\s*2\s*,/g, to: 'rgba(252, 251, 249,' },
    { from: /rgba\(\s*10\s*,\s*2\s*,\s*1\s*,/g, to: 'rgba(248, 246, 240,' },
    { from: /rgba\(\s*25\s*,\s*8\s*,\s*4\s*,/g, to: 'rgba(252, 251, 249,' },
    { from: /rgba\(\s*13\s*,\s*2\s*,\s*2\s*,/g, to: 'rgba(245, 243, 236,' },
    { from: /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,/g, to: 'rgba(252, 251, 249,' }, // Invert black shadows/overlays? Wait, text shadow with 0,0,0 on light background might look bad. We'll manually fix those if needed or leave them.

    // RGBA Text/Accent Colors (Light to Dark Wood / Terracotta)
    { from: /rgba\(\s*253\s*,\s*245\s*,\s*230\s*,/g, to: 'rgba(44, 27, 24,' },
    { from: /rgba\(\s*255\s*,\s*153\s*,\s*51\s*,/g, to: 'rgba(143, 53, 33,' },
    { from: /rgba\(\s*212\s*,\s*175\s*,\s*55\s*,/g, to: 'rgba(94, 36, 20,' },
    { from: /rgba\(\s*255\s*,\s*69\s*,\s*0\s*,/g, to: 'rgba(143, 53, 33,' },
    { from: /rgba\(\s*255\s*,\s*127\s*,\s*0\s*,/g, to: 'rgba(143, 53, 33,' }
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
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
console.log('Theme refactor complete!');
