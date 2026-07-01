import { AnimatePresence, motion } from "framer-motion";
import { COMPUTER_PLAYER, HUMAN_PLAYER } from "../models/Player";
import { ResetButton } from "./ResetButton";
import type { GameResult } from "../models/GameState";

type WinnerBannerProps = {
  result: GameResult | null;
  onReset: () => void;
};

export function WinnerBanner({ result, onReset }: WinnerBannerProps) {
  const message = getResultMessage(result);

  return (
    <AnimatePresence>
      {result !== null && (
        <motion.section
          className="winner-banner"
          data-result={getResultTone(result)}
          role="dialog"
          aria-live="assertive"
          aria-label={message}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        >
          <p>{message}</p>
          <ResetButton onReset={onReset} />
        </motion.section>
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

  return "";
}

function getResultTone(result: GameResult): "win" | "loss" | "tie" {
  if (result.kind === "tie") {
    return "tie";
  }

  return result.winner === HUMAN_PLAYER ? "win" : "loss";
}
