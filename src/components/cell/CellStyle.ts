import styled from 'styled-components';
import { CELL_SIZE } from 'utils/constants';

const StyledCell = styled.div`
  width: ${CELL_SIZE}rem;
  height: ${CELL_SIZE}rem;
  border-radius: 0.2rem;
  background-color: skyblue;
  box-shadow: inset -0.2rem -0.2rem 0 rgba(0, 0, 0, 0.1);
`;

export { StyledCell };
