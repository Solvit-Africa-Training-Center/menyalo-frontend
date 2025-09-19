import { TrendingDown, TrendingUp, Eye } from 'lucide-react';
import DashSiderBar from '../components/DashSideBar';
import GeneralNav from '../components/GeneralNav';
import StatsCard from '../components/StatsCard';

export default function Dashboard() {
  return (
    <div>
      <GeneralNav />
      <div className="flex">
        <DashSiderBar />
        <div className="flex-1 p-6 pt-28 bg-style-500 flex flex-col items-center justify-start">
          <h1 className="text-3xl font-semibold text-gray-500 mb-4 self-start pl-24">
            Welcome Back
          </h1>

          {/* Top-centered dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            <StatsCard
              title="Total Users"
              value={2234}
              change={15}
              changeLabel="Since last month"
              icon={TrendingUp}
              trend="up"
              valuePrefix="$"
              className="w-full"
            />
            <StatsCard
              title="Content Articles"
              value={8000}
              change={-5}
              changeLabel="Since last month"
              icon={TrendingDown}
              trend="down"
              valuePrefix="$"
              className="w-full"
            />
          </div>

          {/* Charts and additional cards below the top two */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-6">
            {/* Incomplete Task Card */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-4">
                <span className="font-semibold text-gray-700">Incomplete Task</span>
                <Eye className="text-gray-400" />
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-2">
                  {/* Simple circular progress bar */}
                  <svg className="absolute top-0 left-0" width="96" height="96">
                    <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" className='shadow' />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#1e2c4a"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 14 / 20)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary-800">
                    14
                  </div>
                </div>
                <span className="text-gray-500">Out of 20</span>
                <div className="flex justify-between w-full mt-4 text-sm">
                  <div className="pr-2">
                    <span className="font-bold text-primary-700">100</span> Verified
                  </div>

                  <div className="pr-2">
                    <span className="font-bold text-gray-400">10</span> Unverified
                  </div>

                  <div className="pr-2">
                    <span className="font-bold text-yellow-500">20</span> Pending
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Rate Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center ">
              <div className="flex items-center justify-between w-full mb-4">
                <span className="font-semibold text-gray-700">Engagement Rate</span>
                <span className="font-bold">64.8%</span>
              </div>
              {/* Simple bar chart */}
              <div className="flex items-end justify-between w-full h-24 mt-2">
                {[2, 3, 1, 4, 3].map((value, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className="bg-primary-800 rounded w-6"
                      style={{ height: `${value * 20}px` }}
                    />
                    <span className="text-xs text-gray-400 mt-1">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}