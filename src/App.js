import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import Leads from './components/Leads';
import Pipeline from './components/Pipeline';
import Interactions from './components/Interactions';
import Tasks from './components/Tasks';
import Reports from './components/Reports';
import TaskModal from './components/TaskModal';
import InteractionModal from './components/InteractionModal';
import LeadDetails from './components/LeadDetails'; // Import LeadDetails component
import { AppProvider } from './AppContext';
import Conferences from './components/Conferences';

function App() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  const handleAddTask = (lead) => {
    setCurrentLead(lead);
    setShowTaskModal(true);
  };

  const handleInteract = (lead) => {
    setCurrentLead(lead);
    setShowInteractionModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setShowInteractionModal(false);
    setCurrentLead(null);
  };

  return (
    <AppProvider>
      <Router>
        <div id="app">
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/conferences">Conferences</Link></li>
              <li><Link to="/contacts">Contacts</Link></li>
              <li><Link to="/leads">Leads</Link></li>
              <li><Link to="/pipeline">Pipeline</Link></li>
              <li><Link to="/interactions">Interactions</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/reports">Reports</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/leads" element={<Leads onAddTask={handleAddTask} onInteract={handleInteract} />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/interactions" element={<Interactions />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/leads/:id" element={<LeadDetails onInteract={handleInteract} />} /> {/* Add route for lead details */}
          </Routes>
        </div>
        {showTaskModal && <TaskModal lead={currentLead} onClose={handleCloseModal} />}
        {showInteractionModal && <InteractionModal lead={currentLead} onClose={handleCloseModal} />}
      </Router>
    </AppProvider>
  );
}

export default App;
