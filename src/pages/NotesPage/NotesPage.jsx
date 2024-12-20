import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import NotesList from "../../components/Notes/NoteList/NotesList";
import InputNote from "../../components/Notes/InputNote/InputNote";
import SeverityFilter from "../../components/Notes/Severity/SeverityFilter";
import SmartSearch from "../../components/Notes/search/SmartSearch";
import { useAuth } from "../../Context";
import shortid from "shortid";
import styles from "./NotesPage.module.css";
import {
  fetchNotes,
  saveNoteToDB,
  deleteNoteFromDB,
  updateNoteInDB,
} from "../../components/service/noteService";
import {
  addNote,
  deleteNote,
  editNote,
  setNotes,
} from "../../redux/actions/notesActions";

const NotesPage = ({ notes, addNote, deleteNote, editNote, setNotes }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [filterSeverity, setFilterSeverity] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editNoteItem, setEditNoteItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchUserNotes = async () => {
      if (!userId) return;

      try {
        const data = await fetchNotes(userId);
        setIsLoaded(true);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchUserNotes();
  }, [userId, setNotes]);

  const addNewNote = async (note) => {
    const newNote = { ...note, id: shortid.generate(), userId };
    try {
      const savedNote = await saveNoteToDB(newNote);
      addNote(savedNote); 
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleChecked = async (id) => {
    const updatedNote = notes.find((note) => note.id === id);
    if (updatedNote) {
      const newCheckedStatus = !updatedNote.checked;
      try {
        await updateNoteInDB(updatedNote.id, { ...updatedNote, checked: newCheckedStatus });
        editNote({
          ...updatedNote,
          checked: newCheckedStatus,
        });
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteNoteFromDB(id);
      deleteNote(id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleFilterChange = (newFilterSeverity) => {
    setFilterSeverity(newFilterSeverity);
  };

  const handleEdit = (note) => {
    setEditMode(true);
    setEditNoteItem(note);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditNoteItem(null);
  };

  const handleSaveEdit = async (name, description, severity) => {
    if (!editNoteItem) return;
  
    const updatedNote = {
      ...editNoteItem,
      name,
      description,
      severity
    };
  
    try {
      const savedNote = await updateNoteInDB(editNoteItem.id, updatedNote);
      editNote(savedNote);
      setEditMode(false);
      setEditNoteItem(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredNotes = (notes || [])
  .filter((note) => note.name && note.name.toLowerCase().includes((searchQuery || '').toLowerCase()))
  .filter((note) => filterSeverity.length === 0 || filterSeverity.includes(note.severity));

  
  return (
    <div className={`${styles.pageContainer} ${isLoaded ? styles.loaded : ""}`}>
      <h1 className={styles.pageTitle}>Notes</h1>
      <SmartSearch onSearchChange={handleSearchChange} disabled={false} />
      <div className={styles.filterContainer}>
        <SeverityFilter
          filterSeverity={filterSeverity}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className={styles.notesList}>
        <NotesList
          notes={filteredNotes}
          onChecked={handleChecked}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <div className={styles.inputNoteContainer}>
        <InputNote
          onAdd={addNewNote}
          editMode={editMode}
          note={editNoteItem}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={handleSaveEdit}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
});

const mapDispatchToProps = {
  addNote,
  deleteNote,
  editNote,
  setNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
