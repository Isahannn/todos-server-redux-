import { DELETE_NOTE, ADD_NOTE, EDIT_NOTE, SET_NOTES } from '../actionTypes';

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId
});

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note
});

export const editNote = (note) => ({
  type: EDIT_NOTE,
  payload: note
});

export const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes
});
