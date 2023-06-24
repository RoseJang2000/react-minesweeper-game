import { HeaderNav, HeaderTitle, NavButton, StyledHeader } from './HeaderStyle';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderTitle to="/">💣 MINESWEEPER 💣</HeaderTitle>
      <HeaderNav>
        <NavButton to="/">PLAY</NavButton>
        <NavButton to="/settings">SETTINGS</NavButton>
        <NavButton to="/help">HELP</NavButton>
      </HeaderNav>
    </StyledHeader>
  );
};

export default Header;
