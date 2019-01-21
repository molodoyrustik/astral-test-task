import React from 'react';
import Select from 'react-select';

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

function TodoSelect(props) {
  const { value, onChange, isEditing } = props;
  return (
    <Select
      value={value}
      isDisabled={!isEditing}
      onChange={onChange}
      options={options}
      className='todo-item__select'
      placeholder='Важность'
    />
  );
}

export default TodoSelect;
