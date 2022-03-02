import { SET_AUTHENTICATED } from './constants';
import { get, post } from './util/jsonFetch';

export function setAuthenticated (authenticated, key) {
  return { type: SET_AUTHENTICATED, authenticated, key };
}

export function register (email, name, password) {
  return () => post ('/api/register', { email, name, password });
}

export function login (email, password) {
  return async (dispatch) => {
    const res = await post ('/api/login', { email, password });
    if (res.status === 200) {
      dispatch (setAuthenticated (true, res.data.key));
    } else {
      throw res.status;
    }
  };
}

export function logout () {
  return async (dispatch) => {
    const res = await post ('/api/logout', {});
    if (res.status === 200) {
      dispatch (setAuthenticated (false, 0));
    } else {
      throw res.status;
    }
  };
}

export function verifyLogin () {
  return async (dispatch) => {
    const res = await get ('/api/verifylogin');
    if (res.status === 200) {
      dispatch (setAuthenticated (res.data.authenticated, res.data.key));
      return res.data.authenticated;
    } else {
      throw res.status;
    }
  };
}
