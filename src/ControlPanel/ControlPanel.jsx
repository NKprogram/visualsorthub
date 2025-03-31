import React, { useState, useEffect } from 'react';
import './ControlPanel.css';

const ControlPanel = ({
  onReset,
  onArraySizeChange,
  onSpeedChange,
  onSort,
  isSorting,
}) => {
  const [sliderValueSize, setSliderValueSize] = useState(20);
  const [sliderValueSpeed, setSliderValueSpeed] = useState(50);

  const updateSliderBackground = (value, sliderId) => {
    const slider = document.getElementById(sliderId);
    const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, purple ${percentage}%, #111 ${percentage}%, #111 100%)`;
  };

  const handleSizeSliderChange = (value) => {
    setSliderValueSize(value);
    onArraySizeChange(parseInt(value));
    updateSliderBackground(value, 'sizeRange');
  };

  const handleSpeedSliderChange = (value) => {
    setSliderValueSpeed(value);
    onSpeedChange(parseInt(value));
    updateSliderBackground(value, 'speedRange');
  };

  useEffect(() => {
    updateSliderBackground(sliderValueSize, 'sizeRange');
    updateSliderBackground(sliderValueSpeed, 'speedRange');
  }, []);

  return (
    <div className="control-panel">
      <div className={`slider-container ${isSorting ? 'disabled' : ''}`}>
        <span className="slider-value">{sliderValueSize}</span>
        <input
          className="range"
          type="range"
          id="sizeRange"
          min="5"
          max="80"
          value={sliderValueSize}
          disabled={isSorting}
          onChange={(e) => handleSizeSliderChange(e.target.value)}
        />
        <label htmlFor="sizeRange" className="slider-description">Change Array Size</label>
      </div>
      <button className="button-neon button-reset" onClick={onReset} disabled={isSorting}><span className="text">Generate New Array</span></button>
      <button className="button-neon button-merge" onClick={() => onSort('mergeSort')} disabled={isSorting}><span className="text">Merge Sort</span></button>
      <button className="button-neon button-quick" onClick={() => onSort('quickSort')} disabled={isSorting}><span className="text">Quick Sort</span></button>
      <button className="button-neon button-bubble" onClick={() => onSort('bubbleSort')} disabled={isSorting}><span className="text">Bubble Sort</span></button>
      <button className="button-neon button-insertion" onClick={() => onSort('insertionSort')} disabled={isSorting}><span className="text">Insertion Sort</span></button>
      <button className="button-neon button-selection" onClick={() => onSort('selectionSort')} disabled={isSorting}><span className="text">Selection Sort</span></button>
      <button className="button-neon button-heap" onClick={() => onSort('heapSort')} disabled={isSorting}><span className="text">Heap Sort</span></button>
      <div className={`slider-container ${isSorting ? 'disabled' : ''}`}>
        <span className="slider-value">{sliderValueSpeed}</span>
        <input
          className="range"
          type="range"
          id="speedRange"
          min="1"
          max="100"
          value={sliderValueSpeed}
          disabled={isSorting}
          onChange={(e) => handleSpeedSliderChange(e.target.value)}
        />
        <label htmlFor="speedRange" className="slider-description">Change Sorting Speed</label>
      </div>
    </div>
  );
};

export default ControlPanel;