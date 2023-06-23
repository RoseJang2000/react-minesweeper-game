import { Wrapper } from 'pages/help/HelpStyle';
import styled from 'styled-components';

const SettingsWrapper = styled(Wrapper)`
  .content-title {
    text-align: center;
    font-size: 1.5rem;
  }
  .content-buttons-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
`;

const StyledButton = styled.button`
  width: 6rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  cursor: pointer;

  &.btn-selected {
    background-color: lightcoral;
    color: #fff;
  }
  :hover {
    filter: brightness(0.9);
  }
`;

export { SettingsWrapper, StyledButton };
