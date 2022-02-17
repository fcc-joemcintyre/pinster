import { SET_AUTHENTICATED } from './constants';
import { get, post } from './util/jsonFetch';

export function register (email, name, password) {
  return () => post ('/api/register', { email, name, password });
}

export function login (email, password) {
  return async (dispatch) => {
    const user = await post ('/api/login', { email, password });
    dispatch (setAuthenticated (true, user.key));
  };
}

export function logout () {
  return async (dispatch) => {
    dispatch (setAuthenticated (false, 0));
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
    dispatch (setAuthenticated (data.authenticated, data.key));
    return data.authenticated;
  };
}

export function setAuthenticated (authenticated, key) {
  return { type: SET_AUTHENTICATED, authenticated, key };
}
