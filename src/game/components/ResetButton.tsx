import { motion } from "framer-motion";

type ResetButtonProps = {
  onReset: () => void;
  disabled?: boolean;
};

export function ResetButton({ onReset, disabled = false }: ResetButtonProps) {
  return (
    <motion.button
      type="button"
      className="reset-button"
      onClick={onReset}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      Play Again
    </motion.button>
  );
}
