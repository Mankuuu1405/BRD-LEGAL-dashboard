import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewReviewForm = () => {
  const navigate = useNavigate();
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend API
    console.log('New Review Submitted:', { reviewTitle, reviewDescription, assignedTo });
    alert('Review submitted successfully!');
    navigate('/legal/agreement-approvals'); // Navigate back to the approvals page or a success page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Review</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700">Review Title</label>
            <input
              type="text"
              id="reviewTitle"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reviewDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="reviewDescription"
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assign To</label>
            <input
              type="text"
              id="assignedTo"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/legal/agreement-approvals')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReviewForm;
