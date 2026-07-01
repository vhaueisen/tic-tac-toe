import { describe, expect, it } from "vitest";
import { chooseAiMove } from "./ai";
import { createBoard, placeMove } from "./board";

describe("chooseAiMove", () => {
  it("takes an immediate winning move", () => {
    const config = { size: 3, winLength: 3 };
    let board = createBoard(config.size);
    board = placeMove(board, { row: 0, column: 0 }, "O", config.size);
    board = placeMove(board, { row: 0, column: 1 }, "O", config.size);

    expect(chooseAiMove(board, config, "O", "X")).toEqual({
      row: 0,
      column: 2,
    });
  });

  it("blocks an immediate human win", () => {
    const config = { size: 3, winLength: 3 };
    let board = createBoard(config.size);
    board = placeMove(board, { row: 2, column: 0 }, "X", config.size);
    board = placeMove(board, { row: 2, column: 1 }, "X", config.size);

    expect(chooseAiMove(board, config, "O", "X")).toEqual({
      row: 2,
      column: 2,
    });
  });
});
