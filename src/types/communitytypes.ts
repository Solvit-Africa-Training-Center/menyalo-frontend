export type CommunityCommentType = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    isVerified?: boolean;
    tag?: string; // e.g. "Users"
  };
  content: string;
  createdAt: string; // e.g. "2d ago"
  upvotes: number;
  replies?: CommunityCommentType[];
};

export type CommunityPostType = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    isVerified: boolean;
  };
  tag: string; // e.g. "Firms"
  createdAt: string;
  content: string;
  upvotes: number;
  comments: number;
  hasUpvoted?: boolean;
  commentList?: CommunityCommentType[];
};
