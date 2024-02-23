import React from 'react';
import './Bar.css'; // Importing the CSS for styling

const Bar = ({ length, color = 'turquoise' }) => {
  return (
    <div
      className="bar"
      style={{
        height: `${length}px`,
        backgroundColor: color,
      }}
    ></div>
  );
};

export default Bar;