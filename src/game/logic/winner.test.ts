import { describe, expect, it } from "vitest";
import { createBoard, placeMove } from "./board";
import { findWinner } from "./winner";

describe("findWinner", () => {
  it("detects a 3x3 horizontal winner", () => {
    const config = { size: 3, winLength: 3 };
    let board = createBoard(config.size);
    board = placeMove(board, { row: 0, column: 0 }, "X", config.size);
    board = placeMove(board, { row: 0, column: 1 }, "X", config.size);
    board = placeMove(board, { row: 0, column: 2 }, "X", config.size);

    expect(findWinner(board, config)).toEqual({
      winner: "X",
      winningPositions: [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 0, column: 2 },
      ],
    });
  });

  it("detects a 5x5 diagonal with a four-cell win length", () => {
    const config = { size: 5, winLength: 4 };
    let board = createBoard(config.size);

    for (let offset = 1; offset <= 4; offset += 1) {
      board = placeMove(
        board,
        { row: offset, column: offset },
        "O",
        config.size,
      );
    }

    const result = findWinner(board, config);

    expect(result.winner).toBe("O");
    expect(result.winningPositions).toHaveLength(4);
  });

  it("does not report short lines as winners", () => {
    const config = { size: 4, winLength: 4 };
    let board = createBoard(config.size);
    board = placeMove(board, { row: 2, column: 0 }, "X", config.size);
    board = placeMove(board, { row: 2, column: 1 }, "X", config.size);
    board = placeMove(board, { row: 2, column: 2 }, "X", config.size);

    expect(findWinner(board, config).winner).toBeNull();
  });
});
