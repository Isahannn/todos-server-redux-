import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../actionTypes';

const initialState = {
  isHomePageLoaded: false,
};

const homeReducer = (state = initialState, action) => {


  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        isHomePageLoaded: true,
      };
    case HOME_PAGE_UNLOADED:
      return {
        ...state,
        isHomePageLoaded: false,
      };
    default:
      return state;
  }
};

export default homeReducer;
