import React, { useState } from 'react';
import { connect } from 'react-redux';
import DeletePopup from '../Delete/DeletePopup';
import ChangePopup from '../Change/ChangePopup';
import styles from './NoteItem.module.css';
import { useNavigate } from 'react-router-dom';
import { deleteNote } from '../../../../redux/actions/notesActions';
import { deleteNoteFromDB } from '../../../../components/service/noteService';

const NoteItem = ({ note, onChecked, onDelete, onEdit, deleteNote }) => {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDeleteMenu(true);
    setShowEditMenu(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteMenu(false);
    setShowEditMenu(false);
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete note with id: ${id}`);
      await deleteNoteFromDB(id);
      deleteNote(id);
      console.log(`Successfully deleted note with id: ${id}`);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
    setShowDeleteMenu(false);
  };

  const handleEdit = (updatedNote) => {
    onEdit(updatedNote);
    setShowEditMenu(false);
  };

  const handleClick = (id) => {
    navigate(`/notes/${id}`);
  };

  return (
    <div
      className={styles.noteItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.noteHeader}>
        <input
          type="checkbox"
          checked={note.checked}
          onChange={() => onChecked(note.id)}
          className={styles.checkbox}
        />
        <div
          className={styles.noteDetails}
          onClick={() => handleClick(note.id)}
        >
          <span className={styles.noteName}>{note.name}</span>
          <div className={styles.noteDescription}>{note.description}</div>
          <div className={styles.noteSeverity}>
            {note.severity === 1
              ? 'Urgently'
              : note.severity === 2
              ? 'Medium'
              : 'Not Urgent'}
          </div>
        </div>
        <div className={styles.timestamp}>
          {new Date(note.timestamp).toLocaleString()}
        </div>
      </div>
      <div className={styles.noteActions}>
        {showDeleteMenu && <DeletePopup onDelete={() => handleDelete(note.id)} noteId={note.id} />}
        {showEditMenu && <ChangePopup note={note} onEdit={handleEdit} />}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  deleteNote,
};

export default connect(null, mapDispatchToProps)(NoteItem);
