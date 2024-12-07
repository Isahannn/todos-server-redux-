import React from 'react';
import PropTypes from 'prop-types';
import styles from './RegistrationForm/RegistrationForm.module.css';

const PasswordInput = ({ name, label, value, onChange, error, ...props }) => (
  <div className={styles.inputGroup}>
    <label htmlFor={name} className={styles.label}>{label}</label>
    <input type="password" name={name} value={value} onChange={onChange} {...props} className={styles.input} />
    {error && <div className={styles.error}>{error}</div>}
  </div>
);

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default PasswordInput;
