import type { BoardConfig } from "../models/Board";

export const BOARD_SIZE = 3;
export const WIN_LENGTH = 3;
export const AI_THINK_TIME = 520;
export const ANIMATION_DURATION = 240;
export const CELL_SIZE = 92;

export const BOARD_PRESETS: BoardConfig[] = [
  { size: 3, winLength: 3 },
  { size: 4, winLength: 4 },
  { size: 5, winLength: 4 },
];

export const DEFAULT_BOARD_CONFIG = BOARD_PRESETS[0];

export const AI_DEPTH_BY_SIZE: Record<number, number> = {
  3: 8,
  4: 4,
  5: 3,
};
