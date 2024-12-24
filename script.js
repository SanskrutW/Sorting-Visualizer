// Generate a random array
function generateArray(size = 50) {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * 100) + 1); // Random values between 1 and 100
    }
    renderArray(array);
  }
  
  // Render the array in the container
  function renderArray(array) {
    const container = document.getElementById("array-container");
    container.innerHTML = ""; // Clear previous content
    array.forEach((value) => {
      const bar = document.createElement("div");
      bar.style.height = `${value}%`;
      bar.style.width = `${100 / array.length}%`;
      bar.classList.add("array-bar");
      container.appendChild(bar);
    });
  }
  
  // Bubble Sort Implementation
  async function bubbleSort(array) {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
  
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
  
          bars[j].style.height = `${array[j]}%`;
          bars[j + 1].style.height = `${array[j + 1]}%`;
        }
  
        await delay(document.getElementById("speed").value);
        bars[j].style.backgroundColor = "#007bff";
        bars[j + 1].style.backgroundColor = "#007bff";
      }
      bars[array.length - i - 1].style.backgroundColor = "green"; // Sorted
    }
  }
  
  // Selection Sort Implementation
  async function selectionSort(array) {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      bars[i].style.backgroundColor = "red";
  
      for (let j = i + 1; j < array.length; j++) {
        bars[j].style.backgroundColor = "yellow";
  
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
  
        await delay(document.getElementById("speed").value);
        bars[j].style.backgroundColor = "#007bff";
      }
  
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
  
        bars[i].style.height = `${array[i]}%`;
        bars[minIndex].style.height = `${array[minIndex]}%`;
      }
      bars[i].style.backgroundColor = "green"; // Sorted
    }
  }
  
  // Merge Sort Helper Functions
  async function merge(array, left, mid, right) {
    const bars = document.querySelectorAll(".array-bar");
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
  
    let i = 0,
      j = 0,
      k = left;
  
    while (i < leftArray.length && j < rightArray.length) {
      bars[k].style.backgroundColor = "red";
  
      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        bars[k].style.height = `${array[k]}%`;
        i++;
      } else {
        array[k] = rightArray[j];
        bars[k].style.height = `${array[k]}%`;
        j++;
      }
  
      await delay(document.getElementById("speed").value);
      bars[k].style.backgroundColor = "#007bff";
      k++;
    }
  
    while (i < leftArray.length) {
      bars[k].style.backgroundColor = "red";
      array[k] = leftArray[i];
      bars[k].style.height = `${array[k]}%`;
      await delay(document.getElementById("speed").value);
      bars[k].style.backgroundColor = "#007bff";
      i++;
      k++;
    }
  
    while (j < rightArray.length) {
      bars[k].style.backgroundColor = "red";
      array[k] = rightArray[j];
      bars[k].style.height = `${array[k]}%`;
      await delay(document.getElementById("speed").value);
      bars[k].style.backgroundColor = "#007bff";
      j++;
      k++;
    }
  }
  
  // Merge Sort Implementation
  async function mergeSort(array, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
  
      await mergeSort(array, left, mid);
      await mergeSort(array, mid + 1, right);
      await merge(array, left, mid, right);
    }
  }
  
  // Delay function
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  // Event Listeners
  document.getElementById("generate-array").addEventListener("click", () => {
    const size = document.getElementById("array-size").value;
    generateArray(size);
  });
  
  document.getElementById("start-sort").addEventListener("click", async () => {
    const algorithm = document.getElementById("algorithm-select").value;
    const bars = document.querySelectorAll(".array-bar");
    const array = Array.from(bars, (bar) => parseInt(bar.style.height));
  
    if (algorithm === "bubble") await bubbleSort(array);
    else if (algorithm === "selection") await selectionSort(array);
    else if (algorithm === "merge") await mergeSort(array, 0, array.length - 1);
  });
  
  // Initialize the array on page load
  generateArray();
  