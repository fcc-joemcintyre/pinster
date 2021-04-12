import { SET_AUTHENTICATED } from './constants';
import { get, post } from './util/jsonFetch';

export function register (username, password) {
  return () => post ('/api/register', { username, password });
}

export function login (username, password) {
  return async (dispatch) => {
    const user = await post ('/api/login', { username, password });
    dispatch (setAuthenticated (true, user.id, user.username));
  };
}

export function logout () {
  return async (dispatch) => {
    dispatch (setAuthenticated (false, '', ''));
    try {
      await post ('/api/logout');
    } catch (err) {
      // ignore error
    }
  };
}

export function verifyLogin () {
  return async (dispatch) => {
    const data = await get ('/api/verifylogin');
    const id = data.authenticated ? data.user.id : '';
    const username = data.authenticated ? data.user.username : '';
    dispatch (setAuthenticated (data.authenticated, id, username));
    return data.authenticated;
  };
}

export function setAuthenticated (authenticated, id, username) {
  return { type: SET_AUTHENTICATED, authenticated, id, username };
}
