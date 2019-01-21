import { push } from 'react-router-redux';

import {
  ADD_LIST,
  DELETE_LIST,
  START, SUCCESS, FAIL,
} from './constants';

export function addList(data) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_LIST + START,
      payload: { data },
    });

    dispatch({
      type: ADD_LIST + SUCCESS,
      payload: { data },
    });
    dispatch(push('/dashboard/lists/'));
  };
}

export function deleteList(data) {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_LIST + START,
      payload: { data },
    });

    const state = getState();
    const lists = state.user.lists.filter((list) => {
      return data.listId !== list.id;
    });

    dispatch({
      type: DELETE_LIST + SUCCESS,
      payload: { data, lists },
    });

    dispatch(push('/dashboard/lists/'));
  };
}
