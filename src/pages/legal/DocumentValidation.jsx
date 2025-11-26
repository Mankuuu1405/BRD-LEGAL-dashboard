import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadDocumentModal from "../../components/UploadDocumentModal";
import {
  StatCard,
  DocumentVerificationMetrics,
} from "../../components/DashboardComponents";
import {
  DocumentDuplicateIcon,
  ClockIcon,
  EyeIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const DocumentValidation = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [documents, setDocuments] = useState([
    {
      id: "DOC-2101",
      name: "Property Sale Deed",
      type: "Property Document",
      client: "Amit Kumar",
      uploadDate: "2025-11-03",
      status: "Pending",
      issues: [],
    },
    {
      id: "DOC-2102",
      name: "Income Tax Returns",
      type: "Income Proof",
      client: "Priya Sharma",
      uploadDate: "2025-11-03",
      status: "Invalid",
      issues: ["Incomplete information", "Missing signatures"],
    },
    {
      id: "DOC-2103",
      name: "Bank Statements",
      type: "Financial Document",
      client: "Rahul Verma",
      uploadDate: "2025-11-02",
      status: "Valid",
      issues: [],
    },
    {
      id: "DOC-2104",
      name: "Collateral Agreement",
      type: "Legal Document",
      client: "Sneha Reddy",
      uploadDate: "2025-11-02",
      status: "Pending",
      issues: [],
    },
  ]);

  const filtered = documents.filter((doc) => {
    if (filter !== "all" && doc.status.toLowerCase() !== filter) return false;
    if (
      searchQuery &&
      !doc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !doc.client.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleValidate = (id) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, status: "Valid", issues: [] } : doc
      )
    );
    alert(`Document ${id} validated.`);
  };

  const handleReject = (id) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, status: "Invalid", issues: ["Rejected by legal team"] }
          : doc
      )
    );
    alert(`Document ${id} rejected.`);
  };

  const handleUploadDocument = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  const handleDocumentUpload = (file, type, client) => {
    const newDoc = {
      id: `DOC-${Math.floor(Math.random() * 10000)}`,
      name: file.name,
      type: type,
      client: client,
      uploadDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      issues: [],
    };
    setDocuments((prevDocs) => [newDoc, ...prevDocs]);
    alert(`Document ${file.name} uploaded successfully!`);
    handleCloseUploadModal();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Document Validation
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and validate submitted documents
          </p>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleUploadDocument}
        >
          Upload Document
        </button>
      </div>

      {/* Summary Cards */}
      <DocumentVerificationMetrics
        items={[
          {
            title: "Total Documents",
            mainValue: documents.length,
            subText: "New this week: 23",
            trendValue: 23,
            trendType: "up",
            icon: DocumentDuplicateIcon,
          },
          {
            title: "Pending Review",
            mainValue: documents.filter((doc) => doc.status === "Pending")
              .length,
            subText: "Average wait: 1.2 days",
            trendValue: 5, // example trend %
            trendType: "up",
            icon: EyeIcon,
          },
          {
            title: "Validated",
            mainValue: documents.filter((doc) => doc.status === "Valid").length,
            subText: "Success rate: 92%",
            trendValue: 92,
            trendType: "up",
            icon: CheckBadgeIcon,
          },
          {
            title: "Issues Found",
            mainValue: documents.filter((doc) => doc.status === "Invalid")
              .length,
            subText: "↓ 12% from last week",
            trendValue: -12,
            trendType: "down",
            icon: ExclamationTriangleIcon,
          },
        ]}
      />

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm text-gray-600">Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg w-full sm:w-auto"
            >
              <option value="all">All Documents</option>
              <option value="pending">Pending</option>
              <option value="valid">Valid</option>
              <option value="invalid">Invalid</option>
            </select>
          </div>
          <input
            type="search"
            placeholder="Search by document name, ID or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Table for large screens */}
        <div className="overflow-x-auto sm:block hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Document ID",
                  "Name",
                  "Type",
                  "Client",
                  "Upload Date",
                  "Status",
                  "Issues",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {doc.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.client}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.uploadDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        doc.status === "Valid"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "Invalid"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doc.issues.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {doc.issues.map((issue, idx) => (
                          <li key={idx} className="text-red-600">
                            {issue}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-green-600">No issues</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {doc.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleValidate(doc.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Validate
                        </button>
                        <button
                          onClick={() => handleReject(doc.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => navigate(`/legal/documents/${doc.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No documents match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="sm:hidden space-y-4">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">{doc.name}</span>
                <span
                  className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                    doc.status === "Valid"
                      ? "bg-green-100 text-green-800"
                      : doc.status === "Invalid"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                <strong>ID:</strong> {doc.id}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {doc.type}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Client:</strong> {doc.client}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Upload Date:</strong> {doc.uploadDate}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Issues:</strong>{" "}
                {doc.issues.length > 0 ? doc.issues.join(", ") : "No issues"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {doc.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleValidate(doc.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Validate
                    </button>
                    <button
                      onClick={() => handleReject(doc.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate(`/legal/documents/${doc.id}`)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Document Guidelines
        </h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>All documents must be in PDF format</li>
          <li>File size should not exceed 10MB</li>
          <li>Ensure all pages are clearly scanned</li>
          <li>Documents must contain required signatures and stamps</li>
          <li>Personal information should be clearly visible</li>
        </ul>
      </div>

      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onUpload={handleDocumentUpload}
      />
    </div>
  );
};

export default DocumentValidation;
