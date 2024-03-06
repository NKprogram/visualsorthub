
function quickSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

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

function swap(items, firstIndex, secondIndex){
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

export default quickSort;
