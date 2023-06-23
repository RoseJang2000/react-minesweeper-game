import styled from 'styled-components';

const Wrapper = styled.div`
  width: 70%;
  margin: auto 0;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
  border-radius: 2rem;
  gap: 2rem;
`;

const HelpContent = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .content-title {
    font-size: 1.7rem;
  }
  .content-desc {
    width: 100%;
    text-align: left;
    margin: 0 1rem;
    line-height: 1.3rem;
    list-style: disc;
  }
`;

export { Wrapper, HelpContent };
