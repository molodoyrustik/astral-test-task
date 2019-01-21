import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoSelect from './TodoSelect';

import { handleError } from '../../../actions';

import {
  changeCompleted,
  deleteTodo,
  editTodo,
} from '../../../actions/todo';

class Todo extends Component {
  state = {
    editing: false,
    newTodoTitle: '',
    newTodoPrice: '',
    selectedOption: null,
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleInputChange = (type) => (e) => {
    this.setState({ [type]: e.target.value });
  }

  handleCompletedChange = (listId, todoId) => () => {
    this.props.changeCompleted(listId, todoId);
  }

  handleDeleteTodo = (listId, todoId) => (e) => {
    e.preventDefault();

    this.props.deleteTodo(listId, todoId);
  }

  handleEditClick = () => (e) => {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  handleEditTodo = (listId, todoId) => (e) => {
    const {
      newTodoTitle,
      editing,
      newTodoPrice,
      selectedOption,
    } = this.state;

    if (!newTodoTitle) {
      this.props.handleError('Вы не ввели название');
      return 0;
    } else if (!newTodoPrice) {
      this.props.handleError('Вы не ввели цену');
      return 0;
    } else if (!selectedOption) {
      this.props.handleError('Вы не ввели важность');
      return 0;
    }

    const data = {
      todoTitle: newTodoTitle,
      todoPrice: newTodoPrice,
      importance: selectedOption,
    };
    this.props.editTodo(listId, todoId, data);
    this.setState({ editing: !editing });
  }

  componentWillMount() {
    this.setState({ newTodoTitle: this.props.todo.todoTitle });
    this.setState({ newTodoPrice: this.props.todo.price });
    this.setState({ selectedOption: this.props.todo.importance });
  }

  render() {
    const { todo, listId } = this.props;
    const clName = `todo-item ${todo.completed ? 'completed' : ''} ${this.state.editing ? 'editing' : ''}`;
    return (
      <li key={todo.id} className={clName}>
        <input className="checkbox" type="checkbox" value={todo.completed} onChange={this.handleCompletedChange(parseInt(listId, 10), todo.id)}/>
        <label className="title">{ todo.todoTitle }</label>
        <label className="title title--price">{ todo.price }$</label>
        <input className="textfield" type="text" value={this.state.newTodoTitle} onChange={this.handleInputChange('newTodoTitle')}/>
        <input className="textfield" type="text" value={this.state.newTodoPrice} onChange={this.handleInputChange('newTodoPrice')}/>
        <TodoSelect
          isEditing={this.state.editing}
          value={this.state.selectedOption}
          onChange={this.handleSelectChange}
        />
        {
          !this.state.editing
            ? <div>
                <button className="edit" onClick={this.handleEditClick()}>Изменить</button>
                <button className="delete" onClick={this.handleDeleteTodo(listId, todo.id, todo.todoTitle)}>Удалить</button>
              </div>
            : <button className="edit" onClick={this.handleEditTodo(listId, todo.id)}>Сохранить</button>
        }
      </li>
    );
  }
}

export default connect(null, {
  changeCompleted,
  deleteTodo,
  editTodo,
  handleError,
})(Todo);
