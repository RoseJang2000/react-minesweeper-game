import { useDispatch, useSelector } from 'react-redux';
import { PlayButton, StyledNumber, Wrapper } from './ControlBarStyle';
import { RootState } from 'store';
import { gameSlice } from 'store/modules/game';
import { useEffect } from 'react';
import { useInterval } from 'hooks/useInterval';

const ControlBar = () => {
  const dispatch = useDispatch();
  const { startGame, increaseTimer } = gameSlice.actions;
  const { gameStatus, timer, timerStart, mines, flags } = useSelector(
    (state: RootState) => state.game,
  );
  const minesLeft = mines - flags;
  const delay = timerStart ? 1000 : null;

  const handleGameStart = () => {
    dispatch(startGame());
  };

  // 게임이 시작되면 1초마다 타이머 증가시키는 액션 호출
  useInterval(() => {
    dispatch(increaseTimer());
  }, delay);

  return (
    <Wrapper>
      <StyledNumber>💣 {String(minesLeft).padStart(4, '0')}</StyledNumber>
      <PlayButton onClick={handleGameStart}>😀</PlayButton>
      <StyledNumber>🕒 {String(timer).padStart(4, '0')}</StyledNumber>
    </Wrapper>
  );
};

export default ControlBar;
