function quickSort(array, start = 0, end = array.length - 1, animations = []) {
  if (start >= end) return animations;

  let index = partition(array, start, end, animations);
  quickSort(array, start, index - 1, animations);
  quickSort(array, index + 1, end, animations);

  return animations;
}

function partition(array, start, end, animations) {
  const pivotValue = array[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    animations.push({type: 'comparison', indices: [i, end]});
    if (array[i] < pivotValue) {
      animations.push({type: 'swap', indices: [i, pivotIndex], heights: [array[pivotIndex], array[i]]});
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      pivotIndex++;
    }
  }
  
  animations.push({type: 'swap', indices: [pivotIndex, end], heights: [array[end], array[pivotIndex]]});
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  return pivotIndex;
}

export default quickSort;