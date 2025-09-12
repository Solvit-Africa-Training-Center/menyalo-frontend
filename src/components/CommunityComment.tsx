import { useState } from 'react';
import type { CommunityCommentType } from '../types/communitytypes';
import InPuts from './InPuts';
import { BiSolidUpvote } from 'react-icons/bi';
import profile from '../assets/profile.jpg';



export default function CommunityComment({ comment }: { comment: CommunityCommentType }) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState('');

  // You can implement reply logic here if you want to handle replies in state

  return (
    <div className="ml-8 mt-2 border-l border-[color:var(--color-custom-300)] pl-4">
      <div className="flex items-center gap-2">
        <img
          src={comment.author.avatarUrl}
          alt={comment.author.name}
          className="w-7 h-7 rounded-full object-cover"
        />
        <span className="font-semibold text-sm">{comment.author.name}</span>
        {comment.author.tag && (
          <span className="bg-[color:var(--color-style-500)] text-xs px-2 py-0.5 rounded">
            {comment.author.tag}
          </span>
        )}
        <span className="text-xs text-[color:var(--color-secondary-300)]">{comment.createdAt}</span>
      </div>
      <div className="ml-9 text-sm mt-1">{comment.content}</div>
      <div className="ml-9 flex items-center gap-4 text-xs text-[color:var(--color-secondary-300)] mt-1">
        <span><BiSolidUpvote /> {comment.upvotes}</span>
        <button className="cursor-pointer" onClick={() => setShowReply((v) => !v)}>
          reply
        </button>
      </div>
      {showReply && (
        <div className="ml-9 flex items-center gap-2 mt-2">
          <img src={profile} alt="User" className="w-6 h-6 rounded-full object-cover" />
          <InPuts
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            className="w-full"
            textarea
          />
          <button
            className="ml-2 px-3 py-1 bg-[color:var(--color-primary-800)] text-white rounded-full font-semibold text-xs"
            // onClick={...} // Implement reply logic if needed
          >
            Reply
          </button>
        </div>
      )}
      {/* Render replies recursively */}
      {comment.replies &&
        comment.replies.map((reply) => <CommunityComment key={reply.id} comment={reply} />)}
    </div>
  );
}
