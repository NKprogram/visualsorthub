//This is the implementation of the bubble sort algorithm
function bubbleSort(array) {
  // Array to store the animations
  const animations = [];
  let n = array.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      // Push the compared indices to change their color
      animations.push([i - 1, i]);
      // Push them again to revert their color
      animations.push([i - 1, i]);
      if (array[i - 1] > array[i]) {
        // Swap the elements
        animations.push([i - 1, array[i], i, array[i - 1]]); // Swap animation
        let temp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = temp;
        swapped = true;
      } else {
        // No swap animation
        animations.push([]);
      }
    }
  } while (swapped);
  return animations;
}

export default bubbleSort;