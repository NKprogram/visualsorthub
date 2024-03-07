# VisualSortHub

VisualSortHub is an interactive web application that visualizes different sorting algorithms. Users can watch how algorithms like Merge Sort, Quick Sort, Bubble Sort, and others tackle the task of organizing a set of numbers. This tool is an excellent resource for students and anyone interested in understanding the mechanics of sorting algorithms.

## Link to the website
https://nkprogram.github.io/visualsorthub/

## Installation and Setup

To set up VisualSortHub on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies with `npm install`.
4. Start the development server with `npm start`.

## Features

- **Interactive Sorting Visualization**: Watch as the array gets sorted in real-time.
- **Multiple Sorting Algorithms**: Includes visualizations for Merge Sort, Quick Sort, Bubble Sort, Insertion Sort, Selection Sort, and Heap Sort.
- **Customizable Array and Speed**: Users can generate new arrays and adjust the size and sorting speed using intuitive sliders.

## Interface Components

### Buttons

- **Generate New Array**: Creates a new, randomly-organized array for sorting.
- **Merge Sort**: Initiates the visualization for Merge Sort.
- **Quick Sort**: Begins the Quick Sort animation.
- **Bubble Sort**: Launches the Bubble Sort process.
- **Insertion Sort**: Shows how Insertion Sort operates.
- **Selection Sort**: Demonstrates the Selection Sort mechanism.
- **Heap Sort**: Triggers the Heap Sort algorithm.

![alt text](image.png)


### Bars

- The bars represent the elements of the array, with their heights corresponding to the values they represent.

![alt text](image-1.png)

### Sliders

- **Change Array Size**: Adjust the number of elements in the array.
- **Change Sorting Speed**: Control the speed at which the sorting animations play out.

![alt text](image-2.png)

![alt text](image-3.png)

## How the Sorting Process Works

1. When a sorting algorithm is selected, the app generates a series of animations that visually represent the steps the algorithm takes to sort the array.
2. The color of the bars change to show active comparisons or swaps—initially blue, turning to red for comparisons, and finally green once they are sorted.
3. The sequence of animations plays out at the designated speed, allowing users to follow along with the sorting algorithm's actions.





