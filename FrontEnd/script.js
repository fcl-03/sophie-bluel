// // ========== GESTION DU TOKEN / MODE ADMIN ==========
// const token = localStorage.getItem("token");

// if (token) {
//   document.querySelector(".filters").style.display = "none";
//   document.querySelector("#edit-banner").style.display = "block";
//   document.querySelector("#edit-btn").style.display = "flex";

//   const loginLink = document.querySelector("#login-link");
//   loginLink.textContent = "logout";
//   loginLink.href = "#";
//   loginLink.addEventListener("click", function () {
//     localStorage.removeItem("token");
//     window.location.reload();
//   });
// }

// // ========== VARIABLES GLOBALES ==========
// let allWorks = [];

// const gallery = document.querySelector(".gallery");
// const filtersContainer = document.querySelector(".filters");

// // ========== FONCTIONS ==========

// // Fonction pour afficher les works dans la galerie principale
// function displayWorks(works) {
//   gallery.innerHTML = "";
//   works.forEach((element) => {
//     const figure = document.createElement("figure");
//     const img = document.createElement("img");
//     const figcaption = document.createElement("figcaption");

//     img.src = element.imageUrl;
//     img.alt = element.title;
//     figcaption.textContent = element.title;

//     figure.appendChild(img);
//     figure.appendChild(figcaption);
//     gallery.appendChild(figure);
//   });
// }

// // Fonction pour afficher les works dans la modale
// function displayModalWorks() {
//   const modalGallery = document.querySelector(".modal-gallery");
//   modalGallery.innerHTML = "";

//   allWorks.forEach((element) => {
//     const figure = document.createElement("figure");
//     const img = document.createElement("img");
//     const icon = document.createElement("i");

//     img.src = element.imageUrl;
//     img.alt = element.title;
//     icon.className = "fa-solid fa-trash-can";

