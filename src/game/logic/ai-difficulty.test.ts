import { describe, expect, it } from "vitest";
import { chooseAiMove } from "./ai";
import { createBoard, placeMove } from "./board";

describe("chooseAiMove difficulty", () => {
  it("keeps easy mode beatable by not blocking every immediate threat", () => {
    const config = { size: 3, winLength: 3 };
    let board = createBoard(config.size);
    board = placeMove(board, { row: 0, column: 0 }, "X", config.size);
    board = placeMove(board, { row: 0, column: 1 }, "X", config.size);

    expect(chooseAiMove(board, config, "O", "X", "easy")).not.toEqual({
      row: 0,
      column: 2,
    });
  });

  it("blocks immediate threats on medium mode", () => {
    const config = { size: 3, winLength: 3 };
    let board = createBoard(config.size);
    board = placeMove(board, { row: 2, column: 0 }, "X", config.size);
    board = placeMove(board, { row: 2, column: 1 }, "X", config.size);

    expect(chooseAiMove(board, config, "O", "X", "medium")).toEqual({
      row: 2,
      column: 2,
    });
  });
});
