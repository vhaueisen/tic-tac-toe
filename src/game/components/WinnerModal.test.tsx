import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WinnerModal } from "./WinnerModal";

describe("WinnerModal", () => {
  it("renders the winning result as a modal", () => {
    render(
      <WinnerModal
        result={{
          kind: "win",
          winner: "X",
          winningPositions: [
            { row: 0, column: 0 },
            { row: 0, column: 1 },
            { row: 0, column: 2 },
          ],
        }}
        onReset={vi.fn()}
      />,
    );

    expect(screen.getByRole("dialog", { name: "You won" })).toBeInTheDocument();
  });

  it("calls onReset from the play again button", async () => {
    const onReset = vi.fn();
    const user = userEvent.setup();

    render(
      <WinnerModal
        result={{ kind: "tie", winningPositions: [] }}
        onReset={onReset}
      />,
    );

    await user.click(screen.getByRole("button", { name: /play again/i }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
