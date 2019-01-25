import React, { Component } from 'react';

import CustomSelect from '../../common/CustomSelect';

const options = [
  { value: 'ALL', label: 'ALL' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

class ShoppingListFilter extends Component {
  render() {
    const {
      filter,
      onSelectChange,
      onSort,
    } = this.props;
    return (
      <div className="todo-list__controls">
        <div className="todo-list__controls-left">
          <label >Фильтровать:</label>
          <CustomSelect
            isEditing={true}
            value={filter}
            options={options}
            onChange={onSelectChange}
          />
        </div>
        <div className="todo-list__controls-right">
          <label >Сортировать:</label>
          <button id="add-button"
          type="submit"
          onClick={onSort('ascending')}>По возрастанию</button>
          <button id="add-button"
          type="submit"
          onClick={onSort('descending')}>По убыванию</button>
        </div>
      </div>
    );
  }
}

export default ShoppingListFilter;
