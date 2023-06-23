import { CellState } from 'store/modules/game';

export const boardSetting = (
  rowSize: number,
  colSize: number,
  mines: number,
) => {
  const idxArr: number[] = Array(rowSize * colSize)
    .fill(null)
    .map((_, idx) => idx); // 지뢰 위치 지정을 위한 랜덤 숫자를 추출할 배열
  const randomNumbers: number[] = []; // 지뢰 위치를 위한 랜덤 숫자를 저장할 배열
  const result: CellState[][] = []; // 완성된 보드를 저장할 2차원 배열

  // 지뢰 개수만큼 랜덤한 숫자를 추출
  while (randomNumbers.length !== mines) {
    // idxArr 길이 사이의 랜덤한 인덱스를 추첨
    const randomIdx = Math.floor(idxArr.length * Math.random());
    // 위에서 추출한 랜덤한 인덱스를 이용해 idxArr의 해당 순서의 숫자를 splice로 추출해 중복 제거
    const randomNumber = idxArr.splice(randomIdx, 1)[0];
    randomNumbers.push(randomNumber);
  }

  // 기본 셀 정보를 담은 2차원 배열 생성
  for (let i = 0; i < colSize; i++) {
    const initialCell: CellState = {
      isOpen: false,
      mine: false,
      flag: false,
      question: false,
    };
    const rowArr: CellState[] = Array(rowSize).fill(initialCell);
    result.push(rowArr);
  }

  // 2차원 배열에 지뢰 위치 설정
  for (const mineNumber of randomNumbers) {
    const x = mineNumber % rowSize;
    const y = Math.floor(mineNumber / rowSize);
    result[y][x] = { ...result[y][x], mine: true };
  }

  return result;
};

// 셀 마우스 우클릭 시 셀 변경할 셀 관련 데이터를 리턴하는 함수
export const getChangedCellData = (currentData: CellState) => {
  const { flag, question } = currentData;
  const newCellData = { ...currentData };
  let flagCount = 0; // 셀 데이터 변경과 관련한 깃발 개수 증감 정보를 저장할 변수

  if (flag) {
    // 셀이 깃발 표시 상태인 경우 물음표 상태로 변경, 깃발 개수 -1
    newCellData.flag = false;
    newCellData.question = true;
    flagCount -= 1;
  } else if (question) {
    // 셀이 물음표 상태인 경우 일반 상태로 변경
    newCellData.question = false;
  } else {
    // 셀이 일반 상태인 경우 깃발 상태로 변경, 깃발 개수 +1
    newCellData.flag = true;
    flagCount += 1;
  }
  return { newCellData, flagCount };
};
