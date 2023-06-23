import styled from 'styled-components';
import { CELL_SIZE } from 'utils/constants';

const CellsWrapper = styled.div<{ rowSize: number; colSize: number }>`
  width: fit-content;
  max-width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(${(props) => props.rowSize}, ${CELL_SIZE}rem);
  grid-template-rows: repeat(${(props) => props.colSize}, ${CELL_SIZE}rem);
  gap: 0.2rem;
  overflow: auto;
`;

export { CellsWrapper };
