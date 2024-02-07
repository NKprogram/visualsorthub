import React, { useState } from 'react';

function ControlPanel({ onNewArray, onArraySizeChange, onSpeedChange, onSort }) {
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);

  const handleArraySizeChange = (e) => {
    const newSize = e.target.value;
    setArraySize(newSize);
    onArraySizeChange(newSize);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = e.target.value;
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="control-panel">
      <label>
        Array Size:
        <input type="range" min="10" max="100" value={arraySize} onChange={handleArraySizeChange} />
      </label>
      <label>
        Sorting Speed:
        <input type="range" min="1" max="100" value={speed} onChange={handleSpeedChange} />
      </label>
      <button onClick={() => onNewArray()}>New Array</button>
      <button onClick={() => onSort('bubble')}>Bubble Sort</button>
      <button onClick={() => onSort('quick')}>Quick Sort</button>
      <button onClick={() => onSort('merge')}>Merge Sort</button>
    </div>
  );
}

export default ControlPanel;