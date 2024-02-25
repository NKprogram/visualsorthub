// ControlPanel.jsx
import React, { useState } from 'react';
import './ControlPanel.css'; // Make sure the CSS file is correctly imported

const ControlPanel = ({
    onReset,
    onStart,
    onArraySizeChange,
    onSpeedChange,
    isSorting,
    onPause,
    onPlay,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [sliderValue, setSliderValue] = useState(20); // Default value of the slider

  return (
    <div className="control-panel">
      <label htmlFor="sizeRange">Array Size:</label>
      <div className="slider-container">
        <input
          id="sizeRange"
          type="range"
          min="5"
          max="80"
          defaultValue="20"
          disabled={isSorting}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onMouseMove={(e) => setSliderValue(e.target.value)}
          onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
        />
        {showTooltip && (
          <div className="tooltip">{sliderValue}</div>
        )}
      </div>

      {/* Buttons */}
      {isSorting ? (
        <button className="button-neon button-playpause" onClick={onPause}><span className="text">Pause</span></button>
      ) : (
        <button className="button-neon button-playpause" onClick={onPlay}><span className="text">Play</span></button>
      )}
      <button className="button-neon button-reset" onClick={onReset}><span className="text">Reset Array</span></button>
      <button className="button-neon button-merge" onClick={() => onStart('mergeSort')}><span className="text">Merge Sort</span></button>
      <button className="button-neon button-quick" onClick={() => onStart('quickSort')}><span className="text">Quick Sort</span></button>
      <button className="button-neon button-bubble" onClick={() => onStart('bubbleSort')}><span className="text">Bubble Sort</span></button>
      <button className="button-neon button-insertion" onClick={() => onStart('insertionSort')}><span className="text">Insertion Sort</span></button>
      <button className="button-neon button-selection" onClick={() => onStart('selectionSort')}><span className="text">Selection Sort</span></button>
      <button className="button-neon button-heap" onClick={() => onStart('heapSort')}><span className="text">Heap Sort</span></button>

      <label htmlFor="speedRange">Animation Speed:</label>
      <input
        id="speedRange"
        type="range"
        min="1"
        max="10"
        defaultValue="5"
        disabled={isSorting}
        onChange={(e) => onSpeedChange(11 - parseInt(e.target.value))}
      />
    </div>
  );
};

export default ControlPanel;