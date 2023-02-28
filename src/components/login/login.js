document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // empêcher la soumission du formulaire
  
  // récupérer les valeurs des champs
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  // vérifier si les données saisies correspondent à celles stockées dans le localStorage
  var storedUsername = localStorage.getItem("username");
  var storedPassword = localStorage.getItem("password");
  
  if (username === storedUsername && password === storedPassword) {
    // rediriger l'utilisateur vers la page principale de l'OS
    localStorage.setItem("loggedIn", "true");
    window.location.href = "../../index.html";
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect");
  }
});