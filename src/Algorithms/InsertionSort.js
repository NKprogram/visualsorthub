function insertionSort(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    // Compare key with each element on the left of it until an element smaller than it is found
    while (j >= 0 && array[j] > key) {
      // For visual purposes, we push the compared indices and heights for potential swap
      animations.push([j, j + 1, array[j + 1], array[j], false]);
      array[j + 1] = array[j];
      j = j - 1;
    }
    // This is for the final position of key, where a swap doesn't occur
    animations.push([j + 1, i, key, array[j + 1], true]);
    array[j + 1] = key;
  }
  // Push the animation for the last element
  animations.push([array.length - 1, array.length - 1, array[array.length - 1], array[array.length - 1], true]);
  return animations;
}

export default insertionSort;