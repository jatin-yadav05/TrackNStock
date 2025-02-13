import React from 'react';
import { HiMenuAlt2, HiOutlineBell, HiOutlineMoon, HiOutlineSun, HiSearch } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

  return (
    <header className="z-40 fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] transition-all duration-300">
      <div className="mx-4 mt-4">
        <div className="backdrop-blur-xl bg-white/90 dark:bg-black/80 rounded-2xl shadow-soft-md dark:shadow-dark-md border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white lg:hidden focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                <HiMenuAlt2 className="w-6 h-6" />
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 h-10 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-gray-900 dark:focus:border-white dark:text-white transition-colors duration-200"
                  />
                  <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
                onClick={handleThemeToggle}
                aria-label="Toggle color mode"
              >
                {darkMode ? (
                  <HiOutlineSun className="w-5 h-5 text-gray-900 dark:text-white" />
                ) : (
                  <HiOutlineMoon className="w-5 h-5 text-gray-900 dark:text-white" />
                )}
              </button>

              {/* Notifications */}
              <button
                className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
                aria-label="Notifications"
              >
                <HiOutlineBell className="w-5 h-5 text-gray-900 dark:text-white" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-black dark:bg-white rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>

              {/* User Menu */}
              <button
                className="flex items-center focus:outline-none"
                aria-label="User menu"
              >
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-xl object-cover border-2 border-transparent hover:border-gray-900 dark:hover:border-white transition-colors duration-200"
                    src="https://ui-avatars.com/api/?name=Admin&background=000000&color=ffffff"
                    alt="User avatar"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 