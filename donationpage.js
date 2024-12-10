document.addEventListener('DOMContentLoaded', () => {
  enablePullToRefresh('requests');
  enablePullToRefresh('donationBoxContainer');
  enablePullToRefresh('notifications');
  enablePullToRefresh('donations');
  setupNavigation();
  hideAllContainers();  // Hide all containers initially
  showRequests();  // Show the home container initially
  checkForDonations();  // Check for donations on page load
  setupSettings();  // Setup settings functionality
});

function donateNow() {
  window.location.href = 'donor.html';
}

function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      navItems.forEach((i) => i.classList.remove('active'));
      this.classList.add('active');
      document.documentElement.style.setProperty('--active-color', this.dataset.color);
      const page = this.dataset.page;
      if (page === 'notifications') {
        showNotifications();
      } else if (page === 'home') {
        showRequests();
      } else if (page === 'donations') {
        showDonationsHistory();
      } else if (page === 'settings') {
        showSettings();
      }
    });
  });
}

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
  container.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 50) {
      refreshSymbol.style.display = 'none';
      refreshContent(containerId);
    }
  });
}

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
  } else if (containerId === 'donations') {
    alert("Refreshing donation history...");
    // Add logic to refresh donation history
  }
}

function showNotifications() {
  hideAllContainers();
  const notifications = document.getElementById('notifications');
  notifications.style.display = 'block';
  setTimeout(() => notifications.classList.add('active'), 10);
}

function showRequests() {
  hideAllContainers();
  const requests = document.getElementById('requests');
  requests.style.display = 'block';
  setTimeout(() => requests.classList.add('active'), 10);
}

function showUserDonations() {
  hideAllContainers();
  const donationBoxContainer = document.getElementById('donationBoxContainer');
  donationBoxContainer.style.display = 'block';
  setTimeout(() => donationBoxContainer.classList.add('active'), 10);
}

function showDonationsHistory() {
  hideAllContainers();
  const donations = document.getElementById('donations');
  donations.style.display = 'block';
  setTimeout(() => donations.classList.add('active'), 10);
}

function showSettings() {
  hideAllContainers();
  const settings = document.getElementById('settings');
  settings.style.display = 'block';
  setTimeout(() => settings.classList.add('active'), 10);
}

function hideAllContainers() {
  const containers = document.querySelectorAll('.requests-container, .donation-box-container, .notifications-container, .donations-container, .settings-container');
  containers.forEach(container => {
    container.style.display = 'none';
    container.classList.remove('active');
  });
}

function checkForDonations() {
  const donationCards = document.querySelectorAll('.donation-card');
  const emptyMessage = document.querySelector('.empty-message');
  if (donationCards.length > 0) {
    emptyMessage.style.display = 'none';
  } else {
    emptyMessage.style.display = 'block';
  }
}

function goToHome() {
  showRequests();
  document.querySelector('.nav-item[data-page="home"]').classList.add('active');
  highlightOngoingDonations();
}

function goBack() {
  const activePage = document.querySelector('.nav-item.active');
  if (activePage) {
    const page = activePage.dataset.page;
    if (page === 'donations') {
      showRequests();
    } else if (page === 'notifications') {
      showRequests();
    } else if (page === 'settings') {
      showRequests();
    } else {
      showRequests();
    }
  } else {
    showRequests();
  }
}

function highlightOngoingDonations() {
  const requestsList = document.getElementById('requests-list');
  requestsList.classList.add('highlight');
  setTimeout(() => {
    requestsList.classList.remove('highlight');
  }, 10000);
}

function setupSettings() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const notificationsToggle = document.getElementById('notificationsToggle');

  darkModeToggle.addEventListener('change', toggleDarkMode);
  notificationsToggle.addEventListener('change', toggleNotifications);

  // Check local storage for dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    darkModeToggle.checked = true;
    document.body.classList.add('dark-mode');
  }
}

function toggleDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
}

function toggleNotifications() {
  const notificationsToggle = document.getElementById('notificationsToggle');
  if (notificationsToggle.checked) {
    alert("Real-time notifications enabled.");
  } else {
    alert("Real-time notifications disabled.");
  }
}