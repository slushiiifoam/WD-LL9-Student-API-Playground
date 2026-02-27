// STEP 1: Select elements from the page

const factButton = document.getElementById("fact-button");

const factDisplay = document.getElementById("fact-display");


// STEP 2: Create function to fetch data from API

function fetchCatFact() {

    // Show loading message
    factDisplay.textContent = "Loading cat fact...";

    // Fetch data from API
    fetch("https://catfact.ninja/fact")

        .then(function(response) {

            // Convert response to JSON
            return response.json();

        })

        .then(function(data) {

            // Display fact on page
            factDisplay.textContent = data.fact;

        })

        .catch(function(error) {

            // Handle errors
            factDisplay.textContent = "Something went wrong. Try again.";

            console.log(error);

        });

}


// STEP 3: Add click event listener to button

factButton.addEventListener("click", fetchCatFact);
