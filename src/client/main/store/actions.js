import { SET_PINS, SET_PIN_COUNT, CLEAR_PINNED, SET_PINNED } from './constants';
import request from 'request';

// get pins from server
export function setPins () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.get (`${location.origin}/api/pins`, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          let pins = JSON.parse (body);
          dispatch ({ type: SET_PINS, pins: pins});
          resolve ();
        }
      });
    });
  };
}

// create a new pin
export function addPin (category, title, text, url) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let pin = {
        category: category,
        title: title,
        text: text,
        url: url
      };
      request.post ({url: `${location.origin}/api/pins`, json: pin}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setPins ());
          resolve ();
        }
      });
    });
  };
}

// update an existing pin
export function updatePin (_id, category, title, text, url) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let pin = {
        category: category,
        title: title,
        text: text,
        url: url
      };
      request.post ({url: `${location.origin}/api/pins/${_id}`, json: pin}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setPins ());
          resolve ();
        }
      });
    });
  };
}

// delete an existing pin
export function deletePin (_id) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.del ({url: `${location.origin}/api/pins/${_id}`}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setPins ());
          resolve ();
        }
      });
    });
  };
}

// on login/logout, update pinned value in each pin
export function updatePinned (loggingIn) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      if (loggingIn === false) {
        dispatch ({ type: CLEAR_PINNED });
      } else {
        request.get (`${location.origin}/api/pinned`, (err, res, body) => {
          if (err) {
            reject (err);
          } else if (res.statusCode !== 200) {
            reject (res.statusCode);
          } else {
            let list = JSON.parse (body);
            dispatch ({ type: SET_PINNED, list });
            resolve ();
          }
        });
      }
    });
  };
}

// toggle the pin status for the current user for one pin
export function togglePinned (pin) {
  return (dispatch, getState) => {
    return new Promise ((resolve, reject) => {
      // must be authenticated, and creator is always pinned, cannot change pinned state
      let user = getState ().user;
      if ((user.authenticated === false) || (user.id === pin.creator)) {
        return resolve ();
      }
      let uri = `${location.origin}/api/pins/${pin._id}/pin/${pin.pinned ? 'false' : 'true'}`;
      request.post (uri, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          body = JSON.parse (body);
          dispatch ({ type: SET_PIN_COUNT, id: body._id, count: body.count, pinned: body.pinned });
          resolve ();
        }
      });
    });
  };
}
