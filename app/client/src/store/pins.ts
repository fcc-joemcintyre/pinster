/* eslint-disable prefer-object-spread */
import { SET_PINS, SET_PIN_COUNT, CLEAR_PINNED, SET_PINNED } from './constants';

type Pin = {
  key: number,
};

const initialState: Pin[] = [];

export function pins (state = initialState, action) {
  switch (action.type) {
    case SET_PINS:
      return action.pins.slice ();

    case SET_PIN_COUNT:
      return state.map ((pin) => {
        if (pin.key === action.key) {
          return Object.assign ({}, pin, { count: action.count, pinned: action.pinned });
        } else {
          return pin;
        }
      });

    case CLEAR_PINNED:
      return state.map ((pin) => Object.assign ({}, pin, { pinned: false }));

    case SET_PINNED:
      return state.map ((pin) => {
        const pinned = (action.list.indexOf (pin.key) !== -1);
        return Object.assign ({}, pin, { pinned });
      });

    default:
      return state;
  }
}
