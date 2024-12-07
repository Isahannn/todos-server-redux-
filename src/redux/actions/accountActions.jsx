import { LOGIN, LOGOUT, REGISTRATION } from "../actionTypes";

export const login = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  return {
    type: LOGIN,
    payload: userData,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
  };
};

export const register = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  return {
    type: REGISTRATION,
    payload: userData,
  };
};
