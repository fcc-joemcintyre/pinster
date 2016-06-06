import { SET_PINS, SET_PIN_COUNT, CLEAR_PINNED, SET_PINNED } from './constants';

let initialState = [];

export default function pins (state = initialState, action) {
  switch (action.type) {
    case SET_PINS:
      return action.pins.slice ();

    case SET_PIN_COUNT:
      let pins = state.map (pin => {
        if (pin._id === action.id) {
          return Object.assign (pin, {count: action.count, pinned: action.pinned});
        } else {
          return pin;
        }
      });
      return pins;

    case CLEAR_PINNED: {
      let pins = state.map (pin => {
        return Object.assign (pin, {pinned: false});
      });
      return (pins);
    }
    case SET_PINNED: {
      let pins = state.map (pin => {
        let pinned = (action.list.indexOf (pin._id) !== -1);
        return Object.assign (pin, {pinned: pinned});
      });
      return (pins);
    }
    default:
      return state;
  }
}

export function getPin (state, _id) {
  for (let pin of state.pins) {
    if (pin._id === _id) {
      return pin;
    }
  }
  return null;
}
