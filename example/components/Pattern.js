import Prism from "prismjs";
import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import { CodeIcon } from "./CodeIcon";
import { ClipboardCheckIcon, ClipboardIcon } from "./ClipboardIcon";
import { useDialog } from "./Dialog";
import { Tooltip } from "./Tooltip";

function useCopyToClipboard(text, timeout = 2000) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [copied, timeout]);
  function handleCopy() {
    const didCopy = copy(text);
    setCopied(didCopy);
  }
  return { copied, handleCopy };
}

function ExampleCode({ pattern, color, colorBg, opacity, size }) {
  const codeRef = useRef(null);
  const htmlString = `
  <div class="pattern-${pattern} pattern-${color} pattern-bg-${colorBg} 
  pattern-size-${size} pattern-opacity-${opacity}"></div>
  `;
  const { copied, handleCopy } = useCopyToClipboard(htmlString);
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  });
  return (
    <>
      <div className="relative">
        <pre>
          <code ref={codeRef} class="language-markup">
            {htmlString}
          </code>
        </pre>
        <button
          className="absolute top-2 right-2 px-2 py-1 bg-white hover:bg-gray-100 duration-200 transition-colors rounded-full text-xs focus:outline-none flex"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <ClipboardCheckIcon className="w-4 h-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4 mr-1" />
              Copy Code
            </>
          )}
        </button>
      </div>
    </>
  );
}

export function Pattern({
  name,
  pattern,
  color,
  colorBg = "white",
  opacity = "40",
  size = "8",
  className,
  onClick,
}) {
  const [dialog, openDialog] = useDialog(
    "code field",
    <ExampleCode
      pattern={pattern}
      color={color}
      colorBg={colorBg}
      size={size}
      opacity={opacity}
    />
  );
  return (
    <div
      className={`group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 transition-all rounded overflow-hidden w-full h-56 bg-white relative ${className}`}
      onClick={onClick}
    >
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 pattern-${pattern} pattern-${color} pattern-bg-${colorBg} pattern-opacity-${opacity} pattern-size-${size}`}
      ></div>
      <Tooltip tooltip="Show me a code example">
        <button
          aria-label="Show code"
          className="absolute z-20 flex items-center top-3 right-3 bg-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 duration-200 transition-opacity focus:outline-none"
          onClick={openDialog}
        >
          <span className="text-white text-xs mx-1">Code</span>
          <CodeIcon className="w-4 h-4 text-white" />
        </button>
      </Tooltip>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-end">
        <h2 className="text-sm bg-gray-700 text-white rounded-full px-2 mb-3">
          {name}
        </h2>
      </div>
      {dialog}
    </div>
  );
}
