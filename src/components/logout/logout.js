// Get the logout button
const logoutBtn = document.getElementById('logoutBtn');

// Add an event listener for when the button is clicked
logoutBtn.addEventListener('click', function() {
  // Remove the user information from localStorage
  localStorage.removeItem('user');
  localStorage.removeItem("loggedIn");
  // Redirect the user to the login page
  window.location.href = 'login.html';
});