function insertionSort(array) {
    const animations = [];
    let n = array.length;
    
    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;
  
      /* Move elements of array[0..i-1], that are
      greater than key, to one position ahead
      of their current position */
      while (j >= 0 && array[j] > key) {
        animations.push({type: 'comparison', indices: [j, j + 1]});
        animations.push({type: 'overwrite', index: j + 1, value: array[j]});
        array[j + 1] = array[j];
        j = j - 1;
      }
      animations.push({type: 'overwrite', index: j + 1, value: key});
      array[j + 1] = key;
    }
    
    return animations;
  }

export default insertionSort;