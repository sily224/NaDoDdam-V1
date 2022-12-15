import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
    }

  html {
      font-size: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-width: 100vw;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    display: block;
    color: #000;
  }
`
export default GlobalStyle;
