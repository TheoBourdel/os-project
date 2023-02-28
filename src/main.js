function checkLoginStatus() {
    var loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      window.location.href = "login.html";
    }
  }
  
  checkLoginStatus();
  