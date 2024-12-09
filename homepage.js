// Function to handle category selection
function selectCategory(element) {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

// Function to handle donation options selection
function selectOption(element) {
    const donationButtons = document.querySelectorAll('.donate-btn, .ngo-btn');
    donationButtons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

// Function to handle submit action
function handleSubmit() {
    const timeDropdown = document.querySelector('.time-dropdown');
    const selectedTime = timeDropdown.value;

    // Assuming a 30-minute arrival estimate for simplicity
    const [hour, minutePart] = selectedTime.split(':');
    const [minute, period] = minutePart.split(' ');

    let possibleHour = parseInt(hour, 10);
    let possibleMinute = parseInt(minute, 10) + 30;

    if (possibleMinute >= 60) {
        possibleMinute -= 60;
        possibleHour += 1;
    }

    if (possibleHour > 12) {
        possibleHour -= 12;
        possiblePeriod = period === 'AM' ? 'PM' : 'AM';
    } else {
        possiblePeriod = period;
    }

    const formattedMinute = possibleMinute < 10 ? `0${possibleMinute}` : possibleMinute;
    const arrivalTime = `${possibleHour}:${formattedMinute} ${possiblePeriod}`;

    alert(`Thank you for submitting! The ride is estimated to arrive by ${arrivalTime}.`);
}

// Function to clear the drop-off location
function clearDropoffLocation() {
    const dropoffInput = document.getElementById('dropoff-location');
    dropoffInput.value = '';  // Clear the input value
    dropoffInput.placeholder = 'Drop off location';  // Reset the placeholder
    localStorage.removeItem('selectedDropoffLocation'); // Clear it from localStorage as well
}

// Function to reverse geocode latitude and longitude to an address
function reverseGeocode(latitude, longitude, callback) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                callback(data.results[0].formatted_address);
            } else {
                callback("Address not found");
            }
        })
        .catch(error => console.error("Error during geocoding:", error));
}

// Function to set the current location in the Pick-off input
function setCurrentLocationForPickoff(inputElement) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Reverse geocode to get a human-readable address
            reverseGeocode(latitude, longitude, function(address) {
                inputElement.value = address;  // Set the address in the input field
            });

            // Optionally, store the coordinates in localStorage for later use
            localStorage.setItem('pickoffLocation', JSON.stringify({ latitude, longitude }));

        }, function(error) {
            alert("Unable to retrieve your location. Please try again.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to navigate to the map page with updated details
function navigateToMap(element) {
    let location;

    // Determine the source of the click
    if (element.id === 'pickup-location') {
        // If it's the pickup location paragraph
        location = element.innerText;
    } else if (element.id === 'pickup-instruction') {
        // If it's the pickup instruction input
        const inputValue = element.value.trim();
        if (!inputValue) {
            alert("Please enter a pickup instruction before proceeding.");
            return;
        }
        location = inputValue;
    }

    // Save the location in local storage to pass it to the map page
    localStorage.setItem('location', location);

    // Navigate to the map page
    window.location.href = 'C:/Users/acer/Documents/New folder/SOFTENG PROJ/map.html';
}

// Function to attach event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Attach the submit function to the submit button
    document.querySelector('.submit-btn').addEventListener('click', handleSubmit);

    // Attach the clear function to the drop-off location button
    document.querySelector('.clear-btn').addEventListener('click', clearDropoffLocation);

    const pickupLocation = localStorage.getItem("pickupLocation");

    // Display the pickup location in the input field
    const pickupLocationInput = document.getElementById("pickup-location");
    pickupLocationInput.value = pickupLocation || "Not Set";
    
    // Get the Pick-off Location input element
    const pickoffInput = document.getElementById('pickoff-location');

    // When the Pick-off Location input is clicked, get and set the current location
    pickoffInput.addEventListener('click', function() {
        setCurrentLocationForPickoff(this);
    });

    // Retrieve the selected drop-off location from localStorage and set it in the input field
    const dropoffLocation = localStorage.getItem('selectedDropoffLocation');
    const dropoffInput = document.getElementById('dropoff-location');
    if (dropoffLocation) {
        dropoffInput.value = dropoffLocation;
    }
    function handleSubmit() {
        const timeDropdown = document.querySelector('.time-dropdown');
        const selectedTime = timeDropdown.value;
    
        // Simulate arrival time calculation
        const [hour, minute] = selectedTime.split(':').map(Number);
        const arrivalHour = (hour + Math.floor((minute + 30) / 60)) % 24;
        const arrivalMinute = (minute + 30) % 60;
    
        const formattedTime = `${arrivalHour}:${arrivalMinute.toString().padStart(2, '0')}`;
        alert(`Thank you for submitting! The ride is estimated to arrive by ${formattedTime}.`);
    }
    
});
