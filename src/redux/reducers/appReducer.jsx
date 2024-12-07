import { APP_LOADED } from '../actionTypes';

const initialState = {
  isAppLoaded: false,
};

const appReducer = (state = initialState, action) => {


  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        isAppLoaded: true,
      };
    default:
      return state;
  }
};

export default appReducer;
