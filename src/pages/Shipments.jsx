import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiSearch, HiFilter } from 'react-icons/hi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { StatusBadge } from '../components/common/Badge';
import Pagination from '../components/common/Pagination';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data for demonstration
const mockShipments = [
  {
    id: 1,
    trackingNumber: 'TN-001-2024',
    origin: 'New York, USA',
    destination: 'London, UK',
    status: 'in-transit',
    estimatedDelivery: '2024-02-20',
    customer: 'John Doe',
    coordinates: [51.505, -0.09], // London coordinates
  },
  {
    id: 2,
    trackingNumber: 'TN-002-2024',
    origin: 'Paris, France',
    destination: 'Berlin, Germany',
    status: 'delivered',
    estimatedDelivery: '2024-02-15',
    customer: 'Jane Smith',
    coordinates: [52.52, 13.405], // Berlin coordinates
  },
  // Add more mock shipments as needed
];

const Shipments = () => {
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const columns = [
    {
      key: 'trackingNumber',
      label: 'Tracking Number',
      sortable: true,
    },
    {
      key: 'origin',
      label: 'Origin',
      sortable: true,
    },
    {
      key: 'destination',
      label: 'Destination',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'estimatedDelivery',
      label: 'Est. Delivery',
      sortable: true,
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button size="sm" onClick={() => setSelectedShipment(row)}>
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
          Shipments
        </h1>
        <Button>
          <HiPlus className="w-5 h-5 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            placeholder="Search shipments..."
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
              { value: 'in-transit', label: 'In Transit' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            leftIcon={<HiFilter className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </Card>

      {/* Map View */}
      <Card title="Shipment Locations">
        <div className="h-[500px] relative rounded-lg overflow-hidden">
          <MapContainer
            center={[20, 0]} // Center the map at a global view
            zoom={2}
            className="h-full w-full"
            style={{ background: '#f8fafc' }}
            minZoom={2}
            maxBounds={[[-90, -180], [90, 180]]}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              noWrap={true}
            />
            {mockShipments.map((shipment) => (
              <Marker
                key={shipment.id}
                position={shipment.coordinates}
              >
                <Popup className="rounded-lg shadow-lg">
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900">{shipment.trackingNumber}</h3>
                    <div className="mt-2">
                      <StatusBadge status={shipment.status} />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      From: {shipment.origin}<br />
                      To: {shipment.destination}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Est. Delivery: {shipment.estimatedDelivery}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Card>

      {/* Shipments Table */}
      <Card>
        <Table
          columns={columns}
          data={mockShipments}
          onRowClick={setSelectedShipment}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(mockShipments.length / pageSize)}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalItems={mockShipments.length}
        />
      </Card>

      {/* Shipment Details Modal */}
      {selectedShipment && (
        <Modal
          isOpen={!!selectedShipment}
          onClose={() => setSelectedShipment(null)}
          title="Shipment Details"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tracking Number
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedShipment.trackingNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <StatusBadge status={selectedShipment.status} />
              </div>
              {/* Add more shipment details as needed */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Shipments; 