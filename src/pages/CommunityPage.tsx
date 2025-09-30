import { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import CommunityCard from '../components/CommunityCard';
import InPuts from '../components/InPuts';
import type { CommunityPostType } from '../types/communitytypes';
import onfeed from '../assets/on-feed.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCircleNotch } from 'react-icons/fa';
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../app/api/post/index';
import {  useAddCommentMutation } from '../app/api/comments';

import { useUpvotePostMutation} from '../app/api/upvote';


const getCurrentUserId = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode JWT token to get user info
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
      const decoded = JSON.parse(jsonPayload);
      return decoded.id || decoded.userId || decoded.sub;
    }

    // Fallback to localStorage citizen data
    const citizen = localStorage.getItem('citizen');
    if (citizen) {
      const parsed = JSON.parse(citizen);
      return parsed.id || parsed.userId;
    }

    return null;
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  }
};


export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [newPost, setNewPost] = useState('');
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [title, setTitle] = useState('');
const user = JSON.parse(localStorage.getItem('citizen') || '{}');
const avatarUrl = user.avatarUrl || '';
const userName = user.name || user.username || 'citizen';
  // API hooks
  const { data, isLoading, refetch } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addComment] = useAddCommentMutation();
  const [upvotePost] = useUpvotePostMutation();

  // Ensure posts is always an array
 const posts: CommunityPostType[] = Array.isArray(data?.data)
   ? data.data.map((post: any) => {
       return {
          id: post.id,
          title: post.title || '',
          content: post.content || '',
          createdAt: post.createdAt || new Date().toISOString(),
          // Convert upvotes array to count
          upvotes: Array.isArray(post.upvotes) ? post.upvotes.length : 0,
          author: {
            name: post.author?.name || post.author?.username || 'Unknown',
            avatarUrl: post.image_url || post.author?.avatarUrl || '',
            isVerified: post.author?.isVerified || false,
            tag: post.author?.role || post.author?.userType || 'citizen',
          },
          commentList: Array.isArray(post.comments)
            ? post.comments.map((comment: any) => ({
                id: comment.id,
                postId: post.id, // Add postId for comments
                author: {
                  name: comment.author?.name || comment.author?.username || 'Unknown',
                  avatarUrl: comment.author?.avatarUrl || '',
                  isVerified: comment.author?.isVerified || false,
                  tag: comment.author?.role || comment.author?.userType || 'citizen',
                },
                content: comment.content || '',
                createdAt: comment.createdAt || new Date().toISOString(),
                upvotes: Array.isArray(comment.upvotes) ? comment.upvotes.length : (comment.upvotes || 0),
                replies: comment.replies || [],
              }))
            : [],
        };
      })
   : [];
  // Filter posts by search
  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleupvote = async (postId: string) => {
    try {
      const userId = getCurrentUserId();

      if (!userId) {
        toast.error('Please log in to upvote posts');
        return;
      }

      await upvotePost({
        postID: postId, // Note: your API expects 'postID' not 'postId'
        userId: userId,
      }).unwrap();

      toast.success('Post upvoted successfully!');
      refetch();
    } catch (err: any) {
      console.error('Error upvoting post:', err);

      // Handle specific error messages
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error('Failed to upvote post. Please try again.');
      }
    }
  };


  // Add new post
const handlePost = async () => {
  if (!newPost.trim() || !title.trim()) return;
  try {
    await createPost({
      title,
      content: newPost,
    });
    toast.success('Post created successfully!');
    setNewPost('');
    setTitle('');
    refetch();
  } catch (err) {
    console.error('Error creating post:', err);
    toast.error('Failed to create post. Please try again.');
  }
};


  // Add new comment to a post
  const handleAddComment = async (postId: string, comment: string) => {
    if (!comment.trim()) return;
    try {
      await addComment({ postId, content: comment });
      toast.success('Comment added!');
      refetch();
    } catch (err) {
      console.error('Error adding comment:', err);
      toast.error('Failed to add comment.');
    }
  };

  return (
    <Layout>
      <div className="font-sans min-h-screen py-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 w-1/2">
            {/* Post input */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={userName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                    className="w-full mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                  <InPuts
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thought or ask a question"
                    className="w-full"
                    textarea
                  />
                </div>
                <button
                  className="ml-2 px-4 py-2 bg-[color:var(--color-primary-800)] text-white rounded-full font-semibold"
                  onClick={handlePost}
                  disabled={isLoading}
                >
                  Post
                </button>
              </div>
            </div>
            {/* Posts in one card, separated by horizontal line */}
            <div className="bg-white p-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <FaCircleNotch className="animate-spin text-primary-800 text-3xl" />
                </div>
              ) : (
                filteredPosts.map((post, idx) => (
                  <div key={post.id}>
                    <CommunityCard
                      post={post}
                      openComments={openComments === post.id}
                      onToggleComments={() =>
                        setOpenComments(openComments === post.id ? null : post.id)
                      }
                      onAddComment={(comment) => handleAddComment(post.id, comment)}
                      onUpvote={() => handleupvote(post.id)}
                      onPostUpdated={refetch} // Add this prop
                    />
                    {idx !== filteredPosts.length - 1 && (
                      <hr className="my-4 border-t border-primary-100" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Sidebar */}
          <aside className="w-full md:w-80 flex-shrink-0">
            {/* ...sidebar code unchanged... */}
            <div className="mb-6">
              <SearchBar placeholder="Search post" onSearch={(query) => console.log(query)} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <h3 className="font-semibold mb-2 text-[color:var(--color-primary-800)] text-sm">
                Top Contributes
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src={onfeed} className="w-7 h-7 rounded-full" alt="" />
                  <span className="font-medium text-sm">Divine Ingabire</span>
                  <span className="bg-[color:var(--color-style-500)] text-xs px-2 py-0.5 rounded">
                    User
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={onfeed} className="w-7 h-7 rounded-full" alt="" />
                  <span className="font-medium text-sm">Aline Muhoza</span>
                  <span className="bg-[color:var(--color-style-500)] text-xs px-2 py-0.5 rounded">
                    User
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={onfeed} className="w-7 h-7 rounded-full" alt="" />
                  <span className="font-medium text-sm">LexBridge Pattern</span>
                  <span className="bg-[color:var(--color-style-500)] text-xs px-2 py-0.5 rounded">
                    Cyber Law Firms
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <h3 className="font-semibold mb-2 text-[color:var(--color-primary-800)] text-sm">
                Suggested firms/Organizations
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <img src={onfeed} className="w-7 h-7 rounded-full" alt="" />
                  <span className="font-medium text-sm">Justice Law Group</span>
                  <span className="bg-[color:var(--color-style-500)] text-xs px-2 py-0.5 rounded">
                    Labor Law Firms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={onfeed} className="w-7 h-7 rounded-full" alt="" />
                  <span className="font-medium text-sm">CivicShield Legal</span>
                  <span className="bg-[color:var(--color-style-500)] text-xs px-2 py-0.5 rounded">
                    Organization
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-2 text-[color:var(--color-primary-800)] text-sm">
                Treding Legal Topics
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="text-[color:var(--color-primary-800)] font-medium hover:underline"
                >
                  #Property Law
                </a>
                <a
                  href="#"
                  className="text-[color:var(--color-primary-800)] font-medium hover:underline"
                >
                  #Family Law
                </a>
                <a
                  href="#"
                  className="text-[color:var(--color-primary-800)] font-medium hover:underline"
                >
                  #Business Law
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
