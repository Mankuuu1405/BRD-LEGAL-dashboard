import React from 'react';

const ViewPropertyDetailsModal = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'yellow',
      'In Progress': 'blue',
      'Completed': 'green',
      'pending': 'yellow',
      'in-progress': 'blue',
      'completed': 'green',
      'not-started': 'gray'
    };
    return colors[status] || 'gray';
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details: {property.name}</h2>
        
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Property ID: <span className="font-normal text-gray-900">{property.id}</span></p>
            <p className="text-sm font-medium text-gray-700">Type: <span className="font-normal text-gray-900">{property.type}</span></p>
            <p className="text-sm font-medium text-gray-700">Location: <span className="font-normal text-gray-900">{property.location}</span></p>
            <p className="text-sm font-medium text-gray-700">Assigned To: <span className="font-normal text-gray-900">{property.assignedTo}</span></p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Status: <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(property.status)}-100 text-${getStatusColor(property.status)}-800`}>{property.status}</span></p>
            <p className="text-sm font-medium text-gray-700">Priority: <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(property.priority)}-100 text-${getStatusColor(property.priority)}-800`}>{property.priority}</span></p>
            <p className="text-sm font-medium text-gray-700">Last Check: <span className="font-normal text-gray-900">{property.lastCheck}</span></p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Check Items:</h3>
          <ul className="space-y-2">
            {property.checkItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.item}</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(item.status)}-100 text-${getStatusColor(item.status)}-800`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyDetailsModal;