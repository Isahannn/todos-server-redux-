import { DELETE_NOTE, ADD_NOTE, EDIT_NOTE, SET_NOTES } from "../actionTypes";

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_NOTE:
      const updatedNotesAfterDelete = state.notes.filter(
        (note) => note.id !== action.payload
      );

      return {
        ...state,
        notes: updatedNotesAfterDelete,
      };
    case ADD_NOTE:
      const updatedNotesAfterAdd = [...state.notes, action.payload];

      return {
        ...state,
        notes: updatedNotesAfterAdd,
      };
    case EDIT_NOTE:
      const updatedNotesAfterEdit = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );

      return {
        ...state,
        notes: updatedNotesAfterEdit,
      };
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
