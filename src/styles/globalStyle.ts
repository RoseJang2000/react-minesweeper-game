import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  ol,ul{
  list-style: none;
  }
  
  a {
  text-decoration: none;
  color: black;
  }
`;

export default GlobalStyle;
