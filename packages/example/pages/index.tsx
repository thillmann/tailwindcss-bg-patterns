import { useState } from "react";
import Head from "next/head";
import { Pattern } from "@/components/Pattern";

const patterns = [
  ["Zigzag", "pattern-zigzag"],
  ["Zigzag 3D", "pattern-zigzag-3d"],
  ["Boxes", "pattern-boxes"],
  ["Lines", "pattern-lines"],
  ["Vertical Lines", "pattern-vertical-lines"],
  ["Diagonal Lines", "pattern-diagonal-lines"],
  ["Wavy", "pattern-wavy"],
  ["Cross", "pattern-cross"],
  ["Dots", "pattern-dots"],
  ["Isometric", "pattern-isometric"],
  ["Rectangles", "pattern-rectangles"],
  ["Rhombus", "pattern-rhombus"],
  ["Triangles", "pattern-triangles"],
  ["Moon", "pattern-moon"],
  ["Paper", "pattern-paper"],
] as const;

type Pattern = (typeof patterns)[number][1];

const colors = {
  Blue: {
    "50": "pattern-blue-50",
    "100": "pattern-blue-100",
    "200": "pattern-blue-200",
    "300": "pattern-blue-300",
    "400": "pattern-blue-400",
    "500": "pattern-blue-500",
    "600": "pattern-blue-600",
    "700": "pattern-blue-700",
    "800": "pattern-blue-800",
    "900": "pattern-blue-900",
  },
  Red: {
    "50": "pattern-red-50",
    "100": "pattern-red-100",
    "200": "pattern-red-200",
    "300": "pattern-red-300",
    "400": "pattern-red-400",
    "500": "pattern-red-500",
    "600": "pattern-red-600",
    "700": "pattern-red-700",
    "800": "pattern-red-800",
    "900": "pattern-red-900",
  },
  Green: {
    "50": "pattern-green-50",
    "100": "pattern-green-100",
    "200": "pattern-green-200",
    "300": "pattern-green-300",
    "400": "pattern-green-400",
    "500": "pattern-green-500",
    "600": "pattern-green-600",
    "700": "pattern-green-700",
    "800": "pattern-green-800",
    "900": "pattern-green-900",
  },
  Yellow: {
    "50": "pattern-yellow-50",
    "100": "pattern-yellow-100",
    "200": "pattern-yellow-200",
    "300": "pattern-yellow-300",
    "400": "pattern-yellow-400",
    "500": "pattern-yellow-500",
    "600": "pattern-yellow-600",
    "700": "pattern-yellow-700",
    "800": "pattern-yellow-800",
    "900": "pattern-yellow-900",
  },
  Purple: {
    "50": "pattern-purple-50",
    "100": "pattern-purple-100",
    "200": "pattern-purple-200",
    "300": "pattern-purple-300",
    "400": "pattern-purple-400",
    "500": "pattern-purple-500",
    "600": "pattern-purple-600",
    "700": "pattern-purple-700",
    "800": "pattern-purple-800",
    "900": "pattern-purple-900",
  },
} as const;

type Color = keyof typeof colors;
type ColorHue = keyof (typeof colors)[keyof typeof colors];

const sizes = {
  1: "pattern-size-1",
  2: "pattern-size-2",
  4: "pattern-size-4",
  6: "pattern-size-6",
  8: "pattern-size-8",
  16: "pattern-size-16",
  20: "pattern-size-20",
  24: "pattern-size-24",
  32: "pattern-size-32",
} as const;

type Size = keyof typeof sizes;

const opacities = {
  5: "pattern-opacity-5",
  10: "pattern-opacity-10",
  20: "pattern-opacity-20",
  40: "pattern-opacity-40",
  60: "pattern-opacity-60",
  80: "pattern-opacity-80",
  100: "pattern-opacity-100",
} as const;

type Opacity = keyof typeof opacities;

