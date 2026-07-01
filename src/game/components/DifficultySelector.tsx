type DifficultySelectorProps = {
  label?: string;
};

export function DifficultySelector({
  label = "Balanced AI",
}: DifficultySelectorProps) {
  return (
    <div className="difficulty" aria-label="Difficulty">
      <span>{label}</span>
    </div>
  );
}
