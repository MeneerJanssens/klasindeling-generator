import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const svgContent = readFileSync(join(process.cwd(), 'public', 'favicon.svg'));

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' }
];

async function generateIcons() {
  // Generate PNG icons
  for (const { size, name } of sizes) {
    await sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(join(process.cwd(), 'public', 'favicons', name));
    console.log(`Generated ${name}`);
  }
  
  // Generate favicon.ico (contains 16x16 and 32x32)
  const ico16 = await sharp(svgContent)
    .resize(16, 16)
    .png()
    .toBuffer();
  
  const ico32 = await sharp(svgContent)
    .resize(32, 32)
    .png()
    .toBuffer();
  
  // Create a simple ICO file structure
  // ICO format: Header (6 bytes) + Directory entries (16 bytes each) + PNG data
  const icoHeader = Buffer.from([
    0, 0,           // Reserved (must be 0)
    1, 0,           // Type (1 = ICO)
    2, 0            // Number of images
  ]);
  
  const createDirEntry = (size, offset, imageSize) => Buffer.from([
    size === 256 ? 0 : size,  // Width (0 means 256)
    size === 256 ? 0 : size,  // Height (0 means 256)
    0,              // Color palette (0 = no palette)
    0,              // Reserved
    1, 0,           // Color planes
    32, 0,          // Bits per pixel
    ...Buffer.from(new Uint32Array([imageSize]).buffer),  // Image size
    ...Buffer.from(new Uint32Array([offset]).buffer)      // Image offset
  ]);
  
  const offset16 = 6 + (16 * 2); // Header + 2 directory entries
  const offset32 = offset16 + ico16.length;
  
  const dirEntry16 = createDirEntry(16, offset16, ico16.length);
  const dirEntry32 = createDirEntry(32, offset32, ico32.length);
  
  const icoBuffer = Buffer.concat([
    icoHeader,
    dirEntry16,
    dirEntry32,
    ico16,
    ico32
  ]);
  
  writeFileSync(join(process.cwd(), 'public', 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico');
}

generateIcons().catch(console.error);
