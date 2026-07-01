import { motion } from "framer-motion";
import { Board } from "../game/components/Board";
import { BoardPresetSelector } from "../game/components/BoardPresetSelector";
import { GameHUD } from "../game/components/GameHUD";
import { ResetButton } from "../game/components/ResetButton";
import { BOARD_PRESETS, CELL_SIZE } from "../game/constants/game";
import { WinnerBanner } from "../game/components/WinnerBanner";
import { useGame } from "../game/hooks/useGame";
import type { CSSProperties } from "react";

export default function App() {
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
          <BoardPresetSelector
            presets={BOARD_PRESETS}
            selectedConfig={game.config}
            onSelect={game.changeBoardConfig}
          />
          <ResetButton onReset={game.resetGame} />
        </div>

        <Board
          board={game.board}
          size={game.config.size}
          winningPositions={winningPositions}
          disabled={game.isInputDisabled}
          resetVersion={game.resetVersion}
          onPlay={game.playMove}
        />

        <WinnerBanner result={game.result} onReset={game.resetGame} />
      </motion.section>
    </main>
  );
}
