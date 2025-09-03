import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

export default function GeneralFoot() {
  return (
    <div className="bg-primary-800 text-white">
      <div className="bg-primary-800 text-white flex flex-wrap justify-evenly px-4 sm:px-10 py-5">
        
        <div className="w-full sm:w-1/3 mb-5 sm:mb-0 text-center sm:text-left">
          <h3 className="font-semibold mb-5">About Us</h3>
          <p className="font-light mt-5">
            Rwanda’s leading legal education platform-making laws simple <br /> and rights
            accessible to all, in Kinyarwanda, English and French.
          </p>
          <div className="flex justify-center sm:justify-start items-center gap-4 mt-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-300 hover:text-white"
            >
              <FaFacebookF size={15} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-300 hover:text-white"
            >
              <FaXTwitter size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-300 hover:text-white"
            >
              <FaLinkedin size={15} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-300 hover:text-white"
            >
              <FaInstagram size={15} />
            </a>
          </div>
        </div>

        
        <div className="w-full sm:w-1/3 mb-5 sm:mb-0 text-center sm:text-left">
          <h3 className="font-semibold mb-5">Quick Links</h3>
          <div className="block font-medium">
            <a href="#" className="text-white block font-light">
              Feed
            </a>
            <a href="#" className="text-white block font-light">
              Firms
            </a>
            <a href="#" className="text-white block font-light">
              Organization
            </a>
            <a href="#" className="text-white block font-light">
              Community
            </a>
          </div>
        </div>

        <div className="w-full sm:w-1/3 text-center sm:text-left">
          <h3 className="font-semibold mb-5">Contact</h3>
          <div>
            <p className="flex justify-center sm:justify-start items-center gap-2 font-light">
              <BsFillTelephoneFill /> +250 7808 888 900
            </p>
            <p className="flex justify-center sm:justify-start items-center gap-2 font-light">
              <MdEmail /> menyalo@gmail.com
            </p>
            <p className="flex justify-center sm:justify-start items-center gap-2 font-light">
              <FaLocationDot /> Kigali, Rwanda
            </p>
          </div>
        </div>
      </div>

      {/* Divider and Footer Text */}
      <hr className="border-gray-500 border-t-2 mx-auto w-11/12 pb-2" />
      <p className="text-gray-300 text-center pb-2">© 2025 Know Your Laws. All rights reserved.</p>
    </div>
  );
}
