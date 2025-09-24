export type CommunityCommentType = {
  postId: string;
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    isVerified?: boolean;
    tag?: string; // e.g. "User"
  };
  content: string;
  createdAt: string;
  upvotes: number;
  replies?: CommunityCommentType[];
};

export type CommunityPostType = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    isVerified: boolean;
    tag: string; // e.g. "Citizen", "Firm"
  };
  createdAt: string;
  title?: string;
  content: string;
  upvotes: number;
  hasUpvoted?: boolean;
  commentList: CommunityCommentType[];
};
