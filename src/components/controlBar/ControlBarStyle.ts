import styled from 'styled-components';

const Wrapper = styled.div`
  height: 3rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #888;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledNumber = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 0.2rem;
`;

const PlayButton = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightcoral;
  font-size: 1rem;
  box-shadow: inset -0.2rem -0.2rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  border: none;
  cursor: pointer;

  :hover {
    filter: brightness(0.9);
  }
  :active {
    box-shadow: inset 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.1);
  }
`;

export { Wrapper, PlayButton, StyledNumber };
