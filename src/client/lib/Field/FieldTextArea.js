import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from '../TextArea';
import { FieldInfo, FieldError } from '.';

export const FieldTextArea = ({ field, maxLength, showCount, errors, onChange, onValidate, ...rest }) => (
  <Fragment>
    <TextArea
      {...rest}
      id={field.name}
      maxLength={maxLength}
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
        { showCount ? `${field.value.length} of ${maxLength} characters` :
          (field.info && (field.info !== '')) ? field.info : <span>&nbsp;</span>
        }
      </FieldInfo>
    }
  </Fragment>
);

FieldTextArea.propTypes = {
  field: PropTypes.shape ({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  maxLength: PropTypes.number.isRequired,
  showCount: PropTypes.bool,
  errors: PropTypes.shape ({}),
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
};

FieldTextArea.defaultProps = {
  showCount: false,
  errors: null,
  onValidate: () => { /* no-op */ },
};
