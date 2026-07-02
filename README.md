# Tic Tac Toe Interview App

A premium-feeling single-player Tic Tac Toe game built with React, TypeScript, Vite, Vitest, React Testing Library, and Framer Motion.

## Installation

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```

## Deploy to GitHub Pages

This app deploys for free with GitHub Pages using the workflow in `.github/workflows/deploy.yml`.

1. Push this repository to GitHub.
2. In the GitHub repository, open **Settings > Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to the `main` branch, or run the **Deploy to GitHub Pages** workflow manually from the **Actions** tab.

The workflow builds the app with the correct Vite base path for the repository name and publishes the `dist` folder.

## Useful Scripts

```bash
npm run lint
npm run format
npm run build
```

## Architecture

The game is split into a pure domain layer and a render layer. React components mostly render state and delegate actions. Game rules, AI, winner detection, and board manipulation live outside React so they are easy to test and scale.

```text
src/
  app/App.tsx
  game/
    components/
    hooks/useGame.ts
    logic/
    models/
    constants/game.ts
```

## AI

The AI supports Easy, Medium, and Hard modes. Easy stays intentionally beatable by taking immediate wins but skipping some defensive blocks. Medium takes immediate wins, blocks one-move losses, and plays positionally without fork planning. Hard uses the deepest board-size-aware minimax search with alpha-beta pruning. This keeps 3x3 play strong while avoiding expensive full-tree searches for 5x5 and 7x7 boards.

## Scalability

The board is represented as a flat immutable array with coordinate helpers. Winner detection accepts a board size and win length, so 3x3, 5x5, and 7x7 presets use the same logic. Defaults are centralized in `src/game/constants/game.ts` and can be switched from the page.

## Animation Decisions

Framer Motion handles board entry, cell hover/press states, X/O drawing, result banner entry, and local winning particles. CSS handles the winning glow pulse and the reduced-motion fallback.

## AI Prompts Used

The implementation was planned from `game-spec.md`, with explicit focus on clean architecture, configurable NxN rules, pure functions, polished motion, accessibility, and interview-ready developer experience.
