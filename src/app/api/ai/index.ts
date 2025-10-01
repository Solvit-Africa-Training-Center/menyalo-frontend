import { apiSlice } from '../apiEntry';

export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AIResponse {
  message: AIMessage;
  conversationId: string;
}

export const aiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<AIResponse, { message: string; conversationId?: string }>({
      query: ({ message, conversationId }) => ({
        url: '/ai/chat',
        method: 'POST',
        body: {
          message,
          conversationId,
        },
      }),
      invalidatesTags: ['AIConversations'],
    }),

    getConversations: builder.query<
      { data: AIConversation[]; success: boolean; message: string },
      void
    >({
      query: () => ({
        url: '/ai/conversations',
        method: 'GET',
      }),
      providesTags: ['AIConversations'],
    }),

    getConversation: builder.query<
      { data: AIConversation; success: boolean; message: string },
      string
    >({
      query: (conversationId) => ({
        url: `/ai/conversations/${conversationId}`,
        method: 'GET',
      }),
      providesTags: (result, error, conversationId) => {
        void result;
        void error;
        return [{ type: 'AIConversations', id: conversationId }];
      },
    }),

    createConversation: builder.mutation<
      { data: AIConversation; success: boolean; message: string },
      { title: string; firstMessage: string }
    >({
      query: ({ title, firstMessage }) => ({
        url: '/ai/conversations',
        method: 'POST',
        body: { title, firstMessage },
      }),
      invalidatesTags: ['AIConversations'],
    }),

    deleteConversation: builder.mutation<{ success: boolean; message: string }, string>({
      query: (conversationId) => ({
        url: `/ai/conversations/${conversationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AIConversations'],
    }),

    generateLawOfTheDay: builder.mutation<
      { data: { title: string; content: string }; success: boolean; message: string },
      void
    >({
      query: () => ({
        url: '/ai/law-of-the-day',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useDeleteConversationMutation,
  useGenerateLawOfTheDayMutation,
} = aiApi;
