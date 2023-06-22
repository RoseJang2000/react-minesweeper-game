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

const HeaderNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const NavButton = styled(NavLink)`
  font-size: 1rem;

  &.active {
    font-weight: 800;
    text-decoration: underline;
  }
`;

export { StyledHeader, HeaderTitle, HeaderNav, NavButton };
