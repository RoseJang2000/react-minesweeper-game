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
      aroundMines: null,
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

interface AroundCellIdx {
  x: number;
  y: number;
}

// 셀 클릭(열기) 이벤트 함수
export const openCellhandler = (board: CellState[][], x: number, y: number) => {
  // 셀 주변 8개의 셀 안에 있는 지뢰의 개수를 탐색해 구하는 함수
  const getBombCount = (x: number, y: number) => {
    const aroundCells: CellState[] = [];
    console.log(board, board[y][x]);
    if (y > 0) {
      // 첫번째 행이 아니라면 윗 행의 셀 3개 배열에 추가
      aroundCells.push(
        board[y - 1][x - 1],
        board[y - 1][x],
        board[y - 1][x + 1],
      );
    }
    //  양 옆 셀 배열에 추가
    aroundCells.push(board[y][x - 1], board[y][x + 1]);
    if (y < board.length - 1) {
      // 마지막 행이 아니라면 아랫 행의 셀 3개 배열에 추가
      aroundCells.push(
        board[y + 1][x - 1],
        board[y + 1][x],
        board[y + 1][x + 1],
      );
    }

    // 배열의 요소 중 지뢰를 가진 요소의 개수
    console.log(aroundCells);
    const bombCount = aroundCells
      .filter((item) => item)
      .filter((item) => item.mine).length;

    console.log(bombCount);
    return bombCount;
  };

  let openCells = 0;

  const openAroundCells = (x: number, y: number) => {
    const cellData = board[y][x] ? board[y][x] : undefined;
    if (cellData === undefined) {
      return;
    }

    // 셀이 아무 옵션도 없는 셀인지 검사
    const isEmptyCell =
      board[y][x].aroundMines === null &&
      !board[y][x].mine &&
      !board[y][x].flag &&
      !board[y][x].question;

    // 비어있는 셀이 아니라면 탐색 끝냄
    if (!isEmptyCell) {
      console.log('out');
      return;
    }

    board[y][x] = {
      ...cellData,
      isOpen: true,
      aroundMines: getBombCount(x, y),
    };
    openCells += 1;

    const aroundCells: AroundCellIdx[] = [];

    if (y > 0) {
      // 첫번째 행이 아니라면 윗 행의 셀 3개 좌표 배열에 추가
      aroundCells.push(
        { y: y - 1, x: x - 1 },
        { y: y - 1, x },
        { y: y - 1, x: x + 1 },
      );
    }
    //  양 옆 좌표 셀 배열에 추가
    aroundCells.push({ y, x: x - 1 }, { y, x: x + 1 });
    if (y < board.length - 1) {
      // 마지막 행이 아니라면 아랫 행의 셀 3개 좌표 배열에 추가
      aroundCells.push(
        { y: y + 1, x: x - 1 },
        { y: y + 1, x },
        { y: y + 1, x: x + 1 },
      );
    }

    // 지금 연 셀 주변에 지뢰가 없다면 주변 셀을 더 탐색
    if (board[y][x].aroundMines === 0) {
      for (const aroundCell of aroundCells) {
        openAroundCells(aroundCell.x, aroundCell.y);
      }
    }
  };

  openAroundCells(x, y);

  return { board, openCells };
};
