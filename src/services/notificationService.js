import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// Create an instance of Notyf
const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: '#28a745',
      icon: {
        className: 'bi bi-check-circle-fill',
        tagName: 'i',
        text: ''
      }
    },
    {
      type: 'error',
      background: '#dc3545',
      icon: {
        className: 'bi bi-x-circle-fill',
        tagName: 'i',
        text: ''
      }
    },
    {
      type: 'warning',
      background: '#ffc107',
      icon: {
        className: 'bi bi-exclamation-triangle-fill',
        tagName: 'i',
        text: ''
      }
    },
    {
      type: 'info',
      background: '#17a2b8',
      icon: {
        className: 'bi bi-info-circle-fill',
        tagName: 'i',
        text: ''
      }
    }
  ]
});

export const showSuccess = (message) => {
  notyf.success(message);
};

export const showError = (message) => {
  notyf.error(message);
};

export const showWarning = (message) => {
  notyf.open({
    type: 'warning',
    message: message
  });
};

export const showInfo = (message) => {
  notyf.open({
    type: 'info',
    message: message
  });
};

export default notyf;