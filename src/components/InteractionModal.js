import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

const InteractionModal = ({ lead, onClose }) => {
  const { interactions, setInteractions } = useContext(AppContext);
  const [interactionData, setInteractionData] = useState({
    type: '',
    notes: ''
  });

  const handleChange = (e) => {
    setInteractionData({ ...interactionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInteraction = { ...interactionData, leadId: lead.id };
    setInteractions([...interactions, newInteraction]);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Interact with {lead.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={interactionData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={interactionData.notes}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Save Interaction</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default InteractionModal;
