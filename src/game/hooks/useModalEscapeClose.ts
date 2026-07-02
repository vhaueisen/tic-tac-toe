import { useEffect } from "react";

type UseModalEscapeCloseOptions = {
  isOpen: boolean;
  onClose: () => void;
};

export function useModalEscapeClose({
  isOpen,
  onClose,
}: UseModalEscapeCloseOptions): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
}
