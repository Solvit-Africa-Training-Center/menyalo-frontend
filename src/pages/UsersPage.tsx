import { TrendingDown, TrendingUp } from 'lucide-react';
import DashSiderBar from '../components/DashSideBar';
import GeneralNav from '../components/GeneralNav';
import StatsCard from '../components/StatsCard';
import UsersTable from '../components/UsersTable';
import { IoPersonAddSharp } from 'react-icons/io5';

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-style-500">
      <GeneralNav />
      <div className="flex flex-col md:flex-row">
        <DashSiderBar />
        <div className="flex-1 p-4 sm:p-6 pt-24 sm:pt-28 flex flex-col items-center justify-start">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-500 mb-4 self-start pl-0 sm:pl-24">
            Welcome Back
          </h1>
          {/* Responsive dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mb-4">
            <StatsCard
              title="Total Users"
              value={2234}
              change={15}
              changeLabel="Since last month"
              icon={IoPersonAddSharp}
              trend="up"
              valuePrefix="$"
              className="w-full"
            />
            <StatsCard
              title="Active Users"
              value={8000}
              change={-5}
              changeLabel="Since last month"
              icon={TrendingDown}
              trend="down"
              valuePrefix="$"
              className="w-full"
            />
            <StatsCard
              title="Admin"
              value={12000}
              change={10}
              changeLabel="System Administration"
              icon={TrendingUp}
              trend="up"
              valuePrefix="$"
              className="w-full"
            />
          </div>
          <div className="w-full max-w-5xl">
            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
}
