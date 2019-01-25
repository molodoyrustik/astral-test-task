import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ShoppingItem from './ShoppingItem';
import ShoppingListFilter from './ShoppingListFilter';
import ShoppingListForm from './ShoppingListForm';

import { handleError } from '../../../../actions';

import {
  addTodo,
  deleteTodo,
} from '../../../../actions/todo';

const Container = styled.div``;
const Box = styled.div`
  padding: 20px 0px;
  height: 80px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 22px;
`;

class ShoppingListContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: '',
      price: '',
      selectedOption: null,
      filter: { value: 'ALL', label: 'ALL' },
      sort: '',
    };
  }

  handleSort = (type) => (e) => {
    this.setState({ sort: type });
  }

  handleInputChange = (type) => (e) => {
    this.setState({ ...this.state, [type]: e.target.value });
  }

  handleSelectChange = (type) => (selectedOption) => {
    this.setState({ [type]: selectedOption });
  }

  handleAddTodo = (listId) => (e) => {
    e.preventDefault();
    const { todoTitle, price, selectedOption } = this.state;
    if (!todoTitle) {
      this.props.handleError('Вы не ввели название');
      return 0;
    } else if (!price) {
      this.props.handleError('Вы не ввели цену');
      return 0;
    } else if (!selectedOption) {
      this.props.handleError('Вы не выбрали важность');
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

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { listId } = this.props;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;


    if (start !== finish) {
      this.props.deleteTodo(listId, source.index);
    }
  }

  renderItems(todos, listId) {
    const tmpl = todos.map((todo, index) => {
      return (
        <Draggable key={index} draggableId={todo.id.toString()} index={todo.id}>
          {(provided, snapshot) => (
            <Container
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ShoppingItem index={index} key={todo.id} todo={todo} listId={listId}/>
            </Container>
          )}
        </Draggable>
      );
    });

    return tmpl;
  }

  filterTodos(todos, filter) {
    const newTodos = todos.filter((todo) => {
      if (filter.value === 'ALL') {
        return todo;
      }
      return todo.importance.value === filter.value;
    });
    return newTodos;
  }

  sortTodos(todos, sort) {
    const newTodos = todos.concat();
    if (sort === 'ascending') {
      newTodos.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort === 'descending') {
      newTodos.sort((a, b) => {
        return b.price - a.price;
      });
    }
    return newTodos;
  }

  render() {
    const { listId } = this.props;
    const list = this.props.lists.filter((item => {
      return item.id === listId;
    }))[0];

    let { todos } = list;
    const { listTitle } = list;
    const { filter, sort } = this.state;

    if (filter.value !== 'ALL') {
      todos = this.filterTodos(todos, filter);
    }

    if (sort !== '') {
      todos = this.sortTodos(todos, sort);
    }

    if (!list) {
      return this.renderError();
    } else {
      return this.renderBody(listId, listTitle, todos);
    }
  }

  renderError() {
    return (
      <div className="shopping-list__content">
        <header className="todo-list__header">
          <h2 className="todo-list__title" >нет такого списка</h2>
        </header>
      </div>
    );
  }

  renderBody(listId, listTitle, todos) {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="shopping-list__content">
          <header className="todo-list__header">
            <h2 className="todo-list__title" >{listTitle}</h2>
            <ShoppingListFilter
              filter={this.state.filter}
              onSelectChange={this.handleSelectChange('filter')}
              onSort={this.handleSort}
            />
          </header>
          <Droppable droppableId={listId.toString()}>
            {(provided, snapshot) => (
              <Container
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <ul id="todo-content">
                  { this.renderItems(todos, listId) }
                </ul>
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          <Droppable droppableId={'box'}>
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
              Перетащите сюда элемент чтобы удалить
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <ShoppingListForm
            todoTitle={this.state.todoTitle}
            price={this.state.price}
            selectedOption={this.state.selectedOption}
            onInputChange={this.handleInputChange}
            onSelectChange={this.handleSelectChange('selectedOption')}
            onAddTodo={this.handleAddTodo(listId)}
          />
        </div>
      </DragDropContext>
    );
  }
}

export default connect((state) => {
  return {
    lists: state.user.lists,
  };
}, {
  addTodo,
  deleteTodo,
  handleError,
})(ShoppingListContent);
