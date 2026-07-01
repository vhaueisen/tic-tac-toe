import type { CellValue } from "./Player";

export type Board = CellValue[];

export type BoardConfig = {
  size: number;
  winLength: number;
};
