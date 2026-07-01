import type { Board, BoardConfig } from "../models/Board";
import type { CellValue, Player } from "../models/Player";
import type { Position } from "../models/Position";

export function createBoard(size: number): Board {
  return Array<CellValue>(size * size).fill(null);
}

export function positionToIndex(position: Position, size: number): number {
  return position.row * size + position.column;
}

export function indexToPosition(index: number, size: number): Position {
  return {
    row: Math.floor(index / size),
    column: index % size,
  };
}

export function isValidPosition(position: Position, size: number): boolean {
  return (
    position.row >= 0 &&
    position.row < size &&
    position.column >= 0 &&
    position.column < size
  );
}

export function getCell(
  board: Board,
  position: Position,
  size: number,
): CellValue {
  if (!isValidPosition(position, size)) {
    return null;
  }

  return board[positionToIndex(position, size)];
}

export function isMoveValid(
  board: Board,
  position: Position,
  size: number,
): boolean {
  return (
    isValidPosition(position, size) && getCell(board, position, size) === null
  );
}

export function placeMove(
  board: Board,
  position: Position,
  player: Player,
  size: number,
): Board {
  if (!isMoveValid(board, position, size)) {
    return board;
  }

  const nextBoard = [...board];
  nextBoard[positionToIndex(position, size)] = player;
  return nextBoard;
}

export function getAvailableMoves(board: Board, size: number): Position[] {
  return board.reduce<Position[]>((moves, cell, index) => {
    if (cell === null) {
      moves.push(indexToPosition(index, size));
    }

    return moves;
  }, []);
}

export function isBoardFull(board: Board): boolean {
  return board.every(Boolean);
}

export function getBoardConfig(config: BoardConfig): BoardConfig {
  return {
    size: config.size,
    winLength: config.winLength,
  };
}
