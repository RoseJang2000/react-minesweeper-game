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
import {
  CustomControllers,
  CustomResults,
  SettingsWrapper,
  StyledButton,
} from './SettingsStyle';

interface DifficultyDetails {
  easy: DifficultyDetail;
  normal: DifficultyDetail;
  hard: DifficultyDetail;
}

export interface DifficultyDetail {
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
  const savedDifficulty = localStorage.getItem('difficulty');
  const savedSettings = localStorage.getItem('settings');
  const [currentDifficulty, setCurrentDifficulty] = useState<string>(
    savedDifficulty ? JSON.parse(savedDifficulty) : difficultyArr[0],
  );
  const [currentSettings, setCurrentSettings] = useState<DifficultyDetail>(
    savedSettings ? JSON.parse(savedSettings) : difficultyDetails.easy,
  );

  const handleGameSettings = () => {
    dispatch(gameSetting({ ...currentSettings }));
    localStorage.setItem('settings', JSON.stringify(currentSettings));
    localStorage.setItem('difficulty', JSON.stringify(currentDifficulty));
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
            <CustomControllers>
              <h2>가로</h2>
              <input
                type="range"
                id="rowSize"
                className="input-range"
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
                className="input-range"
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
                className="input-range"
                min={EASY_BOMBS}
                max={
                  (currentSettings.rowSize - 1) * (currentSettings.colSize - 1)
                }
                value={currentSettings.mines}
                onChange={(e) => {
                  handleCustomDifficulty(e, 'mines');
                }}
              />
            </CustomControllers>
            <CustomResults>
              <li>가로: {currentSettings.rowSize}</li>
              <li>세로: {currentSettings.colSize}</li>
              <li>지뢰 개수: {currentSettings.mines}</li>
            </CustomResults>
          </>
        )}
        <StyledButton onClick={handleGameSettings}>SAVE</StyledButton>
      </SettingsWrapper>
    </Layout>
  );
};

export default Settings;
