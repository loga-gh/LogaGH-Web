import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, "..");

const input = join(root, "public", "logo.png");
const publicDir = join(root, "public");
const appDir = join(root, "src", "app");

// Get image metadata first
const meta = await sharp(input).metadata();
const size = Math.max(meta.width, meta.height);

// 1. Create a perfectly square version of the logo (padded with white background)
//    padded to make it square then resize
const padded = sharp(input).resize({
  width: size,
  height: size,
  fit: "contain",
  background: { r: 255, g: 255, b: 255, alpha: 1 },
});

// 2. favicon.ico replacement (32x32 PNG used by browsers)
await padded.clone().resize(32, 32).toFile(join(publicDir, "favicon-32.png"));
console.log("✓ favicon-32.png");

// 3. favicon 16x16
await padded.clone().resize(16, 16).toFile(join(publicDir, "favicon-16.png"));
console.log("✓ favicon-16.png");

// 4. 192x192 for manifest / Android
await padded.clone().resize(192, 192).toFile(join(publicDir, "icon-192.png"));
console.log("✓ icon-192.png");

// 5. 512x512 for manifest / PWA splash
await padded.clone().resize(512, 512).toFile(join(publicDir, "icon-512.png"));
console.log("✓ icon-512.png");

// 6. Next.js app icon — 180x180 Apple Touch Icon
await padded.clone().resize(180, 180).toFile(join(publicDir, "apple-touch-icon.png"));
console.log("✓ apple-touch-icon.png");

// 7. Next.js app dir icon (used for metadata) — 48x48 minimum for Google
await padded.clone().resize(48, 48).toFile(join(appDir, "icon.png"));
console.log("✓ src/app/icon.png");

// 8. og-image (1200x630) — branded background with centered logo
await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: { r: 30, g: 58, b: 95 }, // #1E3A5F – brand navy
  },
})
  .composite([
    {
      input: await padded.clone().resize(400, 400).toBuffer(),
      gravity: "centre",
    },
  ])
  .jpeg({ quality: 90 })
  .toFile(join(publicDir, "og-image.jpg"));
console.log("✓ og-image.jpg");

console.log("\nAll icons generated successfully! ✅");
