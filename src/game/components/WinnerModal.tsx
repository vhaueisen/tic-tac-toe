import { AnimatePresence, motion } from "framer-motion";
import { COMPUTER_PLAYER, HUMAN_PLAYER } from "../models/Player";
import { ResetButton } from "./ResetButton";
import type { GameResult } from "../models/GameState";

type WinnerModalProps = {
  result: GameResult | null;
  onReset: () => void;
};

export function WinnerModal({ result, onReset }: WinnerModalProps) {
  const message = getResultMessage(result);

  return (
    <AnimatePresence>
      {result !== null && (
        <motion.div
          className="modal-backdrop result-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.section
            className="winner-modal"
            data-result={getResultTone(result)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="winner-modal-title"
            aria-live="assertive"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <p className="winner-modal__eyebrow">Game finished</p>
            <h2 id="winner-modal-title">{message}</h2>
            <ResetButton onReset={onReset} />
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getResultMessage(result: GameResult | null): string {
  if (result?.kind === "tie") {
    return "Tie game";
  }

  if (result?.kind === "win" && result.winner === HUMAN_PLAYER) {
    return "You won";
  }

  if (result?.kind === "win" && result.winner === COMPUTER_PLAYER) {
    return "Computer won";
  }

  return "Game finished";
}

function getResultTone(result: GameResult): "win" | "loss" | "tie" {
  if (result.kind === "tie") {
    return "tie";
  }

  return result.winner === HUMAN_PLAYER ? "win" : "loss";
}
