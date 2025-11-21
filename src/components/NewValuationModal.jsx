import React from 'react';

const NewValuationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-bold mb-4">New Valuation</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Request Date</label>
            <input type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewValuationModal;