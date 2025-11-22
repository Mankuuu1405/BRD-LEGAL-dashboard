// pages/legal/DocumentDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Combined dataset
const demoDocuments = [
  { id: "DOC-2001", type: "Loan Agreement", status: "Under Review", priority: "High", submittedBy: "John Doe", reviewedBy: "N/A", tat: "1.8 days" },
  { id: "DOC-2002", type: "Property Papers", status: "Pending", priority: "Medium", submittedBy: "Jane Smith", reviewedBy: "N/A", tat: "2.0 days" },
  { id: "DOC-2003", type: "Collateral Docs", status: "Approved", priority: "High", submittedBy: "Alice Brown", reviewedBy: "Legal Team", tat: "1.5 days" },
  { id: "DOC-2004", type: "Income Proof", status: "Rejected", priority: "Low", submittedBy: "Bob White", reviewedBy: "Legal Team", tat: "2.5 days" },
  // New documents
  { id: 'DOC-2101', name: 'Property Sale Deed', type: 'Property Document', client: 'Amit Kumar', uploadDate: '2025-11-03', status: 'Pending', issues: [] },
  { id: 'DOC-2102', name: 'Income Tax Returns', type: 'Income Proof', client: 'Priya Sharma', uploadDate: '2025-11-03', status: 'Invalid', issues: ['Incomplete information', 'Missing signatures'] },
  { id: 'DOC-2103', name: 'Bank Statements', type: 'Financial Document', client: 'Rahul Verma', uploadDate: '2025-11-02', status: 'Valid', issues: [] },
  { id: 'DOC-2104', name: 'Collateral Agreement', type: 'Legal Document', client: 'Sneha Reddy', uploadDate: '2025-11-02', status: 'Pending', issues: [] },
];

const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doc = demoDocuments.find((d) => d.id === id);

  if (!doc) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Document not found</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate("/legal")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const statusColors = {
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    "Under Review": "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Valid: "bg-green-100 text-green-800",
    Invalid: "bg-red-100 text-red-800",
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">{doc.name || doc.type}</h1>

        {/* Status & Priority */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[doc.status]}`}>
            Status: {doc.status}
          </span>
          {doc.priority && (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColors[doc.priority]}`}>
              Priority: {doc.priority}
            </span>
          )}
        </div>

        {/* Document Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          {doc.id && <div><strong>Document ID:</strong> {doc.id}</div>}
          {doc.submittedBy && <div><strong>Submitted By:</strong> {doc.submittedBy}</div>}
          {doc.reviewedBy && <div><strong>Reviewed By:</strong> {doc.reviewedBy}</div>}
          {doc.tat && <div><strong>Average TAT:</strong> {doc.tat}</div>}
          {doc.client && <div><strong>Client:</strong> {doc.client}</div>}
          {doc.uploadDate && <div><strong>Upload Date:</strong> {doc.uploadDate}</div>}
        </div>

        {/* Issues (if any) */}
        {doc.issues && doc.issues.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Issues</h2>
            <ul className="list-disc list-inside text-gray-600">
              {doc.issues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes / Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Document Notes / Details</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate("/legal")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
