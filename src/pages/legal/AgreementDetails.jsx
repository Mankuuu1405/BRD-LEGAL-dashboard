import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const AgreementDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const agreements = location.state?.agreements || [];

  const agreement = agreements.find((agr) => agr.id === id);

  if (!agreement) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Agreement Not Found
        </h2>
        <p className="mt-2 text-gray-600">No agreement found with ID: {id}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/legal/agreements")}
        >
          Back to Agreements
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{agreement.type}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Agreement ID: {agreement.id}
          </p>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-sm text-gray-700">
            <strong>Client:</strong> {agreement.client}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Amount:</strong> {agreement.amount}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Submitted Date:</strong> {agreement.submittedDate}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Priority:</strong> {agreement.priority}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Status:</strong>
            <span
              className={`ml-2 px-2 inline-flex text-xs font-semibold rounded-full ${
                agreement.status === "Approved"
                  ? "bg-green-100 text-green-800"
                  : agreement.status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : agreement.status === "Under Review"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {agreement.status}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            <strong>Assigned To:</strong> {agreement.assignedTo}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          {agreement.status === "Pending" && (
            <>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Review
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                Reassign
              </button>
            </>
          )}
          {agreement.status === "Under Review" && (
            <>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Approve
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Reject
              </button>
            </>
          )}
          {(agreement.status === "Approved" ||
            agreement.status === "Rejected") && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => alert("Already finalized")}
            >
              View Details
            </button>
          )}
        </div>
      </div>

      {/* Additional Guidelines / Notes */}
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

      <button
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        onClick={() => navigate("/legal/agreements")}
      >
        Back to Agreements
      </button>
    </div>
  );
};

export default AgreementDetails;
