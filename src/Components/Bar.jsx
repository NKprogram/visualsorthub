import React from 'react';
import './Bar.css'; 

const Bar = ({ height, color, value }) => {
  return (
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
