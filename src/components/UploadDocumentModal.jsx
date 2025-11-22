import React, { useState } from 'react';

const UploadDocumentModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [clientName, setClientName] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile && documentType && clientName) {
      onUpload(selectedFile, documentType, clientName);
      setSelectedFile(null);
      setDocumentType('');
      setClientName('');
      onClose();
    } else {
      alert('Please select a file, document type, and client name.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Upload New Document</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Document Type</label>
            <input
              type="text"
              id="documentType"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              placeholder="e.g., Property Document, Income Proof"
            />
          </div>
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              id="clientName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., Amit Kumar"
            />
          </div>
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Select Document</label>
            <input
              type="file"
              id="file-upload"
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-600
                hover:file:bg-blue-100"
              onChange={handleFileChange}
            />
            {selectedFile && <p className="mt-2 text-sm text-gray-500">Selected file: {selectedFile.name}</p>}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
