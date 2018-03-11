import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select } from '../Select';
import { FieldInfo, FieldError } from '.';

export const FieldSelect = ({ field, errors, onChange, onValidate, ...rest }) => (
  <Fragment>
    <Select
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
        { (field.info && (field.info !== '')) ? field.info : <span>&nbsp;</span>}
      </FieldInfo>
    }
  </Fragment>
);

FieldSelect.propTypes = {
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape ({}),
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
};

FieldSelect.defaultProps = {
  errors: null,
  onValidate: () => { /* no-op */ },
};
