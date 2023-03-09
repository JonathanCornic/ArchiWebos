const form = document.getElementById("form");
localStorage.setItem("admin", false);

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((reponse) => reponse.json())
        .then((data) => {
            if (data.userId === 1) {
                localStorage.setItem("admin", true);
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                confirm("Erreur dans l’identifiant ou le mot de passe");
            }
        })
        .catch((error) => console.error(error));
});
