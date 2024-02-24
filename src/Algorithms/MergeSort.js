// MergeSort.js

function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  finalizeArray(animations, array.length);
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
    animations.push({type: 'comparison', indices: [i, j]});
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({
        type: 'swap',
        indices: [k, i],
        heights: [auxiliaryArray[i], mainArray[k]]
      });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({
        type: 'swap',
        indices: [k, j],
        heights: [auxiliaryArray[j], mainArray[k]]
      });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push({
      type: 'swap',
      indices: [k, i],
      heights: [auxiliaryArray[i], mainArray[k]]
    });
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push({
      type: 'swap',
      indices: [k, j],
      heights: [auxiliaryArray[j], mainArray[k]]
    });
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function finalizeArray(animations, length) {
  for (let i = 0; i < length; i++) {
    animations.push({ type: 'finalize', indices: [i] });
  }
}

export default mergeSort;