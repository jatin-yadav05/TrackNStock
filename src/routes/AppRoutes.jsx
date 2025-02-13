import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Lazy load components
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Shipments = React.lazy(() => import('../pages/Shipments'));
const Inventory = React.lazy(() => import('../pages/Inventory'));
const Orders = React.lazy(() => import('../pages/Orders'));
const Analytics = React.lazy(() => import('../pages/Analytics'));
const Users = React.lazy(() => import('../pages/Users'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Support = React.lazy(() => import('../pages/Support'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Loading...</p>
    </div>
  </div>
);

// Page wrapper for animations
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="p-6"
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path="/shipments"
          element={
            <PageWrapper>
              <Shipments />
            </PageWrapper>
          }
        />
        <Route
          path="/inventory"
          element={
            <PageWrapper>
              <Inventory />
            </PageWrapper>
          }
        />
        <Route
          path="/orders"
          element={
            <PageWrapper>
              <Orders />
            </PageWrapper>
          }
        />
        <Route
          path="/analytics"
          element={
            <PageWrapper>
              <Analytics />
            </PageWrapper>
          }
        />
        <Route
          path="/users"
          element={
            <PageWrapper>
              <Users />
            </PageWrapper>
          }
        />
        <Route
          path="/settings"
          element={
            <PageWrapper>
              <Settings />
            </PageWrapper>
          }
        />
        <Route
          path="/support"
          element={
            <PageWrapper>
              <Support />
            </PageWrapper>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 