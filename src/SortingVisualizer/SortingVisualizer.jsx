import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";


import ControlPanel from '../ControlPanel/ControlPanel';
import Bar from '../Components/Bar';


// Algorithms
import mergeSort from "../Algorithms/MergeSort";
import quickSort from "../Algorithms/QuickSort";
import bubbleSort from "../Algorithms/BubbleSort";
import insertionSort from "../Algorithms/InsertionSort";
import selectionSort from "../Algorithms/SelectionSort";
import heapSort from "../Algorithms/HeapSort";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(null);
  const ANIMATION_SPEED_MS = 1; // Speed of the animations in milliseconds
  const PRIMARY_COLOR = 'turquoise'; // Color of array bars
  const SECONDARY_COLOR = 'red'; // Color of bars being compared
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [timeouts, setTimeouts] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (isSorting) return; // Prevent resetting array while sorting
    const arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 730) + 5);
    setArray(arr);
    resetBarColors();
  };

  const resetBarColors = () => {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  };

  
  const pauseSort = () => {
    // Clear all timeouts to pause animations
    timeouts.forEach(timeout => clearTimeout(timeout));
    setTimeouts([]);
    setIsPaused(true);
  };


  const playSort = () => {
    if (isPaused) {
      setIsPaused(false);
      // Resume the animation from the current step
      const newAnimations = animations.slice(currentStep);
      animateAlgorithm(newAnimations);
    }
  };


  const changeSpeed = (speed) => {
    setAnimationSpeed(speed);
  };


  const animateAlgorithm = (animations) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    const newTimeouts = [];
  
    animations.forEach((animation, i) => {
      const { type, indices, heights } = animation;
  
      if (type === 'comparison' || type === 'revert') {
        const color = type === 'comparison' ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIdx, barTwoIdx] = indices;
        const timeoutId = setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
        newTimeouts.push(timeoutId);
      } else if (type === 'swap') {
        const [barOneIdx, barTwoIdx] = indices;
        const [barOneHeight, barTwoHeight] = heights;
        const timeoutId = setTimeout(() => {
          arrayBars[barOneIdx].style.height = `${barOneHeight}px`;
          arrayBars[barTwoIdx].style.height = `${barTwoHeight}px`;
        }, i * ANIMATION_SPEED_MS);
        newTimeouts.push(timeoutId);
      }
    });
  
    setTimeouts(newTimeouts); // Save timeouts to state
  
    const lastAnimationTimeout = animations.length * ANIMATION_SPEED_MS;
    setTimeout(() => {
      setIsSorting(false);
      setCurrentStep(0);
    }, lastAnimationTimeout);
  };
   

  const startSorting = (algorithmName) => {
    if (isSorting) return; // Prevent starting a new sort while one is already in progress
    setIsSorting(true);
    setCurrentAlgorithm(algorithmName);

    // Depending on the algorithm selected, run the corresponding sorting function
    let animations = [];
    switch (algorithmName) {
      case 'mergeSort':
        animations = mergeSort(array);
        break;
      case 'quickSort':
        animations = quickSort(array);
        break;
      case 'bubbleSort':
        animations = bubbleSort(array);
        break;
      case 'insertionSort':
        animations = insertionSort(array);
        break;
      case 'selectionSort':
        animations = selectionSort(array);
        break;
      case 'heapSort':
        animations = heapSort(array);
        break;
      default:
        return; // If the algorithm is not recognized, exit
    }
 
  animateAlgorithm(animations);
    setTimeout(() => {
      setIsSorting(false); // Reset the isSorting flag after animations are done
    }, animations.length * ANIMATION_SPEED_MS);
  };


  return (
    <div className="sorting-visualizer">
      <ControlPanel
        onReset={resetArray}
        onStart={startSorting}
        onArraySizeChange={(newSize) => {
          setArraySize(newSize);
          resetArray();
        }}
        onSpeedChange={changeSpeed}
        isSorting={isSorting}
        onPause={pauseSort}
        onPlay={playSort}
      />
      {/* Render the array bars */}
      {array.map((value, idx) => (
        <Bar key={idx} length={value} className="array-bar" />
      ))}
    </div>
  );
};

export default SortingVisualizer;