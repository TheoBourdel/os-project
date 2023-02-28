document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // empêcher la soumission du formulaire
    
    // récupérer les valeurs des champs
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    // stocker les données dans le localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    
    // rediriger l'utilisateur vers la page de connexion
    window.location.href = "login.html";
  });
  