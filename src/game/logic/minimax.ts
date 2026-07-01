import { getAvailableMoves, placeMove } from "./board";
import { getGameResult } from "./turns";
import type { Board, BoardConfig } from "../models/Board";
import type { Player } from "../models/Player";
import type { Position } from "../models/Position";

type MinimaxOptions = {
  board: Board;
  config: BoardConfig;
  maximizingPlayer: Player;
  minimizingPlayer: Player;
  depth: number;
  alpha?: number;
  beta?: number;
};

export type ScoredMove = {
  position: Position | null;
  score: number;
};

export function minimax(options: MinimaxOptions): ScoredMove {
  const alpha = options.alpha ?? Number.NEGATIVE_INFINITY;
  const beta = options.beta ?? Number.POSITIVE_INFINITY;
  return search(options, true, alpha, beta);
}

function search(
  options: MinimaxOptions,
  isMaximizingTurn: boolean,
  alpha: number,
  beta: number,
): ScoredMove {
  const result = getGameResult(options.board, options.config);

  if (result !== null || options.depth === 0) {
    return {
      position: null,
      score: scoreBoard(
        options.board,
        options.config,
        options.maximizingPlayer,
        result,
      ),
    };
  }

  const player = isMaximizingTurn
    ? options.maximizingPlayer
    : options.minimizingPlayer;
  let bestMove: ScoredMove = {
    position: null,
    score: isMaximizingTurn
      ? Number.NEGATIVE_INFINITY
      : Number.POSITIVE_INFINITY,
  };

  for (const position of orderMoves(
    getAvailableMoves(options.board, options.config.size),
    options.config,
  )) {
    const board = placeMove(
      options.board,
      position,
      player,
      options.config.size,
    );
    const candidate = search(
      { ...options, board, depth: options.depth - 1 },
      !isMaximizingTurn,
      alpha,
      beta,
    );

    if (isMaximizingTurn && candidate.score > bestMove.score) {
      bestMove = { position, score: candidate.score };
      alpha = Math.max(alpha, candidate.score);
    }

    if (!isMaximizingTurn && candidate.score < bestMove.score) {
      bestMove = { position, score: candidate.score };
      beta = Math.min(beta, candidate.score);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return bestMove;
}

function scoreBoard(
  board: Board,
  config: BoardConfig,
  maximizingPlayer: Player,
  result: ReturnType<typeof getGameResult>,
): number {
  if (result?.kind === "win") {
    return result.winner === maximizingPlayer ? 10_000 : -10_000;
  }

  if (result?.kind === "tie") {
    return 0;
  }

  return evaluateLines(board, config, maximizingPlayer);
}

function evaluateLines(
  board: Board,
  config: BoardConfig,
  player: Player,
): number {
  const opponent = player === "X" ? "O" : "X";
  let score = 0;

  for (const line of collectCandidateLines(config)) {
    const values = line.map((index) => board[index]);
    const playerCount = values.filter((value) => value === player).length;
    const opponentCount = values.filter((value) => value === opponent).length;

    if (playerCount > 0 && opponentCount === 0) {
      score += 3 ** playerCount;
    }

    if (opponentCount > 0 && playerCount === 0) {
      score -= 4 ** opponentCount;
    }
  }

  return score;
}

function collectCandidateLines(config: BoardConfig): number[][] {
  const lines: number[][] = [];
  const directions = [
    { row: 0, column: 1 },
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: -1 },
  ];

  for (let row = 0; row < config.size; row += 1) {
    for (let column = 0; column < config.size; column += 1) {
      for (const direction of directions) {
        const line = Array.from({ length: config.winLength }, (_, step) => ({
          row: row + direction.row * step,
          column: column + direction.column * step,
        }));

        if (
          line.every(
            (position) =>
              position.row >= 0 &&
              position.row < config.size &&
              position.column >= 0 &&
              position.column < config.size,
          )
        ) {
          lines.push(
            line.map(
              (position) => position.row * config.size + position.column,
            ),
          );
        }
      }
    }
  }

  return lines;
}

function orderMoves(moves: Position[], config: BoardConfig): Position[] {
  const center = (config.size - 1) / 2;

  return [...moves].sort((first, second) => {
    const firstDistance =
      Math.abs(first.row - center) + Math.abs(first.column - center);
    const secondDistance =
      Math.abs(second.row - center) + Math.abs(second.column - center);
    return firstDistance - secondDistance;
  });
}
