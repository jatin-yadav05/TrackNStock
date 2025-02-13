import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineShoppingCart,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi';

const menuItems = [
  { path: '/', icon: HiOutlineHome, name: 'Dashboard' },
  { path: '/shipments', icon: HiOutlineTruck, name: 'Shipments' },
  { path: '/inventory', icon: HiOutlineShoppingCart, name: 'Inventory' },
  { path: '/orders', icon: HiOutlineClipboardList, name: 'Orders' },
  { path: '/analytics', icon: HiOutlineChartBar, name: 'Analytics' },
  { path: '/users', icon: HiOutlineUsers, name: 'Users' },
  { path: '/settings', icon: HiOutlineCog, name: 'Settings' },
  { path: '/support', icon: HiOutlineQuestionMarkCircle, name: 'Support' },
];

const Sidebar = ({ isOpen }) => {
  return (
    <motion.aside
      initial={{ width: isOpen ? '16rem' : '5rem' }}
      animate={{ width: isOpen ? '16rem' : '5rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 z-50 h-screen bg-white dark:bg-black border-r border-gray-100 dark:border-gray-800"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 bg-gray-900 dark:bg-black">
          <img
            src="/logo.svg"
            alt="TrackNStock"
            className="w-8 h-8 text-white"
          />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="ml-3 text-xl font-bold text-white"
            >
              TrackNStock
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="ml-3 font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="flex flex-col p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-xl"
              src="https://ui-avatars.com/api/?name=Admin&background=000000&color=ffffff"
              alt="User avatar"
            />
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="ml-3"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  admin@tracknstock.com
                </p>
              </motion.div>
            )}
          </div>
          {isOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200"
            >
              View Profile
            </motion.button>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar; 