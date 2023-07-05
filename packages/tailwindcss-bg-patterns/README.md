<h2 align="center">TailwindCSS Background Patterns</h1>
<p align="center">Inspired by <a href="https://www.magicpattern.design/tools/css-backgrounds" target="_blank" rel="noopener noreferrer">CSS Background Patterns by MagicPattern</a> and used by <a href="https://relayforms.com" target="_blank" rel="noopener noreferrer">RelayForms</a></p>

<p>
    <a href="https://www.npmjs.com/package/tailwindcss-bg-patterns"><img src="https://img.shields.io/npm/v/tailwindcss-bg-patterns.svg" alt="Latest Release"></a>
    <a href="https://www.npmjs.com/package/tailwindcss-bg-patterns"><img src="https://img.shields.io/npm/dt/tailwindcss-bg-patterns.svg" alt="Total Downloads"></a>
    <a href="https://github.com/thillmann/tailwindcss-bg-patterns/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/tailwindcss-bg-patterns.svg" alt="License"></a>
</p>

---

## Demo

See a live demo of all background patterns here: [Live demo](https://hillmann.cc/tailwindcss-bg-patterns/)

## Installation

Add the `tailwindcss-bg-patterns` plugin to your project:

```bash
# Install using npm
npm install --save-dev tailwindcss-bg-patterns

# Install using yarn
yarn add -D tailwindcss-bg-patterns

# Install using pnpm
pnpm add -D tailwindcss-bg-patterns
```

## Usage

```javascript
// tailwind.config.js
{
  theme: { // defaults to these values
    patterns: {
        opacities: {
            100: "1",
            80: ".80",
            60: ".60",
            40: ".40",
            20: ".20",
            10: ".10",
            5: ".05",
        },
        sizes: {
            1: "0.25rem",
            2: "0.5rem",
            4: "1rem",
            6: "1.5rem",
            8: "2rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            32: "8rem",
        }
    }
  },
  plugins: [
    require('tailwindcss-bg-patterns'),
  ],
}
```

## Background Patterns

Included are the following patterns:

- Lines (`pattern-lines`)
- Vertical Lines (`pattern-vertical-lines`)
- Diagonal Lines (`pattern-diagonal-lines`)
- Rectangles (`pattern-rectangles`)
- Rhombus (`pattern-rhombus`)
- Dots (`pattern-dots`)
- Boxes (`pattern-boxes`)
- Cross (`pattern-cross`)
- Zigzag (`pattern-zigzag`)
- Zigzag 3D (`pattern-zigzag-3d`)
- Isometric (`pattern-isometric`)
- Wavy (`pattern-wavy`)
- Triangles (`pattern-triangles`)
- Moon (`pattern-moon`)
- Paper (`pattern-paper`)

## Utilities

The plugin provides utility classes to control the foreground and background colors (based on your theme colors) as well as opacity and sizing (can be controlled in your theme, too):

**Opacity**: `pattern-opacity-80` applies opacity of `0.8`

By default the plugin comes with the following options for opacity: `pattern-size-100`, `pattern-size-80`, `pattern-size-60`, `pattern-size-40`, `pattern-size-20`, `pattern-size-10`, `pattern-size-5`x

**Size**: `pattern-size-8` applies a size of `2rem`

By default the plugin comes with the following options for size: `pattern-size-1`, `pattern-size-2`, `pattern-size-4`, `pattern-size-6`, `pattern-size-8`, `pattern-size-16`, `pattern-size-20`, `pattern-size-24`, `pattern-size-32`

**Color**: `pattern-indigo-600` (foreground) and `pattern-bg-white` (background)

Colors will be extracted from your theme.

## Example

Applying the isometric background pattern to a div:

```html
<div
  class="w-56 h-56 pattern-isometric pattern-indigo-600 pattern-bg-transparent pattern-opacity-60 pattern-size-8"
></div>
```

Which results in:

![Isometric Example](/packages/example/public/isometric.png)
