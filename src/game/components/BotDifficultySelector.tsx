import { BOT_DIFFICULTIES, type BotDifficulty } from "../models/BotDifficulty";

type BotDifficultySelectorProps = {
  selectedDifficulty: BotDifficulty;
  onSelect: (difficulty: BotDifficulty) => void;
};

export function BotDifficultySelector({
  selectedDifficulty,
  onSelect,
}: BotDifficultySelectorProps) {
  return (
    <div className="bot-difficulty-selector" aria-label="Bot difficulty">
      {BOT_DIFFICULTIES.map((difficulty) => {
        const isSelected = difficulty === selectedDifficulty;

        return (
          <button
            key={difficulty}
            type="button"
            className="preset-button"
            aria-pressed={isSelected}
            onClick={() => onSelect(difficulty)}
          >
            {formatDifficulty(difficulty)}
          </button>
        );
      })}
    </div>
  );
}

function formatDifficulty(difficulty: BotDifficulty): string {
  return difficulty[0].toUpperCase() + difficulty.slice(1);
}
