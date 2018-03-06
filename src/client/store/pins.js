import { SET_PINS, SET_PIN_COUNT, CLEAR_PINNED, SET_PINNED } from './constants';

const initialState = [];

export function pins (state = initialState, action) {
  switch (action.type) {
    case SET_PINS:
      return action.pins.slice ();

    case SET_PIN_COUNT:
      return state.map ((pin) => {
        if (pin._id === action.id) {
          return Object.assign ({}, pin, { count: action.count, pinned: action.pinned });
        } else {
          return pin;
        }
      });

    case CLEAR_PINNED:
      return state.map (pin => Object.assign ({}, pin, { pinned: false }));

    case SET_PINNED:
      return state.map ((pin) => {
        const pinned = (action.list.indexOf (pin._id) !== -1);
        return Object.assign ({}, pin, { pinned });
      });

    default:
      return state;
  }
}
