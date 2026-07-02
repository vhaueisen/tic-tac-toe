import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { InstructionsModal } from "./InstructionsModal";

describe("InstructionsModal", () => {
  it("renders instructions when open", () => {
    render(<InstructionsModal isOpen onClose={vi.fn()} />);

    expect(
      screen.getByRole("dialog", { name: "Instructions" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/you move first/i)).toBeInTheDocument();
  });

  it("shows the win condition for each board preset", () => {
    render(<InstructionsModal isOpen onClose={vi.fn()} />);

    expect(screen.getByText("3x3")).toBeInTheDocument();
    expect(screen.getByText("3 in a row to win")).toBeInTheDocument();
    expect(screen.getByText("5x5")).toBeInTheDocument();
    expect(screen.getAllByText("4 in a row to win")).toHaveLength(2);
    expect(screen.getByText("7x7")).toBeInTheDocument();
  });

  it("calls onClose from the close button", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(<InstructionsModal isOpen onClose={onClose} />);

    await user.click(
      screen.getByRole("button", { name: /close instructions/i }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
