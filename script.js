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
        alert("Please add names first!");
        return;
    }

    if (isSpinning) return; // Prevent multiple spins at once
    isSpinning = true;
    document.querySelector("button").disabled = true; // Disable button during spin

    // Stop auto-shuffling and perform the final spin
    clearInterval(shuffleInterval);

    const spinDuration = 10000; // Spin duration in ms
    const minSpeed = 500; // Minimum speed of the spinner in ms
    let currentSpeed = 30; // Start speed for the spinner (lower value for faster)
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

// Function to display the winner after the spin in a popup
function displayWinner(index) {
    const winner = names[index];

    // Create a congratulatory message popup
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const message = document.createElement("div");
    message.classList.add("popup-message");
    message.innerHTML = `
        <h2>🎉 Congratulations! 🎉</h2>
        <h3>Winner: ${winner}</h3>
        <button class="popup-close">Close</button>
    `;
    
    // Add event listener for the close button
    message.querySelector(".popup-close").addEventListener("click", () => {
        document.body.removeChild(popup); // Remove the popup when close is clicked
        document.querySelector("button").disabled = false; // Re-enable button after closing
        removeBalloons(); // Remove balloons when closing the popup
    });

    popup.appendChild(message);
    document.body.appendChild(popup);

    // Trigger the festive balloons animation
    showBalloons();

    isSpinning = false;
}

// Function to show festive balloons
function showBalloons() {
    const balloonContainer = document.createElement("div");
    balloonContainer.classList.add("balloon-container");
    
    // Create multiple balloons
    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.style.animationDelay = `${Math.random() * 5}s`;
        balloonContainer.appendChild(balloon);
    }

    document.body.appendChild(balloonContainer);
}

// Function to remove balloons when the popup is closed
function removeBalloons() {
    const balloonContainer = document.querySelector(".balloon-container");
    if (balloonContainer) {
        document.body.removeChild(balloonContainer);
    }
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

// Function to show fireworks randomly
function showFireworks() {
    const fireworkContainer = document.createElement("div");
    fireworkContainer.classList.add("firework-container");
    
    // Random number of fireworks
    const numOfFireworks = Math.floor(Math.random() * 5) + 3;  // Between 3 and 7 fireworks
    for (let i = 0; i < numOfFireworks; i++) {
        const firework = document.createElement("div");
        firework.classList.add("firework");
        
        // Randomly position the fireworks
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.animationDelay = `${Math.random() * 2}s`; // Add delay for randomness
        fireworkContainer.appendChild(firework);
    }

    // Append the fireworks to the body
    document.body.appendChild(fireworkContainer);

    // Remove fireworks after animation ends
    setTimeout(() => {
        document.body.removeChild(fireworkContainer);
    }, 1500); // Fireworks animation duration
}

// Function to display the winner after the spin in a popup
// Function to display the winner after the spin in a popup
function displayWinner(index) {
    const winner = names[index];

    // Create a congratulatory message popup
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const message = document.createElement("div");
    message.classList.add("popup-message");
    message.innerHTML = `
        <h2>🎉 Congratulations! 🎉</h2>
        <h3>Winner: ${winner}</h3>
        <button class="popup-close">Close</button>
    `;

    // Add event listener for the close button
    message.querySelector(".popup-close").addEventListener("click", () => {
        document.body.removeChild(popup); // Remove the popup when close is clicked
        document.querySelector("button").disabled = false; // Re-enable button after closing
        removeBalloons(); // Remove balloons when closing the popup
    });

    popup.appendChild(message);
    document.body.appendChild(popup);

    // Trigger the festive balloons animation
    showBalloons();

    // Trigger the fireworks animation using Fireworks.js
    startFireworks();  // Call the function to trigger fireworks

    isSpinning = false;
}

// Function to start fireworks using Fireworks.js
// Function to start fireworks using Fireworks.js
// Correct Fireworks.js initialization
function startFireworks() {
    if (typeof Fireworks === 'undefined') {
        console.error('Fireworks.js is not loaded.');
        return;
    }

    // Initialize Fireworks.js using the create() method
    const fireworks = Fireworks({
        particleCount: 100,
        speed: 4,
        angle: 90,
        gravity: 1.5
    });

    fireworks.start();

    // Optionally, stop fireworks after 3 seconds
    setTimeout(() => {
        fireworks.stop();
    }, 3000);
}

