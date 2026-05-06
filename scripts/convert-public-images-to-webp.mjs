import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

async function getImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getImageFiles(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    if (IMAGE_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertImages() {
  const files = await getImageFiles(PUBLIC_DIR);

  if (files.length === 0) {
    console.log('PNG/JPG/JPEG images not found in public.');
    return;
  }

  for (const file of files) {
    const ext = path.extname(file);
    const outputPath = file.slice(0, -ext.length) + '.webp';

    await sharp(file)
      .webp({
        quality: 78,
        effort: 6,
      })
      .toFile(outputPath);

    const originalStat = await fs.stat(file);
    const webpStat = await fs.stat(outputPath);

    const originalKb = (originalStat.size / 1024).toFixed(1);
    const webpKb = (webpStat.size / 1024).toFixed(1);

    console.log(
      `${path.relative(PUBLIC_DIR, file)} -> ${path.relative(
        PUBLIC_DIR,
        outputPath
      )} | ${originalKb} KB -> ${webpKb} KB`
    );
  }
}

convertImages().catch((error) => {
  console.error(error);
  process.exit(1);
});