import Layout from 'components/layout/Layout';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameSlice } from 'store/modules/game';
import {
  EASY_BOMBS,
  EASY_COL,
  EASY_ROW,
  HARD_BOMBS,
  HARD_COL,
  HARD_ROW,
  NORMAL_BOMBS,
  NORMAL_COL,
  NORMAL_ROW,
} from 'utils/constants';
import { SettingsWrapper, StyledButton } from './SettingsStyle';

interface DifficultyDetails {
  easy: Detail;
  normal: Detail;
  hard: Detail;
}

interface Detail {
  rowSize: number;
  colSize: number;
  mines: number;
}

const Settings = () => {
  const dispatch = useDispatch();
  const { gameSetting } = gameSlice.actions;
  const difficultyArr: string[] = ['easy', 'normal', 'hard', 'custom'];
  const difficultyDetails: DifficultyDetails = {
    easy: {
      rowSize: EASY_ROW,
      colSize: EASY_COL,
      mines: EASY_BOMBS,
    },
    normal: {
      rowSize: NORMAL_ROW,
      colSize: NORMAL_COL,
      mines: NORMAL_BOMBS,
    },
    hard: {
      rowSize: HARD_ROW,
      colSize: HARD_COL,
      mines: HARD_BOMBS,
    },
  };
  const [currentDifficulty, setCurrentDifficulty] = useState<string>(
    difficultyArr[0],
  );

  const handleGameSettings = (
    rowSize: number,
    colSize: number,
    mines: number,
  ) => {
    dispatch(gameSetting({ rowSize, colSize, mines }));
  };

  const handleChangeDifficulty = (difficulty: string) => {
    setCurrentDifficulty(difficulty);
    if (difficulty !== 'custom') {
      const { rowSize, colSize, mines } =
        difficultyDetails[difficulty as keyof object];
      handleGameSettings(rowSize, colSize, mines);
    }
  };

  return (
    <Layout>
      <SettingsWrapper>
        <h1 className="content-title">난이도 설정</h1>
        <div className="content-buttons-wrapper">
          {difficultyArr.map((item) => (
            <StyledButton
              key={item}
              className={currentDifficulty === item ? 'btn-selected' : ''}
              onClick={() => {
                handleChangeDifficulty(item);
              }}
            >
              {item}
            </StyledButton>
          ))}
        </div>
      </SettingsWrapper>
    </Layout>
  );
};

export default Settings;
