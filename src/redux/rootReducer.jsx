import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import errorReducer from './reducers/errorReducer';
const rootReducer = combineReducers({
  notes: notesReducer,
  error: errorReducer,
});

export default rootReducer;
