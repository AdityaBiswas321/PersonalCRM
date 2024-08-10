import React, { createContext, useState, useEffect } from 'react';
import { collection, addDoc, setDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [conferences, setConferences] = useState([]);

  // Fetch data from Firestore when the app loads
  useEffect(() => {
    const fetchLeads = async () => {
      const leadsCollection = collection(db, 'leads');
      const leadsSnapshot = await getDocs(leadsCollection);
      const leadsList = leadsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setLeads(leadsList);
    };

    const fetchConferences = async () => {
      const conferencesCollection = collection(db, 'conferences');
      const conferencesSnapshot = await getDocs(conferencesCollection);
      const conferencesList = conferencesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setConferences(conferencesList);
    };

    fetchLeads();
    fetchConferences();
  }, []);

  // Function to add a new lead to Firestore
  const addLead = async (lead) => {
    const docRef = await addDoc(collection(db, 'leads'), lead);
    setLeads([...leads, { ...lead, id: docRef.id }]);
  };

  // Function to add a new conference to Firestore
  const addConference = async (conference) => {
    const docRef = await addDoc(collection(db, 'conferences'), conference);
    setConferences([...conferences, { ...conference, id: docRef.id }]);
  };

  // Function to update a lead in Firestore
  const updateLead = async (updatedLead) => {
    await setDoc(doc(db, 'leads', updatedLead.id), updatedLead);
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  };

  // Function to update a conference in Firestore
  const updateConference = async (updatedConference) => {
    await setDoc(doc(db, 'conferences', updatedConference.id), updatedConference);
    setConferences((prevConferences) =>
      prevConferences.map((conf) => (conf.id === updatedConference.id ? updatedConference : conf))
    );
  };

  // Function to delete a lead from Firestore
  const deleteLead = async (id) => {
    await deleteDoc(doc(db, 'leads', id));
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  // Function to delete a conference from Firestore
  const deleteConference = async (id) => {
    await deleteDoc(doc(db, 'conferences', id));
    setConferences(conferences.filter((conf) => conf.id !== id));
  };

  return (
    <AppContext.Provider value={{
      leads,
      setLeads,
      tasks,
      setTasks,
      interactions,
      setInteractions,
      conferences,
      setConferences,
      addLead,
      addConference,
      updateLead,
      updateConference,
      deleteLead,
      deleteConference,
    }}>
      {children}
    </AppContext.Provider>
  );
};

