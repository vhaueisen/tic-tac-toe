import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { hasPosition } from "../logic/winner";
import { Cell } from "./Cell";
import { WinningLine, type BoardMetrics } from "./WinningLine";
import type { Board as BoardModel } from "../models/Board";
import type { Position } from "../models/Position";

type BoardProps = {
  board: BoardModel;
  size: number;
  winningPositions: Position[];
  disabled: boolean;
  resetVersion: number;
  onPlay: (position: Position) => void;
};

export function Board({
  board,
  size,
  winningPositions,
  disabled,
  resetVersion,
  onPlay,
}: BoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<BoardMetrics | null>(null);

  useLayoutEffect(() => {
    const boardElement = boardRef.current;

    if (boardElement === null) {
      return;
    }

    const updateMetrics = () => {
      const styles = window.getComputedStyle(boardElement);
      const gap = Number.parseFloat(styles.columnGap) || 0;

      setMetrics({
        width: boardElement.clientWidth,
        height: boardElement.clientHeight,
        gap,
      });
    };

    updateMetrics();

    if (!("ResizeObserver" in window)) {
      return;
    }

    const observer = new ResizeObserver(updateMetrics);
    observer.observe(boardElement);

    return () => observer.disconnect();
  }, [size]);

  return (
    <motion.div
      ref={boardRef}
      key={resetVersion}
      className="board"
      role="grid"
      aria-label="Tic tac toe board"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      {board.map((value, index) => {
        const position = {
          row: Math.floor(index / size),
          column: index % size,
        };

        return (
          <Cell
            key={`${index}-${value ?? "empty"}`}
            value={value}
            index={index}
            size={size}
            isWinning={hasPosition(winningPositions, position)}
            disabled={disabled}
            onPlay={onPlay}
          />
        );
      })}
      <WinningLine positions={winningPositions} size={size} metrics={metrics} />
    </motion.div>
  );
}
