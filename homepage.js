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
function clearPickoffLocation() {
    const pickoffInput = document.getElementById('pickoff-location');
    pickoffInput.value = '';  // Clear the input value
    pickoffInput.placeholder = 'Pick-off Location?';  // Reset the placeholder
    localStorage.removeItem('selectedPickoffLocation'); // Clear it from localStorage as well
}

// Function to clear the pick-off location
function clearDropoffLocation() {
    const dropoffInput = document.getElementById('dropoff-location');
    dropoffInput.value = '';  // Clear the input value
    dropoffInput.placeholder = 'Drop-off Location?';  // Reset the placeholder
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
                callback('Address not found');
            }
        })
        .catch(error => console.error('Error during geocoding:', error));
}
document.getElementById('current-location-btn').addEventListener('click', function () {
    window.location.href = 'H:/SoftwarePaingenieering-main/map.html';
});

// Function to set the current location in the "Pickoff Location" input
function setCurrentLocationForPickoff(inputElement) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Reverse geocode to get a human-readable address
            reverseGeocode(latitude, longitude, function (address) {
                inputElement.value = address; // Set the address in the input field
            });

            // Optionally, store the coordinates in localStorage for later use
            localStorage.setItem('pickoffLocation', JSON.stringify({ latitude, longitude }));
        }, function (error) {
            alert('Unable to retrieve your location. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to handle navigation to the map page for pickoff location
function navigateToMap(inputElement, type) {
    const inputId = inputElement.id; // Determine which input triggered the navigation
    localStorage.setItem('mapTarget', inputId); // Save the target input ID
    localStorage.setItem('locationType', type); // Save the location type (pickoff or dropoff)
    window.location.href = 'H:/SoftwarePaingenieering-main/map.html';
}

// DOMContentLoaded: Ensure elements exist before attaching events
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the selected pick-off location from localStorage
    const pickoffLocation = localStorage.getItem('selectedPickoffLocation');
    const pickoffInput = document.getElementById('pickoff-location');

    // Set the input field with the retrieved location, if it exists
    if (pickoffLocation) {
        pickoffInput.value = pickoffLocation;
        console.log(`Pick-off location: ${pickoffLocation}`); // Print the pick-off location in console
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Retrieve the selected drop-off location from localStorage
        const dropoffLocation = localStorage.getItem('selectedDropoffLocation');
        const dropoffInput = document.getElementById('dropoff-location');
    
        // Set the input field with the retrieved location, if it exists
        if (dropoffLocation) {
            dropoffInput.value = dropoffLocation;
            alert(`Drop-off location: ${dropoffLocation}`); // Print the drop-off location
        }
    });

    // Attach event listener to the "Drop-off Location" input
    dropoffInput.addEventListener('click', function () {
        // Navigate to the map page to select a new location
        window.location.href = 'H:/SoftwarePaingenieering-main/map.html';
    });

    // Attach clear function to the clear button
    const clearButton = document.querySelector('.clear-btn');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            dropoffInput.value = ''; // Clear the input field
            localStorage.removeItem('selectedDropoffLocation'); // Remove from localStorage
        });
    }

    // Retrieve the selected pickup location from localStorage
    const pickupLocation = localStorage.getItem('pickupLocation');
    const pickupLocationInput = document.getElementById('pickup-location');
    pickupLocationInput.value = pickupLocation || 'Not Set';

    // When the "Pickoff Location" input is clicked, get and set the current location
    pickoffInput.addEventListener('click', function () {
        setCurrentLocationForPickoff(this);
    });

    // Attach the submit function to the submit button
    const submitButton = document.querySelector('.submit-btn');
    if (submitButton) {
        submitButton.addEventListener('click', handleSubmit);
    }
});

// JavaScript for Map Page
function selectDropoffLocation(location) {
    // Example: location = "123 Main St, City, State"
    localStorage.setItem('selectedDropoffLocation', location);
    alert('Drop-off location selected! Returning to the homepage.');
    window.location.href = 'H:/SOFTENG/SoftwarePaingenieering-main/map.html'; // Adjust to your homepage URL
}

document.addEventListener('DOMContentLoaded', function () {
    const currentLocationButton = document.getElementById('current-location-btn');
    if (currentLocationButton) {
        currentLocationButton.addEventListener('click', function () {
            window.location.href = 'H:/SOFTENG/SoftwarePaingenieering-main/map.html';
        });
    }
});

// Function to handle submission and calculate arrival time
function handleSubmit(event) {
    event.preventDefault();  // Prevent the form from submitting if it's inside a form

    const timeDropdown = document.querySelector('.time-dropdown');
    if (!timeDropdown || !timeDropdown.value) {
        alert('Please select a valid time.');
        return;
    }

    const selectedTime = timeDropdown.value.trim();
    if (!selectedTime) {
        alert('Please select a valid time.');
        return;
    }

    let possibleHour = parseInt(selectedTime, 10);
    if (isNaN(possibleHour)) {
        alert('Please select a valid time.');
        return;
    }

    let possibleMinute = 0; // Default minute to 0
    let period = 'AM';

    if (possibleHour >= 12) {
        period = 'PM';
        if (possibleHour > 12) {
            possibleHour -= 12;
        }
    }

    possibleMinute += 30;
    if (possibleMinute >= 60) {
        possibleMinute -= 60;
        possibleHour += 1;
        if (possibleHour === 12) {
            period = period === 'AM' ? 'PM' : 'AM';
        }
    }

    if (possibleHour === 0) {
        possibleHour = 12;
    }

    const formattedMinute = possibleMinute < 10 ? `0${possibleMinute}` : possibleMinute;
    const arrivalTime = `${possibleHour}:${formattedMinute} ${period}`;

    alert(`Thank you for submitting! The ride is estimated to arrive by ${arrivalTime}.`);
}

document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('.submit-btn');
    if (submitButton) {
        submitButton.addEventListener('click', handleSubmit);
    }
});