

import React from 'react';

const ControlPanel = ({
    onReset,
    onStart,
    onArraySizeChange,
    onSpeedChange,
    isSorting,
    onPause,
    onPlay,
 }) => {
  return (
    <div className="control-panel">
       {/* Size Slider */}
       <label htmlFor="sizeRange">Array Size:</label>
      <input
        id="sizeRange"
        type="range"
        min="5"
        max="200"
        defaultValue="50"
        disabled={isSorting}
        onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
      />
      
      {/* Speed Slider */}
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
      
      {/* Play/Pause Button */}
      {isSorting ? (
        <button onClick={onPause}>Pause</button>
      ) : (
        <button onClick={onPlay}>Play</button>
      )}
      <button onClick={onReset}>Reset Array</button>
      <button onClick={() => onStart('mergeSort')}>Merge Sort</button>
      <button onClick={() => onStart('quickSort')}>Quick Sort</button>
      <button onClick={() => onStart('bubbleSort')}>Bubble Sort</button>
      <button onClick={() => onStart('insertionSort')}>Insertion Sort</button>
      <button onClick={() => onStart('selectionSort')}>Selection Sort</button>
      <button onClick={() => onStart('heapSort')}>Heap Sort</button>
    </div>
  );
};

export default ControlPanel;