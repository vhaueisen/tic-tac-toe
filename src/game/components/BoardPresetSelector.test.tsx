import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BOARD_PRESETS } from "../constants/game";
import { BoardPresetSelector } from "./BoardPresetSelector";

describe("BoardPresetSelector", () => {
    it("renders the available board presets", () => {
        render(
            <BoardPresetSelector
                presets={BOARD_PRESETS}
                selectedConfig={BOARD_PRESETS[0]}
                onSelect={vi.fn()}
            />,
        );

        expect(screen.getByRole("button", { name: "3x3" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "5x5" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "7x7" })).toBeInTheDocument();
    });

    it("selects a board preset", async () => {
        const onSelect = vi.fn();
        const user = userEvent.setup();

        render(
            <BoardPresetSelector
                presets={BOARD_PRESETS}
                selectedConfig={BOARD_PRESETS[0]}
                onSelect={onSelect}
            />,
        );

        await user.click(screen.getByRole("button", { name: "7x7" }));

        expect(onSelect).toHaveBeenCalledWith({ size: 7, winLength: 4 });
    });
});
