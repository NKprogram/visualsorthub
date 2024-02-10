import React from 'react';
import { useState,useEffect } from 'react';
import "./SortingVisualizer.css";

//Algorithms
import BubbleSort from '../Algorithms/BubbleSort';
import QuickSort from '../Algorithms/QuickSort';
import MergeSort from '../Algorithms/MergeSort';
import HeapSort from '../Algorithms/HeapSort';
import InsertionSort from '../Algorithms/InsertionSort';
import SelectionSort from '../Algorithms/SelectionSort';


const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [arraySteps, setArraySteps] = useState([]);
    const [arraySize, setArraySize] = useState(100);
    const [colorKey, setColorKey] = useState([]);
    const [colorSteps, setColorsteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [algorithm, setAlgorithm] = useState("bubbleSort");
    const [timeouts, setTimeouts] = useState([]);
    const [triggerStepCreation, setTriggerStepCreation] = useState(false);
    const [delay, setDelay] = useState(500);

    
    //when loaded intialize the new array
    useEffect(() => {
      intializeSteps();
    },[arraySize]);

    //when the triggerStepCreation is true create the steps
    useEffect(() => {
      if (triggerStepCreation) {
        createSteps();
      }
    },[triggerStepCreation]);

    //when the algorithm is changed create the steps
    useEffect(() => {
      continueSteps();
    },[algorithm]);



    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getWidth = () => {
      return 1000/ arraySize;
    };

    const generateRandomArray = () => {
      const tempArray = [];
      for (let i = 0; i < arraySize; i++) {
        tempArray.push(generateRandomNumber(5, 500));
      }
      return tempArray;
    };

    const ClearColorKey = () => {
      let tempColorKey = new Array(arraySize).fill(0);
      setColorKey(tempColorKey);
      setColorsteps([tempColorKey]);
    };

    const ClearTimeouts = () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
      setTimeouts([]);
    };

   

    //calls the algotighm to use
    const callAlgorithm = (array,arraySteps,colorSteps) => {
      switch (algorithm) {
        case "Bubble Sort":
          BubbleSort(array,arraySteps,colorSteps);
          break;
        case "Quick Sort":
          QuickSort(array,arraySteps,colorSteps);
          break;
        case "Merge Sort":
          MergeSort(array,arraySteps,colorSteps);
          break;
        case "heap Sort":
          HeapSort(array,arraySteps,colorSteps);
          break;
        case "Insertion Sort":
          InsertionSort(array,arraySteps,colorSteps);
          break;
        case "Selection Sort":
          SelectionSort(array,arraySteps,colorSteps);
          break;
        default:
          BubbleSort(array,arraySteps,colorSteps);
      }
    };
    

    const createSteps = () => {
      let tempArray = [...array];
      let tempArraySteps = [tempArraySteps.slice()];
      let tempColorSteps = [...colorSteps];
      callAlgorithm(tempArray, tempArraySteps, tempColorSteps);
      setArraySteps(tempArraySteps);
      setColorsteps(tempColorSteps);
      triggerStepCreation = false;
    }

    const intializeSteps = () => {
      const newArray = generateRandomArray();
      setArray(newArray);
      setArraySteps([newArray]);
      setCurrentStep(0);
      setDelay(Math.floor(1000 / arraySize));
      ClearColorKey();
      ClearTimeouts();
      setTriggerStepCreation(true);
    }

    const continueSteps = () => {
      const oldArray = array.slice();
      setArraySteps([oldArray]);
      setCurrentStep(0);
      setDelay(Math.floor(1000 / arraySize));
      ClearColorKey();
      ClearTimeouts();
      setTriggerStepCreation(true);
    }


    const startSorting = () => {
      let tempTimeouts = [];
      let step = currentStep;
      if (step === arraySteps.length - 1) {
        return false;
      }
      for (let i = step; i < arraySteps.length - 1; i++) {
        let timeout = setTimeout(() => {
          setArray(...arraySteps[i]);
          setCurrentStep(step++);
          setColorKey(...colorSteps[i]);
        }
        , delay * i);
        tempTimeouts.push(timeout);
      }
      setTimeouts(tempTimeouts);
    }

    //create a pause function
    const pauseSorting = () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
      setTimeouts([]);
    }
    
    render() {
      let theBars = array.map((value, index) => (
        <Bars 
          key={index}
          value={value}
          index={index}
          colorKey={colorKey[index]}
          width={getWidth()} 
          arraySize={arraySize}
        />
      ));
    
      return (
        <div className="sorting-visualizer">
          <h1>VisualSortHub</h1>
        </div>
      );
    }
};

export default SortingVisualizer;