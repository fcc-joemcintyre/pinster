import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { userSlice } from './userSlice';
import { pinSlice } from './pinSlice';

export const store = configureStore ({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice.reducer,
    pins: pinSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ().concat (api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
