import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BotDifficultySelector } from "./BotDifficultySelector";

describe("BotDifficultySelector", () => {
  it("renders the available bot difficulties", () => {
    render(
      <BotDifficultySelector selectedDifficulty="hard" onSelect={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: "Easy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Medium" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hard" })).toBeInTheDocument();
  });

  it("selects a difficulty", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <BotDifficultySelector selectedDifficulty="hard" onSelect={onSelect} />,
    );

    await user.click(screen.getByRole("button", { name: "Easy" }));

    expect(onSelect).toHaveBeenCalledWith("easy");
  });
});
