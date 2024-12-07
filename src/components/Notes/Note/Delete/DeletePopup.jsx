import React from 'react';
import styles from './DeletePopup.module.css';
import { connect } from 'react-redux';
import { deleteNote } from '../../../../redux/actions/notesActions';
import { deleteNoteFromDB } from '../../../../components/service/noteService';

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
  const handleDelete = () => {
    onDelete(noteId);
  };

  return (
    <div className={styles.deletePopup}>
      <button onClick={handleDelete} className={styles.deleteButton}>🗑</button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(DeletePopup);
