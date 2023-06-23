import Cell from 'components/cell/Cell';
import { CellsWrapper } from './BoardStyle';

const Board = () => {
  const rowSize = 8;
  const colSize = 8;
  const testArr = Array(rowSize * colSize).fill(null);
  return (
    <CellsWrapper rowSize={rowSize} colSize={colSize}>
      {testArr.map((_, i) => (
        <Cell key={i} />
      ))}
    </CellsWrapper>
  );
};

export default Board;
