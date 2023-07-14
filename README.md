# 💣 React 지뢰찾기 게임

![](https://github.com/RoseJang2000/react-minesweeper-game/assets/115916008/6405dd59-adff-4ba2-974e-4dfe7b5bd223)


## 프로젝트 실행, 배포 링크

### 배포 링크: https://react-minesweeper-game.vercel.app/

```text
npm install
```

```text
npm run start
```

## 구현 리스트

- [x] 첫 셀을 열 경우 지뢰가 터지지 않는다
- [x] 난이도 변경
    - [x] EASY
    - [x] MEDIUM
    - [x] HARD
    - [x] CUSTIOM (10x10 ~ 70x70)
- [x] 게임 타이머 기능
- [x] 오른쪽 클릭 깃발
- [x] 오른쪽 클릭 물음표

## 기술 스택

- `TypeScript`, `React`, `CRA(Create-react-app) 환경에서 개발하였습니다.
- `react-redux`, `redux-toolkit`을 사용하여 전역적으로 form 상태를 관리했습니다.
- 스타일링을 위해 `styled-components`를 사용하였습니다.

### Dependencies
```json
    "@reduxjs/toolkit": "^1.9.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.36",
    "@types/react": "^18.2.13",
    "@types/react-dom": "^18.2.6",
    "@types/react-router-dom": "^5.3.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.1",
    "react-router-dom": "^6.13.0",
    "react-scripts": "5.0.1",
    "styled-components": "^5.3.10",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
```


## Project Structure

```
📦src
 ┣ 📂components
 ┃ ┣ 📂board
 ┃ ┣ 📂cell
 ┃ ┣ 📂controlBar
 ┃ ┗ 📂layout
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂help
 ┃ ┣ 📂play
 ┃ ┗ 📂settings
 ┣ 📂routers
 ┣ 📂store
 ┃ ┣ 📂modules
 ┣ 📂styles
 ┣ 📂utils
```

## Code Convention

| 타입 | Emoji | 설명 |
| --- | --- | --- |
| feat | ✨ | 새로운 기능 추가 |
| fix | 🐛 | 버그 수정 |
| docs | 📝 | 문서 수정 |
| refactor | ♻️ |  코드 리팩터링 |
| style | 🎨 | 코드 구조 변경, 향상 |
| chore | 📦 | 빌드 업무 수정, 패키지 매니저 수정 |
| design | 💄 | CSS 등 사용자 UI 디자인 변경 / 이미지 파일 업로드 |
| comment | 💡 | 필요한 주석 추가 및 변경 |
| rename, move | 🚚 | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 |
| remove | 🔥 | 파일을 삭제하는 작업만 수행한 경우 |
