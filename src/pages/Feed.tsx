import { useState } from 'react';
import FeedCard from '../components/FeedCard';
import Layout from '../components/Layout';
import { FaCheckCircle } from 'react-icons/fa';
import lowbook from '../assets/law-books.png';
import AICard from '../components/AICard';
import { FaBalanceScale, FaUserShield, FaBuilding, FaGavel, FaBook } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import feed from '../assets/on-feed.png';
import states from '../assets/states-woman.png';
const lawCategories = [
  {
    icon: <FaBook />,
    name: 'For You',
    description: 'Governs disputes between individuals and organizations.',
  },
  { icon: <FaCheckCircle />, name: 'Community' },

  {
    icon: <FaBalanceScale />,
    name: 'Corporate Law',
    description: 'Regulates business and corporate practices.',
  },
  {
    icon: <FaUserShield />,
    name: 'Intellectual Property',
    description: 'Protects inventions, trademarks, and creative works.',
  },
  {
    icon: <FaBuilding />,
    name: 'Real Estate Law',
    description: 'Deals with property ownership and transactions.',
  },
  {
    icon: <FaGavel />,
    name: 'Criminal Law',
    description: 'Addresses crimes and legal punishment.',
  },
  {
    icon: <FaBook />,
    name: 'Family Law',
    description: 'Covers marriage, divorce, and child custody.',
  },
];

const rightFirms = [
  {
    logo: 'src/assets/states-woman.png',
    name: 'Legal Solutions Inc.',
    subtitle: 'Specializes corporates law',
    verified: true,
  },
  {
    logo: 'src/assets/lebrige-firms.png',
    name: 'IP Guardians',
    subtitle: 'Expert intellectual property',
    verified: true,
  },
  {
    logo: 'src/assets/logoA.jpg',
    name: 'Family & Advocates',
    subtitle: 'Focus family and estatelaw',
    verified: true,
  },
  {
    logo: 'src/assets/on-feed.png',
    name: 'CivicShield Legal',
    subtitle: 'Corporate Law Firms',
    verified: true,
  },
];

const categories = lawCategories.map((cat) => cat.name);

export default function Feed() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <Layout>
      <div
        className="
          grid grid-cols-1
          lg:grid-cols-10
          h-auto
          min-h-screen
        "
      >
        {/* Left (main content) */}
        <div
          className="
            lg:col-span-7
            p-4
            lg:p-10
            h-auto
            lg:h-screen
            overflow-y-auto
            bg-white
          "
        >
          <div className="flex items-center gap-4 lg:gap-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`text-base font-normal whitespace-nowrap cursor-pointer transition-colors
                  ${
                    selectedCategory === cat
                      ? 'text-primary-800 font-semibold'
                      : 'text-secondary-300'
                  }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </span>
            ))}
            <span className="text-secondary-400 text-base font-normal">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </div>
          <hr className="border-primary-200 border-t-2 mb-4" />
          <AICard />
          <FeedCard
            firmLogo="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
            firmName="LexBridge  Patterns Firm"
            title="Navigating Startup Legal"
            description="A Guide entrepreneur on common legal and how to structure thier ventures for long term success ."
            image={lowbook}
            views="1.2k"
            comments={20}
            date="June 16,2025"
            isVerified={true}
            isBookmarked={false}
            onBookmark={() => alert('Bookmark clicked!')}
            onMoreOptions={() => alert('More options clicked!')}
          />
          <hr className="border-primary-200 border-t-2" />
          <FeedCard
            firmLogo={states}
            firmName="LexBridge  Patterns Firm"
            title="Navigating Startup Legal"
            description="A Guide entrepreneur on common legal and how to structure thier ventures for long term success ."
            image={feed}
            views="1.2k"
            comments={20}
            date="June 16,2025"
            isVerified={true}
            isBookmarked={false}
            onBookmark={() => alert('Bookmark clicked!')}
            onMoreOptions={() => alert('More options clicked!')}
          />
        </div>
        {/* Right (sidebar) */}
        <div
          className="
            lg:col-span-3
            p-4
            lg:p-8
            flex flex-col
            gap-6
            lg:gap-8
            bg-white
            h-auto
            lg:h-screen
            overflow-y-auto
          "
        >
          <SearchBar placeholder="Search for articles, firms, and more..." />
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {lawCategories.map((cat) => (
              <button
                key={cat.name}
                className="flex items-center gap-2 bg-secondary-400 text-secondary-50 px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-medium text-base hover:bg-primary-200 transition"
                style={{ minWidth: '100px' }}
              >
                <span className="text-primary-800 text-lg font-bold">+</span>
                {cat.name}
              </button>
            ))}
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-secondary-50">Recommended Firms</h1>
          {rightFirms.map((firm, idx) => (
            <div key={idx} className="flex items-start gap-3 lg:gap-4">
              <img
                src={firm.logo}
                alt={firm.name}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base lg:text-lg font-semibold text-gray-600">
                    {firm.name}
                  </span>
                  {firm.verified && <FaCheckCircle className="text-primary-800 text-base" />}
                </div>
                <div className="text-gray-400 text-sm lg:text-base -mt-1">{firm.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
