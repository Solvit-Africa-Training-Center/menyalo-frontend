import GeneralNav from '../components/GeneralNav';
import DashSideBar from '../components/DashSideBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-gray-50">
      <GeneralNav />
      <div className="flex">
        <DashSideBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
