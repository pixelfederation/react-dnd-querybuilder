import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import moment from 'moment';

const ValueEditor = ({
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  values
}) => {
  if (operator === 'null' || operator === 'notNull') {
    return null;
  }

  switch (type) {
    case 'select':
      return (
        <select
          className={className}
          title={title}
          onChange={(e) => handleOnChange(e.target.value)}
          value={value}>
          {values.map((v) => (
            <option key={v.name} value={v.name}>
              {v.label}
            </option>
          ))}
        </select>
      );

    case 'datetime':
      const regExp =/^\d{4}-[0-1][1-9]-[0-3]\d\s([0-1][0-9]|2[0-3]):[0-5]\d$/;
      if(typeof value !== 'string' || !value.match(regExp)){
        value = moment().toDate();
      }

      return (
        <DatePicker
          customInput={<input className={className} title={title}/>}
          onChange={(e) => handleOnChange(moment(e).format("YYYY-MM-DD HH:mm"))}
          timeInputLabel="čas:"
          showTimeInput
          dateFormat="MM/dd/yyyy h:mm aa"
          value={value}
          popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: "viewport"
            }
          }}
        />
      );

    case 'checkbox':
      return (
        <input
          type="checkbox"
          className={className}
          title={title}
          onChange={(e) => handleOnChange(e.target.checked)}
          checked={!!value}
        />
      );

    case 'radio':
      return (
        <span className={className} title={title}>
          {values.map((v) => (
            <label key={v.name}>
              <input
                type="radio"
                value={v.name}
                checked={value === v.name}
                onChange={(e) => handleOnChange(e.target.value)}
              />
              {v.label}
            </label>
          ))}
        </span>
      );

    default:
      return (
        <input
          type={inputType || 'text'}
          value={value}
          title={title}
          className={className + "default-input-type"}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      );
  }
};

ValueEditor.displayName = 'ValueEditor';

ValueEditor.propTypes = {
  field: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.any,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['select', 'checkbox', 'radio', 'text', 'datetime']),
  inputType: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object)
};

export default ValueEditor;
