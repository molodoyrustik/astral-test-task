import React from 'react';
import Select from 'react-select';

const defaultOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const CustomSelect = (props) => {
  const {
    value,
    onChange,
    isEditing,
    options,
  } = props;
  return (
    <Select
      value={value}
      isDisabled={!isEditing}
      onChange={onChange}
      options={options || defaultOptions}
      className='todo-item__select'
      placeholder='Важность'
    />
  );
};

export default CustomSelect;
