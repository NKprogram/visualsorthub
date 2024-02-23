// MergeSort.js

function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once to change their color
      animations.push({type: 'comparison', indices: [i, j]});
      
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the value at index i in the auxiliary array
        animations.push({type: 'overwrite', index: k, value: auxiliaryArray[i]});
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the value at index j in the auxiliary array
        animations.push({type: 'overwrite', index: k, value: auxiliaryArray[j]});
        mainArray[k++] = auxiliaryArray[j++];
      }
      // Push revert color animation
      animations.push({type: 'revert', indices: [i, j]});
    }
    
    while (i <= middleIdx) {
      animations.push({type: 'comparison', indices: [i, i]});
      animations.push({type: 'overwrite', index: k, value: auxiliaryArray[i]});
      animations.push({type: 'revert', indices: [i, i]});
      mainArray[k++] = auxiliaryArray[i++];
    }
    
    while (j <= endIdx) {
      animations.push({type: 'comparison', indices: [j, j]});
      animations.push({type: 'overwrite', index: k, value: auxiliaryArray[j]});
      animations.push({type: 'revert', indices: [j, j]});
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  export default mergeSort;