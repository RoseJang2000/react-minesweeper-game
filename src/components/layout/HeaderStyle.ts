import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  height: 7rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  gap: 1rem;
`;

const HeaderTitle = styled(Link)`
  font-size: 1.8rem;
  font-weight: 900;
`;

export { StyledHeader, HeaderTitle };
