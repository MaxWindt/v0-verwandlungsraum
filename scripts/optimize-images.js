/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(process.cwd(), 'public', 'images');

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const filePath = path.join(imagesDir, file);

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const webpPath = path.join(imagesDir, `${base}.webp`);

  try {
    await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
    console.log(`Created ${webpPath}`);
  } catch (err) {
    console.error(`Failed to optimize ${filePath}:`, err);
  }
}

async function run() {
  if (!fs.existsSync(imagesDir)) {
    console.error('No images directory found at', imagesDir);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  await Promise.all(files.map(processFile));
  console.log('Image optimization complete.');
}

run();
