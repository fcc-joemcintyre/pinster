import { SET_PINS, SET_PIN_COUNT, CLEAR_PINNED, SET_PINNED } from './constants';
import { get, post, remove } from './util/jsonFetch';

// load pins from server
export function setPins () {
  return async (dispatch) => {
    const res = await get ('/api/pins');
    if (res.status === 200) {
      dispatch ({ type: SET_PINS, pins: res.data });
    } else {
      throw res.status;
    }
  };
}

// create a new pin
export function addPin (category, title, text, url) {
  return async (dispatch) => {
    const res = await post ('/api/pins', { category, title, text, url });
    if (res.status === 200) {
      dispatch (setPins ());
    } else {
      throw res.status;
    }
  };
}

// update an existing pin
export function updatePin (key, category, title, text, url) {
  return async (dispatch) => {
    const res = await post (`/api/pins/${key}`, { category, title, text, url });
    if (res.status === 200) {
      dispatch (setPins ());
    } else {
      throw res.status;
    }
  };
}

// delete an existing pin
export function deletePin (key) {
  return async (dispatch) => {
    const res = await remove (`/api/pins/${key}`);
    if (res.status === 200) {
      dispatch (setPins ());
    } else {
      throw res.status;
    }
  };
}

// on login/logout, update pinned value in each pin
export function updatePinned (loggingIn) {
  return async (dispatch) => {
    if (loggingIn === false) {
      dispatch ({ type: CLEAR_PINNED });
    } else {
      const list = await get ('/api/pinned');
      dispatch ({ type: SET_PINNED, list });
    }
  };
}

// toggle the pin status for the current user for one pin
export function togglePinned (pin) {
  return async (dispatch, getState) => {
    // must be authenticated, and creator is always pinned, cannot change pinned state
    const { user } = getState ();
    if ((user.authenticated === false) || (user.key === pin.creator)) {
      return;
    }
    const uri = `/api/pins/${pin.key}/pin/${pin.pinned ? 'false' : 'true'}`;
    const res = await post (uri, {});
    if (res.status === 200) {
      dispatch ({ type: SET_PIN_COUNT, key: res.data.key, count: res.data.count, pinned: res.data.pinned });
    } else {
      throw (res.status);
    }
  };
}
