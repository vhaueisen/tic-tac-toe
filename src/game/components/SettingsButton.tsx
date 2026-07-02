import { Settings } from "lucide-react";

type SettingsButtonProps = {
  onOpen: () => void;
};

export function SettingsButton({ onOpen }: SettingsButtonProps) {
  return (
    <button
      type="button"
      className="settings-quick-button"
      aria-label="Open settings"
      onClick={onOpen}
    >
      <Settings aria-hidden="true" />
    </button>
  );
}