import React from 'react';
import {
  HiOutlineTruck,
  HiOutlineShoppingCart,
  HiOutlineClipboardList,
  HiOutlineCash,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const data = [
  { name: 'Jan', shipments: 400, orders: 240, amt: 2400 },
  { name: 'Feb', shipments: 300, orders: 139, amt: 2210 },
  { name: 'Mar', shipments: 200, orders: 980, amt: 2290 },
  { name: 'Apr', shipments: 278, orders: 390, amt: 2000 },
  { name: 'May', shipments: 189, orders: 480, amt: 2181 },
  { name: 'Jun', shipments: 239, orders: 380, amt: 2500 },
];

const statsCards = [
  {
    title: 'Total Shipments',
    value: '1,234',
    change: '+12.5%',
    icon: HiOutlineTruck,
    isPositive: true,
  },
  {
    title: 'Active Orders',
    value: '567',
    change: '+8.2%',
    icon: HiOutlineClipboardList,
    isPositive: true,
  },
  {
    title: 'Inventory Items',
    value: '890',
    change: '-2.4%',
    icon: HiOutlineShoppingCart,
    isPositive: false,
  },
  {
    title: 'Revenue',
    value: '$12,345',
    change: '+15.3%',
    icon: HiOutlineCash,
    isPositive: true,
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'shipment',
    title: 'New shipment created',
    description: 'Shipment #12345 has been created and is ready for pickup',
    time: '5 minutes ago',
    icon: HiOutlineTruck,
  },
  {
    id: 2,
    type: 'order',
    title: 'Order delivered',
    description: 'Order #67890 has been successfully delivered to the customer',
    time: '2 hours ago',
    icon: HiOutlineClipboardList,
  },
  {
    id: 3,
    type: 'location',
    title: 'Location updated',
    description: 'Shipment #34567 location has been updated',
    time: '4 hours ago',
    icon: HiOutlineLocationMarker,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <Button variant="primary">
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card
            key={stat.title}
            className="overflow-hidden"
          >
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <stat.icon className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.isPositive
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {' '}
                  from last month
                </span>
              </div>
              <div
                className={`absolute bottom-0 left-0 h-1 transition-all duration-300 ${
                  stat.isPositive
                    ? 'bg-black dark:bg-white'
                    : 'bg-gray-800 dark:bg-gray-200'
                }`}
                style={{ width: '60%' }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card title="Shipments & Orders Overview">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000000',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF',
                }}
              />
              <Area
                type="monotone"
                dataKey="shipments"
                stroke="#000000"
                fill="rgba(0, 0, 0, 0.1)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#4B5563"
                fill="rgba(75, 85, 99, 0.1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4"
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <activity.icon className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 