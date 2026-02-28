const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'constants.tsx',
    'components/CustomCursor.tsx',
    'components/Footer.tsx',
    'components/Services.tsx',
    'components/Navbar.tsx',
    'components/Hero.tsx'
];

function getNewPath(url) {
    if (url === 'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDLOGO/Mred%20logo%20v2.png') {
        return url; // Skip the failed 404 image
    }
    const fileName = url.split('/').pop().replace('.jpg', '').replace('.png', '').replace(/%20/g, '-').replace(/\(/g, '').replace(/\)/g, '');
    return `/images/${fileName}.webp`;
}

const urlRegex = /https:\/\/storage\.googleapis\.com\/aivoks_website_almacenamiento\/KEVIN\/[A-Za-z0-9_%().-]+\/[A-Za-z0-9_%().-]+(?:\.jpg|\.png)/g;

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf-8');
    let match;
    let updated = false;

    const newContent = content.replace(urlRegex, (match) => {
        updated = true;
        return getNewPath(match);
    });

    if (updated) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${file}`);
    }
});
