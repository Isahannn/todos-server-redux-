import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import styles from './SmartSearch.module.css';

const SmartSearch = ({ onSearchChange, disabled }) => {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('searchQuery') || '';
  });

  const debouncedOnSearchChange = useCallback(
    debounce((newQuery) => {
      localStorage.setItem('searchQuery', newQuery); 
      onSearchChange(newQuery);
    }, 500),
    [onSearchChange]
  );

  useEffect(() => {
    if (query) {
      onSearchChange(query);
    }
  }, [query, onSearchChange]);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedOnSearchChange(newQuery);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Find..."
        className={styles.input}
        disabled={disabled}
      />
    </div>
  );
};

export default React.memo(SmartSearch);
