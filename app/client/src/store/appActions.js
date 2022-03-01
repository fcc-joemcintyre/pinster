import { SET_PINS, SET_PIN_COUNT, CLEAR_PINNED, SET_PINNED } from './constants';
import { get, post, remove } from './util/jsonFetch';

// get pins from server
export function setPins () {
  return async (dispatch) => {
    const pins = await get ('/api/pins');
    dispatch ({ type: SET_PINS, pins });
  };
}

// create a new pin
export function addPin (category, title, text, url) {
  return async (dispatch) => {
    await post ('/api/pins', { category, title, text, url });
    dispatch (setPins ());
  };
}

// update an existing pin
export function updatePin (key, category, title, text, url) {
  return async (dispatch) => {
    await post (`/api/pins/${key}`, { category, title, text, url });
    dispatch (setPins ());
  };
}

// delete an existing pin
export function deletePin (key) {
  return async (dispatch) => {
    await remove (`/api/pins/${key}`);
    dispatch (setPins ());
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
    const data = await post (uri);
    dispatch ({ type: SET_PIN_COUNT, key: data.key, count: data.count, pinned: data.pinned });
  };
}
