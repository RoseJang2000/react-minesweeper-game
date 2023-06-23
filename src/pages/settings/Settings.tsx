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
import { SettingsWrapper } from './SettingsStyle';

interface DifficultyOptions {
  type: string;
  rowSize: number;
  colSize: number;
  mines: number;
}

const Settings = () => {
  const dispatch = useDispatch();
  const { gameSetting } = gameSlice.actions;
  const difficulty: DifficultyOptions[] = [
    {
      type: 'easy',
      rowSize: EASY_ROW,
      colSize: EASY_COL,
      mines: EASY_BOMBS,
    },
    {
      type: 'normal',
      rowSize: NORMAL_ROW,
      colSize: NORMAL_COL,
      mines: NORMAL_BOMBS,
    },
    {
      type: 'hard',
      rowSize: HARD_ROW,
      colSize: HARD_COL,
      mines: HARD_BOMBS,
    },
  ];
  const [currentDifficulty, setCurrentDifficulty] = useState<string>(
    difficulty[0].type,
  );

  const handleGameSettings = (
    rowSize: number,
    colSize: number,
    mines: number,
  ) => {
    dispatch(gameSetting({ rowSize, colSize, mines }));
  };

  const handleChangeDifficulty = (selectedOption: DifficultyOptions) => {
    const { type, rowSize, colSize, mines } = selectedOption;
    setCurrentDifficulty(type);
    handleGameSettings(rowSize, colSize, mines);
  };

  return (
    <Layout>
      <SettingsWrapper>
        <h1 className="content-title">난이도 설정</h1>
        {difficulty.map((item) => (
          <button
            key={item.type}
            className={currentDifficulty === item.type ? 'active' : ''}
            onClick={() => {
              handleChangeDifficulty(item);
            }}
          >
            {item.type}
          </button>
        ))}
      </SettingsWrapper>
    </Layout>
  );
};

export default Settings;
