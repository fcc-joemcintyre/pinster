/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Grid, GridSize, TextField } from '@mui/material';
import { Field } from '@cygns/use-fields';
import { getInfo } from './util.js';

type Props = {
  field: Field,
  label: string,
  xs?: GridSize | boolean,
  sm?: GridSize | boolean,
  md?: GridSize | boolean,
  lg?: GridSize | boolean,
  xl?: GridSize | boolean,
  info?: string,
  errors?: Record<string, string>,
  onChange: React.ChangeEventHandler,
  onValidate?: React.FocusEventHandler,
  children: React.ReactNode,
};

/**
 * Field for a select element
 * @param Props
 * @returns Field instance
 */
export const FieldSelect: React.FC<Props> = (
  {
    field,
    label,
    xs = 12,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    info,
    errors,
    onChange,
    onValidate = () => { /* no op */ },
    children,
    ...rest
  }: Props
) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
    <TextField
      select
      fullWidth
      {...rest}
      label={label}
      id={field.name}
      name={field.name}
      value={field.value}
      required={field.required}
      error={Boolean (field.error)}
      InputLabelProps={{ shrink: true }}
      helperText={getInfo (true, errors || {}, field.error || '', true, info)}
      onChange={onChange}
      onBlur={onValidate}
    >
      {children}
    </TextField>
  </Grid>
);
