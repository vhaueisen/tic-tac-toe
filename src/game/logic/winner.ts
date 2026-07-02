import { getCell } from "./board";
import type { Board, BoardConfig } from "../models/Board";
import type { Player } from "../models/Player";
import type { Position } from "../models/Position";

type Direction = {
  row: number;
  column: number;
};

export type WinnerResult = {
  winner: Player | null;
  winningPositions: Position[];
};

const DIRECTIONS: Direction[] = [
  { row: 0, column: 1 },
  { row: 1, column: 0 },
  { row: 1, column: 1 },
  { row: 1, column: -1 },
];

export function findWinner(board: Board, config: BoardConfig): WinnerResult {
  for (let row = 0; row < config.size; row += 1) {
    for (let column = 0; column < config.size; column += 1) {
      const start = { row, column };
      const player = getCell(board, start, config.size);

      if (player === null) {
        continue;
      }

      for (const direction of DIRECTIONS) {
        if (!canCollectLine(start, direction, config.winLength, config.size)) {
          continue;
        }

        const line = collectLine(start, direction, config.winLength);

        if (
          line.every(
            (position) => getCell(board, position, config.size) === player,
          )
        ) {
          return { winner: player, winningPositions: line };
        }
      }
    }
  }

  return { winner: null, winningPositions: [] };
}

function canCollectLine(
  start: Position,
  direction: Direction,
  length: number,
  size: number,
): boolean {
  const end = {
    row: start.row + direction.row * (length - 1),
    column: start.column + direction.column * (length - 1),
  };

  return (
    end.row >= 0 &&
    end.row < size &&
    end.column >= 0 &&
    end.column < size
  );
}

function collectLine(
  start: Position,
  direction: Direction,
  length: number,
): Position[] {
  return Array.from({ length }, (_, index) => ({
    row: start.row + direction.row * index,
    column: start.column + direction.column * index,
  }));
}

export function hasPosition(positions: Position[], target: Position): boolean {
  return positions.some(
    (position) =>
      position.row === target.row && position.column === target.column,
  );
}
