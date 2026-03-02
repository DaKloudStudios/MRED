import fs from 'fs/promises';
import path from 'path';

async function updateConstants() {
    const beforeDir = "d:\\MRED\\public\\images\\6336_fargo\\before";
    const afterDir = "d:\\MRED\\public\\images\\6336_fargo\\after";

    let newProjects = '';

    try {
        const beforeFiles = await fs.readdir(beforeDir);
        beforeFiles.forEach((file, index) => {
            if (file.endsWith('.webp')) {
                newProjects += `  {
    id: 'fargo-before-${index + 1}',
    title: '6336 Fargo - Before',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/before/${file}'
  },\n`;
            }
        });

        const afterFiles = await fs.readdir(afterDir);
        afterFiles.forEach((file, index) => {
            if (file.endsWith('.webp')) {
                newProjects += `  {
    id: 'fargo-after-${index + 1}',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/${file}'
  },\n`;
            }
        });

        console.log(newProjects);
    } catch (error) {
        console.error('Error:', error);
    }
}

updateConstants();
