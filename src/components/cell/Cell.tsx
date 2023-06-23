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
  const { changeCellData, openCell } = gameSlice.actions;

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(changeCellData({ x, y }));
  };

  const handleLeftClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(openCell({ x, y }));
  };

  return (
    <StyledCell
      className={cellData.isOpen ? 'cell-opened' : ''}
      onClick={(e) => {
        handleLeftClick(e);
      }}
      onContextMenu={(e) => {
        handleRightClick(e);
      }}
    >
      {cellData.isOpen
        ? cellData.aroundMines
        : cellData.flag
        ? '🚩'
        : cellData.question
        ? '?'
        : ''}
    </StyledCell>
  );
};

export default Cell;
