import Layout from 'components/layout/Layout';
import { HelpContent, Wrapper } from './HelpStyle';

const Help = () => {
  return (
    <Layout>
      <Wrapper>
        <HelpContent>
          <h1 className="content-title">지뢰 찾기</h1>
          <li className="content-desc">
            지뢰 찾기(Minesweeper)는 혼자서 하는 컴퓨터 게임이다. 여기서 영어
            낱말 Minesweeper(마인스위퍼)는 지뢰를 찾아 제거하는 사람이나 배를
            가리킨다. 이 게임의 목적은 지뢰를 피해서 지뢰밭의 모든 단추를 여는
            것이다.
          </li>
        </HelpContent>
        <HelpContent>
          <h1 className="content-title">게임 규칙</h1>
          <li className="content-desc">
            게임 화면은 여러 개의 네모꼴 단추(격자)로 이루어진 “지뢰밭”으로
            이루어져 있다. 각 단추는 눌러서 열 수 있다. 지뢰가 숨겨져 있는
            단추를 눌러 열면 게임이 끝나게 된다. 만약 지뢰가 없는 단추라면, 두
            가지 경우가 생긴다. 열린 단추에 맞닿은 둘레의 다른 단추에 숨겨져
            있는 지뢰 개수가 쓰여 있을 수가 있다. 또는, 숫자가 나타나지
            않는다면(즉 둘레의 숨겨진 지뢰가 없다면), 자동으로 둘레에 맞닿아
            있는 단추도 함께 열린다. 지뢰가 숨겨져 있지 않은 모든 단추를 열면
            게임에서 이기게 된다.
          </li>
          <li className="content-desc">
            게임을 하는 이는 지뢰가 숨겨져 있다고 생각되는 단추에 마우스 오른쪽
            버튼을 클릭을 해 깃발을 세워둘 수 있다.
          </li>
        </HelpContent>
      </Wrapper>
    </Layout>
  );
};

export default Help;
