import { SET_AUTHENTICATED } from './constants';

const initialState = {
  authenticated: false,
  key: 0,
};

export function user (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return ({
        authenticated: action.authenticated,
        key: action.key,
      });

    default:
      return state;
  }
}
