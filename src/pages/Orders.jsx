import React, { useState } from 'react';
import { HiPlus, HiSearch, HiFilter, HiDownload } from 'react-icons/hi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import { StatusBadge } from '../components/common/Badge';
import Pagination from '../components/common/Pagination';

// Mock data for demonstration
const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORD-001-2024',
    customer: 'John Doe',
    date: '2024-02-15',
    total: 1299.99,
    status: 'processing',
    paymentStatus: 'paid',
    items: [
      { id: 1, name: 'Product A', quantity: 2, price: 499.99 },
      { id: 2, name: 'Product B', quantity: 1, price: 300.00 },
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
  },
  {
    id: 2,
    orderNumber: 'ORD-002-2024',
    customer: 'Jane Smith',
    date: '2024-02-14',
    total: 799.99,
    status: 'shipped',
    paymentStatus: 'paid',
    items: [
      { id: 3, name: 'Product C', quantity: 1, price: 799.99 },
    ],
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA',
    },
  },
  // Add more mock orders as needed
];

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    {
      key: 'orderNumber',
      label: 'Order Number',
      sortable: true,
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (row) => `$${row.total.toFixed(2)}`,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      sortable: true,
      render: (row) => <StatusBadge status={row.paymentStatus} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button size="sm" onClick={() => setSelectedOrder(row)}>
            View
          </Button>
          <Button size="sm" variant="secondary">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Orders
        </h1>
        <div className="flex space-x-4">
          <Button variant="secondary">
            <HiDownload className="w-5 h-5 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <HiPlus className="w-5 h-5 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<HiSearch className="w-5 h-5 text-gray-400" />}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'pending', label: 'Pending' },
              { value: 'processing', label: 'Processing' },
              { value: 'shipped', label: 'Shipped' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            leftIcon={<HiFilter className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </Card>

      {/* Order Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Total Orders
              </h3>
              <p className="text-2xl font-semibold text-purple-600">1,234</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Pending
              </h3>
              <p className="text-2xl font-semibold text-yellow-600">45</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Processing
              </h3>
              <p className="text-2xl font-semibold text-blue-600">28</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Completed
              </h3>
              <p className="text-2xl font-semibold text-green-600">892</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <Table
          columns={columns}
          data={mockOrders}
          onRowClick={setSelectedOrder}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(mockOrders.length / pageSize)}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={mockOrders.length}
        />
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order ${selectedOrder.orderNumber}`}
          size="lg"
        >
          <div className="space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {selectedOrder.customer}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Order Date
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {selectedOrder.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Shipping Address
              </h3>
              <p className="text-sm text-gray-900 dark:text-white">
                {selectedOrder.shippingAddress.street}<br />
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                {selectedOrder.shippingAddress.country}
              </p>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Order Items
              </h3>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {selectedOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  ${selectedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders; 