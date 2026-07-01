import { motion } from "framer-motion";
import { indexToPosition } from "../logic/board";
import type { CellValue } from "../models/Player";
import type { Position } from "../models/Position";

type CellProps = {
  value: CellValue;
  index: number;
  size: number;
  isWinning: boolean;
  disabled: boolean;
  onPlay: (position: Position) => void;
};

export function Cell({
  value,
  index,
  size,
  isWinning,
  disabled,
  onPlay,
}: CellProps) {
  const position = indexToPosition(index, size);
  const label = `Row ${position.row + 1}, column ${position.column + 1}${
    value === null ? ", empty" : `, ${value}`
  }`;
  const isDisabled = disabled || value !== null;

  return (
    <motion.button
      type="button"
      className="cell"
      data-winning={isWinning}
      aria-label={label}
      disabled={isDisabled}
      onClick={() => onPlay(position)}
      whileHover={isDisabled ? undefined : { scale: 1.03 }}
      whileTap={isDisabled ? undefined : { scale: 0.95 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      {value === "X" && <XMark />}
      {value === "O" && <OMark />}
      {isWinning && <WinningParticles />}
    </motion.button>
  );
}

function XMark() {
  return (
    <motion.svg className="mark" viewBox="0 0 100 100" aria-hidden="true">
      <motion.path
        d="M26 26 L74 74"
        pathLength="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
      />
      <motion.path
        d="M74 26 L26 74"
        pathLength="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, duration: 0.26, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function OMark() {
  return (
    <motion.svg className="mark" viewBox="0 0 100 100" aria-hidden="true">
      <motion.circle
        cx="50"
        cy="50"
        r="28"
        pathLength="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.34, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function WinningParticles() {
  return (
    <span className="particles" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.4, 1, 0.7],
            x: Math.cos(index) * 28,
            y: Math.sin(index) * 28,
          }}
          transition={{
            delay: index * 0.04,
            duration: 0.9,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        />
      ))}
    </span>
  );
}
