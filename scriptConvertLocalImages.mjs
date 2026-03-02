import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function processImages(inputDir, outputDir) {
    try {
        await fs.mkdir(outputDir, { recursive: true });
        const files = await fs.readdir(inputDir);

        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                const inputPath = path.join(inputDir, file);
                const filenameWithoutExt = path.parse(file).name;
                // Clean filename, replace spaces with hyphens
                const cleanName = filenameWithoutExt.replace(/\s+/g, '-');
                const outputPath = path.join(outputDir, `${cleanName}.webp`);

                console.log(`Processing ${file} -> ${cleanName}.webp`);
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
            }
        }
        console.log(`Finished processing images in ${inputDir}`);
    } catch (error) {
        console.error(`Error processing directory ${inputDir}:`, error);
    }
}

async function main() {
    const afterIn = "d:\\MRED\\FOTOS\\4475 plata completed pictures";
    const afterOut = "d:\\MRED\\public\\images\\4475_plata\\after";
    await processImages(afterIn, afterOut);
}

main();
