import React, { useState } from 'react';
import { HiPlus, HiSearch, HiFilter, HiDownload, HiUpload } from 'react-icons/hi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import { StatusBadge } from '../components/common/Badge';
import Pagination from '../components/common/Pagination';

// Mock data for demonstration
const mockInventory = [
  {
    id: 1,
    sku: 'SKU-001',
    name: 'Product A',
    category: 'Electronics',
    quantity: 150,
    reorderPoint: 50,
    status: 'in-stock',
    location: 'Warehouse A',
    lastUpdated: '2024-02-15',
  },
  {
    id: 2,
    sku: 'SKU-002',
    name: 'Product B',
    category: 'Clothing',
    quantity: 25,
    reorderPoint: 30,
    status: 'low-stock',
    location: 'Warehouse B',
    lastUpdated: '2024-02-14',
  },
  // Add more mock inventory items as needed
];

const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    {
      key: 'sku',
      label: 'SKU',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
      render: (row) => (
        <span className={row.quantity <= row.reorderPoint ? 'text-red-600' : ''}>
          {row.quantity}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button size="sm" onClick={() => setSelectedItem(row)}>
            View
          </Button>
          <Button size="sm" variant="secondary">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const handleAddItem = (data) => {
    // Handle adding new inventory item
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Inventory
        </h1>
        <div className="flex space-x-4">
          <Button variant="secondary">
            <HiDownload className="w-5 h-5 mr-2" />
            Export
          </Button>
          <Button variant="secondary">
            <HiUpload className="w-5 h-5 mr-2" />
            Import
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <HiPlus className="w-5 h-5 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<HiSearch className="w-5 h-5 text-gray-400" />}
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothing', label: 'Clothing' },
              { value: 'furniture', label: 'Furniture' },
            ]}
            leftIcon={<HiFilter className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </Card>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Total Items
              </h3>
              <p className="text-2xl font-semibold text-purple-600">1,234</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Low Stock Items
              </h3>
              <p className="text-2xl font-semibold text-yellow-600">12</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Out of Stock
              </h3>
              <p className="text-2xl font-semibold text-red-600">5</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Value
              </h3>
              <p className="text-2xl font-semibold text-green-600">$45,678</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <Table
          columns={columns}
          data={mockInventory}
          onRowClick={setSelectedItem}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(mockInventory.length / pageSize)}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={mockInventory.length}
        />
      </Card>

      {/* Add Item Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Inventory Item"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="SKU" required />
          <Input label="Name" required />
          <Select
            label="Category"
            required
            options={[
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothing', label: 'Clothing' },
              { value: 'furniture', label: 'Furniture' },
            ]}
          />
          <Input label="Quantity" type="number" required />
          <Input label="Reorder Point" type="number" required />
          <Input label="Location" required />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddItem}>Add Item</Button>
        </div>
      </Modal>

      {/* Item Details Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title="Inventory Item Details"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  SKU
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedItem.sku}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedItem.name}
                </p>
              </div>
              {/* Add more item details as needed */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Inventory; 