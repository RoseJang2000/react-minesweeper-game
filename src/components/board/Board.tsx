import Cell from 'components/cell/Cell';
import { useSelector } from 'react-redux';
import { CellsWrapper } from './BoardStyle';
import { RootState } from 'store';

export type HandleLeftClick = (
  e: React.MouseEvent<HTMLDivElement>,
  x: number,
  y: number,
) => void;

const Board = () => {
  const { rowSize, colSize, board } = useSelector(
    (state: RootState) => state.game,
  );
  const sizeArr = Array(rowSize * colSize).fill(null);

  const blockRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <CellsWrapper
      rowSize={rowSize}
      colSize={colSize}
      onContextMenu={(e) => {
        blockRightClick(e);
      }}
    >
      {sizeArr.map((_, idx) => {
        const x = idx % rowSize; // 열
        const y = Math.floor(idx / rowSize); // 행
        return <Cell key={idx} x={x} y={y} cellData={board[y][x]} />;
      })}
    </CellsWrapper>
  );
};

export default Board;
