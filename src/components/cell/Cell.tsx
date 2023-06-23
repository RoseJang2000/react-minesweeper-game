import { useDispatch } from 'react-redux';
import { CellState, gameSlice } from 'store/modules/game';
import { StyledCell } from './CellStyle';

interface CellProps {
  x: number;
  y: number;
  cellData: CellState;
}

const Cell = ({ x, y, cellData }: CellProps) => {
  const dispatch = useDispatch();
  const { changeCellData } = gameSlice.actions;

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(changeCellData({ x, y }));
  };

  return (
    <StyledCell
      onContextMenu={(e) => {
        handleRightClick(e);
      }}
    >
      {cellData.mine
        ? 'x'
        : cellData.flag
        ? '🚩'
        : cellData.question
        ? '?'
        : ''}
    </StyledCell>
  );
};

export default Cell;
