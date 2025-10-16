import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { showSuccess } from '../services/notificationService';

const FloatingThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    showSuccess(`Switched to ${isDarkMode ? 'light' : 'dark'} mode!`);
  };

  return (
    <button
      className="theme-toggle-floating"
      onClick={handleToggle}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill'} fs-4`}></i>
    </button>
  );
};

export default FloatingThemeToggle;