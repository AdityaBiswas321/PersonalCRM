import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

const Tasks = () => {
    
  const { tasks, setTasks, leads } = useContext(AppContext);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, taskData]);
    setTaskData({ title: '', description: '', dueDate: '' });
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div id="tasks">
      <h1>Task Management</h1>
      <form id="task-form" onSubmit={handleSubmit}>
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
      </form>
      <h2>Tasks List</h2>
      <div id="tasks-list">
        {tasks.map((task, index) => {
          const lead = leads.find((lead) => lead.id === task.leadId);
          return (
            <div key={index} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              {lead && (
                <>
                  <p><strong>Lead Information:</strong></p>
                  <p>Name: {lead.name}</p>
                  <p>Email: {lead.email}</p>
                  <p>Phone: {lead.phone}</p>
                  <p>Category: {lead.category}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
