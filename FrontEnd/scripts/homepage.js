// appel et stockage du fetch
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
console.log(projets);

// balise de ratachement
const portfolio = document.querySelector("#portfolio");

// creation du conteneur filtre
const conteneurFiltre = document.createElement("div");
conteneurFiltre.className = "conteneurFiltre";

// creation des boutons de filtre
const filtreTous = document.createElement("button");
filtreTous.className = "btn btnTous"
filtreTous.innerHTML = "Tous";
const filtreObjets = document.createElement("button");
filtreObjets.className = "btn btnObjets"
filtreObjets.innerHTML = "Objets";
const filtreAppartements = document.createElement("button");
filtreAppartements.className = "btn btnAppartements"
filtreAppartements.innerHTML = "Appartements ";
const filtreHotelsEtRestaurants = document.createElement("button");
filtreHotelsEtRestaurants.className = "btn btnHotelEtRestaurant"
filtreHotelsEtRestaurants.innerHTML = "Hôtels & restaurants";

// attachement parent enfant 
portfolio.appendChild(conteneurFiltre);
conteneurFiltre.appendChild(filtreTous);
conteneurFiltre.appendChild(filtreObjets);
conteneurFiltre.appendChild(filtreAppartements);
conteneurFiltre.appendChild(filtreHotelsEtRestaurants);

// css du conteneur de filtre
conteneurFiltre.style.width="65%";
conteneurFiltre.style.margin="40px auto";
conteneurFiltre.style.display="flex";
conteneurFiltre.style.justifyContent="space-between";

// fonction pour le css des boutons
function cssBoutons(){
    let boutons = document.querySelectorAll(".btn");
    for(let i = 0; i < boutons.length; i++) {

        boutons[i].style.color="#1D6154";
        boutons[i].style.backgroundColor="#FFFEF8";
        boutons[i].style.border="2px solid";
        boutons[i].style.borderColor="#1D6154";
        boutons[i].style.fontSize="20px";
        boutons[i].style.fontWeight="700";
        boutons[i].style.borderRadius="35px";
        boutons[i].style.padding="10px 30px";
    }
}
cssBoutons();

// creation de la sectionGallery
const sectionGallery = document.createElement("div");
sectionGallery.className = "gallery";

// fonction pour recuperer tous les projets
function genererProjets(projets){
    projets.forEach(element => {
        
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

// fonction pour le visuel du bouton actif
function couleurFiltre(bouton, click) {
    const boutons = document.querySelectorAll("button"); 
    boutons.forEach(function(b){
        b.style.color="#1D6154";
        b.style.backgroundColor="#FFFEF8";
    });
    if(click === "true"){
        bouton.style.color="#FFFEF8";
        bouton.style.backgroundColor="#1D6154";
    }
}

// gestion des filtres
filtreTous.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets); 
    couleurFiltre(filtreTous, "true") ; 
});
filtreObjets.addEventListener("click", function(){
    const filtre = projets.filter(function(element){
        return element.category.name === "Objets"
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);
    couleurFiltre(filtreObjets, "true");
});
filtreAppartements.addEventListener("click", function(){
    const filtre = projets.filter(function(element){
        return element.category.name === "Appartements"
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);
    couleurFiltre(filtreAppartements, "true");
});
filtreHotelsEtRestaurants.addEventListener("click", function(){
    const filtre = projets.filter(function(element){
        return element.category.name === "Hotels & restaurants"
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtre);
    couleurFiltre(filtreHotelsEtRestaurants, "true");
});

// fonction pour cacher les bouton
function montrerCacherBouttons(){
    const display = document.querySelector(".conteneurFiltre").style.display;
    if(display === "flex"){
        document.querySelector(".conteneurFiltre").style.display="none";

    }else if(display === "none"){
        document.querySelector(".conteneurFiltre").style.display="flex"

    }
}



