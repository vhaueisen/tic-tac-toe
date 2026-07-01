import { describe, expect, it } from "vitest";
import {
  createBoard,
  getAvailableMoves,
  isMoveValid,
  placeMove,
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
});
