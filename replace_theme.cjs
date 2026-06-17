const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = [
    // Hex colors
    { regex: /#faf7f2/gi, repl: '#ffffff' },
    { regex: /#a95c45/gi, repl: '#6B4423' },
    { regex: /#8b4a36/gi, repl: '#51331A' },
    { regex: /#d4b895/gi, repl: '#C4A484' },
    { regex: /#c2a47a/gi, repl: '#B69572' },
    { regex: /#3a2c24/gi, repl: '#2E1A0F' },

    // RGBA colors (with flexible spacing)
    { regex: /rgba\(\s*250\s*,\s*247\s*,\s*242/g, repl: 'rgba(255, 255, 255' },
    { regex: /rgba\(\s*169\s*,\s*92\s*,\s*69/g, repl: 'rgba(107, 68, 35' },
    { regex: /rgba\(\s*212\s*,\s*184\s*,\s*149/g, repl: 'rgba(196, 164, 132' },
    { regex: /rgba\(\s*58\s*,\s*44\s*,\s*36/g, repl: 'rgba(46, 26, 15' },
];

function processDir(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
        const fullPath = path.join(currentDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const r of replacements) {
                if (r.regex.test(content)) {
                    content = content.replace(r.regex, r.repl);
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

processDir(dir);
console.log('Color replacement complete!');
