import { TrendingDown, TrendingUp } from 'lucide-react';
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
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
              title="Expenses"
              value={8000}
              change={-5}
              changeLabel="Since last month"
              icon={TrendingDown}
              trend="down"
              valuePrefix="$"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
