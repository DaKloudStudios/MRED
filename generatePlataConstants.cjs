const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, 'constants.tsx');
let content = fs.readFileSync(constantsPath, 'utf8');

const afterProjectsMatch = content.match(/(\n\];\n\nexport const CONTACT_INFO[\s\S]*)/);
if (!afterProjectsMatch) {
    console.error("Could not find the end of the PROJECTS array in constants.tsx");
    process.exit(1);
}

const originalContentBeforeEnd = content.substring(0, afterProjectsMatch.index);
const afterProjects = afterProjectsMatch[1];

const afterDir = path.join(__dirname, 'public/images/4475_plata/after');
try {
    const afterFiles = fs.readdirSync(afterDir).filter(f => f.endsWith('.webp'));

    if (afterFiles.length === 0) {
        console.log('No webp images found yet. Did the converter finish?');
        process.exit(0);
    }

    let newPlataProjects = '';
    afterFiles.forEach((file, index) => {
        newPlataProjects += `,\n  {
    id: 'plata-after-${index + 1}',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/${file}'
  }`;
    });

    const newContent = originalContentBeforeEnd + newPlataProjects + afterProjects;

    fs.writeFileSync(constantsPath, newContent, 'utf8');
    console.log('Constants successfully updated with 4475 Plata projects.');

} catch (e) {
    console.log('Error reading directory: ', e);
}
