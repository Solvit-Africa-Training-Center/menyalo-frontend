import Logodark from '../assets/Logodark.png';
import profile from '../assets/profile.jpg';
import { useState } from 'react';

export default function GeneralNav() {
  const [language, setLanguage] = useState('EN');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white text-primary-500 border-b-2 border-primary-800/20 flex items-center justify-between px-4 md:px-10 shadow">
      <div className="w-12 h-12 md:w-15 md:h-15 p-2">
        <img src={Logodark} alt="Logo" />
      </div>

      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:flex gap-8 font-bold absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none p-4 md:p-0`}
      >
        <a href="#" className="text-primary-700 font-medium pb-4 block md:inline">
          Feed
        </a>
        <a href="#" className="text-gray-600/75 hover:text-gray-900 pb-4 block md:inline">
          Firms
        </a>
        <a href="#" className="text-gray-600/75 hover:text-gray-900 pb-4 block md:inline">
          Organization
        </a>
        <a href="#" className="text-gray-600/75 hover:text-gray-900 pb-4 block md:inline">
          Community
        </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            {language}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10 text-primary-800 px-2 py-2">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageChange('EN')}
                >
                  English
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageChange('RW')}
                >
                  Kinyarwanda
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageChange('FR')}
                >
                  French
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <img src={profile} alt="Avatar" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
