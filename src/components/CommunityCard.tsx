import { useState } from 'react';
import type { CommunityPostType } from '../types/communitytypes';
import CommunityComment from './CommunityComment';
import InPuts from './InPuts';
import onfeed from '../assets/on-feed.png';
import { FaCommentDots } from 'react-icons/fa';
import { BiSolidUpvote } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import {
  useDeletePostMutation,
} from '../app/api/post/index';



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
};

export default function CommunityCard({
  post,
  openComments,
  onToggleComments,
  onAddComment,
  onUpvote,
}: Props) {
  const [comment, setComment] = useState('');
  const [deletePost] = useDeletePostMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="bg-white rounded-xl ">
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
      {/* Content */}
      <div className="text-[color:var(--color-primary-900)] text-sm mb-2">{post.content}</div>
      {/* Actions */}
      <div className="flex items-center gap-6 text-[color:var(--color-secondary-300)] text-xs mb-2">
        <span className="flex items-center gap-1" onClick={onUpvote}>
          <BiSolidUpvote /> {post.upvotes}
        </span>
        <button className="flex items-center gap-1 focus:outline-none" onClick={onToggleComments}>
          <FaCommentDots />
          {post.commentList?.length ?? 0}
        </button>
        <span className="cursor-pointer">reply</span>
        <span className="ml-auto cursor-pointer" onClick={() => setShowConfirm(true)}>
          •••
        </span>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete}>
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowConfirm(false)}
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
              <CommunityComment key={commentObj.id} comment={{ ...commentObj, postId: post.id }} />
            ))}
        </div>
      )}
    </div>
  );
}
