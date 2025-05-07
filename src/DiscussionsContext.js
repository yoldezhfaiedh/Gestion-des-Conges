// DiscussionsContext.js
import React, { createContext, useState } from 'react';

const DiscussionsContext = createContext();

export const DiscussionsProvider = ({ children }) => {
  const [discussions, setDiscussions] = useState([]); // Liste des discussions
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(null); // ID de la discussion sélectionnée

  // Fonction pour charger les discussions
  const loadDiscussions = async () => {
    // Logique pour charger les discussions depuis votre backend
  };

  // Fonction pour sélectionner une discussion
  const selectDiscussion = (discussionId) => {
    setSelectedDiscussionId(discussionId);
  };

  // Création de l'objet de valeur du contexte
  const contextValue = {
    discussions,
    setDiscussions,
    selectedDiscussionId,
    loadDiscussions,
    selectDiscussion,
  };

  return (
    <DiscussionsContext.Provider value={contextValue}>
      {children}
    </DiscussionsContext.Provider>
  );
};

export default DiscussionsContext;
