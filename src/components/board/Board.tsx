import Cell from 'components/cell/Cell';
import { useDispatch, useSelector } from 'react-redux';
import { CellsWrapper } from './BoardStyle';
import { RootState } from 'store';
import { gameSlice } from 'store/modules/game';
import { GAME_STATUS } from 'utils/constants';

export type HandleLeftClick = (
  e: React.MouseEvent<HTMLDivElement>,
  x: number,
  y: number,
) => void;

const Board = () => {
  const dispatch = useDispatch();
  const { gameStatus, rowSize, colSize, board } = useSelector(
    (state: RootState) => state.game,
  );
  const { startGame, changeCellData, openCell } = gameSlice.actions;
  const sizeArr = Array(rowSize * colSize).fill(null);

  const handleLeftClick = (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number,
  ) => {
    e.preventDefault();
    if (board[y][x].mine && gameStatus === GAME_STATUS.READY) {
      dispatch(startGame());
      dispatch(openCell({ x, y }));
      return;
    }
    dispatch(openCell({ x, y }));
  };

  return (
    <CellsWrapper rowSize={rowSize} colSize={colSize}>
      {sizeArr.map((_, idx) => {
        const x = idx % rowSize; // 열
        const y = Math.floor(idx / rowSize); // 행
        return (
          <Cell
            key={idx}
            x={x}
            y={y}
            cellData={board[y][x]}
            handleLeftClick={handleLeftClick}
          />
        );
      })}
    </CellsWrapper>
  );
};

export default Board;
