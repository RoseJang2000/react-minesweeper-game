import { createSlice } from '@reduxjs/toolkit';
import { EASY_COL, EASY_ROW, EASY_BOMBS, GAME_STATUS } from 'utils/constants';
import {
  boardSetting,
  getChangedCellData,
  openCellhandler,
} from 'utils/gameControl';

export interface GameState {
  board: CellState[][];
  gameStatus: string;
  rowSize: number;
  colSize: number;
  mines: number;
  flags: number;
  openCells: number;
  timer: number;
  timerStart: boolean;
}

export interface CellState {
  isOpen: boolean;
  mine: boolean;
  flag: boolean;
  question: boolean;
  aroundMines: number | null;
}

const initialState: GameState = {
  board: boardSetting(EASY_ROW, EASY_COL, EASY_BOMBS),
  gameStatus: 'ready',
  rowSize: EASY_ROW,
  colSize: EASY_COL,
  mines: EASY_BOMBS,
  flags: 0,
  openCells: 0,
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
      state.board = boardSetting(rowSize, colSize, mines);
    },
    changeCellData: (state, action) => {
      const { x, y } = action.payload;
      const currentCell = state.board[y][x];

      if (!currentCell.isOpen) {
        const { newCellData, flagCount } = getChangedCellData(currentCell);
        state.board[y][x] = { ...newCellData };
        state.flags += flagCount;
      }
    },
    openCell: (state, action) => {
      const { x, y } = action.payload;
      const cellData = state.board[y][x];
      console.log(state.board[y][x].flag);

      if (cellData.isOpen) {
        return;
      }

      // 첫 셀을 여는 경우 게임 시작, 타이머 작동
      if (state.gameStatus === GAME_STATUS.READY) {
        state.gameStatus = GAME_STATUS.RUN;
        state.timerStart = true;
      }

      // 선택한 셀이 지뢰인 경우 게임 종료
      if (cellData.mine) {
        state.gameStatus = GAME_STATUS.LOSE;
        state.timerStart = false;
        return;
      }

      const { board, openCells } = openCellhandler(state.board, x, y);
      console.log(board);
      state.board = board;
      state.openCells = openCells;

      // 지뢰를 제외한 모든 셀을 연 경우 게임 승리
      if (state.rowSize * state.colSize - state.mines === openCells) {
        state.gameStatus = GAME_STATUS.WIN;
        state.timerStart = false;
      }

      console.log(state.gameStatus);
    },
  },
});
