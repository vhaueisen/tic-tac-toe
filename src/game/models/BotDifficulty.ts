export const BOT_DIFFICULTIES = ["easy", "medium", "hard"] as const;

export type BotDifficulty = (typeof BOT_DIFFICULTIES)[number];
