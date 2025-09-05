import SearchBar from './SearchBar';
import Button from './Button';
import HeroImage from '../assets/HeroImage.jpg';
import { useState } from 'react';
import Logo from '../assets/Logo.png'; 

export default function Hero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section
      className="h-full relative bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900  via-primary-800 to-transparent"></div>

      {/* Content */}
      <nav className="relative z-10 flex justify-between items-center px-8 border-b-0 py-1">
        {/* Logo Section */}
        <div className="w-20 h-20 p-2">
          <img src={Logo} alt="Logo" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex md:items-center gap-6 text-white text-sm font-medium">
          <a href="#process" className="hover:text-primary-500 text-white">
            How it Works
          </a>
          <a href="#features" className="hover:text-primary-500 text-white">
            Features
          </a>
          <a href="#audience" className="hover:text-primary-500 text-white">
            Who it's For
          </a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-primary-800 border-primary-800 h-10 w-20"
            type="button"
          >
            Register
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white h-10 w-20"
            type="button"
          >
            Login
          </Button>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden absolute top-full left-0 w-full bg-primary-800 text-white text-sm font-medium`}
        >
          <div className="flex flex-col text-center gap-4 py-4">
            <a href="#process" className="hover:text-primary-500">
              How it Works
            </a>
            <a href="#features" className="hover:text-primary-500">
              Features
            </a>
            <a href="#audience" className="hover:text-primary-500">
              Who it's For
            </a>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary-800 text-white h-10 w-full"
              type="button"
            >
              Register
            </Button>
            <Button variant="outline" size="sm" className=" text-white h-10 w-full" type="button">
              Login
            </Button>
          </div>
        </div>
      </nav>
      <div className="relative z-10 grid grid-cols-4 h-full">
        <div className="col-span-3 py-14 px-8">
          <h1 className="text-white text-5xl font-medium pb-3">
            Know Your Laws. <br />
            Empower Your Rights.
          </h1>
          <p className="text-white font-light text-xl">
            MenyaLo transforms the Rwanda Law Gazette into a searchable, <br />
            readable, and AI-powered platform, connecting citizens, <br />
            startups, and legal experts through verified insights and <br />
            community support.
          </p>
          <div className="pt-10 w-full md:w-3/4 lg:w-1/2">
            <SearchBar
              placeholder="Search for laws, regulations, and legal topics..."
              className="w-full rounded-md"
            />
          </div>
          <div className="pt-6 w-full md:w-3/4 lg:w-1/2">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-primary-800 px-3 w-full sm:w-auto"
                type="button"
              >
                Explore Gazette
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary-800 text-white px-3 w-full sm:w-auto"
                type="button"
              >
                Ask AI
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary-800 text-white px-3 w-full sm:w-auto"
                type="button"
              >
                Find Firm
              </Button>
            </div>
            <p className="pt-3">
              <a href="" className="font-light text-white hover:underline hover:fo">
                Join as a verified firm
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
