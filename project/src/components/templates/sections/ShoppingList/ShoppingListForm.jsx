import React, { Component } from 'react';

import CustomSelect from '../../common/CustomSelect';

class ShoppingListForm extends Component {
  render() {
    const {
      todoTitle,
      price,
      selectedOption,
      onInputChange,
      onSelectChange,
      onAddTodo,
    } = this.props;
    return (
      <form id="todo-form">
        <input
          id="add-input"
          type="text"
          value={todoTitle}
          placeholder='введите название'
          onChange={onInputChange('todoTitle')}
        />
        <input
          id="add-input"
          type="text"
          value={price}
          placeholder='введите цену'
          onChange={onInputChange('price')}
        />
        <CustomSelect
          isEditing={true}
          value={selectedOption}
          onChange={onSelectChange}
        />
        <button id="add-button" type="submit" onClick={onAddTodo}>Добавить</button>
      </form>
    );
  }
}

export default (ShoppingListForm);
