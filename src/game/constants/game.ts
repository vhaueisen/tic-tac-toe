import type { BoardConfig } from "../models/Board";
import type { BotDifficulty } from "../models/BotDifficulty";

export const BOARD_SIZE = 3;
export const WIN_LENGTH = 3;
export const AI_THINK_TIME = 520;
export const ANIMATION_DURATION = 240;
export const WINNING_LINE_ANIMATION_DURATION = 420;
export const CELL_SIZE = 92;

export const BOARD_PRESETS: BoardConfig[] = [
  { size: 3, winLength: 3 },
  { size: 5, winLength: 4 },
  { size: 7, winLength: 4 },
];

export const DEFAULT_BOARD_CONFIG = BOARD_PRESETS[0];
export const DEFAULT_BOT_DIFFICULTY: BotDifficulty = "hard";

export const AI_DEPTH_BY_DIFFICULTY: Record<
  Extract<BotDifficulty, "hard">,
  Record<number, number>
> = {
  hard: {
    3: 8,
    5: 3,
    7: 2,
  },
};
