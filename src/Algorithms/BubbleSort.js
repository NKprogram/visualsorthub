// BubbleSort.js

function bubbleSort(array) {
    const animations = [];
    let isSorted = false;
    let lastUnsorted = array.length - 1;
    
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < lastUnsorted; i++) {
        // Push comparison animation
        animations.push({type: 'comparison', indices: [i, i + 1]});
        
        if (array[i] > array[i + 1]) {
          // Swap elements
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          isSorted = false;
          
          // Push swap animation
          animations.push({type: 'swap', indices: [i, i + 1], heights: [array[i], array[i + 1]]});
        }
        // Push revert color animation
        animations.push({type: 'revert', indices: [i, i + 1]});
      }
      lastUnsorted--;
    }
    
    return animations;
  }
  
  export default bubbleSort;