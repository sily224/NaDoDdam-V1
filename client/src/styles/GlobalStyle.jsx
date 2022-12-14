import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 100%;
    }

    body {
        min-height: 100vh;
        min-width: 100vw;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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