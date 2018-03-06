import styled from 'styled-components';
import { common } from '../css';

export const Field = styled.div`
  margin: 6px 0 16px 0;
  ${common}
  border: 1px solid darkgray;
  border-radius: 4px;

  > label {
    display: block;
    float: left;
    margin-top: -12px;
    margin-left: 4px;
    height: 16px;
    padding: 2px 5px 2px 5px;
    font-size: 14px;
    background-color: white;
    overflow: hidden;
  }

  > label + * {
    clear: left;
  }

  > input, select, textarea {
    display: block;
    margin: 12px 6px 8px 6px;
    padding: 4px 0;
    background-color: aliceblue;
    border: none;
    width: calc(100% - 12px);
  }

  > input:focus, select:focus, textarea: focus {
    background-color: #E6F3FF;
  }
`;
