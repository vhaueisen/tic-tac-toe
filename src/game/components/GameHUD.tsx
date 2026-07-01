import { motion } from "framer-motion";

type GameHUDProps = {
  title: string;
  status: string;
  isThinking: boolean;
};

export function GameHUD({ title, status, isThinking }: GameHUDProps) {
  return (
    <header className="game-hud">
      <p className="eyebrow">Single player</p>
      <h1>{title}</h1>
      <p className="status" aria-live="polite">
        {status}
        {isThinking && (
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        )}
      </p>
    </header>
  );
}
