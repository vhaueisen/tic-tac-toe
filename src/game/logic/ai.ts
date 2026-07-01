import { AI_DEPTH_BY_SIZE } from "../constants/game";
import { getAvailableMoves, placeMove } from "./board";
import { minimax } from "./minimax";
import { getGameResult } from "./turns";
import type { Board, BoardConfig } from "../models/Board";
import type { Player } from "../models/Player";
import type { Position } from "../models/Position";

export function chooseAiMove(
  board: Board,
  config: BoardConfig,
  computer: Player,
  human: Player,
): Position | null {
  const immediateWin = findImmediateMove(board, config, computer);

  if (immediateWin !== null) {
    return immediateWin;
  }

  const block = findImmediateMove(board, config, human);

  if (block !== null) {
    return block;
  }

  const depth = AI_DEPTH_BY_SIZE[config.size] ?? 3;
  const bestMove = minimax({
    board,
    config,
    maximizingPlayer: computer,
    minimizingPlayer: human,
    depth,
  });

  return bestMove.position ?? getAvailableMoves(board, config.size)[0] ?? null;
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
