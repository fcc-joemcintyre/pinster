/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pin } from './api';

const initialState: Pin[] = [];

export const pinSlice = createSlice ({
  name: 'pin',
  initialState,
  reducers: {
    setPins: (
      state,
      { payload: pins }: PayloadAction<Pin[]>
    ) => {
      state = pins;
    },
  },
});

export const { setPins } = pinSlice.actions;
