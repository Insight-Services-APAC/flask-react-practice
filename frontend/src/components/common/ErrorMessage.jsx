import React from 'react';

function ErrorMessage({ message }) {
  // Implement this component to display error messages
  return (
    <div style={{
      color: 'red',
      padding: '1rem',
      border: '1px solid red',
      borderRadius: '4px',
      margin: '1rem 0'
    }}>
      {/* Display the error message here */}
    </div>
  );
}

export default ErrorMessage;
