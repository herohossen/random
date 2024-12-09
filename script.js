let names = [];
let isSpinning = false;
let shuffleInterval;

// Function to add names
function addName() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();
    if (name !== "") {
        names.push(name);
        nameInput.value = ""; // Clear input field
        displayNames();
    }
}

// Function to display the list of names on the screen
function displayNames() {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = ""; // Clear existing list

    names.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        nameList.appendChild(li);
    });
}

// Function to shuffle the names array
function shuffleNames() {
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]]; // Swap elements
    }
}

// Function to start the spinning process
function spin() {
    if (names.length === 0) {
        alert("Please add some names first!");
        return;
    }

    if (isSpinning) return; // Prevent multiple spins at once
    isSpinning = true;
    document.querySelector("button").disabled = true; // Disable button during spin

    // Stop auto-shuffling and perform the final spin
    clearInterval(shuffleInterval);

    const spinDuration = 50000; // Faster spin duration in ms
    const minSpeed = 2000; // Minimum speed of the spinner in ms
    let currentSpeed = 10; // Start speed for the spinner (lower value for faster)
    let spinTime = 0;
    let currentIndex = 0;

    const spinInterval = setInterval(() => {
        currentIndex = Math.floor(Math.random() * names.length);
        displaySpinner(currentIndex);

        spinTime += currentSpeed;
        if (spinTime >= spinDuration) {
            clearInterval(spinInterval);
            displayWinner(currentIndex);
        }

        // Slow down the spinner by increasing the interval
        if (spinTime > spinDuration * 0.7 && currentSpeed < minSpeed) {
            currentSpeed = minSpeed;
        } else {
            currentSpeed += 5; // Increase speed during the spin (faster slowdown)
        }
    }, currentSpeed);
}

// Function to display the current name being spun
function displaySpinner(index) {
    const nameList = document.getElementById("nameList");
    const items = nameList.children;
    // Highlight the current "spinning" name
    Array.from(items).forEach(item => item.classList.remove("spinning"));
    items[index].classList.add("spinning");
}

// Function to display the winner after the spin
function displayWinner(index) {
    const winner = names[index];
    document.getElementById("winner").textContent = winner;
    document.querySelector("button").disabled = false; // Re-enable button after spin
    isSpinning = false;
}

// Auto shuffle the names faster and update the display
function autoShuffle() {
    shuffleInterval = setInterval(() => {
        shuffleNames(); // Shuffle the names array
        displayNames();  // Update the displayed names
    }, 50); // Shuffle every 50ms (faster shuffle)
}

// Load names from JSON (replace with your actual JSON file path if needed)
window.onload = function() {
    fetch('names.json')
        .then(response => response.json())
        .then(data => {
            names = data.names; // Assuming your JSON has a "names" array
            displayNames();
            autoShuffle(); // Start auto-shuffling when the page loads
        })
        .catch(error => {
            console.error('Error loading names:', error);
        });
}
