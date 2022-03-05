/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  authenticated: boolean,
  key: number,
};

const initialState: User = {
  authenticated: false,
  key: 0,
};

export const userSlice = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (
      state,
      { payload: { authenticated, key } }: PayloadAction<User>
    ) => {
      state.authenticated = authenticated;
      state.key = key;
    },
  },
});

export const { setAuthenticated } = userSlice.actions;
