import { AnimatePresence, motion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import { BoardPresetSelector } from "./BoardPresetSelector";
import { BotDifficultySelector } from "./BotDifficultySelector";
import { GitHubRepoButton } from "./GitHubRepoButton";
import { useModalEscapeClose } from "../hooks/useModalEscapeClose";
import type { BoardConfig } from "../models/Board";
import type { BotDifficulty } from "../models/BotDifficulty";

type SettingsModalProps = {
  isOpen: boolean;
  selectedConfig: BoardConfig;
  selectedDifficulty: BotDifficulty;
  presets: BoardConfig[];
  onSelectConfig: (config: BoardConfig) => void;
  onSelectDifficulty: (difficulty: BotDifficulty) => void;
  onOpenInstructions: () => void;
  onClose: () => void;
};

export function SettingsModal({
  isOpen,
  selectedConfig,
  selectedDifficulty,
  presets,
  onSelectConfig,
  onSelectDifficulty,
  onOpenInstructions,
  onClose,
}: SettingsModalProps) {
  useModalEscapeClose({ isOpen, onClose });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop settings-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onMouseDown={onClose}
        >
          <motion.section
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="settings-modal__header">
              <div>
                <p className="settings-modal__eyebrow">Game setup</p>
                <h2 id="settings-title">Settings</h2>
              </div>
              <button
                type="button"
                className="modal-close-button"
                aria-label="Close settings"
                onClick={onClose}
              >
                x
              </button>
            </div>

            <div className="settings-modal__content">
              <section className="settings-modal__group">
                <h3>Grid config</h3>
                <BoardPresetSelector
                  presets={presets}
                  selectedConfig={selectedConfig}
                  onSelect={onSelectConfig}
                />
              </section>

              <section className="settings-modal__group">
                <h3>Bot config</h3>
                <BotDifficultySelector
                  selectedDifficulty={selectedDifficulty}
                  onSelect={onSelectDifficulty}
                />
              </section>
            </div>

            <footer className="settings-modal__footer">
              <button
                type="button"
                className="settings-modal__footer-action settings-modal__instructions-button"
                onClick={onOpenInstructions}
              >
                <CircleHelp aria-hidden="true" className="settings-modal__action-icon" />
                <span>How to play</span>
              </button>

              <GitHubRepoButton
                href="https://github.com/vhaueisen/tic-tac-toe"
                className="settings-modal__footer-action"
              />
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}