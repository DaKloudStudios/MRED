const https = require('https');

const testUrl = 'https://storage.googleapis.com/aivoks_website_almacenamiento/KEVIN/MREDGALLERY/MRED4.webp';

https.request(testUrl, { method: 'HEAD' }, (res) => {
    console.log(`Status: ${res.statusCode}`);
}).on('error', (err) => {
    console.log('Error:', err.message);
}).end();
