// appel et stockage du fetch
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
if (reponse.ok) {
    console.log(projets);
} else {
    throw new Error("echec lors de l'appel API.");
}

// balise de ratachement
const portfolio = document.querySelector("#portfolio");

// creation de la sectionGallery
const sectionGallery = document.createElement("div");
sectionGallery.className = "gallery";

// fonction pour recuperer tous les projets
function genererProjets(projets) {
    projets.forEach((element) => {
        const carteProjet = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src = element.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerHTML = element.title;

        portfolio.appendChild(sectionGallery);
        sectionGallery.appendChild(carteProjet);
        carteProjet.appendChild(imageProjet);
        carteProjet.appendChild(titreProjet);
    });
}
genererProjets(projets);

// selection conteneur filtre
const conteneurFiltre = (document.querySelector(
    ".conteneurBtnFiltre"
).style.display = "flex");

// selection des boutons de filtre
const filtreTous = document.querySelector(".btnTous");
const filtreObjets = document.querySelector(".btnObjets");
const filtreAppartements = document.querySelector(".btnAppartements");
const filtreHotelsEtRestaurants = document.querySelector(
    ".btnHotelsEtRestaurants"
);

// fonction pour le visuel du bouton actif
function couleurFiltre(bouton, click) {
    const boutons = document.querySelectorAll("button");
    boutons.forEach(function (b) {
        b.style.color = "#1D6154";
        b.style.backgroundColor = "#FFFEF8";
    });
    if (click === "true") {
        bouton.style.color = "#FFFEF8";
        bouton.style.backgroundColor = "#1D6154";
    }
}

// gestion des filtres
filtreTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets);
    couleurFiltre(filtreTous, "true");
});
filtreObjets.addEventListener("click", function () {
    const filtre = projets.filter(function (element) {
        return element.category.name === "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);
    couleurFiltre(filtreObjets, "true");
});
filtreAppartements.addEventListener("click", function () {
    const filtre = projets.filter(function (element) {
        return element.category.name === "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);
    couleurFiltre(filtreAppartements, "true");
});
filtreHotelsEtRestaurants.addEventListener("click", function () {
    const filtre = projets.filter(function (element) {
        return element.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);
    couleurFiltre(filtreHotelsEtRestaurants, "true");
});