//     // Suppression au clic sur la poubelle
//     icon.addEventListener("click", function () {
//       fetch("http://localhost:5678/api/works/" + element.id, {
//         method: "DELETE",
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }).then((response) => {
//         if (response.ok) {
//           allWorks = allWorks.filter((work) => work.id !== element.id);
//           displayWorks(allWorks);
//           displayModalWorks();
//         }
//       });
//     });

//     figure.appendChild(img);
//     figure.appendChild(icon);
//     modalGallery.appendChild(figure);
//   });
// }

// // ========== FETCH DES WORKS ==========
// fetch("http://localhost:5678/api/works")
//   .then((response) => response.json())
//   .then((data) => {
//     allWorks = data;
//     displayWorks(allWorks);
//   });

// // ========== FETCH DES CATEGORIES + BOUTONS FILTRES ==========

// // Bouton "Tous" (créé en premier pour qu'il apparaisse en premier)
// const btnAll = document.createElement("button");
// btnAll.textContent = "Tous";
// btnAll.className = "filter-btn active";
// btnAll.addEventListener("click", function () {
//   document
//     .querySelectorAll(".filter-btn")
//     .forEach((btn) => btn.classList.remove("active"));
//   btnAll.classList.add("active");
//   displayWorks(allWorks);
// });
// filtersContainer.appendChild(btnAll);

// // Fetch des catégories
// fetch("http://localhost:5678/api/categories")
//   .then((response) => response.json())
//   .then((data) => {
//     // Créer les boutons de filtre
//     data.forEach((element) => {
//       const button = document.createElement("button");
//       button.textContent = element.name;
//       button.className = "filter-btn";

//       button.addEventListener("click", function () {
//         document
//           .querySelectorAll(".filter-btn")
//           .forEach((btn) => btn.classList.remove("active"));
//         button.classList.add("active");
//         const worksFiltres = allWorks.filter(
//           (work) => work.categoryId === element.id
//         );
//         displayWorks(worksFiltres);
//       });

//       filtersContainer.appendChild(button);
//     });

//     // Remplir le select des catégories pour le formulaire
//     const categorySelect = document.querySelector("#category");
//     data.forEach((element) => {
//       const option = document.createElement("option");
//       option.value = element.id;
//       option.textContent = element.name;
//       categorySelect.appendChild(option);
//     });
//   });

// // ========== GESTION DE LA MODALE ==========
// const modal = document.querySelector("#modal");
// const editBtn = document.querySelector("#edit-btn");
// const closeModal = document.querySelector(".close-modal");
// const modalGalleryView = document.querySelector("#modal-gallery-view");
// const modalFormView = document.querySelector("#modal-form-view");
// const addPhotoBtn = document.querySelector("#add-photo-btn");
// const backToDelete = document.querySelector(".back-arrow");

// // Ouvrir la modale
// editBtn.addEventListener("click", function () {
//   modal.style.display = "flex";
//   displayModalWorks();
// });

// // Fermer la modale avec la croix
// closeModal.addEventListener("click", function () {
//   modal.style.display = "none";
//   modalGalleryView.style.display = "block";
//   modalFormView.style.display = "none";
// });

// // Fermer la modale en cliquant en dehors
// modal.addEventListener("click", function (event) {
//   if (event.target === modal) {
//     modal.style.display = "none";
//     modalGalleryView.style.display = "block";
//     modalFormView.style.display = "none";
//   }
// });

// // Afficher le formulaire d'ajout
// addPhotoBtn.addEventListener("click", function () {
//   modalGalleryView.style.display = "none";
//   modalFormView.style.display = "block";
// });

// // Retour à la galerie
// backToDelete.addEventListener("click", function () {
//   modalGalleryView.style.display = "block";
//   modalFormView.style.display = "none";
// });

// // ========== APERÇU DE L'IMAGE ==========
// const imageInput = document.querySelector("#image");
// const photoUpload = document.querySelector(".photo-upload");

// imageInput.addEventListener("change", function () {
//   console.log("Fichier sélectionné !");
//   const file = imageInput.files[0];
//   console.log(file);
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       photoUpload.innerHTML = `<img src="${e.target.result}" style="max-height: 150px;">`;
//     };
//     reader.readAsDataURL(file);
//   }
// });

// // ========== GESTION DU BOUTON VALIDER (ACTIF / INACTIF) ==========
// const submitBtn = document.querySelector(".submit-btn");
// const titleInput = document.querySelector("#title");
// const categorySelect = document.querySelector("#category");

// // Fonction qui vérifie si toutes les infos sont remplies
// function checkForm() {
//   const hasImage = imageInput.files.length > 0;
//   const hasTitle = titleInput.value.trim() !== "";
//   const hasCategory = categorySelect.value !== "";

//   if (hasImage && hasTitle && hasCategory) {
//     submitBtn.classList.remove("disabled");
//     submitBtn.classList.add("active");
//     submitBtn.disabled = false;
//   } else {
//     submitBtn.classList.add("disabled");
//     submitBtn.classList.remove("active");
//     submitBtn.disabled = true;
//   }
// }

// // Écouteurs
// titleInput.addEventListener("input", checkForm);
// categorySelect.addEventListener("change", checkForm);
// imageInput.addEventListener("change", checkForm);

// // Initialisation au chargement
// checkForm();

// // ========== ENVOI DU FORMULAIRE (AJOUT D'UNE PHOTO) ==========
// const addWorkForm = document.querySelector("#add-work-form");

// addWorkForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // empêche le refresh

//   const file = imageInput.files[0];
//   const title = titleInput.value;
//   const category = categorySelect.value;

//   const formData = new FormData();
//   formData.append("image", file);
//   formData.append("title", title);
//   formData.append("category", category);

//   fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   })
//     .then((res) => res.json())
//     .then((newWork) => {
//       // On ajoute la nouvelle image dans la liste globale
//       allWorks.push(newWork);

//       // Mise à jour galerie principale + modale
//       displayWorks(allWorks);
//       displayModalWorks();

//       // Réinitialisation du formulaire
//       addWorkForm.reset();
//       photoUpload.innerHTML = `
//         <i class="fa-regular fa-image"></i>
//         <label for="image" class="upload-btn">+ Ajouter photo</label>
//         <input type="file" id="image" name="image" accept="image/*" required />
//         <p>jpg, png : 4mo max</p>
//       `;

//       // Retour à la première vue de la modale
//       modalFormView.style.display = "none";
//       modalGalleryView.style.display = "block";

//       // Désactivation du bouton après reset
//       submitBtn.classList.add("disabled");
//       submitBtn.classList.remove("active");
//       submitBtn.disabled = true;
//     })
//     .catch((err) => {
//       console.error("Erreur lors de l'envoi :", err);
//     });
// });

// ===============  TOKEN / MODE ADMIN ==================

const token = localStorage.getItem("token");

if (token) {
  document.querySelector(".filters").style.display = "none";
  document.querySelector("#edit-banner").style.display = "block";
  document.querySelector("#edit-btn").style.display = "flex";

  const loginLink = document.querySelector("#login-link");
  loginLink.textContent = "logout";
  loginLink.href = "#";
  loginLink.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.reload();
  });
}

// =================== VARIABLES ========================

let allWorks = [];

const gallery = document.querySelector(".gallery");
const filtersContainer = document.querySelector(".filters");

const modal = document.querySelector("#modal");
const editBtn = document.querySelector("#edit-btn");
const closeModal = document.querySelector(".close-modal");
const modalGalleryView = document.querySelector("#modal-gallery-view");
const modalFormView = document.querySelector("#modal-form-view");
const addPhotoBtn = document.querySelector("#add-photo-btn");
const backToDelete = document.querySelector(".back-arrow");

