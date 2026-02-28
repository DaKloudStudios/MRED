const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const imageUrls = [
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/MRED4.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/MRED3.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/MRED1.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/ME.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/MDRED2.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/485163252_982090220727178_6762656864850734073_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/485100761_982090207393846_6980853226460417027_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/484827290_982090524060481_4425155738135494186_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/484814331_982090507393816_2714571011854995559_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/484804830_982090487393818_9116493074043048104_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/483525836_982090517393815_6830754627101651057_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/469458549_1066482135176855_8410746743405783440_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/469548089_1067595858398816_3275149458858370112_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/481178960_972889064980627_6996856093205795468_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/481316724_972889108313956_3836058292520930219_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/482015347_976447734624760_3333127928408194325_n.jpg',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDLOGO/Untitled%20design%20(3).png',
    'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDLOGO/Mred%20logo%20v2.png'
];

const outDir = path.join(__dirname, 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });

async function processImages() {
    for (const url of imageUrls) {
        const fileName = url.split('/').pop().replace('.jpg', '').replace('.png', '').replace(/%20/g, '-').replace(/\(/g, '').replace(/\)/g, '');
        const outPath = path.join(outDir, fileName + '.webp');

        console.log(`Downloading ${url}...`);

        try {
            await new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    if (res.statusCode !== 200) {
                        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
                        return;
                    }
                    const chunks = [];
                    res.on('data', chunk => chunks.push(chunk));
                    res.on('end', async () => {
                        const buffer = Buffer.concat(chunks);
                        await sharp(buffer)
                            .webp({ quality: 80 })
                            .toFile(outPath);
                        console.log(`Saved ${outPath}`);
                        resolve();
                    });
                }).on('error', reject);
            });
        } catch (err) {
            console.error(`Error processing ${url}:`, err);
        }
    }
}

processImages();
