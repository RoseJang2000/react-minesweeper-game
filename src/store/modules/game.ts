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

const savedSettings = localStorage.getItem('settings');
const rowSize = savedSettings ? JSON.parse(savedSettings).rowSize : EASY_ROW;
const colSize = savedSettings ? JSON.parse(savedSettings).colSize : EASY_COL;
const mines = savedSettings ? JSON.parse(savedSettings).mines : EASY_BOMBS;

const initialState: GameState = {
  board: boardSetting(rowSize, colSize, mines),
  gameStatus: 'ready',
  rowSize,
  colSize,
  mines,
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
    startGame: (state, action) => {
      const { rowSize, colSize, mines } = action.payload;
      state.rowSize = rowSize;
      state.colSize = colSize;
      state.mines = mines;
      state.board = boardSetting(state.rowSize, state.colSize, state.mines);
      state.gameStatus = GAME_STATUS.READY;
      state.flags = 0;
      state.openCells = 0;
      state.timer = 0;
      state.timerStart = false;
    },
    increaseTimer: (state) => {
      state.timer += 1;
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

      if (
        cellData.isOpen ||
        state.gameStatus === GAME_STATUS.LOSE ||
        state.gameStatus === GAME_STATUS.WIN
      ) {
        return;
      }

      // 첫 셀을 여는 경우 게임 시작, 타이머 작동
      if (state.gameStatus === GAME_STATUS.READY) {
        if (cellData.mine) {
          let checkedBoard: CellState[][] = state.board.slice();

          while (checkedBoard[y][x].mine) {
            checkedBoard = boardSetting(
              state.rowSize,
              state.colSize,
              state.mines,
            );
          }
          state.board = checkedBoard;
          const { board, openCells } = openCellhandler(state.board, x, y);
          state.board = board;
          state.openCells += openCells;
        }
        state.gameStatus = GAME_STATUS.RUN;
        state.timerStart = true;
      } else {
        // 선택한 셀이 지뢰인 경우 게임 종료
        if (cellData.mine) {
          state.gameStatus = GAME_STATUS.LOSE;
          state.timerStart = false;
          state.timer = 0;
          return;
        }

        const { board, openCells } = openCellhandler(state.board, x, y);
        state.board = board;
        state.openCells += openCells;

        // 지뢰를 제외한 모든 셀을 연 경우 게임 승리
        if (state.rowSize * state.colSize - state.mines === state.openCells) {
          state.gameStatus = GAME_STATUS.WIN;
          state.timerStart = false;
          state.timer = 0;
        }
      }
    },
  },
});
