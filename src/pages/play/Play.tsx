import Board from 'components/board/Board';
import ControlBar from 'components/controlBar/ControlBar';
import Layout from 'components/layout/Layout';
import { Wrapper } from './PlayStyle';

const Play = () => {
  return (
    <Layout>
      <Wrapper>
        <ControlBar />
        <Board />
      </Wrapper>
    </Layout>
  );
};

export default Play;
