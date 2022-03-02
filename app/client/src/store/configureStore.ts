import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { user } from './user';
import { pins } from './pins';

const rootReducer = combineReducers ({ user, pins });

export default function configureStore (initialState) {
  return (createStore (rootReducer, initialState, applyMiddleware (thunk)));
}

export type RootState = ReturnType<typeof rootReducer>;
