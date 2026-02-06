/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

(async () => {
  const publicDir = path.join(process.cwd(), 'public');
  const iconsDir = path.join(publicDir, 'icons');
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

  const src = path.join(publicDir, 'images', 'Visitenkarte Logo.png');
  if (!fs.existsSync(src)) {
    console.error('Source logo not found at', src);
    process.exit(1);
  }

  const sizes = [16, 32, 48, 180, 192, 512];

  try {
    await Promise.all(
      sizes.map((size) =>
        sharp(src)
          .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .png({ quality: 90 })
          .toFile(path.join(iconsDir, `favicon-${size}.png`)),
      ),
    );

    // Create an ICO by combining 16,32,48 if png-to-ico available; otherwise skip
    try {
      const pngToIco = require('png-to-ico');
      const icoPath = path.join(publicDir, 'favicon.ico');
      await pngToIco([
        path.join(iconsDir, 'favicon-16.png'),
        path.join(iconsDir, 'favicon-32.png'),
        path.join(iconsDir, 'favicon-48.png'),
      ]).then((buf) => fs.writeFileSync(icoPath, buf));
      console.log('Created favicon.ico');
    } catch (e) {
      console.warn('png-to-ico not available, skipping favicon.ico generation');
    }

    // Apple touch icon (180)
    fs.copyFileSync(path.join(iconsDir, 'favicon-180.png'), path.join(publicDir, 'apple-touch-icon.png'));

    // Create site manifest
    const manifest = {
      name: 'Verwandlungsraum',
      short_name: 'Verwandlungsraum',
      icons: [
        { src: '/icons/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/favicon-512.png', sizes: '512x512', type: 'image/png' }
      ],
      start_url: '/',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff'
    };

    fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

    console.log('Favicons generated in /public/icons and manifest created.');
  } catch (err) {
    console.error('Error generating favicons', err);
    process.exit(1);
  }
})();
