import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WinningLine } from "./WinningLine";

describe("WinningLine", () => {
  it("renders an svg overlay when there is a winning line", () => {
    const { container } = render(
      <div className="board">
        <div className="cell" data-row={0} data-column={0} />
        <div className="cell" data-row={0} data-column={1} />
        <div className="cell" data-row={0} data-column={2} />
        <WinningLine
          positions={[
            { row: 0, column: 0 },
            { row: 0, column: 1 },
            { row: 0, column: 2 },
          ]}
        />
      </div>,
    );

    const svg = container.querySelector(".winning-line");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "100%");
    expect(svg).toHaveAttribute("height", "100%");
  });

  it("computes line endpoints using rendered cell centers", () => {
    const rectSpy = vi
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(function getBoundingClientRectMock() {
        if (this instanceof SVGElement && this.classList.contains("winning-line")) {
          return {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: 300,
            bottom: 300,
            width: 300,
            height: 300,
            toJSON: () => ({}),
          } as DOMRect;
        }

        if (
          this instanceof HTMLElement &&
          this.classList.contains("cell") &&
          this.getAttribute("data-row") === "0" &&
          this.getAttribute("data-column") === "0"
        ) {
          return {
            x: 10,
            y: 20,
            left: 10,
            top: 20,
            right: 90,
            bottom: 100,
            width: 80,
            height: 80,
            toJSON: () => ({}),
          } as DOMRect;
        }

        if (
          this instanceof HTMLElement &&
          this.classList.contains("cell") &&
          this.getAttribute("data-row") === "0" &&
          this.getAttribute("data-column") === "2"
        ) {
          return {
            x: 210,
            y: 20,
            left: 210,
            top: 20,
            right: 290,
            bottom: 100,
            width: 80,
            height: 80,
            toJSON: () => ({}),
          } as DOMRect;
        }

        return {
          x: 0,
          y: 0,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
          toJSON: () => ({}),
        } as DOMRect;
      });

    const { container } = render(
      <div className="board">
        <div className="cell" data-row={0} data-column={0} />
        <div className="cell" data-row={0} data-column={2} />
        <WinningLine
          positions={[
            { row: 0, column: 0 },
            { row: 0, column: 2 },
          ]}
        />
      </div>,
    );

    const line = container.querySelector(".winning-line line");

    expect(line).toBeInTheDocument();
    expect(line).toHaveAttribute("x1", "50");
    expect(line).toHaveAttribute("y1", "60");
    expect(line).toHaveAttribute("x2", "250");
    expect(line).toHaveAttribute("y2", "60");

    rectSpy.mockRestore();
  });
});
