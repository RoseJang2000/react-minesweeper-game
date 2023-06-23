import Cell from 'components/cell/Cell';
import { useDispatch, useSelector } from 'react-redux';
import { CellsWrapper } from './BoardStyle';
import { RootState } from 'store';

const Board = () => {
  const dispatch = useDispatch();
  const { rowSize, colSize, board } = useSelector(
    (state: RootState) => state.game,
  );
  const sizeArr = Array(rowSize * colSize).fill(null);

  return (
    <CellsWrapper rowSize={rowSize} colSize={colSize}>
      {sizeArr.map((_, idx) => {
        const x = idx % rowSize; // 열
        const y = Math.floor(idx / colSize); // 행
        return <Cell key={idx} x={x} y={y} cellData={board[y][x]} />;
      })}
    </CellsWrapper>
  );
};

export default Board;
