import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [animationSpeed, setAnimationSpeed] = useState(50); // Adjusted for clearer visibility
  const [isPaused, setIsPaused] = useState(false);
  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const timeouts = useRef([]);
  

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = useCallback(() => {
    if (isSorting) return; // Prevent resetting array while sorting
    const arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 1000) + 5);
    setArray(arr);
  }, [arraySize, isSorting]);

  const changeSpeed = (speed) => {
    setAnimationSpeed(1100 - speed * 100); // Adjust speed calculation based on slider input
  };

  const animateAlgorithm = useCallback((newAnimations) => {
    if (isPaused || !newAnimations.length) return;
  
    setIsSorting(true);
    setAnimations(newAnimations);
    setCurrentStep(0);
  
    // Clear any existing timeouts
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  
    // Process each animation step
    newAnimations.forEach((animation, i) => {
      const timeout = setTimeout(() => {
        if (isPaused) {
          clearTimeout(timeout);
          return;
        }
        executeAnimationStep(animation);
        setCurrentStep(i);
        // If we're at the last animation, we can mark sorting as finished
        if (i === newAnimations.length - 1) {
          setIsSorting(false);
        }
      }, i * animationSpeed);
      timeouts.current.push(timeout);
    });
  }, [animationSpeed, isPaused]);

  const executeAnimationStep = (animation) => {
    // Now arrayBars is defined within the scope of this function
    const arrayBars = document.getElementsByClassName('array-bar');
    const { type, indices, heights } = animation;

    switch (type) {
      case 'comparison':
        setBarColor(arrayBars, indices, 'red');
        break;
      case 'swap':
        setBarColor(arrayBars, indices, 'purple');
        swapBarHeights(arrayBars, indices, heights);
        break;
      case 'finalize':
        setBarColor(arrayBars, indices, 'green');
        break;
      default:
        throw new Error(`Unknown animation type: ${type}`);
    }
  };

  const setBarColor = (arrayBars, indices, color) => {
    indices.forEach(index => {
      if (arrayBars[index]) {
        arrayBars[index].style.backgroundColor = color;
      }
    });
  };

  const swapBarHeights = (arrayBars, indices, heights) => {
    indices.forEach((index, idx) => {
      if (arrayBars[index]) {
        arrayBars[index].style.height = `${heights[idx]}px`;
      }
    });
  };
  const pauseSort = () => {
    setIsPaused(true);
    timeouts.current.forEach(clearTimeout);
  };

  const playSort = () => {
    setIsPaused(false);
    animateAlgorithm(animations.slice(currentStep + 1));
  };

  const startSorting = (algorithmName) => {
    if (isSorting || isPaused) return;
    let algorithmFunction = { mergeSort, quickSort, bubbleSort, insertionSort, selectionSort, heapSort }[algorithmName];
    if (algorithmFunction) {
      const newAnimations = algorithmFunction(array);
      animateAlgorithm(newAnimations);
    }
  };

  return (
    <div className="sorting-visualizer">
      <ControlPanel
        onReset={resetArray}
        onStart={startSorting}
        onArraySizeChange={setArraySize}
        onSpeedChange={changeSpeed}
        isSorting={isSorting}
        onPause={pauseSort}
        onPlay={playSort}
      />
      <div className="bars-container">
      {array.map((value, idx) => (
        <Bar key={idx} length={value} className="array-bar" />
      ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;