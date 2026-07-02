import { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  AI_THINK_TIME,
  ANIMATION_DURATION,
  DEFAULT_BOT_DIFFICULTY,
  DEFAULT_BOARD_CONFIG,
} from "../constants/game";
import { chooseAiMove } from "../logic/ai";
import { createBoard, placeMove } from "../logic/board";
import { getGameResult, getStatusText } from "../logic/turns";
import { COMPUTER_PLAYER, HUMAN_PLAYER } from "../models/Player";
import type { BoardConfig } from "../models/Board";
import type { BotDifficulty } from "../models/BotDifficulty";
import type { GamePhase, GameState } from "../models/GameState";
import type { Position } from "../models/Position";

type Action =
  | { type: "start"; config?: BoardConfig }
  | { type: "changeConfig"; config: BoardConfig }
  | { type: "changeDifficulty"; difficulty: BotDifficulty }
  | { type: "playerMove"; position: Position }
  | { type: "animationDone" }
  | { type: "computerMove"; position: Position | null }
  | { type: "reset" };

const initialState: GameState = {
  board: createBoard(DEFAULT_BOARD_CONFIG.size),
  config: DEFAULT_BOARD_CONFIG,
  difficulty: DEFAULT_BOT_DIFFICULTY,
  phase: "Idle",
  result: null,
  pendingPhase: null,
  resetVersion: 0,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "start": {
      const config = action.config ?? state.config;
      return {
        board: createBoard(config.size),
        config,
        difficulty: state.difficulty,
        phase: "PlayerTurn",
        result: null,
        pendingPhase: null,
        resetVersion: state.resetVersion + 1,
      };
    }

    case "changeConfig":
      return {
        board: createBoard(action.config.size),
        config: action.config,
        difficulty: state.difficulty,
        phase: "PlayerTurn",
        result: null,
        pendingPhase: null,
        resetVersion: state.resetVersion + 1,
      };

    case "changeDifficulty":
      return {
        ...state,
        difficulty: action.difficulty,
      };

    case "playerMove": {
      if (state.phase !== "PlayerTurn") {
        return state;
      }

      const board = placeMove(
        state.board,
        action.position,
        HUMAN_PLAYER,
        state.config.size,
      );

      if (board === state.board) {
        return state;
      }

      return resolveMove(board, state, "ComputerThinking");
    }

    case "animationDone":
      return {
        ...state,
        phase: state.pendingPhase ?? "PlayerTurn",
        pendingPhase: null,
      };

    case "computerMove": {
      if (state.phase !== "ComputerThinking" || action.position === null) {
        return state;
      }

      const board = placeMove(
        state.board,
        action.position,
        COMPUTER_PLAYER,
        state.config.size,
      );
      return resolveMove(board, state, "PlayerTurn");
    }

    case "reset":
      return {
        ...initialState,
        config: state.config,
        difficulty: state.difficulty,
        board: createBoard(state.config.size),
        phase: "PlayerTurn",
        resetVersion: state.resetVersion + 1,
      };
  }
}

function resolveMove(
  board: GameState["board"],
  state: GameState,
  nextPhase: GamePhase,
): GameState {
  const result = getGameResult(board, state.config);

  if (result !== null) {
    return {
      ...state,
      board,
      result,
      phase: "Animating",
      pendingPhase: "GameFinished",
    };
  }

  return {
    ...state,
    board,
    phase: "Animating",
    pendingPhase: nextPhase,
  };
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "start" });
  }, []);

  useEffect(() => {
    if (state.phase !== "Animating") {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch({ type: "animationDone" });
    }, ANIMATION_DURATION);

    return () => window.clearTimeout(timeout);
  }, [state.phase, state.board]);

  useEffect(() => {
    if (state.phase !== "ComputerThinking") {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch({
        type: "computerMove",
        position: chooseAiMove(
          state.board,
          state.config,
          COMPUTER_PLAYER,
          HUMAN_PLAYER,
          state.difficulty,
        ),
      });
    }, AI_THINK_TIME);

    return () => window.clearTimeout(timeout);
  }, [state.board, state.config, state.difficulty, state.phase]);

  const playMove = useCallback((position: Position) => {
    dispatch({ type: "playerMove", position });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const changeBoardConfig = useCallback((config: BoardConfig) => {
    dispatch({ type: "changeConfig", config });
  }, []);

  const changeDifficulty = useCallback((difficulty: BotDifficulty) => {
    dispatch({ type: "changeDifficulty", difficulty });
  }, []);

  const statusText = useMemo(
    () => getStatusText(state.result, state.phase === "ComputerThinking"),
    [state.phase, state.result],
  );
  const isBoardEmpty = useMemo(
    () => state.board.every((cell) => cell === null),
    [state.board],
  );

  return {
    ...state,
    statusText,
    isInputDisabled: state.phase !== "PlayerTurn",
    isBoardEmpty,
    playMove,
    resetGame,
    changeBoardConfig,
    changeDifficulty,
  };
}
