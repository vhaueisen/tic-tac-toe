import { motion } from "framer-motion";

type ResetButtonProps = {
  onReset: () => void;
};

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <motion.button
      type="button"
      className="reset-button"
      onClick={onReset}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
    >
      Play Again
    </motion.button>
  );
}
