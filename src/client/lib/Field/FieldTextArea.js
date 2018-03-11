import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from '../TextArea';
import { FieldInfo, FieldError } from '.';

export const FieldTextArea = ({ field, errors, onChange, onValidate, ...rest }) => (
  <Fragment>
    <TextArea
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

FieldTextArea.propTypes = {
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape ({}),
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
};

FieldTextArea.defaultProps = {
  errors: null,
  onValidate: () => { /* no-op */ },
};
