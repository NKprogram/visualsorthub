import React, { useState, useEffect, useCallback } from 'react';
import './SortingVisualizer.css';
import ControlPanel from '../ControlPanel/ControlPanel.jsx';
import Bar from '../Components/Bar.jsx';

// Algorithms
import mergeSort from '../Algorithms/MergeSort.js';
import quickSort from '../Algorithms/QuickSort.js';
import heapSort from '../Algorithms/HeapSort.js';
import bubbleSort from '../Algorithms/BubbleSort.js';
import selectionSort from '../Algorithms/SelectionSort.js';
import insertionSort from '../Algorithms/InsertionSort.js';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const PRIMARY_COLOR = 'blue';
  const SECONDARY_COLOR = 'red';
  const FINAL_COLOR = 'green';

  
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(generateRandomNumber(5, 1000));
    }
    setArray(newArray);
    changeBarColor(PRIMARY_COLOR);
  }, [arraySize]);

  useEffect(() => {
    resetArray();
  }, [resetArray, arraySize]);

  const changeBarColor = (color) => {
    const arrayBars = document.getElementsByClassName('bar');
    for (let bar of arrayBars) {
      bar.style.backgroundColor = color;
    }
  };

  const handleAnimations = (animations, sortAlgorithm) => {
    const arrayBars = document.getElementsByClassName('bar');
    for (let i = 0; i < animations.length; i++) {
      if (sortAlgorithm === bubbleSort) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          if (barOneIdx !== undefined) { // To avoid processing empty animations
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * animationSpeed );
          }
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] = animations[i];
            if (barOneIdx !== undefined) { // To avoid processing empty animations
              arrayBars[barOneIdx].style.height = `${newHeightOne}px`;
              arrayBars[barTwoIdx].style.height = `${newHeightTwo}px`;
              arrayBars[barOneIdx].getElementsByClassName('bar-number')[0].innerText = newHeightOne;
              arrayBars[barTwoIdx].getElementsByClassName('bar-number')[0].innerText = newHeightTwo;
            }
          }, i * animationSpeed);
        }
      } else if (sortAlgorithm === selectionSort) {
        const isComparison = animations[i][2] === false;
        if (isComparison) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
              arrayBars[barOneIdx].style.backgroundColor = color;
              arrayBars[barTwoIdx].style.backgroundColor = color;
            }
            // We add another timeout to change the color back to primary immediately after the comparison
            setTimeout(() => {
              if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
                arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
                arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
              }
            }, animationSpeed);
          }, i * animationSpeed);
        } else {
          // Swap animation
          const [barOneIdx, barTwoIdx, , newHeightOne, newHeightTwo] = animations[i];
          setTimeout(() => {
            if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
              arrayBars[barOneIdx].style.height = `${newHeightOne}px`;
              arrayBars[barTwoIdx].style.height = `${newHeightTwo}px`;
              // Immediately change the color back to primary after the swap
              arrayBars[barOneIdx].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[barTwoIdx].style.backgroundColor = PRIMARY_COLOR;
              arrayBars[barOneIdx].getElementsByClassName('bar-number')[0].innerText = newHeightOne;
              arrayBars[barTwoIdx].getElementsByClassName('bar-number')[0].innerText = newHeightTwo;
            }
          }, i * animationSpeed);
        }
      }else if (sortAlgorithm === insertionSort) {
        const [barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] = animations[i];
        const barOneStyle = arrayBars[barOneIdx]?.style;
        const barTwoStyle = arrayBars[barTwoIdx]?.style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * animationSpeed);
        setTimeout(() => {
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          arrayBars[barOneIdx].getElementsByClassName('bar-number')[0].innerText = newHeightOne;
          arrayBars[barTwoIdx].getElementsByClassName('bar-number')[0].innerText = newHeightTwo;
        }, (i + 0.5) * animationSpeed);
      } else {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
          }, i * animationSpeed);
      }  else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          arrayBars[barOneIdx].style.height = `${newHeight}px`;
          // Update the value on the bar for barOneIdx
          const barOneNumber = arrayBars[barOneIdx].getElementsByClassName('bar-number')[0];
          barOneNumber.innerText = newHeight;
          if (sortAlgorithm === quickSort || sortAlgorithm === heapSort || sortAlgorithm === mergeSort) {
            const [,, barTwoIdx, newHeightTwo] = animations[i];
            if (arrayBars[barTwoIdx]) {
              arrayBars[barTwoIdx].style.height = `${newHeightTwo}px`;
              // Update the value on the bar for barTwoIdx
              const barTwoNumber = arrayBars[barTwoIdx].getElementsByClassName('bar-number')[0];
              barTwoNumber.innerText = newHeightTwo;
            }
          }
        }, i * animationSpeed);
        }
      }
    }
    setTimeout(() => {
      changeBarColor(FINAL_COLOR);
      setIsSorting(false); // Sorting finished
    }, animations.length * animationSpeed + 1);
  };

  const sort = (algorithm) => {
    const animations = algorithm(array);
    handleAnimations(animations, algorithm);

  };

  return (
    <div className="sorting-visualizer">
      <ControlPanel
          onReset={resetArray}
          onArraySizeChange={setArraySize}
          onSpeedChange={setAnimationSpeed}
          onSort={(algorithmName) => {
            const algorithms = {
              mergeSort,
              quickSort,
              heapSort,
              bubbleSort,
              selectionSort,
              insertionSort,
            };
            sort(algorithms[algorithmName]);
          }}
          isSorting={isSorting}
        />
     <div className="bars-container">
        {array.map((value, idx) => (
          <Bar key={idx} height={value} color={PRIMARY_COLOR} value={value} />
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
