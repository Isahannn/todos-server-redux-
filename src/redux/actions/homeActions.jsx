import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../actionTypes';


export const loadHomePage = () => ({
  type: HOME_PAGE_LOADED,
});


export const unloadHomePage = () => ({
  type: HOME_PAGE_UNLOADED,
});
