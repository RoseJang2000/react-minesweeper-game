import { createSlice } from '@reduxjs/toolkit';
import { EASY_COL, EASY_ROW, EASY_BOMBS } from 'utils/constants';

export interface GameState {
  // board: CellState[][];
  gameStatus: string;
  rowSize: number;
  colSize: number;
  mines: number;
  flags: number;
  timer: number;
  timerStart: boolean;
}

export interface CellState {
  isOpen: boolean;
  mine: boolean;
  flag: boolean;
  question: boolean;
}

const initialState: GameState = {
  gameStatus: 'ready',
  rowSize: EASY_ROW,
  colSize: EASY_COL,
  mines: EASY_BOMBS,
  flags: 0,
  timer: 0,
  timerStart: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameSetting: (state, action) => {
      const { rowSize, colSize, mines } = action.payload;
      state.rowSize = rowSize;
      state.colSize = colSize;
      state.mines = mines;
    },
  },
});
