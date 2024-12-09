document.addEventListener('DOMContentLoaded', () => {
  enablePullToRefresh('requests'); // Enable pull-to-refresh for the requests page
  enablePullToRefresh('donationBoxContainer'); // Enable pull-to-refresh for the donation box page
  enablePullToRefresh('notifications'); // Enable pull-to-refresh for the notifications page
  setupNavigation();
});

function donateNow() {
  window.location.href = 'SOFTENG PROJ/homepageFolder/homepage.html';
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior

      // Remove active class from all items
      navItems.forEach((i) => i.classList.remove('active'));
      
      // Set active class on clicked item
      this.classList.add('active');
      
      // Apply the icon color
      document.documentElement.style.setProperty('--active-color', this.dataset.color);

      // Show the corresponding page based on the data-page attribute
      const page = this.dataset.page;
      if (page === 'notifications') {
        showNotifications();
      } else if (page === 'home') {
        showRequests();
      }
      // Add other cases for other pages if needed
    });
  });
}

// Pull-to-refresh functionality for specific containers
function enablePullToRefresh(containerId) {
  let startY;
  const refreshSymbol = document.getElementById('refreshSymbol');

  const container = document.getElementById(containerId);
  container.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  container.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    if (currentY - startY > 50) {
      refreshSymbol.style.display = 'block';
    }
  });

  container.addEventListener('touchend', () => {
    refreshSymbol.style.display = 'none';
    refreshContent(containerId);
  });
}

// Function to handle content refresh for different sections
function refreshContent(containerId) {
  if (containerId === 'requests') {
    alert("Refreshing donation requests...");
    // Add logic to refresh donation requests
  } else if (containerId === 'donationBoxContainer') {
    alert("Refreshing donation box...");
    // Add logic to refresh donation box
  } else if (containerId === 'notifications') {
    alert("Refreshing notifications...");
    // Add logic to refresh notifications
  }
}

// Show/hide functions for each page with animations
function showNotifications() {
  const requests = document.getElementById('requests');
  const donationBoxContainer = document.getElementById('donationBoxContainer');
  const notifications = document.getElementById('notifications');

  // Hide other containers with animation
  requests.classList.add('hidden');
  donationBoxContainer.classList.add('hidden');
  
  setTimeout(() => {
    requests.style.display = 'none';
    donationBoxContainer.style.display = 'none';

    // Show notifications container with animation
    notifications.style.display = 'block';
    setTimeout(() => notifications.classList.add('active'), 10);
  }, 300);
}

function showRequests() {
  const requests = document.getElementById('requests');
  const donationBoxContainer = document.getElementById('donationBoxContainer');
  const notifications = document.getElementById('notifications');

  // Hide other containers with animation
  donationBoxContainer.classList.add('hidden');
  notifications.classList.add('hidden');
  
  setTimeout(() => {
    donationBoxContainer.style.display = 'none';
    notifications.style.display = 'none';

    // Show requests container with animation
    requests.style.display = 'block';
    setTimeout(() => requests.classList.add('active'), 10);
  }, 300);
}

function showUserDonations() {
  const requests = document.getElementById('requests');
  const donationBoxContainer = document.getElementById('donationBoxContainer');
  const notifications = document.getElementById('notifications');

  // Hide other containers with animation
  requests.classList.add('hidden');
  notifications.classList.add('hidden');

  setTimeout(() => {
    requests.style.display = 'none';
    notifications.style.display = 'none';

    // Show donation box container with animation
    donationBoxContainer.style.display = 'block';
    setTimeout(() => donationBoxContainer.classList.add('active'), 10);
  }, 300);
}
