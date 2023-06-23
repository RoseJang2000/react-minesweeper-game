import styled from 'styled-components';
import { CELL_SIZE } from 'utils/constants';

const StyledCell = styled.div<{ isOpen: boolean; textColor: string }>`
  width: ${CELL_SIZE}rem;
  height: ${CELL_SIZE}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border-radius: 0.2rem;
  background-color: ${(props) => (props.isOpen ? '#fff' : '#85f293')};
  box-shadow: ${(props) =>
    props.isOpen ? '' : 'inset -0.2rem -0.2rem 0 rgba(0, 0, 0, 0.1)'};
  color: ${(props) => props.textColor};
`;

export { StyledCell };
