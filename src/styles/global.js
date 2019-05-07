import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }


  body {
    background: #323232;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: sans-serif;
    display: flex;
    justify-content:center;
    align-items:center;
    line-height: 1.57;
    transition:all linear .3s;
  }

  ::-webkit-scrollbar {
    width: .5rem;
    height: 10px;
    background-color: #fff;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background: #3A3A3A;
  }

  ::-webkit-scrollbar-thumb {
    background: #389CED;
    border-radius: 2px;
  }

`;

export default GlobalStyle;