function randomPattern() {
  const random = Math.round(Math.random() * (patterns.length - 1));
  return patterns[random][1];
}

export default function Home() {
  const [pattern, setPattern] = useState<Pattern>(randomPattern);
  const [color, setColor] = useState<Color>("Blue");
  const [colorHue, setColorHue] = useState<ColorHue>("600");
  const fullColor = colors[color][colorHue];
  const [opacity, setOpacity] = useState<Opacity>(40);
  const [size, setSize] = useState<Size>(8);
  return (
    <div>
      <div
        className={`${pattern} ${fullColor} ${sizes[size]} pattern-bg-white fixed top-0 left-0 right-0 bottom-0 pattern-opacity-10`}
      />
      <Head>
        <title>Tailwind CSS Background Patterns</title>
        <link rel="icon" href="/tailwindcss-bg-patterns/favicon.ico" />
      </Head>
      <header className="relative flex justify-center py-6 mb-16 text-gray-900 bg-white shadow-md">
        <h1 className={`text-3xl font-bold border-b-4 border-blue-200`}>
          Tailwind CSS Background Patterns
        </h1>
      </header>
      <main className="relative mb-32">
        <div className="grid w-full grid-cols-2 gap-4 px-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {patterns.map(([name, pattern]) => (
            <Pattern
              key={name}
              name={name}
              pattern={pattern}
              color={fullColor}
              opacity={opacities[opacity]}
              size={sizes[size]}
              onClick={() => setPattern(pattern)}
            />
          ))}
        </div>
      </main>
      <div className="fixed bottom-0 z-40 flex px-12 py-6 mb-8 space-x-8 transform -translate-x-1/2 bg-white rounded-full shadow-lg left-1/2">
        <div>
          <label htmlFor="color" className="block text-sm font-bold">
            Color
          </label>
          <select
            id="color"
            className="text-sm border border-gray-200 rounded bg-gray-50"
            value={color}
            onChange={(ev) => {
              const newColor = ev.currentTarget.value as Color;
              setColor(newColor);
            }}
          >
            {Object.keys(colors).map((key) => (
              <option key={key} value={key} selected={color === key}>
                {key}
              </option>
            ))}
          </select>
          {typeof colors[color] === "object" && (
            <select
              className="text-sm border border-gray-200 rounded bg-gray-50"
              value={colorHue}
              onChange={(ev) => {
                const newColorHue = ev.currentTarget.value as ColorHue;
                setColorHue(newColorHue);
              }}
            >
              {Object.keys(colors[color]).map((key) => (
                <option key={key} value={key} selected={key === colorHue}>
                  {key}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label htmlFor="opacity" className="block text-sm font-bold">
            Opacity
          </label>
          <input
            id="opacity"
            type="range"
            value={opacity}
            onChange={(ev) => {
              const value = parseInt(ev.target.value);
              const newOpacity = Object.keys(opacities)
                .map((val) => parseInt(val))
                .reduce((previous, next) => {
                  const deltaPrev = Math.abs(value - previous);
                  const deltaNext = Math.abs(value - next);
                  return deltaNext < deltaPrev ? next : previous;
                });
              setOpacity(newOpacity as Opacity);
            }}
            step="5"
            min="5"
            max="100"
          />
        </div>
        <div>
          <label htmlFor="size" className="block text-sm font-bold">
            Size
          </label>
          <input
            id="size"
            type="range"
            value={size}
            onChange={(ev) => {
              const value = parseInt(ev.target.value);
              const newSize = Object.keys(sizes)
                .map((val) => parseInt(val))
                .reduce((previous, next) => {
                  const deltaPrev = Math.abs(value - previous);
                  const deltaNext = Math.abs(value - next);
                  return deltaNext < deltaPrev ? next : previous;
                });
              setSize(newSize as Size);
            }}
            step="1"
            min="1"
            max="32"
          />
        </div>
      </div>
    </div>
  );
}
