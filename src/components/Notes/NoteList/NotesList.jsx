import React from 'react';
import Modal from "../Modal/Modal";
import NoteItem from "../Note/NoteItem/NoteItem";
import { ModalProvider, useModal } from '../ModalContext';
import styles from "./NotesList.module.css";

const NotesList = ({
  notes = [],
  onChecked,
  onDelete,
  onMouseEnter,
  onMouseLeave,
  onEdit,
}) => {
  const { isModalOpen, openModal, closeModal, confirmDelete } = useModal();

  const sortedNotes = notes.sort((a, b) => a.checked - b.checked);

  return (
    <div>
      <ul className={styles.notesList}>
        {sortedNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onChecked={onChecked}
            onDelete={() => openModal(note.id)}
            onEdit={onEdit}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => confirmDelete(onDelete)}
      />
    </div>
  );
};

const NotesListWithProvider = (props) => (
  <ModalProvider>
    <NotesList {...props} />
  </ModalProvider>
);

export default NotesListWithProvider;
