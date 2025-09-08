// import { BsFillTelephoneFill } from 'react-icons/bs';
// import { MdEmail } from 'react-icons/md';
// import { FaLocationDot } from 'react-icons/fa6';
// import { FaLinkedin } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaFacebookF } from 'react-icons/fa6';
// import { FaInstagram } from 'react-icons/fa';
import Logo from '../assets/Logo.png';
import Button from './Button';

export default function GeneralFoot() {
  return (
    <div className="bg-primary-900 text-white">
      <div className="bg-primary-900 text-white flex flex-col sm:flex-row justify-between px-8 sm:px-20 py-10 gap-15">
        {/* Logo Section */}
        <div className=" text-left sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 mx-auto sm:mx-0">
            <img src={Logo} alt="Logo" />
          </div>
          <p className="font-light mt-5 mb-5">
            Rwanda’s leading legal education platform-making laws simple and rights <br />{' '}
            accessible to all, in Kinyarwanda, English and French.
          </p>
          <div className="flex flex-col sm:flex-row justify-start gap-4 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-primary-800 px-24 text-left w-full sm:w-auto"
              type="button"
            >
              Your Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary-900 text-white px-4 text-left w-full sm:w-auto"
              type="button"
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Explore Section */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold mb-5">Explore</h3>
          <div className="block font-medium">
            <a href="#" className="text-white block font-light">
              Law Gazette
            </a>
            <a href="#" className="text-white block font-light">
              Find Firms
            </a>
            <a href="#" className="text-white block font-light">
              AI Assistant
            </a>
            <a href="#" className="text-white block font-light">
              Community
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold mb-5">About</h3>
          <div className="block font-medium">
            <a href="#" className="text-white block font-light">
              Who it's For
            </a>
            <a href="#" className="text-white block font-light">
              Features
            </a>
          </div>
        </div>

        {/* Legal Section */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold mb-5">Legal</h3>
          <div className="block font-medium">
            <a href="#" className="text-white block font-light">
              Terms of Service
            </a>
            <a href="#" className="text-white block font-light">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      {/* Divider and Footer Text */}
      <hr className="border-gray-700 border-t-2 mx-auto w-full pb-2" />
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left px-5 py-3">
        <div>
          <p className="text-gray-300 pb-2 font-light">© 2025 Know Your Laws. All rights reserved.</p>
        </div>
        <div className="font-light flex gap-3">
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}