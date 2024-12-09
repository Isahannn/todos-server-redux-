import React from 'react';
import { connect } from 'react-redux';
import { deleteNote } from '../../../../redux/actions/notesActions';
import { deleteNoteFromDB } from '../../../../components/service/noteService';
import { useModal } from '../../ModalContext';
import styles from './DeletePopup.module.css';

const mapDispatchToProps = (dispatch) => ({
  onDelete: async (noteId) => {
    try {
      await deleteNoteFromDB(noteId); 
      dispatch(deleteNote(noteId)); 
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }
});

const DeletePopup = ({ onDelete, noteId }) => {
  const { openModal } = useModal();

  const handleDeleteClick = () => {
    openModal(noteId);
  };

  return (
    <div className={styles.deletePopup}>
      <button onClick={handleDeleteClick} className={styles.deleteButton}>🗑</button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(DeletePopup);
