function selectionSort(array) {
  const animations = [];
  let n = array.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      // Push the indices to change their color
      animations.push([minIndex, j, false]);
      // Push them again to revert their color
      animations.push([minIndex, j, false]);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    // Swap the elements if minIndex is not the position i
    if (i !== minIndex) {
      // Push the indices to show a swap animation
      animations.push([i, minIndex, true, array[minIndex], array[i]]);
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
  return animations;
}

export default selectionSort;