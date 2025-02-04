// Function to update the current time in UTC format
function updateUTCTime() {
    const currentTimeElement = document.querySelector('[data-testid="currentTimeUTC"]');
    const now = new Date();
    // Format the UTC time (YYYY-MM-DD HH:MM:SS)
    currentTimeElement.textContent = `Current UTC Time: ${now.toISOString().slice(0, 19).replace('T', ' ')}`;
  }
  
  // Update time on page load
  updateUTCTime();
  