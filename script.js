// Initialize an empty array for names
let names = [];

function addName() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();
    if (name !== "") {
        // Add the new name to the names array
        names.push(name);
        nameInput.value = ""; // Clear input field
        displayNames();
    }
}

function displayNames() {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = ""; // Clear existing list

    // Display the names from the names array
    names.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        nameList.appendChild(li);
    });
}

function spin() {
    if (names.length === 0) {
        alert("Please add some names first!");
        return;
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    const winner = names[randomIndex];
    document.getElementById("winner").textContent = winner;
}

// Load the names from a JSON file when the page loads
window.onload = function() {
    fetch('names.json')  // Replace with your actual JSON file path if necessary
        .then(response => response.json())
        .then(data => {
            names = data.names; // Assuming your JSON has a "names" array
            displayNames();
        })
        .catch(error => {
            console.error('Error loading names:', error);
        });
}
