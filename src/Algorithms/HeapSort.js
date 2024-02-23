function heapSort(array) {
    const animations = [];
    let n = array.length;
  
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      animations.push({type: 'swap', indices: [0, i], heights: [array[i], array[0]]});
      [array[i], array[0]] = [array[0], array[i]];
  
      // call max heapify on the reduced heap
      heapify(array, i, 0, animations);
    }
  
    return animations;
  }
  
  // To heapify a subtree rooted with node i which is an index in array[]
  function heapify(array, n, i, animations) {
    let largest = i; // Initialize largest as root
    const l = 2 * i + 1; // left = 2*i + 1
    const r = 2 * i + 2; // right = 2*i + 2
  
    // If left child is larger than root
    if (l < n) {
      animations.push({type: 'comparison', indices: [l, largest]});
      if (array[l] > array[largest]) largest = l;
    }
  
    // If right child is larger than largest so far
    if (r < n) {
      animations.push({type: 'comparison', indices: [r, largest]});
      if (array[r] > array[largest]) largest = r;
    }
  
    // If largest is not root
    if (largest !== i) {
      animations.push({type: 'swap', indices: [i, largest], heights: [array[largest], array[i]]});
      [array[i], array[largest]] = [array[largest], array[i]];
  
      // Recursively heapify the affected sub-tree
      heapify(array, n, largest, animations);
    }
  }

export default heapSort;