import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart } from "../../components/Charts";
import BulkAssignModal from "../../components/BulkAssignModal";
import NewAgreementModal from "../../components/NewAgreementModal";
import { DocumentVerificationMetrics, } from "../../components/DashboardComponents";
import {
  DocumentTextIcon,
  ClockIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const AgreementApprovals = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);
  const [isNewAgreementModalOpen, setIsNewAgreementModalOpen] = useState(false);
  const [agreements, setAgreements] = useState([
    {
      id: "AGR-2101",
      type: "Loan Agreement",
      client: "Vikram Singh",
      amount: "₹450,000",
      submittedDate: "2025-11-03",
      priority: "High",
      status: "Pending",
      assignedTo: "Priya Mehta",
    },
    {
      id: "AGR-2102",
      type: "Collateral Agreement",
      client: "Sneha Kumar",
      amount: "₹750,000",
      submittedDate: "2025-11-03",
      priority: "Medium",
      status: "Under Review",
      assignedTo: "Rahul Sharma",
    },
    {
      id: "AGR-2103",
      type: "Property Mortgage",
      client: "Arun Patel",
      amount: "₹1,200,000",
      submittedDate: "2025-11-02",
      priority: "High",
      status: "Approved",
      assignedTo: "Priya Mehta",
    },
    {
      id: "AGR-2104",
      type: "Guarantor Agreement",
      client: "Maya Reddy",
      amount: "₹350,000",
      submittedDate: "2025-11-02",
      priority: "Low",
      status: "Pending",
      assignedTo: "Rahul Sharma",
    },
  ]);

  const handleNewAgreement = () => setIsNewAgreementModalOpen(true);
  const handleCloseNewAgreementModal = () => setIsNewAgreementModalOpen(false);
  const handleSaveNewAgreement = (newAgreement) => {
    setAgreements((prev) => [newAgreement, ...prev]);
    alert(`New agreement ${newAgreement.id} created successfully!`);
    handleCloseNewAgreementModal();
  };

  const handleBulkAssign = () => setIsBulkAssignModalOpen(true);
  const handleCloseBulkAssignModal = () => setIsBulkAssignModalOpen(false);
  const handlePerformBulkAssign = (selectedIds, assignee) => {
    setAgreements((prev) =>
      prev.map((agr) =>
        selectedIds.includes(agr.id)
          ? { ...agr, assignedTo: assignee, status: "Under Review" }
          : agr
      )
    );
    alert(
      `Successfully assigned ${selectedIds.length} agreements to ${assignee}.`
    );
    handleCloseBulkAssignModal();
  };

  const handleReassign = (id) => alert(`Reassigning agreement ${id}.`);
  const handleApprove = (id) => {
    setAgreements((prev) =>
      prev.map((agr) => (agr.id === id ? { ...agr, status: "Approved" } : agr))
    );
    alert(`Agreement ${id} approved.`);
  };
  const handleReject = (id) => {
    setAgreements((prev) =>
      prev.map((agr) => (agr.id === id ? { ...agr, status: "Rejected" } : agr))
    );
    alert(`Agreement ${id} rejected.`);
  };

  const filtered = agreements.filter((agr) => {
    const matchesFilter =
      filter === "all" || agr.status.toLowerCase() === filter;
    const matchesSearch =
      agr.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agr.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Agreement Approvals
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and approve legal agreements
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleNewAgreement}
          >
            New Agreement
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            onClick={handleBulkAssign}
          >
            Bulk Assign
          </button>
        </div>
      </div>

      <DocumentVerificationMetrics
        items={[
          {
            title: "Total Agreements",
            mainValue: 124,
            subText: "15 this month",
            trendValue: 15,
            trendType: "up",
            icon: DocumentTextIcon,
          },
          {
            title: "Pending Review",
            mainValue: 28,
            subText: "Average TAT: 2.3 days",
            trendValue: 5, // example trend %
            trendType: "up",
            icon: ClockIcon,
          },
          {
            title: "Approved",
            mainValue: 82,
            subText: "95% approval rate",
            trendValue: 92,
            trendType: "up",
            icon: CheckBadgeIcon,
          },
          {
            title: "High Priority",
            mainValue: 12,
            subText: "Requires immediate attention",
            trendValue: -12,
            trendType: "down",
            icon: ExclamationTriangleIcon,
          },
        ]}
      />

      {/* Approval Timeline */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Approval Timeline (Last 7 Days)
        </h3>
        <BarChart
          data={{
            labels: [
              "Nov 1",
              "Nov 2",
              "Nov 3",
              "Nov 4",
              "Nov 5",
              "Nov 6",
              "Nov 7",
            ],
            datasets: [
              {
                label: "Approved",
                data: [12, 15, 8, 14, 11, 13, 9],
                backgroundColor: "rgba(34,197,94,0.8)",
              },
              {
                label: "Pending",
                data: [5, 7, 4, 6, 8, 5, 7],
                backgroundColor: "rgba(234,179,8,0.8)",
              },
            ],
          }}
        />
      </div>

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
              <option value="all">All Agreements</option>
              <option value="pending">Pending</option>
              <option value="under review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <input
            type="search"
            placeholder="Search by client name or agreement ID..."
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
                  "Agreement ID",
                  "Type",
                  "Client",
                  "Amount",
                  "Submitted",
                  "Priority",
                  "Status",
                  "Assigned To",
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
              {filtered.map((agr) => (
                <tr key={agr.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{agr.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {agr.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {agr.client}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {agr.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {agr.submittedDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        agr.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : agr.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {agr.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        agr.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : agr.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : agr.status === "Under Review"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {agr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {agr.assignedTo}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {agr.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            navigate(`/legal/agreements/review/${agr.id}`)
                          }
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleReassign(agr.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Reassign
                        </button>
                      </>
                    )}
                    {agr.status === "Under Review" && (
                      <>
                        <button
                          onClick={() => handleApprove(agr.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(agr.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {(agr.status === "Approved" ||
                      agr.status === "Rejected") && (
                      <button
                        onClick={() =>
                          navigate(`/legal/agreements/${agr.id}`, {
                            state: { agreements },
                          })
                        }
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
                    colSpan={9}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No agreements match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="sm:hidden space-y-4">
          {filtered.map((agr) => (
            <div
              key={agr.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">{agr.type}</span>
                <span
                  className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                    agr.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : agr.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : agr.status === "Under Review"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {agr.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                <strong>ID:</strong> {agr.id}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Client:</strong> {agr.client}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Amount:</strong> {agr.amount}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Submitted:</strong> {agr.submittedDate}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Priority:</strong> {agr.priority}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Assigned To:</strong> {agr.assignedTo}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {agr.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/legal/agreements/review/${agr.id}`)
                      }
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleReassign(agr.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Reassign
                    </button>
                  </>
                )}
                {agr.status === "Under Review" && (
                  <>
                    <button
                      onClick={() => handleApprove(agr.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(agr.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </>
                )}
                {(agr.status === "Approved" || agr.status === "Rejected") && (
                  <button
                    onClick={() =>
                      navigate(`/legal/agreements/${agr.id}`, {
                        state: { agreements },
                      })
                    }
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

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Legal Review Guidelines
        </h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Verify all party details and signatures</li>
          <li>Check compliance with current regulations</li>
          <li>Validate terms and conditions</li>
          <li>Review collateral documentation</li>
          <li>Ensure proper witnessing and notarization</li>
        </ul>
      </div>

      <BulkAssignModal
        isOpen={isBulkAssignModalOpen}
        onClose={handleCloseBulkAssignModal}
        agreements={agreements.filter(
          (agr) => agr.status === "Pending" || agr.status === "Under Review"
        )}
        onBulkAssign={handlePerformBulkAssign}
      />

      <NewAgreementModal
        isOpen={isNewAgreementModalOpen}
        onClose={handleCloseNewAgreementModal}
        onSave={handleSaveNewAgreement}
      />
    </div>
  );
};

export default AgreementApprovals;
