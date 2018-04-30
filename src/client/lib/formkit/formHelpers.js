/* disable react/no-unused-prop-types due to parsing bug 7.5.1+ */
/* eslint "react/no-unused-prop-types": "off" */

/**
 * Create a field definition.
 *
 * @param {string} name Name of the field (must match property name in *fields*)
 * @param {any} initialValue Initial value of field (will have formatIn applied if provided to convert to string)
 * @param {boolean} required Does field require a value (non empty string, non empty array)
 * @param {function[]} validators Array of validation functions to call
 * @param {string} info Short additional description (e.g. info text, tooltip)
 * @param {function} formatIn Function to convert native value to string for field representation
 * @param {function} formatOut Function to convert field representation to native value
 * @return {Object} Field to be included in *fields* state object
 */
export function createField (name, initialValue = '', required = false, validators = [],
  info = null, formatIn = inString, formatOut = outString) {
  const field = {
    name,
    initialValue: formatIn ? formatIn (initialValue) : initialValue,
    value: formatIn ? formatIn (initialValue) : initialValue,
    required,
    validators,
    info,
    formatIn,
    formatOut,
    error: null,
  };
  return field;
}

/**
 * Validate field against *required* criteria and provided validators
 *
 * @param {Object} field Field to validate
 * @return {string} Validation error name, or null if no error
 */
export function validateField (field) {
  const hasContent = (((typeof field.value === 'string') && (field.value.trim () !== '')) ||
    ((Array.isArray (field.value)) && (field.value.length !== 0)));
  if ((field.required === false) && (hasContent === false)) {
    return null;
  }
  if (field.required && (hasContent === false)) {
    return 'required';
  }

  let error = null;
  if (field.validators && (field.validators.length > 0)) {
    const value = field.formatOut ? field.formatOut (field.value) : field.value;
    for (let c = 0; c < field.validators.length; c ++) {
      error = field.validators[c] (value);
      if (error) { break; }
    }
  }
  return error;
}

/**
 * Get field values from set of fields.
 * @example
 * const { name, address } = getFieldValues (this.state.fields);
 *
 * @param {Object} fields Fields object (e.g. this.state.fields)
 * @return {Object} Object of just values for each field
 */
export function getFieldValues (fields) {
  const result = {};
  for (const key of Object.keys (fields)) {
    if (Array.isArray (fields[key])) {
      for (const a of [fields[key]]) {
        result[a.name] = a.formatOut ? a.formatOut (a.value) : a.value;
      }
    } else {
      const a = fields[key];
      result[key] = a.formatOut ? a.formatOut (a.value) : a.value;
    }
  }
  return result;
}

/**
 * Return name of first field with an error (or null if no errors).
 * @param {Object} fields Fields Object
 * @return {string} Name of field, or null if no errors
 */
export function getFirstError (fields) {
  for (const value of Object.values (fields)) {
    if (value.error) {
      return value.name;
    }
  }
  return null;
}

/* eslint-disable no-invalid-this */

/**
 * Default implementation of onChange, updating field value. For changes with
 * dependencies, this can be replaced or called multiple times from a local
 * onChange implementation.
 *
 * NOTE: must bind this function to the React component to be the onChange handler.
 * @example
 * this.onChange = defaultOnChange.bind (this);
 *
 * @param {Object} field Field to be updated
 * @param {string} value New value (as a string)
 * @return {void}
 */
export function defaultOnChange (field, value) {
  const f = { [field.name]: { ...this.state.fields[field.name], value } };
  this.setState (({ fields }) => ({ fields: { ...fields, ...f } }));
}

/**
 * Default implementation of onValidate, performing validation on the specified
 * field, and updating its error state if it has changed.
 *
 * NOTE: must bind this function to the React component to be the onChange handler.
 * @example
 * this.onValidate = defaultOnValidate.bind (this);
 *
 * @param {Object} field Field to be validated
 * @return {string} Error name, or null if no error
 */
export function defaultOnValidate (field) {
  const f = this.state.fields[field.name];
  const error = validateField (f);
  if (error !== f.error) {
    this.setState (({ fields }) => ({ fields: { ...fields, [field.name]: { ...f, error } } }));
  }
  return error;
}

