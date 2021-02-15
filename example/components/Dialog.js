import { useEffect, useState } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Transition } from "@headlessui/react";
import { CloseIcon } from "./CloseIcon";

export function Dialog({
  children,
  "aria-label": ariaLabel,
  isOpen,
  ...props
}) {
  const [mounted, setMounted] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);
  return (
    <DialogOverlay
      className="fixed top-0 left-0 w-full h-full"
      isOpen={mounted}
      {...props}
    >
      <Transition
        show={isOpen}
        appear
        static
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-25 flex justify-center items-center"
        afterLeave={() => setMounted(false)}
      >
        <div className="relative w-full max-w-3xl">
          <button
            className="absolute -top-10 right-0 text-gray-700 focus:outline-none"
            onClick={props.onDismiss}
          >
            <CloseIcon className="w-8 h-8" />
          </button>
          <DialogContent
            aria-label={ariaLabel}
            className="bg-white w-full shadow-lg rounded-lg p-6 outline-none"
          >
            {children}
          </DialogContent>
        </div>
      </Transition>
    </DialogOverlay>
  );
}

export function useDialog(label, content) {
  const [open, setOpen] = useState(false);
  const dialog = (
    <Dialog aria-label={label} isOpen={open} onDismiss={() => setOpen(false)}>
      {content}
    </Dialog>
  );
  return [dialog, () => setOpen(true)];
}
