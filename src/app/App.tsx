import { motion } from "framer-motion";
import { Board } from "../game/components/Board";
import { DifficultySelector } from "../game/components/DifficultySelector";
import { GameHUD } from "../game/components/GameHUD";
import { ResetButton } from "../game/components/ResetButton";
import { WinnerBanner } from "../game/components/WinnerBanner";
import { useGame } from "../game/hooks/useGame";

export default function App() {
  const game = useGame();
  const winningPositions = game.result?.winningPositions ?? [];

  return (
    <main className="app-shell">
      <motion.section
        className="game-surface"
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
          <DifficultySelector />
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
