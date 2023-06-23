import Board from 'components/board/Board';
import ControlBar from 'components/controlBar/ControlBar';
import Layout from 'components/layout/Layout';

const Play = () => {
  return (
    <Layout>
      <ControlBar />
      <Board />
    </Layout>
  );
};

export default Play;
