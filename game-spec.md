# Tic Tac Toe Game Spec

## Goal
Build a premium-feeling single-player Tic Tac Toe game in React.

The implementation should resemble a production application rather than a coding challenge.

Primary goals:

* Clean architecture
* Great UX
* Smooth animations
* Easily scalable board size (NxN)
* Maintainable code
* Excellent developer experience

---

# Tech Stack
* React
* TypeScript
* Vite
* ESLint
* Prettier
* Vitest
* React Testing Library
* Framer Motion (animations)

---

# Architecture

```
src/

app/
    App.tsx

game/

    components/
        Board
        Cell
        GameHUD
        WinnerBanner
        ResetButton
        DifficultySelector

    hooks/
        useGame

    logic/
        board.ts
        winner.ts
        minimax.ts
        ai.ts
        turns.ts

    models/
        Board.ts
        Player.ts
        Position.ts
        GameState.ts

    constants/
        game.ts

    utils/

shared/
```

Game logic should never exist inside React components.

Components should mostly render.

---

# Game Rules

Support

```
Board Size

3x3
4x4
5x5

```

Even if UI only exposes 3x3 initially.

Winning length should be configurable.

Example

```
3x3 -> 3 in row

5x5 -> 4 in row

```

Not hardcoded.

---

# Configuration

Everything configurable from one place.

```
BOARD_SIZE

WIN_LENGTH

AI_THINK_TIME

ANIMATION_DURATION

CELL_SIZE

```

---

# State

```
Idle

PlayerTurn

ComputerThinking

Animating

GameFinished
```

---

# AI

Use heuristic evaluation.

---

# UX Flow

Launch

↓

Fade in board

↓

Player taps cell

↓

Cell animation

↓

Short thinking delay

↓

AI move animation

↓

Game ends

↓

Winning line animation

↓

Result popup

↓

Play Again

---

# Animations

## Board

Board fades upward on startup.

---

## Hover

Cells slightly scale.

```
1.0

↓

1.03

```

---

## Press

Quick squash

```
scale

1

↓

0.95

↓

1

```

---

## X Placement

Draw animation.

Like writing the X.

---

## O Placement

Circle stroke draws progressively.

---

## Winning Cells

Glow

*

Pulse

*

Small particles/confetti

---

## AI Turn

HUD shows

```
Thinking...

```

Maybe animated dots

```
Thinking.

Thinking..

Thinking...

```

---

## Reset

Board dissolves

then

new board fades in.

---

# Polish

Responsive layout

Keyboard navigation

Accessible labels

Mobile friendly

No layout shift

No flashing

---

# UI

Very clean.

Centered board.

```
----------------------

 Tic Tac Toe

 Your Turn

+---+---+---+

|   |   |   |

+---+---+---+

|   |   |   |

+---+---+---+

|   |   |   |

+---+---+---+

Play Again

----------------------

```

Don't over-design.

Apple-ish.

---

# Colors

Minimal palette.

Background

Off white

Cells

Pure white

Primary

Blue

Lose

Red

Win

Green

Tie

Orange

---

# Tests

Unit

Winner detection

NxN winner detection

Tie detection

Move validation

AI move selection

Minimax

Component

Board renders

Cell click

Game reset

Winner popup

---

# Code Quality

No duplicated logic.

Pure functions whenever possible.

Components

<150 lines.

Functions

<40 lines where possible.

Meaningful naming.

No comments explaining *what*.

Only explain *why*.

---

# README

Include

Installation

```
npm install

npm run dev

```

Run tests

```
npm test

```

Architecture explanation

Folder structure

AI explanation

Scalability notes

Animation decisions

AI prompts used

---

# Git

Multiple commits.

Instead of one huge commit.

Example

```
Initialize project

Create board model

Implement winner detection

Implement game hook

Add minimax AI

Refactor constants

Add animations

Improve accessibility

Write tests

Update README
```