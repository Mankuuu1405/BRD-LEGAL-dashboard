import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardMetrics } from "../../components/DashboardComponents";
import { LineChart, BarChart, DoughnutChart } from "../../components/Charts";
import useApi from "./useApi";
import GenerateReportModal from "../../components/GenerateReportModal";

const fetchDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        metrics: [
          { title: "Pending Reviews", value: "28", trend: -5, color: "yellow" },
          { title: "Approved Today", value: "12", trend: 4.2, color: "green" },
          { title: "Average TAT", value: "1.2 days", trend: -8.5, color: "blue" },
          { title: "Compliance Score", value: "96%", trend: 2.1, color: "green" },
        ],
        recentDocuments: [
          { id: "DOC-2001", type: "Loan Agreement", status: "Under Review", priority: "High" },
          { id: "DOC-2002", type: "Property Papers", status: "Pending", priority: "Medium" },
          { id: "DOC-2003", type: "Collateral Docs", status: "Approved", priority: "High" },
          { id: "DOC-2004", type: "Income Proof", status: "Rejected", priority: "Low" },
        ],
      });
    }, 1000);
  });
};

const LegalDashboard = () => {
  const navigate = useNavigate();
  const { data: dashboardData, loading, error } = useApi(fetchDashboardData);
  const [isGenerateReportModalOpen, setGenerateReportModalOpen] = useState(false);

  const handleNewReview = () => navigate("/legal/new-review");

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error)
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  if (!dashboardData) return null;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Legal Dashboard</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-500">Document and Agreement Management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleNewReview}
          >
            Create New Review
          </button>
          <button
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            onClick={() => setGenerateReportModalOpen(true)}
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Metrics */}
      <DashboardMetrics items={dashboardData.metrics} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Left Column */}
  <div className="space-y-6">
    {/* Document Processing Timeline */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Document Processing Timeline</h3>
      <LineChart
        data={{
          labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
          datasets: [
            {
              label: "Processing Time (Days)",
              data: [1.8, 1.6, 1.5, 1.3, 1.2, 1.2],
              borderColor: "rgb(79, 70, 229)",
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              tension: 0.3,
            },
          ],
        }}
      />
    </div>

    {/* Review Status (New Section) */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Review Status</h3>
      <BarChart
        data={{
          labels: ["Drafting", "In Negotiation", "Ready for Sign-off"],
          datasets: [
            {
              label: "Number of Documents",
              data: [12, 7, 5], // Example data, can be dynamic
              backgroundColor: [
                "rgba(34,197,94,0.8)",
                "rgba(234,179,8,0.8)",
                "rgba(79,70,229,0.8)",
              ],
            },
          ],
        }}
      />
    </div>
  </div>

  {/* Right Column */}
  <div className="space-y-6">
    {/* Document Distribution */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Document Distribution</h3>
      <DoughnutChart
        data={{
          labels: ["Loan Agreements", "Property Papers", "Collateral Docs", "Income Proofs", "Other"],
          datasets: [
            {
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                "rgba(79, 70, 229, 0.8)",
                "rgba(34, 197, 94, 0.8)",
                "rgba(234, 179, 8, 0.8)",
                "rgba(239, 68, 68, 0.8)",
                "rgba(107, 114, 128, 0.8)",
              ],
            },
          ],
        }}
      />
    </div>

    {/* Compliance Score Trend (New Section) */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Compliance Score Trend</h3>
      <LineChart
        data={{
          labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
          datasets: [
            {
              label: "Compliance Score (%)",
              data: [92, 94, 95, 93, 96, 96], // Example trend data
              borderColor: "rgb(34, 197, 94)",
              backgroundColor: "rgba(34,197,94,0.1)",
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  </div>
</div>


      {/* Recent Documents Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Documents</h3>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto sm:block hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Document ID", "Type", "Status", "Priority", "Actions"].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        doc.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : doc.status === "Under Review"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        doc.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : doc.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {doc.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => navigate(`/legal/documents/${doc.id}`)}
                    >
                      Review
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => navigate(`/legal/documents/${doc.id}`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="sm:hidden p-4 space-y-4">
          {dashboardData.recentDocuments.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-900">{doc.type}</span>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    doc.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : doc.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {doc.priority}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                <strong>ID:</strong> {doc.id}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    doc.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : doc.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : doc.status === "Under Review"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {doc.status}
                </span>
              </p>

              <div className="mt-3 flex gap-3">
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => navigate(`/legal/documents/${doc.id}`)}
                >
                  Review
                </button>
                <button
                  className="text-gray-600 text-sm"
                  onClick={() => navigate(`/legal/documents/${doc.id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GenerateReportModal
        isOpen={isGenerateReportModalOpen}
        onClose={() => setGenerateReportModalOpen(false)}
      />
    </div>
  );
};

export default LegalDashboard;
