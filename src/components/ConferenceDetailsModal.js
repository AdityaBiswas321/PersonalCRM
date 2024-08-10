import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import TaskModal from './TaskModal';

const ConferenceDetailsModal = ({ conference, onClose }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleAddTask = () => {
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
  };

  return (
    <div className="modal">
      <h2>Conference Details</h2>
      <p><strong>Name:</strong> {conference.name}</p>
      <p><strong>Start Date:</strong> {conference.startDate}</p>
      <p><strong>End Date:</strong> {conference.endDate}</p>
      <p><strong>Location:</strong> {conference.location}</p>
      <p><strong>Notes:</strong> {conference.notes}</p>

      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={onClose}>Close</button>

      {showTaskModal && (
        <TaskModal
          onClose={handleCloseTaskModal}
          conference={conference}
          isConferenceTask={true} // You can use this prop to differentiate tasks for leads vs. conferences
        />
      )}
    </div>
  );
};

export default ConferenceDetailsModal;
