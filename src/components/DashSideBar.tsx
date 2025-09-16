import React, { useState } from 'react';
import { Home, Bell, Users, FileText, Search, Settings, LogOut } from 'lucide-react';
import type { SidebarItem } from '../types/sidebartypes';

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('dashboard');

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
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col pt-28 pl-8 pr-8">
      {/* Main Navigation */}
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

      {/* Logout Section */}
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
  );
};

export default Sidebar;
