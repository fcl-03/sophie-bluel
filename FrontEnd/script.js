// Fonction pour vérifier si l'utilisateur est connecté
function checkLoginStatus() {
    const token = localStorage.getItem("authToken");
    
    if (token) {
        // L'utilisateur est connecté
        enableEditMode();
    }
}

// Fonction pour activer le mode édition
function enableEditMode() {
    // Ajouter la classe edit-mode au body
    document.body.classList.add("edit-mode");
    
    // Créer et ajouter le bandeau noir "Mode édition"
    const banner = document.createElement("div");
    banner.className = "edit-mode-banner";
    banner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Changer "login" en "logout" dans la navigation
    const loginLink = document.querySelector('nav a[href="login.html"]');
    if (loginLink) {
        loginLink.textContent = "logout";
        loginLink.href = "#";
        loginLink.addEventListener("click", logout);
    }
    
    // Ajouter le bouton "modifier" à côté de "Mes Projets"
    const portfolioTitle = document.querySelector("#portfolio h2");
    if (portfolioTitle) {
        const modifyBtn = document.createElement("a");
        modifyBtn.href = "#";
        modifyBtn.className = "modify-btn";
        modifyBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
        portfolioTitle.appendChild(modifyBtn);
    }
}

// Fonction pour se déconnecter
function logout(event) {
    event.preventDefault();
    localStorage.removeItem("authToken");
    window.location.reload();
}

// URL de l'API
const apiUrl = "http://localhost:5678/api/works";

// Fonction pour récupérer les projets
async function getWorks() {
    try {
        const response = await fetch(apiUrl);
        const works = await response.json();
        
        console.log(works);
        
        // Stocker les projets dans la variable globale
        allWorks = works;
        
        // Afficher tous les projets
        displayWorks(works);
        
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

// Fonction pour afficher les projets dans la galerie
function displayWorks(works) {
    // Sélectionner la galerie
    const gallery = document.querySelector(".gallery");
    
    // Vider la galerie (au cas où il y a du contenu en dur)
    gallery.innerHTML = "";
    
    // Pour chaque projet, créer et ajouter les éléments HTML
    works.forEach(work => {
        // Créer une figure
        const figure = document.createElement("figure");
        
        // Créer l'image
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        
        // Créer le titre
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;
        
        // Assembler
        figure.appendChild(img);
        figure.appendChild(figcaption);
        
        // Ajouter à la galerie
        gallery.appendChild(figure);
    });
}

// Variable globale pour stocker tous les projets
let allWorks = [];

// Fonction pour filtrer les projets
function filterWorks(categoryId) {
    // Gérer le bouton actif
    const allButtons = document.querySelectorAll(".filter-btn");
    allButtons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    
    // Filtrer les projets
    let worksToDisplay = allWorks;
    
    if (categoryId !== null) {
        worksToDisplay = allWorks.filter(work => work.categoryId === categoryId);
    }
    
    // Afficher les projets filtrés
    displayWorks(worksToDisplay);
}

// Lancer la récupération au chargement de la page
checkLoginStatus();
getWorks();
getCategories();

// Fonction pour récupérer les catégories
async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json();
        
        console.log("Catégories:", categories);
        
        // Créer les boutons de filtre
        createFilters(categories);
        
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
    }
}

// Fonction pour créer les boutons de filtre
function createFilters(categories) {
    // Sélectionner la section portfolio
    const portfolio = document.getElementById("portfolio");
    
    // Créer un conteneur pour les filtres
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters";
    
    // Ajouter le bouton "Tous"
    const btnAll = document.createElement("button");
    btnAll.textContent = "Tous";
    btnAll.className = "filter-btn active"; // Active par défaut
    btnAll.addEventListener("click", () => filterWorks(null));
    filtersContainer.appendChild(btnAll);
    
    // Créer un bouton pour chaque catégorie
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.className = "filter-btn";
        btn.addEventListener("click", () => filterWorks(category.id));
        filtersContainer.appendChild(btn);
    });
    
    // Insérer les filtres AVANT le titre "Mes Projets"
    const h2 = portfolio.querySelector("h2");
    portfolio.insertBefore(filtersContainer, h2.nextSibling);
}