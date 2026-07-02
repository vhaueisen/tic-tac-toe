import { useState } from "react";
import { motion } from "framer-motion";
import { Board } from "../game/components/Board";
import { BoardPresetSelector } from "../game/components/BoardPresetSelector";
import { BotDifficultySelector } from "../game/components/BotDifficultySelector";
import { GameHUD } from "../game/components/GameHUD";
import { GitHubRepoButton } from "../game/components/GitHubRepoButton";
import { InstructionsModal } from "../game/components/InstructionsModal";
import { ResetButton } from "../game/components/ResetButton";
import { BOARD_PRESETS, CELL_SIZE } from "../game/constants/game";
import { WinnerModal } from "../game/components/WinnerModal";
import { useGame } from "../game/hooks/useGame";
import type { CSSProperties } from "react";

export default function App() {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const game = useGame();
  const winningPositions = game.result?.winningPositions ?? [];
  const boardLayoutWidth =
    game.config.size * CELL_SIZE + (game.config.size - 1) * 12;
  const layoutStyle = {
    "--board-layout-width": `${boardLayoutWidth}px`,
  } as CSSProperties;

  return (
    <main className="app-shell">
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

        <div className="toolbar">
          <div className="toolbar-controls">
            <BoardPresetSelector
              presets={BOARD_PRESETS}
              selectedConfig={game.config}
              onSelect={game.changeBoardConfig}
            />
            <BotDifficultySelector
              selectedDifficulty={game.difficulty}
              onSelect={game.changeDifficulty}
            />
          </div>
          <div className="toolbar-actions">
            <button
              type="button"
              className="secondary-action-button"
              onClick={() => setIsInstructionsOpen(true)}
            >
              Instructions
            </button>
            <GitHubRepoButton href="https://github.com/vhaueisen/tic-tac-toe" />
            <ResetButton onReset={game.resetGame} />
          </div>
        </div>

        <Board
          board={game.board}
          size={game.config.size}
          winningPositions={winningPositions}
          disabled={game.isInputDisabled}
          resetVersion={game.resetVersion}
          onPlay={game.playMove}
        />
      </motion.section>
      <WinnerModal result={game.result} onReset={game.resetGame} />
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
    </main>
  );
}
