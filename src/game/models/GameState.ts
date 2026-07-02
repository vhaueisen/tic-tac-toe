import type { Board, BoardConfig } from "./Board";
import type { BotDifficulty } from "./BotDifficulty";
import type { Player } from "./Player";
import type { Position } from "./Position";

export type GamePhase =
  "Idle" | "PlayerTurn" | "ComputerThinking" | "Animating" | "GameFinished";

export type GameResult =
  | { kind: "win"; winner: Player; winningPositions: Position[] }
  | { kind: "tie"; winningPositions: [] };

export type GameState = {
  board: Board;
  config: BoardConfig;
  difficulty: BotDifficulty;
  phase: GamePhase;
  result: GameResult | null;
  pendingPhase: GamePhase | null;
  resetVersion: number;
};
