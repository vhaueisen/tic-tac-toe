import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { WINNING_LINE_ANIMATION_DURATION } from "../constants/game";
import type { Position } from "../models/Position";

type WinningLineProps = {
  positions: Position[];
};

type Point = {
  x: number;
  y: number;
};

type LineGeometry = {
  width: number;
  height: number;
  start: Point;
  end: Point;
};

export function WinningLine({ positions }: WinningLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geometry, setGeometry] = useState<LineGeometry | null>(null);

  useLayoutEffect(() => {
    const svgElement = svgRef.current;

    if (svgElement === null || positions.length < 2) {
      setGeometry(null);
      return;
    }

    const boardElement = svgElement.closest(".board");

    if (boardElement === null) {
      setGeometry(null);
      return;
    }

    const startPosition = positions[0];
    const endPosition = positions[positions.length - 1];

    const updateGeometry = () => {
      const startCell = boardElement.querySelector<HTMLElement>(
        `.cell[data-row="${startPosition.row}"][data-column="${startPosition.column}"]`,
      );
      const endCell = boardElement.querySelector<HTMLElement>(
        `.cell[data-row="${endPosition.row}"][data-column="${endPosition.column}"]`,
      );

      if (startCell === null || endCell === null) {
        setGeometry(null);
        return;
      }

      const overlayRect = svgElement.getBoundingClientRect();

      if (overlayRect.width === 0 || overlayRect.height === 0) {
        setGeometry(null);
        return;
      }

      setGeometry({
        width: overlayRect.width,
        height: overlayRect.height,
        start: getCenterPoint(startCell, overlayRect),
        end: getCenterPoint(endCell, overlayRect),
      });
    };

    updateGeometry();

    if (!("ResizeObserver" in window)) {
      return;
    }

    const observer = new ResizeObserver(updateGeometry);
    observer.observe(boardElement);

    return () => observer.disconnect();
  }, [positions]);

  if (positions.length < 2) {
    return null;
  }

  return (
    <motion.svg
      ref={svgRef}
      className="winning-line"
      width="100%"
      height="100%"
      viewBox={`0 0 ${geometry?.width ?? 1} ${geometry?.height ?? 1}`}
      aria-hidden="true"
    >
      {geometry !== null && (
        <motion.line
          x1={geometry.start.x}
          y1={geometry.start.y}
          x2={geometry.end.x}
          y2={geometry.end.y}
          pathLength="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: WINNING_LINE_ANIMATION_DURATION / 1000, ease: "easeOut" }}
        />
      )}
    </motion.svg>
  );
}

function getCenterPoint(cell: HTMLElement, overlayRect: DOMRect): Point {
  const cellRect = cell.getBoundingClientRect();

  return {
    x: cellRect.left - overlayRect.left + cellRect.width / 2,
    y: cellRect.top - overlayRect.top + cellRect.height / 2,
  };
}
