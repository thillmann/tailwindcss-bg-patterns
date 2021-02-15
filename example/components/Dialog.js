import { useState } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { CloseIcon } from "./CloseIcon";

export function Dialog({ children, "aria-label": ariaLabel, ...props }) {
  return (
    <DialogOverlay
      className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-25 flex justify-center items-center"
      {...props}
    >
      <div className="relative w-full max-w-3xl">
        <button className="absolute -top-10 right-0 text-gray-700 focus:outline-none" onClick={props.onDismiss}>
          <CloseIcon className="w-8 h-8" />
        </button>
        <DialogContent
          aria-label={ariaLabel}
          className="bg-white w-full shadow-lg rounded-lg p-6 outline-none"
        >
          {children}
        </DialogContent>
      </div>
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
