import { describe, expect, it } from "vitest";
import { createBoard, placeMove } from "./board";
import { minimax } from "./minimax";

describe("minimax", () => {
  it("finds a winning-evaluation move for the maximizing player", () => {
    const config = { size: 3, winLength: 3 };
    let board = createBoard(config.size);

    board = placeMove(board, { row: 0, column: 0 }, "O", config.size);
    board = placeMove(board, { row: 0, column: 1 }, "O", config.size);
    board = placeMove(board, { row: 1, column: 1 }, "X", config.size);

    const best = minimax({
      board,
      config,
      maximizingPlayer: "O",
      minimizingPlayer: "X",
      depth: 4,
    });

    expect(best.position).not.toBeNull();
    expect(best.score).toBe(10_000);
  });

  it("returns tie score for terminal tied boards", () => {
    const config = { size: 3, winLength: 3 };
    const board = [
      "X",
      "O",
      "X",
      "X",
      "O",
      "O",
      "O",
      "X",
      "X",
    ] as const;

    const best = minimax({
      board: [...board],
      config,
      maximizingPlayer: "O",
      minimizingPlayer: "X",
      depth: 3,
    });

    expect(best.position).toBeNull();
    expect(best.score).toBe(0);
  });

  it("uses heuristic evaluation when depth is zero", () => {
    const config = { size: 3, winLength: 3 };
    let board = createBoard(config.size);

    board = placeMove(board, { row: 1, column: 1 }, "O", config.size);

    const best = minimax({
      board,
      config,
      maximizingPlayer: "O",
      minimizingPlayer: "X",
      depth: 0,
    });

    expect(best.position).toBeNull();
    expect(best.score).toBeGreaterThan(0);
  });
});