// FORMULAIRE
const addWorkForm = document.querySelector("#add-work-form");
let imageInput = document.querySelector("#image");
const titleInput = document.querySelector("#title");
const categorySelect = document.querySelector("#category");
const photoUpload = document.querySelector(".photo-upload");
const submitBtn = document.querySelector(".submit-btn");

// =============== AFFICHAGE GALERIE ====================

function displayWorks(works) {
  gallery.innerHTML = "";
  works.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    img.src = element.imageUrl;
    img.alt = element.title;
    caption.textContent = element.title;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

// =============== AFFICHAGE MODALE =====================

function displayModalWorks() {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";

  allWorks.forEach((element) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const icon = document.createElement("i");

    img.src = element.imageUrl;
    img.alt = element.title;
    icon.className = "fa-solid fa-trash-can";

    icon.addEventListener("click", function () {
      fetch(`http://localhost:5678/api/works/${element.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          allWorks = allWorks.filter((work) => work.id !== element.id);
          displayWorks(allWorks);
          displayModalWorks();
        }
      });
    });

    figure.appendChild(img);
    figure.appendChild(icon);
    modalGallery.appendChild(figure);
  });
}

// ================= FETCH DES WORKS ====================

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    allWorks = data;
    displayWorks(allWorks);
  });

// ===================== FILTRES ========================

const btnAll = document.createElement("button");
btnAll.textContent = "Tous";
btnAll.className = "filter-btn active";
btnAll.addEventListener("click", function () {
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  btnAll.classList.add("active");
  displayWorks(allWorks);
});
filtersContainer.appendChild(btnAll);

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const button = document.createElement("button");
      button.textContent = element.name;
      button.className = "filter-btn";

      button.addEventListener("click", function () {
        document
          .querySelectorAll(".filter-btn")
          .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const filtered = allWorks.filter(
          (work) => work.categoryId === element.id
        );
        displayWorks(filtered);
      });

      filtersContainer.appendChild(button);
    });

    // Remplir le select
    data.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.name;
      categorySelect.appendChild(option);
    });
  });

// ================= GESTION MODALE =====================

editBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  displayModalWorks();
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  modalFormView.style.display = "none";
  modalGalleryView.style.display = "block";
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    modalFormView.style.display = "none";
    modalGalleryView.style.display = "block";
  }
});

addPhotoBtn.addEventListener("click", () => {
  modalGalleryView.style.display = "none";
  modalFormView.style.display = "block";
});

backToDelete.addEventListener("click", () => {
  modalFormView.style.display = "none";
  modalGalleryView.style.display = "block";
});

// =============== APERÇU DE L'IMAGE ====================

function previewImage() {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoUpload.innerHTML = `<img src="${e.target.result}" style="max-height: 150px;">`;
    };
    reader.readAsDataURL(file);
  }
}

// Attache l'écouteur la première fois
imageInput.addEventListener("change", previewImage);

// =========== RESET DU BLOC UPLOAD (FIX) ===============

function resetUploadZone() {
  photoUpload.innerHTML = `
    <i class="fa-regular fa-image"></i>
    <label for="image" class="upload-btn">+ Ajouter photo</label>
    <input type="file" id="image" name="image" accept="image/*" required />
    <p>jpg, png : 4mo max</p>
  `;

  imageInput = document.querySelector("#image");
  imageInput.addEventListener("change", previewImage);
  checkForm();
}

// ======== GESTION BOUTON VALIDER (ACTIF/INACTIF) ======

function checkForm() {
  const okImage = imageInput.files.length > 0;
  const okTitle = titleInput.value.trim() !== "";
  const okCat = categorySelect.value !== "";

  if (okImage && okTitle && okCat) {
    submitBtn.classList.add("active");
    submitBtn.classList.remove("disabled");
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.add("disabled");
    submitBtn.classList.remove("active");
    submitBtn.disabled = true;
  }
}

titleInput.addEventListener("input", checkForm);
categorySelect.addEventListener("change", checkForm);
imageInput.addEventListener("change", checkForm);

// ============= ENVOI DU NOUVEAU WORK ==================

addWorkForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const file = imageInput.files[0];
  const title = titleInput.value;
  const category = categorySelect.value;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", category);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((newWork) => {
      allWorks.push(newWork);

      displayWorks(allWorks);
      displayModalWorks();

      addWorkForm.reset();
      resetUploadZone();

      modalFormView.style.display = "none";
      modalGalleryView.style.display = "block";

      submitBtn.classList.add("disabled");
      submitBtn.classList.remove("active");
      submitBtn.disabled = true;
    });
});
