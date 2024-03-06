import React, { useState } from 'react';
import './ControlPanel.css'; // Make sure the CSS file is correctly imported

const ControlPanel = ({
  onReset,
  onArraySizeChange,
  onSpeedChange,
  onSort, // Prop to handle sorting based on the algorithm name
}) => {
  const [showTooltipSize, setShowTooltipSize] = useState(false);
  const [sliderValueSize, setSliderValueSize] = useState(20); // Default value for the array size slider

  const [showTooltipSpeed, setShowTooltipSpeed] = useState(false);
  const [sliderValueSpeed, setSliderValueSpeed] = useState(5); // Default value for the speed slider, adjusted according to your needs

  return (
    <div className="control-panel">
      {/* Array Size Slider */}
      <label htmlFor="sizeRange">Array Size:</label>
      <div className="slider-container">
        <input
          id="sizeRange"
          type="range"
          min="5"
          max="80"
          defaultValue="20"
          onMouseEnter={() => setShowTooltipSize(true)}
          onMouseLeave={() => setShowTooltipSize(false)}
          onMouseMove={(e) => setSliderValueSize(e.target.value)}
          onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
        />
        {showTooltipSize && (
          <div className="tooltip">{sliderValueSize}</div>
        )}
      </div>


      {/* Buttons */}
      <button className="button-neon button-reset" onClick={onReset}><span className="text">Generate New Array</span></button>
      <button className="button-neon button-merge" onClick={() => onSort('mergeSort')}><span className="text">Merge Sort</span></button>
      <button className="button-neon button-quick" onClick={() => onSort('quickSort')}><span className="text">Quick Sort</span></button>
      <button className="button-neon button-bubble" onClick={() => onSort('bubbleSort')}><span className="text">Bubble Sort</span></button>
      <button className="button-neon button-insertion" onClick={() => onSort('insertionSort')}><span className="text">Insertion Sort</span></button>
      <button className="button-neon button-selection" onClick={() => onSort('selectionSort')}><span className="text">Selection Sort</span></button>
      <button className="button-neon button-heap" onClick={() => onSort('heapSort')}><span className="text">Heap Sort</span></button>


      
      {/* Animation Speed Slider */}
      <label htmlFor="speedRange">Animation Speed:</label>
      <div className="slider-container">
        <input
          id="speedRange"
          type="range"
          min="1"
          max="100"
          defaultValue="25"
          onMouseEnter={() => setShowTooltipSpeed(true)}
          onMouseLeave={() => setShowTooltipSpeed(false)}
          onMouseMove={(e) => setSliderValueSpeed(e.target.value)}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
        />
        {showTooltipSpeed && (
          <div className="tooltip">{sliderValueSpeed}</div>
        )}
      </div>


    </div>
  );
};

export default ControlPanel;