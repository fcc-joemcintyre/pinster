import { injectGlobal } from 'styled-components';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    font-size: 16px;
    line-height: 1.2;
    min-width: 300px;
    margin: 0;
    padding: 0;
  }

  input, select {
    font-size: 16px;
  }
`;
