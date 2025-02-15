const arrayContainer = document.getElementById("array-container");
const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");
const arrayInput = document.getElementById("arrayInput");
const speedRange = document.getElementById("speedRange");
const speedDisplay = document.getElementById("speedDisplay");

let array = [];
let animationSpeed = parseInt(speedRange.value);

// Update speed display as slider moves
speedRange.addEventListener("input", () => {
  animationSpeed = parseInt(speedRange.value);
  speedDisplay.textContent = animationSpeed;
});

/**
 * Renders the array as bars within the container.
 * highlightIndices: indices to highlight (for the compared bars).
 */
function renderArray(arr, highlightIndices = []) {
  // Clear container
  arrayContainer.innerHTML = "";

  if (arr.length === 0) return;

  // Calculate dynamic scaling so bars don't exceed container
  const containerHeight = 300; // matches CSS height
  const maxVal = Math.max(...arr);
  // Avoid division by zero if all elements are 0
  const scaleFactor = maxVal > 0 ? (containerHeight - 10) / maxVal : 1;

  arr.forEach((num, idx) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    
    // Scale bar height to fit within container
    const barHeight = Math.floor(num * scaleFactor);
    bar.style.height = barHeight + "px";

    // Highlight the bars being compared
    if (highlightIndices.includes(idx)) {
      bar.style.backgroundColor = "#f5efe7"; // Cream highlight
    } else {
      bar.style.backgroundColor = "#d8c4b6"; // Default Beige
    }

    arrayContainer.appendChild(bar);
  });
}

/**
 * Parse the user input and generate the array.
 */
generateBtn.addEventListener("click", () => {
  const inputValues = arrayInput.value
    .split(",")
    .map(item => parseInt(item.trim()))
    .filter(item => !isNaN(item));

  if (inputValues.length === 0) {
    alert("Please enter valid numbers separated by commas.");
    return;
  }

  array = inputValues;
  renderArray(array);
  startBtn.disabled = false;
});

/**
 * Bubble Sort with step-by-step animation.
 */
async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight the pair being compared
      renderArray(arr, [j, j + 1]);
      await new Promise(resolve => setTimeout(resolve, animationSpeed));

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // Show swap result
        renderArray(arr, [j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
      }
    }
  }
  return arr;
}

/**
 * Start the animation on button click.
 */
startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;
  generateBtn.disabled = true;

  await bubbleSort(array);
  // Final render (no highlights)
  renderArray(array);

  startBtn.disabled = false;
  generateBtn.disabled = false;
});
