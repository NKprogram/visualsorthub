import React from 'react';
import './Bar.css'; // Make sure the CSS file is correctly imported

const Bar = ({ height, color, value }) => {
  return (
    <div
      className="bar" // Adjusted class name to match the CSS
      style={{
        backgroundColor: color,
        height: `${height}px`,
      }}
    >
      <span className="bar-number">{value}</span> {/* Display the bar's value */}
    </div>
  );
};

export default Bar;