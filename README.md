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

The AI first checks for immediate wins, then blocks immediate human wins. If neither exists, it uses minimax with alpha-beta pruning and board-size-aware depth limits. This keeps 3x3 play strong while avoiding expensive full-tree searches for 4x4 and 5x5 boards.

## Scalability

The board is represented as a flat immutable array with coordinate helpers. Winner detection accepts a board size and win length, so 3x3, 4x4, and 5x5 rules use the same logic. Defaults are centralized in `src/game/constants/game.ts`.

## Animation Decisions

Framer Motion handles board entry, cell hover/press states, X/O drawing, result banner entry, and local winning particles. CSS handles the winning glow pulse and the reduced-motion fallback.

## AI Prompts Used

The implementation was planned from `game-spec.md`, with explicit focus on clean architecture, configurable NxN rules, pure functions, polished motion, accessibility, and interview-ready developer experience.
