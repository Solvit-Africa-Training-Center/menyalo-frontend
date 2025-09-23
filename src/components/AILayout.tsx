import AISideBar from './AISideBar';
import GeneralNav from './GeneralNav';
// import AINavBar from './AINavBar';


export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[color:var(--color-style-500)] font-sans">
      {/* Sidebar */}
      <AISideBar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <GeneralNav />
        {/* Page Content */}
        <main className="flex-1 p-6 bg-[color:var(--color-style-500)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
