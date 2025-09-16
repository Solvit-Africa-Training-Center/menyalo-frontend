import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import menyaloLogo from '../assets/Logodark.png';
import { Link } from 'react-router';

export default function AISideBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <FiMenu size={24} className="text-[color:var(--color-primary-800)]" />
      </button>

      {/* Sidebar for desktop and mobile drawer */}
      <aside
        className={`
          bg-white flex flex-col items-center py-6 z-40
          md:static md:w-56 md:min-h-screen md:translate-x-0
          fixed top-0 left-0 h-full w-4/5 max-w-xs transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Close button for mobile */}
        <div className="w-full flex md:hidden justify-end pr-4">
          <button
            className="text-2xl text-gray-500 mt-2"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        {/* Logo */}
        <div className="mb-8 mt-2 md:mt-0">
          <Link to="/">
            <img src={menyaloLogo} alt="Menyalo Logo" className="w-16 mx-auto" />
          </Link>
        </div>
        {/* Menu */}
        <nav className="flex flex-col gap-10 w-full px-8">
          <button className="flex items-center gap-3 text-base md:text-lg font-regular text-gray-600 hover:text-primary-800 transition hover:translate-x-1">
            <FaRegEdit className="text-[color:var(--color-primary-800)]  text-xl" />
            New chat
          </button>
          <button className="flex items-center gap-3 text-base md:text-lg font-regular text-gray-600 hover:text-primary-800 transition hover:translate-x-1">
            <MdOutlineLibraryBooks className="text-[color:var(--color-primary-800)] text-xl" />
            Library
          </button>
          <button className="flex items-center gap-3 text-base md:text-lg font-regular text-gray-600 hover:text-primary-800 transition hover:translate-x-1">
            <BsClockHistory className="text-[color:var(--color-primary-800)] text-xl" />
            Old chat
          </button>
        </nav>
      </aside>
      {/* Overlay for mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-primary-800 bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
