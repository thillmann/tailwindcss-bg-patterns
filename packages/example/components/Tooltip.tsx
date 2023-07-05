import {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import { Transition } from "@headlessui/react";
import { TooltipPopup, useTooltip } from "@reach/tooltip";

const centered = (
  triggerRect?: Partial<DOMRect> | null,
  tooltipRect?: Partial<DOMRect> | null
) => {
  if (!triggerRect || !tooltipRect) {
    return {};
  }
  const triggerCenter = (triggerRect.left ?? 0) + (triggerRect.width ?? 0) / 2;
  const left = triggerCenter - (tooltipRect.width ?? 0) / 2;
  const maxLeft = window.innerWidth - (tooltipRect.width ?? 0) - 2;
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: (triggerRect.bottom ?? 0) + 8 + window.scrollY,
  } as CSSProperties;
};

export function Tooltip({
  children,
  tooltip,
  "aria-label": ariaLabel,
}: PropsWithChildren<{ tooltip: ReactNode; "aria-label"?: string }>) {
  const [triggerProps, tooltipProps, isVisible] = useTooltip();
  const [mounted, setMounted] = useState(isVisible);
  useEffect(() => {
    if (isVisible) {
      setMounted(true);
    }
  }, [isVisible]);
  const handleAnimationLeave = () => setMounted(false);
  return (
    <>
      {isValidElement(children) && cloneElement(children, triggerProps)}
      <TooltipPopup
        {...tooltipProps}
        isVisible={mounted}
        className="absolute z-20"
        label={
          <Transition
            show={isVisible}
            appear
            enter="transition ease-out duration-100"
            enterFrom="transform-gpu opacity-0 scale-95"
            enterTo="transform-gpu opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform-gpu opacity-100 scale-100"
            leaveTo="transform-gpu opacity-0 scale-95"
            className="text-xs bg-gray-900 text-gray-100 rounded-full px-2 py-1 max-w-md shadow-sm"
            afterLeave={handleAnimationLeave}
          >
            {tooltip}
          </Transition>
        }
        aria-label={ariaLabel}
        position={centered}
      />
    </>
  );
}
