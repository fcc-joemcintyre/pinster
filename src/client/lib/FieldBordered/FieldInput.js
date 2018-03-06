import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import { FieldInfo, FieldError } from '.';

export const FieldInput = ({ field, errors, onChange, onValidate, ...rest }) => (
  <Fragment>
    <Input
      type='text'
      {...rest}
      id={field.name}
      value={field.value}
      onChange={(e) => { onChange (field, e.target.value); }}
      onBlur={() => { onValidate (field); }}
    />
    {field.error ?
      <FieldError>
        { (field.error === 'required') ? 'Is required' :
            errors ? (errors[field.error] || 'Error') : 'Error'
        }
      </FieldError> :
      <FieldInfo>
        {field.info || <span>&nbsp;</span>}
      </FieldInfo>
    }
  </Fragment>
);

FieldInput.propTypes = {
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape ({}),
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
};

FieldInput.defaultProps = {
  errors: null,
  onValidate: () => { /* no-op */ },
};
