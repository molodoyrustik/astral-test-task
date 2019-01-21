import axios from 'axios';
import { push } from 'react-router-redux';
import Cookies from 'js-cookie';

import {
  START, SUCCESS, FAIL,
  COMPONENT_PAGE_CLEAN_MESSAGE,
  COMPONENT_PAGE_MESSAGE_ERROR,
  COMPONENT_PAGE_MESSAGE_SUCCESS,
} from './constants';


export function handleError(message) {
  return (dispatch) => {
    dispatch({ type: COMPONENT_PAGE_MESSAGE_ERROR, message });
  };
}
export function cleanMessage() {
  return (dispatch) => {
    dispatch({ type: COMPONENT_PAGE_CLEAN_MESSAGE });
  };
}
export function handleMessage(message) {
  return (dispatch) => {
    dispatch({ type: COMPONENT_PAGE_MESSAGE_SUCCESS, message });
  };
}
