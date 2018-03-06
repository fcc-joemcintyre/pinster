import { SET_AUTHENTICATED } from './constants';

const initialState = {
  authenticated: false,
  id: '',
  username: '',
};

export function user (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return Object.assign ({}, state, {
        authenticated: action.authenticated,
        id: action.id,
        username: action.username,
      });

    default:
      return state;
  }
}
