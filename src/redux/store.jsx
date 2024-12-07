import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import notesReducer from "./reducers/notesReducer";
import homeReducer from "./reducers/homeReducer";
import appReducer from "./reducers/appReducer";
import errorReducer from "./reducers/errorReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  home: homeReducer,
  app: appReducer,
  error: errorReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
