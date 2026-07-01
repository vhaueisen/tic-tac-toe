import type { BoardConfig } from "../models/Board";

type BoardPresetSelectorProps = {
  presets: BoardConfig[];
  selectedConfig: BoardConfig;
  onSelect: (config: BoardConfig) => void;
};

export function BoardPresetSelector({
  presets,
  selectedConfig,
  onSelect,
}: BoardPresetSelectorProps) {
  return (
    <div className="board-preset-selector" aria-label="Board size">
      {presets.map((preset) => {
        const isSelected =
          preset.size === selectedConfig.size &&
          preset.winLength === selectedConfig.winLength;

        return (
          <button
            key={`${preset.size}-${preset.winLength}`}
            type="button"
            className="preset-button"
            aria-pressed={isSelected}
            onClick={() => onSelect(preset)}
          >
            {preset.size}x{preset.size}
          </button>
        );
      })}
    </div>
  );
}
