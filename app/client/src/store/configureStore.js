import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { user } from './user';
import { pins } from './pins';

export default function configureStore (initialState) {
  const rootReducer = combineReducers ({ user, pins });
  return (createStore (rootReducer, initialState, applyMiddleware (thunk)));
}
