const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
files.push('../index.css');
files.push('../App.jsx');

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/'Cinzel', serif/g, "'Noto Serif Malayalam', serif");
    content = content.replace(/'Playfair Display', serif/g, "'Noto Serif Malayalam', serif");
    content = content.replace(/'Playfair Display', Georgia, serif/g, "'Noto Serif Malayalam', serif");
    content = content.replace(/'Outfit', sans-serif/g, "'Noto Serif Malayalam', serif");
    
    // Also catch bare string replacements if needed, but the inline styles mostly use the exact strings above
    content = content.replace(/--font-family-cinzel:.*;/g, "--font-family-cinzel: 'Noto Serif Malayalam', serif;");
    content = content.replace(/--font-family-playfair:.*;/g, "--font-family-playfair: 'Noto Serif Malayalam', serif;");
    content = content.replace(/--font-family-outfit:.*;/g, "--font-family-outfit: 'Noto Serif Malayalam', serif;");

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log("Fonts updated to Noto Serif Malayalam globally.");
