import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Cards from '../components/Cards';
import { IoBook } from 'react-icons/io5';
import { GoLaw } from 'react-icons/go';
import { BsInfoSquareFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <hr className="border-gray-500 border-t-2" />
      <div className="bg-primary-800 text-white text-center flex flex-col justify-center items-center h-auto py-16 px-4">
        <h2 className="font-bold text-4xl md:text-5xl">Know Your Laws</h2>
        <p className="font-light text-md md:text-2xl pt-4">
          Access Rwandan laws in simple language, understand your rights, check penalties,
          <br /> and stay informed about legal changes that affect you.
        </p>
        <div className="pt-10 flex justify-center w-full">
          <SearchBar
            placeholder="Search for laws, regulations, and legal topics..."
            className="w-full md:w-1/2"
          />
        </div>
      </div>
      <div className="bg-secondary-400 flex flex-wrap gap-4 p-6 md:p-12">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 min-w-[300px]"
        >
          <Cards
            title="Simplified Legal Language"
            description="Complex legal terms translated into everyday language you can understand and apply."
            icon={
              <div className="grid place-items-center">
                <IoBook className="text-4xl text-primary-800" />
              </div>
            }
            className="text-white text-md bg-primary-500 flex-1 min-w-[300px]"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 min-w-[300px]"
        >
          <Cards
            title="Know Your Rights"
            description="Complex legal terms translated into everyday language you can understand and apply."
            icon={
              <div className="grid place-items-center">
                <GoLaw className="text-4xl text-primary-800" />
              </div>
            }
            className="text-white text-md bg-primary-500 flex-1 min-w-[300px]"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 min-w-[300px]"
        >
          <Cards
            title="Legal Updates"
            description="Complex legal terms translated into everyday language you can understand and apply."
            icon={
              <div className="grid place-items-center">
                <BsInfoSquareFill className="text-4xl text-primary-800" />
              </div>
            }
            className="text-white text-md bg-primary-500 flex-1 min-w-[300px]"
          />
        </motion.div>
      </div>
      <div className="bg-primary-800 py-8">
        <hr className="border-gray-500 border-t-2 mx-auto w-11/12" />
        <p className="text-gray-300 text-center pt-4">
          © 2025 Know Your Laws. All rights reserved.
        </p>
      </div>
    </div>
  );
}
