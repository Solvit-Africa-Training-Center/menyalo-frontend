import { apiSlice } from '../apiEntry';

// Helper function to get current user data
const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );
      return JSON.parse(jsonPayload);
    }

    const citizen = localStorage.getItem('citizen');
    if (citizen) {
      return JSON.parse(citizen);
    }

    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const replycommentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReply: builder.mutation({
      query: ({
        postId,
        commentId,
        content,
      }: {
        postId: string;
        commentId: string;
        content: string;
      }) => {
        const user = getCurrentUser();
        console.log('Add reply - User:', user);

        return {
          url: `/posts/${postId}/comments/${commentId}/replies`,
          method: 'POST',
          body: {
            content,
            authorId: user?.id || user?.userId,
            userId: user?.id || user?.userId,
          },
        };
      },
      invalidatesTags: (result, error, { postId, commentId }) => [
        { type: 'Comments', id: postId },
        { type: 'Comments', id: commentId },
        { type: 'Comments', id: 'LIST' },
      ],
    }),

    getreply: builder.query({
      query: ({ postId, commentId }: { postId: string; commentId: string }) => {
        console.log('Getting replies for:', { postId, commentId });
        return {
          url: `/posts/${postId}/comments/${commentId}/replies`,
          method: 'GET',
        };
      },
      transformResponse: (response: { data: any[]; message: string; success: boolean }) => {
        console.log('Get replies response:', response);
        return response?.data || [];
      },
      providesTags: (result, error, { postId, commentId }) => {
        const replies = result || [];
        return [
          { type: 'Comments', id: postId },
          { type: 'Comments', id: commentId },
          ...replies.map(({ id }: { id: string }) => ({
            type: 'Comments' as const,
            id,
          })),
        ];
      },
    }),

    deleteReply: builder.mutation({
      query: ({ postId, commentId, id }: { postId: string; commentId: string; id: string }) => {
        const user = getCurrentUser();
        console.log('Delete reply API call:', { postId, commentId, id, user });

        // Try different URL patterns based on common API structures
        const url = `/posts/${postId}/comments/${commentId}/replies/${id}`;
        console.log('Delete reply URL:', url);

        return {
          url,
          method: 'DELETE',
          body: {
            userId: user?.id || user?.userId,
            authorId: user?.id || user?.userId,
          },
        };
      },
      invalidatesTags: (result, error, { postId, commentId, id }) => [
        { type: 'Comments', id: postId },
        { type: 'Comments', id: commentId },
        { type: 'Comments', id },
        { type: 'Comments', id: 'LIST' },
      ],
    }),

    updateReply: builder.mutation({
      query: ({
        postId,
        commentId,
        id,
        content,
      }: {
        postId: string;
        commentId: string;
        id: string;
        content: string;
      }) => {
        const user = getCurrentUser();
        return {
          url: `/posts/${postId}/comments/${commentId}/replies/${id}`,
          method: 'PUT',
          body: {
            content,
            userId: user?.id || user?.userId,
            authorId: user?.id || user?.userId,
          },
        };
      },
      invalidatesTags: (result, error, { postId, commentId, id }) => [
        { type: 'Comments', id: postId },
        { type: 'Comments', id: commentId },
        { type: 'Comments', id },
        { type: 'Comments', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useAddReplyMutation,
  useDeleteReplyMutation,
  useUpdateReplyMutation,
  useGetreplyQuery,
} = replycommentApi;
