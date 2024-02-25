import React from 'react';
import './Bar.css'; // Importing the CSS for styling

const Bar = ({ length, color = 'blue' }) => {
  return (
    <div
      className="bar"
      style={{
        height: `${length}px`,
        backgroundColor: color, // This allows dynamic color changes
      }}
    >
      <span className="bar-number">{length}</span>
    </div>
  );
};

export default Bar;