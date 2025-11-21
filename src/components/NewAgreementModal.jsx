import React, { useState } from 'react';

const NewAgreementModal = ({ isOpen, onClose, onSave }) => {
  const [agreementType, setAgreementType] = useState('');
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');

  const legalTeamMembers = [
    'Priya Mehta',
    'Rahul Sharma',
    'Amit Singh',
    'Sneha Reddy',
  ];

  const handleSubmit = () => {
    if (agreementType && client && amount && assignedTo) {
      onSave({
        id: `AGR-${Math.floor(Math.random() * 10000)}`,
        type: agreementType,
        client: client,
        amount: `₹${parseFloat(amount).toLocaleString()}`,
        submittedDate: new Date().toISOString().slice(0, 10),
        priority: priority,
        status: 'Pending',
        assignedTo: assignedTo,
      });
      // Reset form fields
      setAgreementType('');
      setClient('');
      setAmount('');
      setPriority('Medium');
      setAssignedTo('');
      onClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Create New Agreement</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="agreementType" className="block text-sm font-medium text-gray-700">Agreement Type</label>
            <input
              type="text"
              id="agreementType"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={agreementType}
              onChange={(e) => setAgreementType(e.target.value)}
              placeholder="e.g., Loan Agreement"
            />
          </div>
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              id="client"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 500000"
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="priority"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assign To</label>
            <select
              id="assignedTo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Assignee</option>
              {legalTeamMembers.map((member) => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAgreementModal;
