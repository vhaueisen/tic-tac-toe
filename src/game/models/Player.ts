export const HUMAN_PLAYER = "X";
export const COMPUTER_PLAYER = "O";

export type Player = typeof HUMAN_PLAYER | typeof COMPUTER_PLAYER;
export type CellValue = Player | null;
