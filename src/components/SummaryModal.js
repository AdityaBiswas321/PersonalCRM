import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

const SummaryModal = ({ lead, onClose }) => {
  const { leads, setLeads } = useContext(AppContext);
  const [summary, setSummary] = useState(lead.summary || '');

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedLeads = leads.map((l) =>
      l.id === lead.id ? { ...l, summary: summary } : l
    );
    setLeads(updatedLeads);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add Summary for {lead.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Save Summary</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default SummaryModal;
