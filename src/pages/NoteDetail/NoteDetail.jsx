import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNoteById, updateNoteInDB, deleteNoteFromDB } from '../../../src/components/service/noteService';
import ErrorPage from '../ErrorPage/ErrorPage';
import Modal from './Modal/Modal';
import { editNote, deleteNote } from '../../redux/actions/notesActions';
import styles from './NoteDetail.module.css';

const NoteDetail = ({ editNote, deleteNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(1);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await fetchNoteById(id);
        setNote(data);
        setValue(data.name);
        setDescription(data.description || '');
        setSeverity(data.severity);
      } catch (err) {
        setError('Oops, this note no longer exists.');
      }
    };

    fetchNote();
  }, [id]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!note) return;

    if (!value.trim()) {
      alert('Name cannot be empty.');
      return;
    }

    if (hasChanges) {
      setIsConfirmModalOpen(true);
    } else {
      handleCancelEdit();
    }
  };

  const handleConfirmSave = async () => {
    const updatedNote = {
      ...note,
      name: value,
      description: description.trim(),
      severity,
    };


    try {
      const data = await updateNoteInDB(id, updatedNote);

      setNote(data);
      editNote(data);
      setIsEditMode(false);
      setIsConfirmModalOpen(false);
      setHasChanges(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNoteFromDB(id);
      deleteNote(id);
      navigate('/notes');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setValue(note.name);
    setDescription(note.description || '');
    setSeverity(note.severity);
    setHasChanges(false);
  };

  const handleBack = () => {
    navigate('/notes');
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (!note) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Note Details</h2>
      {isEditMode ? (
        <div>
          <div className="flex items-center mb-4 space-x-2">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              className={`${styles.inputField} w-3/4`}
              value={value}
              onChange={handleInputChange(setValue)}
            />
            <button className={`${styles.saveButton} w-auto`} onClick={handleSave}>
              Save
            </button>
            <button className={`${styles.deleteButton} bg-red-500 hover:bg-red-700 w-auto`} onClick={openDeleteModal}>
              Delete
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className={styles.textareaField}
              value={description}
              onChange={handleInputChange(setDescription)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Severity</label>
            <select
              id={`severity-${note.id}`}
              value={severity}
              onChange={handleInputChange(setSeverity)}
              className={styles.selectField}
            >
              <option value={1}>Urgently</option>
              <option value={2}>Medium</option>
              <option value={3}>Not Urgent</option>
            </select>
          </div>
          <button className={styles.cancelButton} onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4 space-x-2">
            <label className="block text-gray-700 mb-2">Title</label>
            <p className={`${styles.noteTitle} w-3/4`}>{note.name}</p>
            <button className={`${styles.editButton} bg-blue-500 hover:bg-blue-700 w-auto`} onClick={handleEdit}>
              ✍️
            </button>
            <button className={`${styles.deleteButton} bg-red-500 hover:bg-red-700 w-auto`} onClick={openDeleteModal}>
              🗑
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <p
              className={`${styles.noteDescription} ${
                !note.description ? styles.noDescription : ''
              }`}
            >
              {note.description ? note.description : 'No description provided.'}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Severity</label>
            <p className={styles.noteSeverity}>{note.severity}</p>
          </div>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
        confirmButtonText="Yes, Delete"
        confirmButtonStyle={styles.deleteButton}
      />

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmSave}
        title="Save Changes"
        message="Are you sure you want to save these changes?"
        confirmButtonText="Save Changes"
        confirmButtonStyle={styles.confirmButton}
      />
    </div>
  );
};

const mapDispatchToProps = {
  editNote,
  deleteNote,
};

export default connect(null, mapDispatchToProps)(NoteDetail);
