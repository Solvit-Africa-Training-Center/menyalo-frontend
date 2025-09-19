import type { UserstableType } from '../../../types/userstabletypes';
import { apiSlice } from '../apiEntry';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserstableType[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    getUser: builder.query<UserstableType, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<UserstableType, Partial<UserstableType>>({
      query: (data) => ({
        url: '/users/add',
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation<UserstableType, { id: string; data: Partial<UserstableType> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
