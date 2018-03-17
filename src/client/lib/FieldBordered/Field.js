import styled from 'styled-components';
import { common } from '../css';
import { FieldText, FieldInfo } from '../Field';

export const Field = styled.div`
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

    &focus: {
      background-color: #e6f3ff;
    }
  }

  > ${FieldText} {
    display: block;
    margin: 12px 6px 8px 6px;
    padding: 4px 0;
  }

  > ${FieldInfo} {
    background-color: #F0F0F0;
    text-align: center;
    border-radius: 0 0 4px 4px;
  }
`;
