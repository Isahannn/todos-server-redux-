import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const openModal = (noteId) => {
    setSelectedNoteId(noteId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNoteId(null);
  };

  const confirmDelete = (onDelete) => {
    onDelete(selectedNoteId);
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, confirmDelete }}>
      {children}
    </ModalContext.Provider>
  );
};
