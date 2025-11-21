import React, { useState, useEffect } from 'react';

const FollowUpModal = ({ isOpen, onClose, followUp, onSave }) => {
  const [customer, setCustomer] = useState('');
  const [leadId, setLeadId] = useState('');
  const [nextFollowUp, setNextFollowUp] = useState('');
  const [owner, setOwner] = useState('');
  const [channel, setChannel] = useState('Call');
  const [status, setStatus] = useState('Pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (followUp) {
      setCustomer(followUp.customer);
      setLeadId(followUp.leadId);
      setNextFollowUp(followUp.nextFollowUp);
      setOwner(followUp.owner);
      setChannel(followUp.channel);
      setStatus(followUp.status);
      setNotes(followUp.notes);
    } else {
      setCustomer('');
      setLeadId('');
      setNextFollowUp('');
      setOwner('');
      setChannel('Call');
      setStatus('Pending');
      setNotes('');
    }
  }, [followUp]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: followUp?.id, customer, leadId, nextFollowUp, owner, channel, status, notes });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">{followUp ? 'Edit Follow-up' : 'New Follow-up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
              <input type="text" id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label htmlFor="leadId" className="block text-sm font-medium text-gray-700">Lead ID</label>
              <input type="text" id="leadId" value={leadId} onChange={(e) => setLeadId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label htmlFor="nextFollowUp" className="block text-sm font-medium text-gray-700">Next Follow-up Date</label>
              <input type="date" id="nextFollowUp" value={nextFollowUp} onChange={(e) => setNextFollowUp(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
              <input type="text" id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label htmlFor="channel" className="block text-sm font-medium text-gray-700">Channel</label>
              <select id="channel" value={channel} onChange={(e) => setChannel(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                <option>Call</option>
                <option>Email</option>
                <option>WhatsApp</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                <option>Pending</option>
                <option>Completed</option>
                <option>Overdue</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              {followUp ? 'Save Changes' : 'Create Follow-up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FollowUpModal;
