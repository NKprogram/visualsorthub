import React from 'react';// Import the React library
import './Bar.css'; // Import the CSS file

// Bar component to represent the array elements
const Bar = ({ height, color, value }) => {
  return (
    // Return the bar with the specified height and color
    <div
      className="bar"
      style={{
        backgroundColor: color,
        height: `${height}px`,
      }}
    >
      <span className="bar-number">{value}</span> 
    </div>
  );
};

export default Bar;
