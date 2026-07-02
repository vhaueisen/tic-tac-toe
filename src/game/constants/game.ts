import type { BoardConfig } from "../models/Board";
import type { BotDifficulty } from "../models/BotDifficulty";

export const BOARD_SIZE = 3;
export const WIN_LENGTH = 3;
export const AI_THINK_TIME = 520;
export const ANIMATION_DURATION = 240;
export const WINNING_LINE_ANIMATION_DURATION = 420;
export const CELL_SIZE = 92;

type BoardLayout = {
  cellSize: number;
  gap: number;
  padding: number;
};

const BOARD_LAYOUT_BY_SIZE: Record<number, BoardLayout> = {
  3: { cellSize: 92, gap: 12, padding: 12 },
  5: { cellSize: 88, gap: 9, padding: 10 },
  7: { cellSize: 86, gap: 7, padding: 8 },
};

export const BOARD_PRESETS: BoardConfig[] = [
  { size: 3, winLength: 3 },
  { size: 5, winLength: 4 },
  { size: 7, winLength: 4 },
];

export const DEFAULT_BOARD_CONFIG = BOARD_PRESETS[0];
export const DEFAULT_BOT_DIFFICULTY: BotDifficulty = "hard";

export function getBoardLayout(size: number): BoardLayout {
  return (
    BOARD_LAYOUT_BY_SIZE[size] ?? {
      cellSize: CELL_SIZE,
      gap: 10,
      padding: 10,
    }
  );
}

export function getBoardPixelWidth(size: number): number {
  const layout = getBoardLayout(size);
  return size * layout.cellSize + (size - 1) * layout.gap + layout.padding * 2;
}

export const AI_DEPTH_BY_DIFFICULTY: Record<"hard", Record<number, number>> = {
  hard: {
    3: 8,
    5: 3,
    7: 2,
  },
};
