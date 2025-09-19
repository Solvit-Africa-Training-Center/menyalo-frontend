import { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import CommunityCard from '../components/CommunityCard';
import InPuts from '../components/InPuts';
import type { CommunityPostType } from '../types/communitytypes';
import profile from '../assets/profile.jpg';
import onfeed from '../assets/on-feed.png';

// Example data (replace avatarUrl with your real images)
const initialPosts: CommunityPostType[] = [
  {
    id: '1',
    author: {
      name: 'Live Aman',
      avatarUrl: profile,
      isVerified: false,
    },
    tag: 'Firms',
    createdAt: '2d ago',
    content:
      "Navigating the complex of property law can be Challenging.I've found that Understanding local Ordinance is key.",
    upvotes: 23,
    comments: 2,
    commentList: [
      {
        id: 'c1',
        author: {
          name: 'Eric manzi',
          avatarUrl: profile,
          tag: 'Users',
        },
        content:
          'Aman your right about that\nNavigating the complex of property law can be Challenging.',
        createdAt: '2d ago',
        upvotes: 23,
      },
    ],
  },
  {
    id: '2',
    author: {
      name: 'Legal Solutions Inc.',
      avatarUrl: profile,
      isVerified: true,
    },
    tag: 'Firms',
    createdAt: '2d ago',
    content:
      "Navigating the complex of property law can be Challenging.I've found that Understanding local Ordinance is key.",
    upvotes: 23,
    comments: 2,
    commentList: [
      {
        id: 'c2',
        author: {
          name: 'Manzi Alexs',
          avatarUrl: profile,
          tag: 'Users',
        },
        content:
          'Local ordinances make property law real by shaping how land can be owned, used, and developed',
        createdAt: '2d ago',
        upvotes: 23,
      },
      {
        id: 'c3',
        author: {
          name: 'Kamari kiki',
          avatarUrl: profile,
          tag: 'Users',
        },
        content: 'This is great advice. Checking local laws first is key',
        createdAt: '2d ago',
        upvotes: 23,
        replies: [
          {
            id: 'c4',
            author: {
              name: 'Kamari kiki',
              avatarUrl: profile,
              tag: 'Users',
            },
            content: 'This is great advice. Checking local laws first is key',
            createdAt: '2d ago',
            upvotes: 23,
          },
        ],
      },
    ],
  },
];

export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [openComments, setOpenComments] = useState<string | null>(null);

  // Filter posts by search if needed
  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Add new post
  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now().toString(),
        author: {
          name: 'Current User',
          avatarUrl: profile,
          isVerified: false,
        },
        tag: 'Firms',
        createdAt: 'now',
        content: newPost,
        upvotes: 0,
        comments: 0,
        commentList: [],
      },
      ...posts,
    ]);
    setNewPost('');
  };

  //upvoting
  const handleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post)),
    );
  };

  // Add new comment to a post
  const handleAddComment = (postId: string, comment: string) => {
    if (!comment.trim()) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentList: [
                ...(post.commentList || []),
                {
                  id: Date.now().toString(),
                  author: {
                    name: 'Current User',
                    avatarUrl: profile,
                    tag: 'Users',
                  },
                  content: comment,
                  createdAt: 'now',
                  upvotes: 0,
                },
              ],
            }
          : post,
      ),
    );
  };

  return (
    <Layout>
      <div className=" font-sans min-h-screen py-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 w-1/2">
            {/* Post input */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <img src={profile} alt="User" className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
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
                >
                  Post
                </button>
              </div>
            </div>
            {/* Posts in one card, separated by horizontal line */}
            <div className="bg-white  p-4">
              {filteredPosts.map((post, idx) => (
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
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <aside className="w-full md:w-80 flex-shrink-0">
            <div className="mb-6">
              <SearchBar placeholder="Search post" />
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
