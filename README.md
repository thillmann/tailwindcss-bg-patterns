<h2 align="center">TailwindCSS Background Patterns</h1>
<p align="center">Inspired by [CSS Background Patterns by MagicPattern](https://www.magicpattern.design/tools/css-backgrounds)</p>

## Installation

Add the `tailwindcss-bg-patterns` plugin to your project:

```bash
# Install using pnpm
pnpm install --save-dev tailwindcss-bg-patterns

# Install using npm
npm install --save-dev tailwindcss-bg-patterns

# Install using yarn
yarn add -D tailwindcss-bg-patterns
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

## Example

Applying the isometric background pattern to a div:
```html
<div class="w-56 h-56 pattern-isometric pattern-indigo-600 pattern-bg-transparent pattern-opacity-60 pattern-size-8"></div>
```
