function heapSort(array) {
  const animations = [];
  buildMaxHeap(array, animations);
  let end = array.length - 1;
  while (end > 0) {
    // Record the swap operation for visualization.
    animations.push([0, end]); // values being swapped
    animations.push([0, end]); // revert their color
    animations.push([0, array[end], end, array[0]]); // swap values
    swap(array, 0, end);
    end--;
    siftDown(array, 0, end, animations);
  }
  return animations;
}

function buildMaxHeap(array, animations) {
  let currentIndex = Math.floor(array.length / 2) - 1;
  while (currentIndex >= 0) {
    siftDown(array, currentIndex, array.length - 1, animations);
    currentIndex--;
  }
}

function siftDown(array, start, end, animations) {
  let left = start * 2 + 1,
      right = left + 1,
      largest = start;

  if (left <= end && array[left] > array[largest]) {
    largest = left;
  }

  if (right <= end && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== start) {
    // Record the swap operation for visualization.
    animations.push([start, largest]); // values being swapped
    animations.push([start, largest]); // revert their color
    animations.push([start, array[largest], largest, array[start]]); // swap values
    swap(array, start, largest);
    siftDown(array, largest, end, animations);
  }
}

function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

export default heapSort;