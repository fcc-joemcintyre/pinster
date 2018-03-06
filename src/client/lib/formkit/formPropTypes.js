import PropTypes from 'prop-types';

/**
 * PropType for fields passed into forms
 */
export const fieldPropTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  errors: PropTypes.string,
};

/**
 * PropType for field arrays passed into forms
 */
export const fieldArrayPropTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.arrayOf (PropTypes.string).isRequired,
  value: PropTypes.arrayOf (PropTypes.string).isRequired,
  required: PropTypes.bool.isRequired,
  validators: PropTypes.arrayOf (PropTypes.func).isRequired,
  errors: PropTypes.string,
};
