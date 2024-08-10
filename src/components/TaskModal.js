import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

const TaskModal = ({ onClose, conference, lead, isConferenceTask }) => {
  const { tasks, setTasks } = useContext(AppContext);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    leadId: lead ? lead.id : null,
    conferenceId: conference ? conference.id : null,
    completed: false
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, taskData]);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add Task {isConferenceTask && `for ${conference.name}`}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskModal;
