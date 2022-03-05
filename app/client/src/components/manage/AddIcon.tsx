import { SvgIcon } from '@mui/material';

export const AddIcon = (props) => (
  <SvgIcon {...props}>
    <circle cx='12' cy='12' r='11' strokeWidth='2' fill='none' stroke='currentcolor' />
    <line x1='12' y1='6' x2='12' y2='18' strokeWidth='2' stroke='currentcolor' />
    <line x1='6' y1='12' x2='18' y2='12' strokeWidth='2' stroke='currentcolor' />
  </SvgIcon>
);
