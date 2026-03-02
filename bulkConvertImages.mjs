import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function processImages(dir) {
    try {
        const files = await fs.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(dir, file.name);

            if (file.isDirectory()) {
                // Recursively process subdirectories
                await processImages(fullPath);
            } else if (file.isFile() && file.name.match(/\.(jpg|jpeg|png)$/i)) {
                const filenameWithoutExt = path.parse(file.name).name;
                // Clean filename, replace spaces with hyphens
                const cleanName = filenameWithoutExt.replace(/\s+/g, '-');
                const outputPath = path.join(dir, `${cleanName}.webp`);

                console.log(`Processing ${fullPath} -> .webp`);
                try {
                    await sharp(fullPath)
                        .webp({ quality: 80, effort: 6 })
                        .toFile(outputPath);

                    // Delete old image after successful conversion
                    await fs.unlink(fullPath);
                    console.log(`  -> Safely deleted original: ${file.name}`);
                } catch (e) {
                    console.error(`  -> Failed to convert ${file.name}:`, e);
                }
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${dir}:`, error);
    }
}

async function main() {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    console.log(`Starting massive WebP conversion in: ${imagesDir}`);
    await processImages(imagesDir);
    console.log('Finished converting all images!');
}

main();
