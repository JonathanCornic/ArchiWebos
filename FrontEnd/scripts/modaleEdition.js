const visibility = document.querySelector(".conteneurBtnFiltre");
const barreModale = document.querySelector("#barreModale");
const modifierPhotoProfil = document.querySelector(".modaleEditionPhotoProfil");
const modifierDescription = document.querySelector(".modaleEditionDescription");
const editionProjets = document.querySelector(".modaleEditionProjets");
const loginBtn = document.querySelector(".loginIndex");
const logoutBtn = document.querySelector(".logout"); 

// fonction pour afficher le mode edition
function affichageModeEdition(){
    
    visibility.style.visibility="hidden";
    barreModale.style.display="flex";
    modifierPhotoProfil.style.display="flex";
    modifierDescription.style.display="flex";
    editionProjets.style.display="flex";
    loginBtn.style.display="none"
    logoutBtn.style.display="flex";

}

// etre administateur pour afficher le mode edition
const admin = localStorage.getItem("admin");
if(admin === "true"){
    affichageModeEdition()
}

// Cliquer sur modifier pour afficher la modale gallery
const modaleMain = document.querySelector("#grandConteneurModale");
const modaleGallerie = document.querySelector("#conteneurModale1");
const modifierProjets = document.querySelector(".modaleEditionProjets .btnEdition");

modifierProjets.addEventListener("click", function(){
    
    modaleMain.style.display="block";
    modaleGallerie.style.display="flex";
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    
})

// se deconnecter en vidant le local Storage
logoutBtn.addEventListener("click",function(){
    
    visibility.style.visibility="visible";
    barreModale.style.display="none";
    modifierPhotoProfil.style.display="none";
    modifierDescription.style.display="none";
    editionProjets.style.display="none";
    loginBtn.style.display="flex"
    logoutBtn.style.display="none";

    localStorage.clear();
})

