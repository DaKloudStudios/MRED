const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, 'constants.tsx');
let content = fs.readFileSync(constantsPath, 'utf8');

// Extract everything before PROJECTS and everything after PROJECTS
const beforeProjectsMatch = content.match(/([\s\S]*?export const PROJECTS: Project\[\] = \[)/);
const afterProjectsMatch = content.match(/(\n\];\n\nexport const CONTACT_INFO[\s\S]*)/);

if (!beforeProjectsMatch || !afterProjectsMatch) {
    console.error("Could not parse constants.tsx");
    process.exit(1);
}

const beforeProjects = beforeProjectsMatch[1];
const afterProjects = afterProjectsMatch[1];

// We need to keep projects 1 to 16
const originalProjectsText = content.substring(beforeProjectsMatch[0].length, afterProjectsMatch.index);

// Extract the first 16 projects using regex or just splitting by '  },'
const projectsArr = originalProjectsText.split('  },');
const first16 = projectsArr.filter(p => p.includes("category: 'Commercial'") || (p.includes("category: 'Residential'") && !p.includes('fargo'))).join('  },') + '  },';

const afterDir = path.join(__dirname, 'public/images/6336_fargo/after');
const afterFiles = fs.readdirSync(afterDir).filter(f => f.endsWith('.webp'));

let newFargoProjects = '';
afterFiles.forEach((file, index) => {
    newFargoProjects += `\n  {
    id: 'fargo-after-${index + 1}',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/${file}'
  }${index === afterFiles.length - 1 ? '' : ','}`;
});

const newContent = beforeProjects + first16 + newFargoProjects + afterProjects;

fs.writeFileSync(constantsPath, newContent, 'utf8');
console.log('Constants successfully repaired.');
