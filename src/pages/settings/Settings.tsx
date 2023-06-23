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
  const [currentSettings, setCurrentSettings] = useState<Detail>(
    difficultyDetails.easy,
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
      const selectedSetting = difficultyDetails[difficulty as keyof object];
      setCurrentSettings(selectedSetting);
    }
  };

  const handleCustomDifficulty = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const { value } = e.target;

    switch (type) {
      case 'rowSize':
        setCurrentSettings((cur) => ({ ...cur, rowSize: Number(value) }));
        break;
      case 'colSize':
        setCurrentSettings((cur) => ({ ...cur, colSize: Number(value) }));
        break;
      case 'mines':
        setCurrentSettings((cur) => ({ ...cur, mines: Number(value) }));
    }
  };

  return (
    <Layout>
      {currentSettings.rowSize},{currentSettings.colSize},
      {currentSettings.mines}
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
        {currentDifficulty === 'custom' && (
          <>
            <ul>
              <h2>가로</h2>
              <input
                type="range"
                id="rowSize"
                min={EASY_ROW}
                max={70}
                value={currentSettings.rowSize}
                onChange={(e) => {
                  handleCustomDifficulty(e, 'rowSize');
                }}
              />
              <h2>세로</h2>
              <input
                type="range"
                id="colSize"
                min={EASY_COL}
                max={70}
                value={currentSettings.colSize}
                onChange={(e) => {
                  handleCustomDifficulty(e, 'colSize');
                }}
              />
              <h2>지뢰 개수</h2>
              <input
                type="range"
                id="mines"
                min={EASY_BOMBS}
                max={
                  (currentSettings.rowSize - 1) * (currentSettings.colSize - 1)
                }
                value={currentSettings.mines}
                onChange={(e) => {
                  handleCustomDifficulty(e, 'mines');
                }}
              />
            </ul>
            <div>
              가로: {currentSettings.rowSize} 세로: {currentSettings.colSize}{' '}
              지뢰 개수: {currentSettings.mines}
            </div>
          </>
        )}
      </SettingsWrapper>
    </Layout>
  );
};

export default Settings;
