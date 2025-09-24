import { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import CommunityCard from '../components/CommunityCard';
import InPuts from '../components/InPuts';
import type { CommunityPostType } from '../types/communitytypes';
import onfeed from '../assets/on-feed.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCircleNotch } from 'react-icons/fa';
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../app/api/post/index';
import { useGetCommentsQuery, useAddCommentMutation } from '../app/api/comments';


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

  // Ensure posts is always an array
 const posts: CommunityPostType[] = Array.isArray(data?.data)
   ? data.data.map((post: any) => ({
       ...post,
       author: {
         name: post.author?.name || post.author?.username || 'Unknown',
         avatarUrl: post.image_url || '',
         isVerified: false,
         tag: 'citizen',
       },
       commentList: Array.isArray(post.comments)
         ? post.comments.map((comment: any) => ({
             id: comment.id,
             author: {
               name: comment.author?.name || comment.author?.username || 'Unknown',
               avatarUrl: '', // or comment.author.avatarUrl if available
               isVerified: false,
               tag: 'citizen',
             },
             content: comment.content,
             createdAt: comment.createdAt || '', // fallback if missing
             upvotes: comment.upvotes || 0, // fallback if missing
             replies: [], // or map replies if available
           }))
         : [],
     }))
   : [];
  // Filter posts by search
  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleupdatePost = async (postId: string, updatedData: Partial<CommunityPostType>) => {
    await updatePost({ id: postId, data: updatedData });
    refetch();
  }


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

  // Upvoting
  const handleUpvote = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    await updatePost({
      id: postId,
      data: { upvotes: post.upvotes + 1 },
    });
    refetch();
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
                      onUpvote={() => handleUpvote(post.id)}
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
