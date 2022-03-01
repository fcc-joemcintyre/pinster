/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Grid, GridSize, TextField } from '@mui/material';
import { Field } from '@cygns/use-fields';
import { getInfo } from './util.js';

type Props = {
  field: Field,
  type?: string,
  label: string,
  xs?: GridSize | boolean,
  sm?: GridSize | boolean,
  md?: GridSize | boolean,
  lg?: GridSize | boolean,
  xl?: GridSize | boolean,
  rows?: number,
  maxLength?: number,
  info?: string,
  errors?: Record<string, string>,
  onChange: React.ChangeEventHandler,
  onValidate?: React.FocusEventHandler,
  autoFocus?: boolean,
  autoComplete?: string,
  autoCapitalize?: string,
  autoCorrect?: string,
};

/**
 * Field for an input element
 * @param Props
 * @returns Field instance
 */
export const FieldTextInput: React.FC<Props> = (
  {
    field,
    type = 'text',
    label,
    xs = 12,
    sm = false,
    md = false,
    lg = false,
    xl = false,
    rows = 1,
    maxLength,
    info,
    errors,
    onChange,
    onValidate = () => { /* no op */ },
    autoFocus = false,
    autoComplete = undefined,
    autoCapitalize = undefined,
    autoCorrect = undefined,
    ...rest
  }: Props
) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
    <TextField
      fullWidth
      {...rest}
      type={type}
      label={label}
      id={field.name}
      name={field.name}
      value={field.value}
      required={field.required}
      error={Boolean (field.error)}
      multiline={rows > 1}
      rows={rows}
      inputProps={maxLength ? { maxLength } : {}}
      InputLabelProps={{ shrink: true }}
      helperText={getInfo (true, errors || {}, field.error || '', true, info)}
      onChange={onChange}
      onBlur={onValidate}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
    />
  </Grid>
);
