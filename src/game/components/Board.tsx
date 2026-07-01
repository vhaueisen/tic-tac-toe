import { motion } from "framer-motion";
import { hasPosition } from "../logic/winner";
import { Cell } from "./Cell";
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
  return (
    <motion.div
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
    </motion.div>
  );
}
