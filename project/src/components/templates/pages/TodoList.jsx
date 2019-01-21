import React, { Component } from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';
import TodoSelect from './TodoSelect';

import { handleError } from '../../../actions';

import {
  changeCompleted,
  addTodo,
  deleteTodo,
  editTodo,
} from '../../../actions/todo';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: '',
      price: '',
      list: {},
      selectedOption: null,
      filter: null,
    };
  }

  handleInputChange = (type) => (e) => {
    this.setState({ [type]: e.target.value });
  }

  handleSelectChange = (type) => (selectedOption) => {
    this.setState({ [type]: selectedOption });
  }

  handleFilterTodo = (e) => {
    console.log(e);
  }

  handleAddTodo = (listId) => (e) => {
    e.preventDefault();
    const { todoTitle, price, selectedOption } = this.state;
    if (!todoTitle) {
      this.props.handleError('Вы не ввели название');
      return 0;
    }
    const data = {
      id: Math.round(Math.random() * 100),
      todoTitle,
      price: price * 1,
      importance: selectedOption,
      completed: false,
    };

    this.props.addTodo(listId, data);
    this.setState({ todoTitle: '', price: '', selectedOption: null });
  }

  renderItems(todos, listId) {
    const tmpl = todos.map((todo) => {
      return (
        <Todo key={todo.id} todo={todo} listId={listId}/>
      );
    });

    return tmpl;
  }

  render() {
    const listId = parseInt(this.props.match.params.listId, 10);
    const list = this.props.lists.filter((item => {
      return item.id === parseInt(listId, 10);
    }))[0];

    if (!list) {
      return <div>нет такого списка</div>;
    }

    const { listTitle, todos } = list;
    return (
      <div className="todo-list">
        <header className="todo-list__header">
          <h2 className="todo-list__title" >{listTitle}</h2>
          {/* <TodoSelect
            isEditing={true}
            value={this.state.filter}
            onChange={this.handleSelectChange('filter')}
          />
          <button id="add-button"
            type="submit"
            onClick={this.handleFilterTodo}>Фильтровать</button> */}
        </header>
        <ul id="todo-content">
          { this.renderItems(todos, listId) }
        </ul>
        <form id="todo-form">
          <input id="add-input" type="text" value={this.state.todoTitle} placeholder='введите название' onChange={this.handleInputChange('todoTitle')}/>
          <input id="add-input" type="text" value={this.state.price} placeholder='введите цену ' onChange={this.handleInputChange('price')}/>
          <TodoSelect
            isEditing={true}
            value={this.state.selectedOption}
            onChange={this.handleSelectChange('selectedOption')}
          />
          <button id="add-button" type="submit" onClick={this.handleAddTodo(listId)}>Добавить</button>
        </form>
        <div className="block"></div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    lists: state.user.lists,
  };
}, {
  changeCompleted,
  addTodo,
  deleteTodo,
  editTodo,
  handleError,
})(TodoList);
