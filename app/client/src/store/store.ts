import { configureStore } from '@reduxjs/toolkit';
import { user } from './user';
import { pins } from './pins';

export const store = configureStore ({
  reducer: {
    user,
    pins,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
