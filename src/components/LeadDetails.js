import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import TaskModal from './TaskModal';
import SummaryModal from './SummaryModal';

const LeadDetails = ({ onInteract }) => {
  const { id } = useParams();
  const { leads, tasks, setTasks, interactions } = useContext(AppContext);
  const lead = leads.find((lead) => lead.id === id);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  if (!lead) {
    return <div>Lead not found</div>;
  }

  const leadTasks = tasks.filter((task) => task.leadId === id).reverse();
  const leadInteractions = interactions.filter((interaction) => interaction.leadId === id).reverse();

  const handleAddTask = () => {
    setShowTaskModal(true);
  };

  const handleAddSummary = () => {
    setShowSummaryModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setShowSummaryModal(false);
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div id="lead-details">
      <h1>Lead Details</h1>
      <p><strong>Name:</strong> {lead.name}</p>
      <p><strong>Email:</strong> {lead.email}</p>
      <p><strong>Phone:</strong> {lead.phone}</p>
      <p><strong>Category:</strong> {lead.category}</p>
      <button onClick={() => onInteract(lead)}>Log Interaction</button>
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleAddSummary}>Add Summary</button>

      <h2>Summary</h2>
      <p>{lead.summary || 'No summary available'}</p>

      <h2>Tasks</h2>
      <ul>
        {leadTasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompletion(index)}
            />
            <strong>{task.title}</strong> - {task.description} (Due: {task.dueDate})
          </li>
        ))}
      </ul>

      <h2>Interaction Logs</h2>
      <ul>
        {leadInteractions.map((interaction, index) => (
          <li key={index}>
            <strong>{interaction.type}</strong> - {interaction.notes}
          </li>
        ))}
      </ul>

      {showTaskModal && <TaskModal lead={lead} onClose={handleCloseModal} />}
      {showSummaryModal && <SummaryModal lead={lead} onClose={handleCloseModal} />}
    </div>
  );
};

export default LeadDetails;
