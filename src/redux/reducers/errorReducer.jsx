import { SET_ERROR, CLEAR_ERROR } from '../actionTypes';

const initialState = {
  errorMessage: '',
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_ERROR:
      return initialState;
    default:
      return state;
  }
};

export default errorReducer;
