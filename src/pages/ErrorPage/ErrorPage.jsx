  import React, { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../../Context";
  import { connect } from "react-redux";
  import { clearError, setError } from "../../redux/actions/errorActions";
  import styles from './ErrorPage.module.css';

  const ErrorPage = ({ errorMessage, clearError, setError }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      setError("An error occurred while navigating. The page you requested does not exist.");
      return () => {
        clearError();
      };
    }, [setError, clearError]);

    const handleGoHome = () => {
      clearError();
      const redirectTo = isAuthenticated ? "/home" : "/";
      navigate(redirectTo);
    };

    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.message}>
          {errorMessage || "Sorry, an unexpected error has occurred."}
        </p>
        <button
          onClick={handleGoHome}
          className={styles.button}
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
    setError
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
