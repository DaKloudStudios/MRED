const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, 'constants.tsx');
let content = fs.readFileSync(constantsPath, 'utf8');

let newProjects = '';
for (let i = 1; i <= 34; i++) {
    newProjects += `,\n  {
    id: 'fargo-${i}',
    title: '6336 Fargo Project',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/${i}.webp'
  }`;
}

content = content.replace(/\n\];(\s*export const CONTACT_INFO)/, newProjects + '\n];$1');

fs.writeFileSync(constantsPath, content, 'utf8');
console.log('Constants updated.');
