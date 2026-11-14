# @jithinaji/typeit

[![npm version](https://img.shields.io/npm/v/@jithinaji/typeit.svg?style=flat-square)](https://www.npmjs.com/package/@jithinaji/typeit)
[![license](https://img.shields.io/npm/l/@jithinaji/typeit.svg?style=flat-square)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@jithinaji/typeit?style=flat-square)](https://bundlephobia.com/package/@jithinaji/typeit)

A lightweight, zero-dependency JavaScript typing animation library with natural human-like speed variation and chainable method calls.
<br/>
👉 **[View Live Demo](https://jithinaji.github.io/TypeIt/)**

---

## ✨ Features

- **Zero dependencies**: Weighs only ~1 KB minified and gzipped.
- **Natural typing effect**: Configurable typing speed and random speed variation to mimic human typing.
- **Auto-scrolling**: Automatically scrolls parent container smoothly to keep newly typed content in view via `MutationObserver` (customizable via `autoScroll: true | false`).
- **Chainable API**: Fluent queueing with `.type()`, `.clear()`, and speed adjustments.
- **Universal compatibility**: Shipped in ESM (`.mjs`), CommonJS (`.cjs`), and browser standalone bundle (`.min.js`).
- **Interactive demo**: Included directly in the repository to preview and experiment.

---

## 📦 Installation

### Package Manager

Install via npm:

```bash
npm install @jithinaji/typeit
```

Or using pnpm / yarn:

```bash
pnpm add @jithinaji/typeit
# or
yarn add @jithinaji/typeit
```

### CDN / Direct Browser Tag

Include directly via jsDelivr or unpkg:

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@jithinaji/typeit@1.1.0/dist/typeit.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/@jithinaji/typeit@1.1.0/dist/typeit.min.js"></script>
```

When loaded via a `<script>` tag, the `TypeIt` class is available globally on `window.TypeIt`.

---

## 🚀 Quick Start

### Modern ES Modules (Vite, Next.js, Rollup, Webpack)

```javascript
import TypeIt from "@jithinaji/typeit";

const target = document.getElementById("header-title");

const typist = new TypeIt({
  element: target,
  typingSpeed: 120,    // Base speed in milliseconds per character
  speedVariation: 40,  // Random variation (+/- ms) for natural typing rhythm
  autoScroll: true     // Automatically scroll parent container (default: true)
});

typist
  .type("Hello world!")
  .type(" Welcome to modern web development.");
```

### CommonJS (Node / Browserify)

```javascript
const TypeIt = require("@jithinaji/typeit");
```

### Vanilla HTML / Browser

```html
<h1 id="headline"></h1>

<script src="https://cdn.jsdelivr.net/npm/@jithinaji/typeit/dist/typeit.min.js"></script>
<script>
  const el = document.getElementById("headline");
  const typist = new TypeIt(el); // accepts DOM Element directly

  typist
    .type("Fast.")
    .type(" Lightweight.")
    .type(" Simple.");
</script>
```

---

## 📖 API Reference

### `new TypeIt(data)`

Creates a new `TypeIt` instance.

#### Parameters:
`data` can be either:
1. A DOM `Element` (defaults to `typingSpeed: 150`, `speedVariation: 50`, `autoScroll: true`):
   ```javascript
   const typist = new TypeIt(document.querySelector("#demo"));
   ```
2. An options object:
   ```javascript
   const typist = new TypeIt({
     element: document.querySelector("#demo"), // Required DOM Element
     typingSpeed: 150,                         // Optional: default 150ms
     speedVariation: 50,                       // Optional: default 50ms
     autoScroll: true                          // Optional: default true
   });
   ```

---

### Methods

All methods return the instance (`this`) for easy method chaining.

#### `.type(content)`
Enqueues a string to be typed character by character.
- **`content`** *(string)*: The text string to type.

```javascript
typist.type("Typing line 1...").type(" Typing line 2...");
```

#### `.setTypingSpeed(speed)`
Dynamically updates the base typing speed.
- **`speed`** *(number)*: Base delay in milliseconds per character.

```javascript
typist.setTypingSpeed(80); // Speed up future typing
```

#### `.setVariationSpeed(speed)`
Dynamically updates the speed variation range.
- **`speed`** *(number)*: Random variation offset in milliseconds.

```javascript
typist.setVariationSpeed(30);
```

#### `.clear(options)`
Clears characters from the element.
- **`options`** *(object, optional)*:
  - `animated` *(boolean, default: `true`)*: If `true`, deletes characters sequentially one by one. If `false`, immediately slices off the characters.
  - `count` *(number, default: all text)*: Number of characters to delete.

```javascript
// Animated backspace of the entire content
typist.clear();

// Instantly delete the entire content
typist.clear({ animated: false });

// Animate deletion of the last 5 characters
typist.clear({ count: 5, animated: true });
```

---

## 🖥️ Live Demo

Experience the live interactive demo here:
👉 **[https://jithinaji.github.io/TypeIt/](https://jithinaji.github.io/TypeIt/)**

Or run it locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/JithinAji/TypeIt.git
   cd TypeIt
   ```
2. Build the project:
   ```bash
   npm install
   npm run build
   ```
3. Open `demo/index.html` in your web browser.

---

## 🛠️ Development & Publishing

### Build
To compile ESM, CommonJS, and browser bundles:

```bash
npm run build
```

### Publishing to npm

1. Ensure you are logged into your npm account:
   ```bash
   npm login
   ```
2. Test pack locally:
   ```bash
   npm pack --dry-run
   ```
3. Publish scoped package publicly:
   ```bash
   npm publish --access public
   ```

---

## 📄 License

[MIT](LICENSE) © [JithinAji](https://github.com/JithinAji)
