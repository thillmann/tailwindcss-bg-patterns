import Prism from "prismjs";
import copy from "copy-to-clipboard";
import { useEffect, useMemo, useState } from "react";
import { CodeIcon } from "./CodeIcon";
import { ClipboardCheckIcon, ClipboardIcon } from "./ClipboardIcon";
import { useDialog } from "./Dialog";
import { Tooltip } from "./Tooltip";

function useCopyToClipboard(text: string, timeout = 2000) {
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

interface ExampleCodeProps {
  pattern: string;
  color: string;
  colorBg: string;
  opacity: string;
  size: string;
}

function ExampleCode({
  pattern,
  color,
  colorBg,
  opacity,
  size,
}: ExampleCodeProps) {
  const htmlString = `<div class="${pattern} ${color} ${colorBg} ${size} ${opacity}"></div>`;
  const { copied, handleCopy } = useCopyToClipboard(htmlString);
  const highlightedHtml = useMemo(
    () => Prism.highlight(htmlString, Prism.languages["markup"], "markup"),
    [htmlString]
  );
  return (
    <>
      <div className="relative">
        <pre className="bg-slate-900 rounded px-6 py-8 whitespace-pre-line">
          <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
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

interface PatternProps {
  name: string;
  pattern: string;
  color: string;
  colorBg?: string;
  opacity: string;
  size: string;
  className?: string;
  onClick?: () => void;
}

export function Pattern({
  name,
  pattern,
  color,
  colorBg = "pattern-bg-white",
  opacity,
  size,
  className,
  onClick,
}: PatternProps) {
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
        className={`absolute top-0 left-0 right-0 bottom-0 ${pattern} ${color} ${opacity} ${size} ${colorBg}`}
      />
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
