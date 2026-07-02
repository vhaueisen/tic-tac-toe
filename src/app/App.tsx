import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Board } from "../game/components/Board";
import { GameHUD } from "../game/components/GameHUD";
import { InstructionsModal } from "../game/components/InstructionsModal";
import { ResetButton } from "../game/components/ResetButton";
import { SettingsButton } from "../game/components/SettingsButton";
import { SettingsModal } from "../game/components/SettingsModal";
import { ThemeToggle } from "../game/components/ThemeToggle";
import {
  BOARD_PRESETS,
  getBoardPixelWidth,
  WINNING_LINE_ANIMATION_DURATION,
} from "../game/constants/game";
import { WinnerModal } from "../game/components/WinnerModal";
import { useGame } from "../game/hooks/useGame";
import type { CSSProperties } from "react";

export default function App() {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const game = useGame();
  const winningPositions = game.result?.winningPositions ?? [];
  const boardLayoutWidth = getBoardPixelWidth(game.config.size);
  const layoutStyle = {
    "--board-layout-width": `${boardLayoutWidth}px`,
  } as CSSProperties;

  const winnerModalDelayMs = useMemo(() => {
    if (
      game.result?.kind === "win" &&
      game.result.winningPositions.length >= 2
    ) {
      return WINNING_LINE_ANIMATION_DURATION;
    }

    return 0;
  }, [game.result]);

  return (
    <main className="app-shell">
      <div className="top-right-controls">
        <ThemeToggle />
        <SettingsButton onOpen={() => setIsSettingsOpen(true)} />
      </div>
      <motion.section
        className="game-surface"
        style={layoutStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28 }}
      >
        <GameHUD
          title="Tic Tac Toe"
          status={game.statusText}
          isThinking={game.phase === "ComputerThinking"}
        />

        <motion.div
          className="game-hint"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <motion.p
            className="game-hint__text"
            animate={{ opacity: game.isBoardEmpty ? 1 : 0, y: game.isBoardEmpty ? 0 : -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-hidden={!game.isBoardEmpty}
          >
            Click a cell to start playing!
          </motion.p>

          <motion.div
            className="game-hint__action"
            animate={{ opacity: game.isBoardEmpty ? 0 : 1, y: game.isBoardEmpty ? 4 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ pointerEvents: game.isBoardEmpty ? "none" : "auto" }}
          >
            <ResetButton onReset={game.resetGame} disabled={game.isBoardEmpty} />
          </motion.div>
        </motion.div>

        <Board
          board={game.board}
          size={game.config.size}
          winningPositions={winningPositions}
          disabled={game.isInputDisabled}
          resetVersion={game.resetVersion}
          onPlay={game.playMove}
        />
      </motion.section>
      <WinnerModal
        result={game.result}
        onReset={game.resetGame}
        enterDelayMs={winnerModalDelayMs}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        selectedConfig={game.config}
        selectedDifficulty={game.difficulty}
        presets={BOARD_PRESETS}
        onSelectConfig={game.changeBoardConfig}
        onSelectDifficulty={game.changeDifficulty}
        onOpenInstructions={() => {
          setIsSettingsOpen(false);
          setIsInstructionsOpen(true);
        }}
        onClose={() => setIsSettingsOpen(false)}
      />
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
    </main>
  );
}
