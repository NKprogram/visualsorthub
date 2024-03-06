//This is the implementation of the Merge Sort algorithm
function mergeSort(array) {
  // Array to store the animations
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

// This is the helper function for the merge sort algorithm
function mergeSortHelper(
  // The main array to be sorted
  mainArray,
  // The start index of the array
  startIdx,
  // The end index of the array
  endIdx,
  // The auxiliary array to store the sorted elements
  auxiliaryArray,
  // The array to store the animations
  animations,
) {
  // If the start index is equal to the end index, then the array is already sorted
  if (startIdx === endIdx) return;
  // Calculate the middle index of the array
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  // Sort the left half of the array
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  // Sort the right half of the array
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  // Merge the two halves
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

// This is the function that merges the two halves of the array
function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  // Initialize the pointers
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  // Compare the elements of the two halves and store the smaller element in the main array
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once to change their color
    animations.push([i, j]);
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second time to revert their color
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  // Store the remaining elements in the main array
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once to change their color
    animations.push([i, i]);
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second time to revert their color
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export default mergeSort;
