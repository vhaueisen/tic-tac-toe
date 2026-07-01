import { isBoardFull } from "./board";
import { findWinner } from "./winner";
import type { Board, BoardConfig } from "../models/Board";
import type { GameResult } from "../models/GameState";

export function getGameResult(
  board: Board,
  config: BoardConfig,
): GameResult | null {
  const winnerResult = findWinner(board, config);

  if (winnerResult.winner !== null) {
    return {
      kind: "win",
      winner: winnerResult.winner,
      winningPositions: winnerResult.winningPositions,
    };
  }

  if (isBoardFull(board)) {
    return { kind: "tie", winningPositions: [] };
  }

  return null;
}

export function getStatusText(
  result: GameResult | null,
  isThinking: boolean,
): string {
  if (result?.kind === "tie") {
    return "A perfect tie";
  }

  if (result?.kind === "win") {
    return result.winner === "X" ? "You won" : "Computer won";
  }

  return isThinking ? "Thinking" : "Your turn";
}
