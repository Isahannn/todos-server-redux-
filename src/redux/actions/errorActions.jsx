export const setError = (errorMessage) => ({
    type: 'SET_ERROR',
    payload: errorMessage,
  });
  
  export const clearError = () => ({
    type: 'CLEAR_ERROR',
  });
  