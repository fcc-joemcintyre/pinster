import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  authenticated: boolean,
  key: number,
};

export type Pin = {
  key: number,
  title: string,
  text: string,
  category: string,
  url: string,
  creator: number,
  count: number,
  pinned: boolean,
};

export const api = createApi ({
  baseQuery: fetchBaseQuery ({ baseUrl: '/api' }),
  tagTypes: ['User', 'Pin'],
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

    getPins: build.query<Pin[], void> ({
      query: () => ({
        url: 'pins',
        method: 'GET',
      }),
      providesTags: (result = []) => [
        'Pin',
        ...result.map (({ key }) => ({ type: 'Pin' as const, key })),
      ],
    }),
    getPinsForCreator: build.query<Pin[], { key: number }> ({
      query: ({ key }) => ({
        url: `pins?creator=${key}`,
        method: 'GET',
      }),
      providesTags: (result = []) => [
        'Pin',
        ...result.map (({ key }) => ({ type: 'Pin' as const, key })),
      ],
    }),
    getPinsForPinner: build.query<Pin[], { key: number }> ({
      query: ({ key }) => ({
        url: `pins?pinner=${key}`,
        method: 'GET',
      }),
      providesTags: (result = []) => [
        'Pin',
        ...result.map (({ key }) => ({ type: 'Pin' as const, key })),
      ],
    }),
    getPin: build.query<Pin, { key: number }> ({
      query: ({ key }) => ({
        url: `pins/${key}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [
        { type: 'Pin' as const, result, key: arg.key },
      ],
    }),
    createPin: build.mutation<Pin, { title: string, category: string, text: string, url: string }> ({
      query: ({ title, category, text, url }) => ({
        url: 'pins',
        method: 'POST',
        body: { title, category, text, url },
      }),
      invalidatesTags: (result) => [{ type: 'Pin', key: result?.key }],
    }),
    updatePin: build.mutation<void, { key: number, title: string, category: string, text: string, url: string }> ({
      query: ({ key, title, category, text, url }) => ({
        url: `pins/${key}`,
        method: 'POST',
        body: { title, category, text, url },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Pin', key: arg.key }],
    }),
    deletePin: build.mutation<void, { key: number }> ({
      query: ({ key }) => ({
        url: `pins/${key}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Pin', key: arg.key }],
    }),
    togglePin: build.mutation<Pin, { key: number, action: boolean }> ({
      query: ({ key, action }) => ({
        url: `pins/${key}/pin/${action}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Pin', key: arg.key }],
    }),
  }),
});

export const {
  useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyLoginMutation,
  useCreatePinMutation, useDeletePinMutation, useGetPinQuery, useGetPinsQuery,
  useGetPinsForCreatorQuery, useGetPinsForPinnerQuery, useTogglePinMutation, useUpdatePinMutation,
} = api;
