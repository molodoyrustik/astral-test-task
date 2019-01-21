import {
  START, SUCCESS, FAIL,
  TOGGLE_COMPLETED,
  DELETE_TODO,
  GET_TODOS,
  ADD_TODO,
  EDIT_TODO,
} from './constants';

export function getTodos() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_TODOS + START,
      payload: {},
    });

    dispatch({
      type: GET_TODOS + SUCCESS,
      payload: {},
    });
  };
}

export function changeCompleted(listId, todoId) {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_COMPLETED + START,
      payload: { todoId, listId },
    });

    dispatch({
      type: TOGGLE_COMPLETED + SUCCESS,
      payload: { todoId, listId },
    });
    dispatch(getTodos());
  };
}

export function addTodo(listId, todo) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TODO + START,
      payload: { listId, todo },
    });

    dispatch({
      type: ADD_TODO + SUCCESS,
      payload: { listId, todo },
    });
    dispatch(getTodos());
  };
}

export function deleteTodo(listId, todoId) {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_TODO + START,
      payload: { listId, todoId },
    });

    dispatch({
      type: DELETE_TODO + SUCCESS,
      payload: { listId, todoId },
    });
    dispatch(getTodos());
  };
}

export function editTodo(listId, todoId, data) {
  console.log(listId, todoId, data);
  return (dispatch, getState) => {
    dispatch({
      type: EDIT_TODO + START,
      payload: {
        listId,
        todoId,
        data,
      },
    });

    dispatch({
      type: EDIT_TODO + SUCCESS,
      payload: { listId, todoId, data },
    });
    dispatch(getTodos());
  };
}
