import { apiSlice } from '../apiEntry';


export const postApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<any, void>({
            query: () => ({
                url: '/posts',
                method: 'GET',
            }),
        }),
        getPost: builder.query<any, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET',
            }),
        }),
        createPost: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: '/posts',
                method: 'POST',
                body: data,
            }),
        }),
        updatePost: builder.mutation<any, { id: string; data: Partial<any> }>({
            query: ({ id, data }) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        deletePost: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApi;