import React, { useState } from 'react';
import Modal from 'react-modal';

const NewReportModal = ({ isOpen, onRequestClose }) => {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!dateRange.from || !dateRange.to) {
      alert('Please select a valid date range.');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Generating a ${reportType} report from ${dateRange.from} to ${dateRange.to}.`);
      onRequestClose();
    } catch (error) {
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Generate New Report"
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">Generate New Report</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          >
            <option value="summary">Summary</option>
            <option value="audit">Audit</option>
            <option value="data_privacy">Data Privacy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Range</label>
          <div className="flex gap-2 mt-1">
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <span className="self-center">to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onRequestClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          disabled={isGenerating}
        >
          Cancel
        </button>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </Modal>
  );
};

export default NewReportModal;