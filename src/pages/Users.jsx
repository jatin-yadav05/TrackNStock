import React, { useState } from 'react';
import { HiPlus, HiSearch, HiFilter } from 'react-icons/hi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import { StatusBadge } from '../components/common/Badge';
import Pagination from '../components/common/Pagination';

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-02-15 14:30',
    department: 'Management',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-02-15 12:45',
    department: 'Warehouse',
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'driver',
    status: 'inactive',
    lastLogin: '2024-02-14 09:15',
    department: 'Logistics',
  },
  // Add more mock users as needed
];

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (row) => (
        <span className="capitalize">{row.role}</span>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button size="sm" onClick={() => setSelectedUser(row)}>
            View
          </Button>
          <Button size="sm" variant="secondary">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const handleAddUser = (data) => {
    // Handle adding new user
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Users
        </h1>
        <Button onClick={() => setShowAddModal(true)}>
          <HiPlus className="w-5 h-5 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<HiSearch className="w-5 h-5 text-gray-400" />}
          />
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'driver', label: 'Driver' },
            ]}
            leftIcon={<HiFilter className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </Card>

      {/* Users Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Total Users
              </h3>
              <p className="text-2xl font-semibold text-purple-600">156</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Active Users
              </h3>
              <p className="text-2xl font-semibold text-green-600">142</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Inactive Users
              </h3>
              <p className="text-2xl font-semibold text-red-600">14</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Online Now
              </h3>
              <p className="text-2xl font-semibold text-blue-600">23</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <Table
          columns={columns}
          data={mockUsers}
          onRowClick={setSelectedUser}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(mockUsers.length / pageSize)}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={mockUsers.length}
        />
      </Card>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add User"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="Name" required />
          <Input label="Email" type="email" required />
          <Select
            label="Role"
            required
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'driver', label: 'Driver' },
            ]}
          />
          <Select
            label="Department"
            required
            options={[
              { value: 'management', label: 'Management' },
              { value: 'warehouse', label: 'Warehouse' },
              { value: 'logistics', label: 'Logistics' },
            ]}
          />
          <Input
            label="Password"
            type="password"
            required
            helperText="Minimum 8 characters"
          />
          <Input
            label="Confirm Password"
            type="password"
            required
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </div>
      </Modal>

      {/* User Details Modal */}
      {selectedUser && (
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title="User Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedUser.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedUser.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                  {selectedUser.role}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedUser.department}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <StatusBadge status={selectedUser.status} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Login
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedUser.lastLogin}
                </p>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Permissions
              </h4>
              <div className="space-y-2">
                {['View Dashboard', 'Manage Orders', 'Manage Inventory', 'Manage Users'].map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      checked={selectedUser.role === 'admin'}
                      readOnly
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-white">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Users; 