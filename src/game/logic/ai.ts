import {
  AI_DEPTH_BY_DIFFICULTY,
  DEFAULT_BOT_DIFFICULTY,
} from "../constants/game";
import { getAvailableMoves, placeMove } from "./board";
import { minimax } from "./minimax";
import { getGameResult } from "./turns";
import type { Board, BoardConfig } from "../models/Board";
import type { BotDifficulty } from "../models/BotDifficulty";
import type { Player } from "../models/Player";
import type { Position } from "../models/Position";

export function chooseAiMove(
  board: Board,
  config: BoardConfig,
  computer: Player,
  human: Player,
  difficulty: BotDifficulty = DEFAULT_BOT_DIFFICULTY,
): Position | null {
  const immediateWin = findImmediateMove(board, config, computer);

  if (immediateWin !== null) {
    return immediateWin;
  }

  if (difficulty === "easy") {
    return chooseCenterBiasedMove(board, config);
  }

  const block = findImmediateMove(board, config, human);

  if (block !== null) {
    return block;
  }

  const depth = AI_DEPTH_BY_DIFFICULTY[difficulty][config.size] ?? 1;
  const bestMove = minimax({
    board,
    config,
    maximizingPlayer: computer,
    minimizingPlayer: human,
    depth,
  });

  return bestMove.position ?? getAvailableMoves(board, config.size)[0] ?? null;
}

function chooseCenterBiasedMove(
  board: Board,
  config: BoardConfig,
): Position | null {
  const availableMoves = getAvailableMoves(board, config.size);
  const center = (config.size - 1) / 2;

  return (
    [...availableMoves].sort((first, second) => {
      const firstDistance =
        Math.abs(first.row - center) + Math.abs(first.column - center);
      const secondDistance =
        Math.abs(second.row - center) + Math.abs(second.column - center);
      return firstDistance - secondDistance;
    })[0] ?? null
  );
}

function findImmediateMove(
  board: Board,
  config: BoardConfig,
  player: Player,
): Position | null {
  for (const position of getAvailableMoves(board, config.size)) {
    const candidate = placeMove(board, position, player, config.size);
    const result = getGameResult(candidate, config);

    if (result?.kind === "win" && result.winner === player) {
      return position;
    }
  }

  return null;
}
