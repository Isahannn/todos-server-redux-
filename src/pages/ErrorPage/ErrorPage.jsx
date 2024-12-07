import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/errorActions';
import './ErrorPage.module.css';

const ErrorPage = ({ errorMessage, clearError }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGoHome = () => {
    clearError();
    const redirectTo = isAuthenticated ? '/home' : '/';
    navigate(redirectTo);
  };

  return (
    <div className="error-page">
      <h1 className="error-title">Oops!</h1>
      <p className="error-message">{errorMessage || 'Sorry, an unexpected error has occurred.'}</p>
      <button
        onClick={handleGoHome}
        className="error-button"
      >
        Go Back
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.errorMessage,
});

const mapDispatchToProps = {
  clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
