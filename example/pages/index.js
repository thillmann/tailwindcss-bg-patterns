import Head from "next/head";
import { useState } from "react";
import { Pattern } from "../components/Pattern";
import { Tooltip } from "../components/Tooltip";

const { colors } = require("tailwindcss/defaultTheme");

const patterns = [
  ["Zigzag", "zigzag"],
  ["Zigzag 3D", "zigzag-3d"],
  ["Boxes", "boxes"],
  ["Lines", "lines"],
  ["Vertical Lines", "vertical-lines"],
  ["Diagonal Lines", "diagonal-lines"],
  ["Wavy", "wavy"],
  ["Cross", "cross"],
  ["Dots", "dots"],
  ["Isometric", "isometric"],
  ["Rectangles", "rectangles"],
  ["Rhombus", "rhombus"],
  ["Triangles", "triangles"],
  ["Moon", "moon"],
  ["Paper", "paper"],
];

const sizes = [1, 2, 4, 6, 8, 16, 20, 24, 32];
const opacities = [5, 10, 20, 40, 60, 80, 100];

export default function Home() {
  const [pattern, setPattern] = useState("dots");
  const [color, setColor] = useState("blue");
  const [colorHue, setColorHue] = useState("500");
  const fullColor = colorHue ? `${color}-${colorHue}` : color;
  const [opacity, setOpacity] = useState("20");
  const [size, setSize] = useState("6");
  return (
    <div>
      <div
        className={`pattern-${pattern} pattern-${fullColor} pattern-bg-white pattern-opacity-${opacity} pattern-size-${size} fixed top-0 left-0 right-0 bottom-0`}
      />
      <Head>
        <title>Tailwind CSS Background Patterns</title>
        <link rel="icon" href="/tailwindcss-bg-patterns/favicon.ico" />
      </Head>
      <header className="relative flex justify-center py-6 mb-16 text-gray-900 bg-white shadow-md">
        <h1 className={`text-3xl font-bold border-b-4 border-${color}-200`}>
          Tailwind CSS Background Patterns
        </h1>
        <Tooltip tooltip="Tailwind CSS Background Patterns on GitHub">
          <a
            href="https://github.com/thillmann/tailwindcss-bg-patterns"
            className="absolute transform -translate-y-1/2 hover:text-gray-700 right-12 top-1/2"
          >
            <span className="sr-only">
              Tailwind CSS Background Patterns on GitHub
            </span>
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
        </Tooltip>
      </header>
      <main className="relative mb-32">
        <div className="grid w-full grid-cols-2 gap-4 px-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {patterns.map(([name, id]) => (
            <Pattern
              key={id}
              name={name}
              pattern={id}
              color={fullColor}
              colorBg="white"
              opacity={opacity}
              size={size}
              className="mb-8 cursor-pointer"
              onClick={() => setPattern(id)}
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
              const newColor = ev.currentTarget.value;
              if (!colorHue) {
                setColorHue(
                  typeof colors[newColor] === "object" ? "600" : undefined
                );
              }
              setColor(newColor);
            }}
          >
            {Object.keys(colors).map((key) => (
              <option key={key} value={key} selected={key === color}>
                {key}
              </option>
            ))}
          </select>
          {typeof colors[color] === "object" && (
            <select
              className="text-sm border border-gray-200 rounded bg-gray-50"
              value={colorHue}
              onChange={(ev) => setColorHue(ev.currentTarget.value)}
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
            onChange={(ev) =>
              setOpacity(
                opacities.reduce((previous, next) => {
                  const deltaPrev = Math.abs(
                    parseInt(ev.currentTarget.value) - previous
                  );
                  const deltaNext = Math.abs(
                    parseInt(ev.currentTarget.value) - next
                  );
                  return deltaNext < deltaPrev ? next : previous;
                })
              )
            }
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
            onChange={(ev) =>
              setSize(
                sizes.reduce((previous, next) => {
                  const deltaPrev = Math.abs(
                    parseInt(ev.currentTarget.value) - previous
                  );
                  const deltaNext = Math.abs(
                    parseInt(ev.currentTarget.value) - next
                  );
                  return deltaNext < deltaPrev ? next : previous;
                })
              )
            }
            step="1"
            min="1"
            max="32"
          />
        </div>
      </div>
    </div>
  );
}
