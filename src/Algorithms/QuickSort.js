
//This is the implementation of the Quick Sort algorithm
function quickSort(array) {
  // Array to store the animations
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

// This is the helper function for the quick sort algorithm
function quickSortHelper(items, left, right, animations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSortHelper(items, left, index - 1, animations);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSortHelper(items, index, right, animations);
    }
  }
  return items;
}

// This is the function that partitions the array
function partition(items, left, right, animations) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      animations.push([i, j]); //values being compared
      animations.push([i, j]); //revert their color
      animations.push([i, items[j], j, items[i]]); //swap values
      swap(items, i, j); //swap elements
      i++;
      j--;
    }
  }
  return i;
}

// This is the function that swaps the elements
function swap(items, firstIndex, secondIndex){
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

export default quickSort;
