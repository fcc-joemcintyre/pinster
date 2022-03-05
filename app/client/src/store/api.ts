import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  authenticated: boolean,
  key: number,
};

export const api = createApi ({
  baseQuery: fetchBaseQuery ({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    register: build.mutation<void, { email: string, name: string, password: string }> ({
      query: ({ email, name, password }) => ({
        url: 'register',
        method: 'POST',
        body: { email, name, password },
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation<User, { email: string, password: string }> ({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['User'],
    }),
    logout: build.mutation<void, void> ({
      query: () => ({
        url: 'logout',
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    verifyLogin: build.mutation<User, void> ({
      query: () => ({
        url: 'verifylogin',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyLoginMutation } = api;
