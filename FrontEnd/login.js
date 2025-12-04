const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } else {
        document.querySelector("#error-message").textContent =
          "Email ou mot de passe incorect";
      }
    });
});
