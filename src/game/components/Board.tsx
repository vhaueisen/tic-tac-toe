import { useRef } from "react";
import { motion } from "framer-motion";
import { getBoardLayout, getBoardPixelWidth } from "../constants/game";
import { hasPosition } from "../logic/winner";
import { Cell } from "./Cell";
import { WinningLine } from "./WinningLine";
import type { Board as BoardModel } from "../models/Board";
import type { Position } from "../models/Position";
import type { CSSProperties } from "react";

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
  const boardLayout = getBoardLayout(size);
  const boardWidth = getBoardPixelWidth(size);
  const boardStyle = {
    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
    width: `min(100%, ${boardWidth}px)`,
    "--board-gap": `${boardLayout.gap}px`,
    "--board-padding": `${boardLayout.padding}px`,
  } as CSSProperties;

  return (
    <motion.div
      ref={boardRef}
      key={resetVersion}
      className="board"
      role="grid"
      aria-label="Tic tac toe board"
      style={boardStyle}
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
      <WinningLine positions={winningPositions} />
    </motion.div>
  );
}
