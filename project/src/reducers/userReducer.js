import {
  ADD_LIST,
  DELETE_LIST,
  TOGGLE_COMPLETED,
  EDIT_TODO,
  ADD_TODO,
  GET_TODOS,
  START,
  SUCCESS,
  FAIL,
  DELETE_TODO,
} from '../actions/constants';

const defautState = {
  lists: [
    {
      id: 1,
      listTitle: 'presents',
      todos: [
        {
          id: 2,
          todoTitle: 'Игрушечную машинку',
          completed: false,
          price: 100,
          importance: { value: '3', label: '3' },
        },
        {
          id: 3,
          todoTitle: 'Мишку',
          completed: false,
          price: 500,
          importance: { value: '1', label: '1' },
        },
        {
          id: 4,
          todoTitle: 'Бритву',
          completed: false,
          price: 50,
          importance: { value: '2', label: '2' },
        },
      ],
    },
  ],
};

export default (listStates = defautState, action) => {
  const { type, payload, data } = action;

  switch (type) {
    case ADD_LIST + SUCCESS:
      return {
        lists: [...listStates.lists, payload.data],
      };
    case DELETE_LIST + SUCCESS:
      return {
        lists: payload.lists,
      };
    case GET_TODOS + SUCCESS:
      return listStates;
    case TOGGLE_COMPLETED + SUCCESS:
      return {
        lists: listStates.lists.map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              todos: list.todos.map((todo) => {
                if (todo.id === payload.todoId) {
                  return {
                    ...todo,
                    completed: !todo.completed,
                  };
                } else {
                  return todo;
                }
              }),
            };
          } else {
            return list;
          }
        }),
      };

    case ADD_TODO + SUCCESS:
      return {
        lists: listStates.lists.map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              todos: [...list.todos, payload.todo],
            };
          } else {
            return list;
          }
        }),
      };

    case DELETE_TODO + SUCCESS:
      return {
        lists: listStates.lists.map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              todos: list.todos.filter((todo) => {
                if (todo.id !== payload.todoId) {
                  return true;
                }
                return false;
              }),
            };
          } else {
            return list;
          }
        }),
      };

    case EDIT_TODO + SUCCESS:
      return {
        lists: listStates.lists.map((list) => {
          if (list.id === payload.listId) {
            return {
              ...list,
              todos: list.todos.map((todo) => {
                if (todo.id === payload.todoId) {
                  return {
                    ...todo,
                    todoTitle: payload.data.todoTitle,
                    price: payload.data.todoPrice,
                    importance: payload.data.importance,
                  };
                } else {
                  return todo;
                }
              }),
            };
          } else {
            return list;
          }
        }),
      };

    default:
      return listStates;
  }
};
