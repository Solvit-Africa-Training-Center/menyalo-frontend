import { useState } from 'react';
import type { CommunityPostType } from '../types/communitytypes';
import CommunityComment from './CommunityComment';
import InPuts from './InPuts';
import onfeed from '../assets/on-feed.png';
import { FaCommentDots } from 'react-icons/fa';
import { BiSolidUpvote } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { useDeletePostMutation, useUpdatePostMutation } from '../app/api/post/index';
import { toast } from 'react-toastify';

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

type Props = {
  post: CommunityPostType;
  openComments?: boolean;
  onToggleComments?: () => void;
  onAddComment?: (comment: string) => void;
  onUpvote?: () => void;
  onPostUpdated?: () => void; // Callback to refresh posts after update
};

export default function CommunityCard({
  post,
  openComments,
  onToggleComments,
  onAddComment,
  onUpvote,
  onPostUpdated,
}: Props) {
  const [comment, setComment] = useState('');
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title || '');
  const [editContent, setEditContent] = useState(post.content);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAdd = () => {
    if (!comment.trim()) return;
    onAddComment?.(comment);
    setComment('');
  };

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setIsLoading(true);
    deletePost(post.id)
      .unwrap()
      .then(() => {
        setShowConfirm(false);
        toast.success('Post deleted successfully!');
        onPostUpdated?.(); // Refresh posts
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
        toast.error(error?.data?.message || 'Failed to delete post');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleUpdatePost = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setIsUpdating(true);
    try {
      await updatePost({
        id: post.id,
        data: {
          title: editTitle,
          content: editContent,
        },
      }).unwrap();

      toast.success('Post updated successfully!');
      setIsEditing(false);
      setShowMenu(false);
      onPostUpdated?.(); // Refresh posts
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast.error(error?.data?.message || 'Failed to update post');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditTitle(post.title || '');
    setEditContent(post.content);
    setShowMenu(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(post.title || '');
    setEditContent(post.content);
  };

  return (
    <div className="bg-white rounded-xl">
      {/* Top Row */}
      <div className="flex items-center gap-2 mb-1">
        {post.author.avatarUrl ? (
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
            {post.author.name?.charAt(0).toUpperCase() || '?'}
          </div>
        )}
        <span className="font-semibold text-[color:var(--color-primary-800)]">
          {post.author.name}
        </span>
        {post.author.isVerified && (
          <VscVerifiedFilled className="text-primary-800 text-xs size-6" />
        )}
        <span className="text-xs text-[color:var(--color-secondary-400)]">{post.author.tag}</span>

        <span className="ml-auto text-xs text-[color:var(--color-secondary-300)]">
          {timeAgo(post.createdAt)}
        </span>
      </div>

      {/* Content - Show edit form if editing, otherwise show normal content */}
      {isEditing ? (
        <div className="mb-4">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Post title"
            className="w-full mb-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
          <InPuts
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Post content"
            className="w-full mb-2"
            textarea
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdatePost}
              disabled={isUpdating}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-xs"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isUpdating}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Show title if it exists */}
          {post.title && (
            <div className="font-semibold text-[color:var(--color-primary-800)] text-base mb-1">
              {post.title}
            </div>
          )}
          {/* Content */}
          <div className="text-[color:var(--color-primary-900)] text-sm mb-2">{post.content}</div>
        </>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 text-[color:var(--color-secondary-300)] text-xs mb-2">
        <span className="flex items-center gap-1 cursor-pointer" onClick={onUpvote}>
          <BiSolidUpvote /> {post.upvotes}
        </span>
        <button className="flex items-center gap-1 focus:outline-none" onClick={onToggleComments}>
          <FaCommentDots />
          {post.commentList?.length ?? 0}
        </button>
        <span className="cursor-pointer">reply</span>

        {/* Menu */}
        <div className="ml-auto relative">
          <span className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            •••
          </span>
          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10 min-w-[120px]">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-xs"
                onClick={handleStartEdit}
              >
                Edit
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 text-xs"
                onClick={() => {
                  setShowConfirm(true);
                  setShowMenu(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      {openComments && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-2">
            <img src={onfeed} alt="User" className="w-7 h-7 rounded-full object-cover" />
            <div className="flex-1">
              <InPuts
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full"
                textarea
              />
            </div>
            <button
              className="ml-2 px-3 py-1 bg-[color:var(--color-primary-800)] text-white rounded-full font-semibold text-xs"
              onClick={handleAdd}
            >
              Comment
            </button>
          </div>
          {post.commentList &&
            post.commentList.map((commentObj) => (
              <CommunityComment
                key={commentObj.id}
                comment={{ ...commentObj, postId: post.id }}
                postId={post.id} // Pass postId as prop
              />
            ))}
        </div>
      )}
    </div>
  );
}
