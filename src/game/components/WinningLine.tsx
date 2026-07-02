import { motion } from "framer-motion";
import { WINNING_LINE_ANIMATION_DURATION } from "../constants/game";
import type { Position } from "../models/Position";

export type BoardMetrics = {
  width: number;
  height: number;
  gap: number;
};

type WinningLineProps = {
  positions: Position[];
  size: number;
  metrics: BoardMetrics | null;
};

export function WinningLine({ positions, size, metrics }: WinningLineProps) {
  if (positions.length < 2) {
    return null;
  }

  const lineMetrics = getUsableMetrics(metrics);
  const start = getCellCenter(positions[0], size, lineMetrics);
  const end = getCellCenter(positions[positions.length - 1], size, lineMetrics);

  return (
    <motion.svg
      className="winning-line"
      viewBox={`0 0 ${lineMetrics.width} ${lineMetrics.height}`}
      aria-hidden="true"
    >
      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        pathLength="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: WINNING_LINE_ANIMATION_DURATION / 1000, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function getUsableMetrics(metrics: BoardMetrics | null): BoardMetrics {
  if (metrics === null || metrics.width === 0 || metrics.height === 0) {
    return { width: 100, height: 100, gap: 0 };
  }

  return metrics;
}

function getCellCenter(
  position: Position,
  size: number,
  metrics: BoardMetrics,
) {
  const horizontalGapTotal = metrics.gap * (size - 1);
  const verticalGapTotal = metrics.gap * (size - 1);
  const cellWidth = (metrics.width - horizontalGapTotal) / size;
  const cellHeight = (metrics.height - verticalGapTotal) / size;

  return {
    x: position.column * (cellWidth + metrics.gap) + cellWidth / 2,
    y: position.row * (cellHeight + metrics.gap) + cellHeight / 2,
  };
}
