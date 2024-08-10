import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { v4 as uuidv4 } from 'uuid';

const Leads = ({ onAddTask, onInteract }) => {
  const { leads, addLead, updateLead, deleteLead } = useContext(AppContext);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    category: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateLead(formData);
      setIsEditing(false);
    } else {
      addLead({ ...formData, id: uuidv4() });
    }
    setFormData({ id: '', name: '', email: '', phone: '', category: '' });
  };

  const handleEdit = (lead) => {
    setFormData(lead);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    deleteLead(id);
  };

  return (
    <div id="leads">
      <h1>Lead Management</h1>
      <form id="lead-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update Lead' : 'Add Lead'}</button>
      </form>
      <h2>Leads List</h2>
      <ul id="leads-list">
        {leads.map((lead) => (
          <li key={lead.id}>
            {lead.name} - {lead.email} - {lead.phone} - {lead.category}
            <button onClick={() => handleEdit(lead)}>Edit</button>
            <button onClick={() => handleDelete(lead.id)}>Delete</button>
            <button onClick={() => onAddTask(lead)}>Add Task</button>
            <Link to={`/leads/${lead.id}`}>
              <button>More Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leads;
