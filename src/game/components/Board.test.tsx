import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { createBoard } from "../logic/board";
import { Board } from "./Board";

describe("Board", () => {
  it("renders one button per cell", () => {
    render(
      <Board
        board={createBoard(3)}
        size={3}
        winningPositions={[]}
        disabled={false}
        resetVersion={0}
        onPlay={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(9);
  });

  it("notifies when a cell is clicked", async () => {
    const onPlay = vi.fn();
    const user = userEvent.setup();

    render(
      <Board
        board={createBoard(3)}
        size={3}
        winningPositions={[]}
        disabled={false}
        resetVersion={0}
        onPlay={onPlay}
      />,
    );

    await user.click(screen.getByRole("button", { name: /row 1, column 1/i }));

    expect(onPlay).toHaveBeenCalledWith({ row: 0, column: 0 });
  });
});
