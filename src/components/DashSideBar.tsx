import React, { useState, useEffect } from 'react';
import { Home, Bell, Users, FileText, Search, Settings, LogOut, Menu } from 'lucide-react';
import type { SidebarItem } from '../types/sidebartypes';
import { useNavigate, useLocation } from 'react-router-dom';

const routeToItem: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/users': 'users',
  // Add more routes if needed
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(
    routeToItem[location.pathname] || 'dashboard',
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActiveItem(routeToItem[location.pathname] || 'dashboard');
  }, [location.pathname]);

  const navigationItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'notification', label: 'Notification', icon: Bell },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === 'users') navigate('/users');
    if (itemId === 'dashboard') navigate('/dashboard');
    setOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-12 left-4 z-50 bg-white rounded-full p-2 shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={24} className="text-primary-800" />
      </button>
      <div
        className={`
          bg-white border-r border-gray-200 flex flex-col pt-28 pl-8 pr-8 h-screen z-40
          md:static md:w-64 md:translate-x-0
          fixed top-0 left-0 w-4/5 max-w-xs shadow-lg transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="w-full flex md:hidden justify-end pr-4">
          <button
            className="text-2xl text-gray-500 mt-2"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-primary-800 border-r-2 border-primary-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`mr-3 ${isActive ? 'text-primary-800' : 'text-gray-500'}`}
                    />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
          <button
            onClick={() => console.log('Logout clicked')}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut size={20} className="mr-3 text-gray-500" />
            Logout
          </button>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
