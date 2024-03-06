import React, { useState , useEffect } from 'react'; // Import the useState and useEffect hooks
import './ControlPanel.css'; // Import the CSS file

const ControlPanel = ({
  onReset,// Prop to handle array reset
  onArraySizeChange,// Prop to handle array size change
  onSpeedChange,// Prop to handle speed change
  onSort, // Prop to handle sorting based on the algorithm name
  isSorting, // New prop to indicate if sorting is in progress
}) => {
  const [sliderValueSize, setSliderValueSize] = useState(20); // Default value for the array size slider
  const [sliderValueSpeed, setSliderValueSpeed] = useState(50); // Default value for the speed slider

  // Function to update the background of the slider
  const updateSliderBackground = (value, sliderId) => {
    // Get the slider element
    const slider = document.getElementById(sliderId);
    // Calculate the percentage based on the value
    const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
    // Set the background of the slider
    slider.style.background = `linear-gradient(to right, purple ${percentage}%, #111 ${percentage}%, #111 100%)`;
  };
 
  // Function to handle the array size slider change
  const handleSizeSliderChange = (value) => {
    // Update the state with the new value
    setSliderValueSize(value);
    // Call the prop function to handle the array size change
    onArraySizeChange(parseInt(value));
    // Update the background of the slider
    updateSliderBackground(value, 'sizeRange');
  };

  // Function to handle the speed slider change
  const handleSpeedSliderChange = (value) => {
    setSliderValueSpeed(value);
    onSpeedChange(parseInt(value));
    updateSliderBackground(value, 'speedRange');
  };

  // Initialize slider backgrounds on component mount
  useEffect(() => {
    // Update the background of the sliders
    updateSliderBackground(sliderValueSize, 'sizeRange');
    updateSliderBackground(sliderValueSpeed, 'speedRange');
  }, []); 

  
  return (
    <div className="control-panel">

       {/* Array Size Slider */}
       <div className="slider-container">
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
        
       {/* Buttons */}
        <button className="button-neon button-reset" onClick={onReset} disabled={isSorting}><span className="text">Generate New Array</span></button>
        <button className="button-neon button-merge" onClick={() => onSort('mergeSort')} disabled={isSorting}><span className="text">Merge Sort</span></button>
        <button className="button-neon button-quick" onClick={() => onSort('quickSort')} disabled={isSorting}><span className="text">Quick Sort</span></button>
        <button className="button-neon button-bubble" onClick={() => onSort('bubbleSort')} disabled={isSorting}><span className="text">Bubble Sort</span></button>
        <button className="button-neon button-insertion" onClick={() => onSort('insertionSort')} disabled={isSorting}><span className="text">Insertion Sort</span></button>
        <button className="button-neon button-selection" onClick={() => onSort('selectionSort')} disabled={isSorting}><span className="text">Selection Sort</span></button>
        <button className="button-neon button-heap" onClick={() => onSort('heapSort')} disabled={isSorting}><span className="text">Heap Sort</span></button>


      {/* Speed Slider */}
      <div className="slider-container">
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







