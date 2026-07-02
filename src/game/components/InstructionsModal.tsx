import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BOARD_PRESETS } from "../constants/game";

type InstructionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onMouseDown={onClose}
        >
          <motion.section
            className="instructions-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="instructions-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="instructions-modal__header">
              <div>
                <p className="instructions-modal__eyebrow">How to play</p>
                <h2 id="instructions-title">Instructions</h2>
              </div>
              <button
                type="button"
                className="modal-close-button"
                aria-label="Close instructions"
                onClick={onClose}
              >
                x
              </button>
            </div>

            <div className="instructions-modal__content">
              <section>
                <h3>Goal</h3>
                <p>
                  Place X marks to complete a line before the computer completes
                  one with O marks.
                </p>
              </section>

              <section>
                <h3>Turns</h3>
                <p>
                  You move first. After each move, the computer thinks briefly
                  and then chooses a response.
                </p>
              </section>

              <section>
                <h3>Boards</h3>
                <p>
                  Use 3x3 for classic play, or switch to larger boards for a
                  wider tactical game.
                </p>
                <ul className="instructions-modal__preset-list">
                  {BOARD_PRESETS.map((preset) => (
                    <li key={`${preset.size}-${preset.winLength}`}>
                      <span>
                        {preset.size}x{preset.size}
                      </span>
                      <span>{preset.winLength} in a row to win</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
