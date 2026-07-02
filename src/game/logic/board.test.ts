import { describe, expect, it } from "vitest";
import {
  createBoard,
  getAvailableMoves,
  getCell,
  indexToPosition,
  isMoveValid,
  isValidPosition,
  placeMove,
  positionToIndex,
} from "./board";

describe("board logic", () => {
  it("creates an empty NxN board", () => {
    expect(createBoard(4)).toHaveLength(16);
    expect(createBoard(4).every((cell) => cell === null)).toBe(true);
  });

  it("places moves immutably", () => {
    const board = createBoard(3);
    const nextBoard = placeMove(board, { row: 1, column: 1 }, "X", 3);

    expect(board).not.toBe(nextBoard);
    expect(board[4]).toBeNull();
    expect(nextBoard[4]).toBe("X");
  });

  it("rejects occupied moves", () => {
    const board = placeMove(createBoard(3), { row: 0, column: 0 }, "O", 3);

    expect(isMoveValid(board, { row: 0, column: 0 }, 3)).toBe(false);
    expect(getAvailableMoves(board, 3)).toHaveLength(8);
  });

  it("returns null for out-of-bounds cells", () => {
    const board = createBoard(3);

    expect(getCell(board, { row: -1, column: 0 }, 3)).toBeNull();
    expect(getCell(board, { row: 0, column: 3 }, 3)).toBeNull();
  });

  it("maps positions to indexes and back on board boundaries", () => {
    const size = 5;
    const position = { row: size - 1, column: size - 1 };

    const index = positionToIndex(position, size);

    expect(index).toBe(size * size - 1);
    expect(indexToPosition(index, size)).toEqual(position);
    expect(isValidPosition(position, size)).toBe(true);
    expect(isValidPosition({ row: size, column: 0 }, size)).toBe(false);
  });
});
