const esbuild = require('esbuild');
const fs = require('fs');

const baseConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  sourcemap: true,
};

const iifeFooter = 'if (typeof TypeIt !== "undefined" && TypeIt.default) TypeIt = TypeIt.default;';

const targets = [
  { ...baseConfig, outfile: 'dist/index.mjs', format: 'esm', platform: 'browser' },
  { ...baseConfig, outfile: 'dist/index.cjs', format: 'cjs', platform: 'node', footer: { js: 'module.exports = TypeIt; module.exports.default = TypeIt;' } },
  { ...baseConfig, outfile: 'dist/index.global.js', format: 'iife', globalName: 'TypeIt', platform: 'browser', footer: { js: iifeFooter } },
  { ...baseConfig, outfile: 'dist/typeit.min.js', format: 'iife', globalName: 'TypeIt', platform: 'browser', minify: true, footer: { js: iifeFooter } },
];

async function build() {
  const start = Date.now();
  console.log('⚡ Building @jithinaji/typeit...');

  await Promise.all(targets.map((config) => esbuild.build(config)));

  // Copy TypeScript declarations
  if (fs.existsSync('src/index.d.ts')) {
    fs.copyFileSync('src/index.d.ts', 'dist/index.d.ts');
  }

  // Copy minified bundle to demo/
  ['dist/typeit.min.js', 'dist/typeit.min.js.map'].forEach((file) => {
    const dest = file.replace('dist/', 'demo/');
    if (fs.existsSync(file)) fs.copyFileSync(file, dest);
  });

  console.log(`✨ Build completed in ${Date.now() - start}ms`);
}

build().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
