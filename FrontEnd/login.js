// Sélectionner le formulaire
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

// Écouter la soumission du formulaire
loginForm.addEventListener("submit", async function(event) {
    // Empêcher le rechargement de la page
    event.preventDefault();
    
    // Récupérer les valeurs des champs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Préparer les données à envoyer
    const loginData = {
        email: email,
        password: password
    };
    
    try {
        // Envoyer la requête POST à l'API
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });
        
        // Vérifier si la réponse est OK
        if (response.ok) {
            // Récupérer les données de la réponse
            const data = await response.json();
            
            console.log("Connexion réussie :", data);
            
            // Stocker le token dans localStorage
            localStorage.setItem("authToken", data.token);
            
            // Rediriger vers la page d'accueil
            window.location.href = "index.html";
            
        } else {
            // Afficher un message d'erreur
            errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
        }
        
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
    }
});