/**
 * Default implementation of onValidateForm, performing validation on all fields.
 * This will call validation on each field, updating the error status of each.
 *
 * NOTE: must bind this function to the React component to be the onChange handler.
 * @example
 * this.onValidateForm = defaultOnValidateForm.bind (this);
 *
 * @return {boolean} true if all fields validated, false if any fields are not validated
 */
export function defaultOnValidateForm () {
  let result = true;
  for (const key of Object.keys (this.state.fields)) {
    result = (this.onValidate (this.state.fields[key]) === null) && result;
  }
  return result;
}

/* eslint-enable no-invalid-this */

/**
 * Convert string to field string, by trimming leading/trailing spaces
 * @param {string} value Input string
 * @return {string} Trimmed string
 */
export function inString (value = '') {
  return value.trim ();
}

/**
 * Convert field string to string, by trimming leading/trailing spaces
 * @param {string} value Input string
 * @return {string} Trimmed string
 */
export function outString (value = '') {
  return value.trim ();
}

/**
 * Convert array of strings to field strings
 * @param {string[]} value Input values
 * @return {string[]} Array of field strings
 */
export function inStringArray (value = []) {
  return value.map (inString);
}

/**
 * Convert array of field strings to strings
 * @param {string[]} value Input values
 * @return {string[]} Array of strings
 */
export function outStringArray (value = []) {
  return value.map (outString);
}

/**
 * Convert date to field string. Accepts Date object or date strings.
 * @param {string | Date} value Input date
 * @return {string} Date in m/d/yyyy format, or '' if no valid date provided
 */
export function inDate (value = '') {
  let date;
  if (value && ((value instanceof Date) || (Object.prototype.toString.call (value) === '[object Date]'))) {
    if (! Number.isNaN (value.getTime ())) {
      date = value;
    }
  } else if (value && (typeof (value) === 'string')) {
    const temp = new Date (value);
    if (! Number.isNaN (temp.getTime ())) {
      date = temp;
    }
  }
  return (date) ? `${date.getUTCMonth () + 1}/${date.getUTCDate ()}/${date.getUTCFullYear ()}` : '';
}

/**
 * Convert field string to Date
 * @param {string} value Date string
 * @return {string | Date} Date object, or '' if field is empty
 */
export function outDate (value = '') {
  return (value === '') ? '' : new Date (value);
}

/**
 * Validate and return integer value for a value
 * @param {any} value Value to convert
 * @return {number} Integer value
 */
function integer (value) {
  let n = Number (value);
  if (Number.isNaN (n)) {
    n = 0;
  } else {
    n = Math.floor (n);
  }
  return n;
}

/**
 * Convert integer to field string
 * @param {number} value Input value
 * @return {string} Field string
 */
export function inInteger (value = 0) {
  return integer (value).toString ();
}

/**
 * Convert field string to integer
 * @param {string} value Field string
 * @return {number} Integer
 */
export function outInteger (value = 0) {
  return integer (value);
}

/**
 * Convert array of integers to field strings
 * @param {any[]} value Input values
 * @return {string[]} Array of field strings
 */
export function inIntegerArray (value = []) {
  return value.map (inInteger);
}

/**
 * Convert array of field strings to integers
 * @param {any[]} value Input values
 * @return {number[]} Array of integers
 */
export function outIntegerArray (value = []) {
  return value.map (outInteger);
}

/**
 * Convert currency value (integer) to field string
 * @param {any} value Input value
 * @return {string} Currency field string
 */
export function inCurrency (value = 0) {
  return integer (value).toString ();
}

/**
 * Convert currency field value to integer
 * @param {string} value Currency string
 * @return {integer} Integer value
 */
export function outCurrency (value) {
  return (value === '') ? 0 : integer (value.replace (/[$,]/g, ''));
}

/**
 * Convert boolean value to field string value ('true', 'false')
 * @param {boolean} value Input value
 * @return {string} 'true' or 'false'
 */
export function inBoolean (value = false) {
  return (typeof (value) === 'boolean') ? 'true' : 'false';
}

/**
 * Convert field value to boolean
 * @param {string} value Input value
 * @return {boolean} Boolean value
 */
export function outBoolean (value = 'true') {
  return value === 'true';
}
