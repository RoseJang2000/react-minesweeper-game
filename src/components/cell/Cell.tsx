import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { CellState, gameSlice } from 'store/modules/game';
import { GAME_STATUS } from 'utils/constants';
import { StyledCell } from './CellStyle';

interface CellProps {
  x: number;
  y: number;
  cellData: CellState;
}

const Cell = ({ x, y, cellData }: CellProps) => {
  const dispatch = useDispatch();
  const { changeCellData, openCell } = gameSlice.actions;
  const { gameStatus } = useSelector((state: RootState) => state.game);

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(changeCellData({ x, y }));
  };

  const handleLeftClick = (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number,
  ) => {
    e.preventDefault();
    dispatch(openCell({ x, y }));
  };

  const handleCellText = () => {
    if (cellData.isOpen)
      return cellData.aroundMines === 0 ? '' : cellData.aroundMines;
    if (gameStatus === GAME_STATUS.WIN && cellData.mine) return '💣';
    if (gameStatus === GAME_STATUS.LOSE && cellData.mine) return '💥';
    if (cellData.question) return '?';
    if (cellData.flag) return '🚩';
    return;
  };

  const handleCellColor = () => {
    if (cellData.aroundMines) {
      if (cellData.aroundMines >= 3) return 'red';
      if (cellData.aroundMines === 2) return 'orange';
    }
    return 'green';
  };

  return (
    <StyledCell
      className={cellData.isOpen ? 'cell-opened' : ''}
      onClick={(e) => {
        handleLeftClick(e, x, y);
      }}
      onContextMenu={(e) => {
        handleRightClick(e);
      }}
      isOpen={cellData.isOpen}
      textColor={handleCellColor()}
    >
      {handleCellText()}
    </StyledCell>
  );
};

export default Cell;
