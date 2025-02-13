import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-300">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

          {/* Main Content */}
          <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
            {/* Navbar */}
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <main className="min-h-screen pt-28 pb-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-8xl mx-auto">
                <AnimatePresence mode="wait">
                  <AppRoutes />
                </AnimatePresence>
              </div>
            </main>
          </div>

          {/* Toast Notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-dark-200 dark:text-white',
              duration: 3000,
              style: {
                borderRadius: '0.75rem',
                background: '#333',
                color: '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;