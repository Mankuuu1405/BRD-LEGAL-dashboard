import React, { useState } from 'react';
import Modal from 'react-modal';

const DownloadReportModal = ({ isOpen, onRequestClose, reportId }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Simulate API call to fetch blob
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate file download
      const blob = new Blob(['This is a dummy report file.'], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${reportId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      onRequestClose();
    } catch (error) {
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Download Report"
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">Confirm Download</h2>
      <p>Are you sure you want to download the report: <strong>{reportId}</strong>?</p>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          disabled={isDownloading}
        >
          Cancel
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
    </Modal>
  );
};

export default DownloadReportModal;