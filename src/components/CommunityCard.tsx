import { useState } from 'react';
import type { CommunityPostType } from '../types/communitytypes';
import CommunityComment from './CommunityComment';
import InPuts from './InPuts';
import onfeed from '../assets/on-feed.png';
import { FaCommentDots } from 'react-icons/fa';
import { BiSolidUpvote } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';





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

  const handleAdd = () => {
    if (!comment.trim()) return;
    onAddComment?.(comment);
    setComment('');
  };

  return (
    <div className="bg-white rounded-xl ">
      {/* Top Row */}
      <div className="flex items-center gap-2 mb-1">
        <img
          src={post.author.avatarUrl}
          alt={post.author.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-semibold text-[color:var(--color-primary-800)]">
          {post.author.name}
        </span>
        {post.author.isVerified && (
          <VscVerifiedFilled className="text-primary-800 text-xs size-6" />
        )}
        <span className="text-xs text-[color:var(--color-secondary-400)]">{post.tag}</span>
        <span className="ml-auto text-xs text-[color:var(--color-secondary-300)]">
          {post.createdAt}
        </span>
      </div>
      {/* Content */}
      <div className="text-[color:var(--color-primary-900)] text-sm mb-2">{post.content}</div>
      {/* Actions */}
      <div className="flex items-center gap-6 text-[color:var(--color-secondary-300)] text-xs mb-2">
        <span className="flex items-center gap-1" onClick={onUpvote}><BiSolidUpvote /> {post.upvotes}</span>
        <button className="flex items-center gap-1 focus:outline-none" onClick={onToggleComments}>
          <FaCommentDots />
          {post.comments}
        </button>
        <span className="cursor-pointer">reply</span>
        <span className="ml-auto cursor-pointer">•••</span>
      </div>
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
            post.commentList.map((comment) => (
              <CommunityComment key={comment.id} comment={comment} />
            ))}
        </div>
      )}
    </div>
  );
}
