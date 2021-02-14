import Head from "next/head";
import { useState } from "react";

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
];

const sizes = [1, 2, 4, 6, 8, 16, 20, 24, 32];
const opacities = [5, 10, 20, 40, 60, 80, 100];

function CodeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function Pattern({
  name,
  pattern,
  color,
  colorBg = "white",
  opacity = "40",
  size = "8",
  className,
  onClick,
}) {
  return (
    <div
      className={`group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 transition-all rounded overflow-hidden w-full h-56 bg-white relative ${className}`}
      onClick={onClick}
    >
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 pattern-${pattern} pattern-${color} pattern-bg-${colorBg} pattern-opacity-${opacity} pattern-size-${size}`}
      ></div>
      <button
        aria-label="Show code"
        className="absolute flex items-center top-3 right-3 bg-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 duration-200 transition-opacity"
      >
        <span className="text-white text-xs mx-1">Code</span>
        <CodeIcon className="w-4 h-4 text-white" />
      </button>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-end">
        <h2 className="text-sm bg-gray-700 text-white rounded-full px-2 mb-3">
          {name}
        </h2>
      </div>
    </div>
  );
}

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
      ></div>
      <Head>
        <title>Tailwind CSS Background Patterns</title>
        <link rel="icon" href="/tailwindcss-bg-patterns/favicon.ico" />
      </Head>
      <header className="relative flex justify-center bg-white text-gray-900 py-6 mb-16 shadow-md">
        <h1 className={`text-3xl font-bold border-b-4 border-${color}-200`}>
          Tailwind CSS Background Patterns
        </h1>
      </header>
      <main className="relative mb-32">
        <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-8">
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
      <div className="fixed shadow-lg rounded-full left-1/2 transform -translate-x-1/2 bottom-0 bg-white py-6 px-12 mb-8 flex space-x-8">
        <div>
          <label htmlFor="color" className="block text-sm font-bold">
            Color
          </label>
          <select
            id="color"
            className="rounded bg-gray-50 border border-gray-200 text-sm"
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
              className="rounded bg-gray-50 border border-gray-200 text-sm"
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
