import { useDispatch, useSelector } from 'react-redux';
import { PlayButton, StyledNumber, Wrapper } from './ControlBarStyle';
import { RootState } from 'store';
import { gameSlice } from 'store/modules/game';
import { useInterval } from 'hooks/useInterval';
import { GAME_STATUS } from 'utils/constants';

const ControlBar = () => {
  const dispatch = useDispatch();
  const { startGame, increaseTimer } = gameSlice.actions;
  const { rowSize, colSize, mines, gameStatus, timer, timerStart, flags } =
    useSelector((state: RootState) => state.game);
  const minesLeft = mines - flags;
  const delay = timerStart ? 1000 : null;

  const handleGameStart = () => {
    dispatch(startGame({ rowSize, colSize, mines }));
  };

  const handleButtonText = () => {
    if (gameStatus === GAME_STATUS.READY) return '😶';
    if (gameStatus === GAME_STATUS.RUN) return '😆';
    if (gameStatus === GAME_STATUS.LOSE) return '😭';
    return '🥳';
  };

  // 게임이 시작되면 1초마다 타이머 증가시키는 액션 호출
  useInterval(() => {
    dispatch(increaseTimer());
  }, delay);

  return (
    <Wrapper>
      <StyledNumber>💣 {String(minesLeft).padStart(4, '0')}</StyledNumber>
      <PlayButton onClick={handleGameStart}>{handleButtonText()}</PlayButton>
      <StyledNumber>🕒 {String(timer).padStart(4, '0')}</StyledNumber>
    </Wrapper>
  );
};

export default ControlBar;
