function selectionSort(array) {
    const animations = [];
    let n = array.length;
    
    for (let i = 0; i < n-1; i++) {
      let min_idx = i;
      for (let j = i+1; j < n; j++) {
        animations.push({type: 'comparison', indices: [min_idx, j]});
        if (array[j] < array[min_idx]) {
          min_idx = j;
        }
      }
  
      // Swap the found minimum element with the first element
      animations.push({type: 'swap', indices: [i, min_idx], heights: [array[min_idx], array[i]]});
      [array[i], array[min_idx]] = [array[min_idx], array[i]];
    }
    
    return animations;
  }

export default selectionSort;