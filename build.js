const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

async function build() {
  console.log('⚡ Building @jithinaji/typeit...');

  try {
    // 1. ESM build (for bundlers like Vite, Webpack, rollup and modern Node)
    await esbuild.build({
      entryPoints: ['src/index.js'],
      outfile: 'dist/index.mjs',
      format: 'esm',
      bundle: true,
      platform: 'browser',
      sourcemap: true,
    });
    console.log('✔ Built dist/index.mjs (ESM)');

    // 2. CommonJS build (for Node / legacy bundlers)
    await esbuild.build({
      entryPoints: ['src/index.js'],
      outfile: 'dist/index.cjs',
      format: 'cjs',
      bundle: true,
      platform: 'node',
      sourcemap: true,
      footer: {
        js: 'module.exports = TypeIt; module.exports.default = TypeIt;',
      },
    });
    console.log('✔ Built dist/index.cjs (CommonJS)');

    // 3. Browser IIFE script (unminified)
    await esbuild.build({
      entryPoints: ['src/index.js'],
      outfile: 'dist/index.global.js',
      format: 'iife',
      globalName: 'TypeIt',
      bundle: true,
      platform: 'browser',
      sourcemap: true,
      footer: {
        js: 'if (typeof TypeIt !== "undefined" && TypeIt.default) TypeIt = TypeIt.default;',
      },
    });
    console.log('✔ Built dist/index.global.js (Browser IIFE)');

    // 4. Browser IIFE script (minified for CDN / production)
    await esbuild.build({
      entryPoints: ['src/index.js'],
      outfile: 'dist/typeit.min.js',
      format: 'iife',
      globalName: 'TypeIt',
      bundle: true,
      minify: true,
      platform: 'browser',
      sourcemap: true,
      footer: {
        js: 'if (typeof TypeIt !== "undefined" && TypeIt.default) TypeIt = TypeIt.default;',
      },
    });
    // 5. Copy browser bundle to demo/ for standalone demo and GitHub Pages
    fs.copyFileSync(
      path.resolve(__dirname, 'dist/typeit.min.js'),
      path.resolve(__dirname, 'demo/typeit.min.js')
    );
    if (fs.existsSync(path.resolve(__dirname, 'dist/typeit.min.js.map'))) {
      fs.copyFileSync(
        path.resolve(__dirname, 'dist/typeit.min.js.map'),
        path.resolve(__dirname, 'demo/typeit.min.js.map')
      );
    }
    console.log('✔ Copied dist/typeit.min.js to demo/');

    console.log('✨ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
