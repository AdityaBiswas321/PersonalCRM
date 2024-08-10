import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

const Conferences = () => {
  const { conferences, addConference, updateConference, deleteConference } = useContext(AppContext);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    location: '',
    notes: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateConference(formData);
      setIsEditing(false);
    } else {
      addConference(formData);
    }
    setFormData({ id: '', name: '', startDate: '', endDate: '', location: '', notes: '' });
  };

  const handleEdit = (id) => {
    const conferenceToEdit = conferences.find(conf => conf.id === id);
    setFormData(conferenceToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    deleteConference(id);
  };

  return (
    <div id="conferences">
      <h1>Manage Potential Conferences</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Conference Name:</label>
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
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">{isEditing ? 'Update Conference' : 'Add Conference'}</button>
      </form>
      <h2>Upcoming Conferences</h2>
      <ul>
        {conferences.map((conference) => (
          <li key={conference.id}>
            <strong>{conference.name}</strong> - {conference.startDate} to {conference.endDate} - {conference.location}
            <p>{conference.notes}</p>
            <button onClick={() => handleEdit(conference.id)}>Edit</button>
            <button onClick={() => handleDelete(conference.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conferences;
