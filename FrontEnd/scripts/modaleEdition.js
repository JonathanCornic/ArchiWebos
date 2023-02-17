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

// fonction de la preview 
function genererPreview(){
    fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(data =>{
        data.forEach(element => {
            
            const conteneurGalleryPhoto = document.querySelector(".contenueGalleryPreview");
            const galleryPreview = document.createElement("figure");
            galleryPreview.className ="galleryPreview";
            const iconPoubelle = document.createElement("button")
            iconPoubelle.className="fa-regular fa-trash-can"
            const galleryPreviewImg = document.createElement("img");
            galleryPreviewImg.src = element.imageUrl;
            const editerTitre = document.createElement("figcaption");
            editerTitre.innerHTML="éditer";
            
            conteneurGalleryPhoto.appendChild(galleryPreview);
            galleryPreview.appendChild(iconPoubelle);
            galleryPreview.appendChild(galleryPreviewImg);
            galleryPreview.appendChild(editerTitre);
        });
        
    })
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
    genererPreview();
    
})
// fonction remove galleryPreview
function removeGalleryPreview(){

    const galleryPreviewList = document.querySelectorAll(".galleryPreview");
    galleryPreviewList.forEach(function(galleryPreview) {
        galleryPreview.remove();
    });
    
    const iconPoubelleList = document.querySelectorAll(".fa-regular.fa-trash-can");
    iconPoubelleList.forEach(function(iconPoubelle) {
        iconPoubelle.remove();
    });
    const galleryPreviewImgList = document.querySelectorAll(".galleryPreview img");
    galleryPreviewImgList.forEach(function(galleryPreviewImg) {
        galleryPreviewImg.remove();
    });
    const editerTitreList = document.querySelectorAll(".galleryPreview figcaption");
    editerTitreList.forEach(function(editerTitre) {
        editerTitre.remove();
    });

}
// femer la modale avec le bouton x
const fermerIcon = document.querySelector(".fa-xmark");
fermerIcon.addEventListener("click",function(){
    
    removeGalleryPreview();
    const overlay = document.querySelector(".overlay");
    overlay.remove();
    modaleMain.style.display="none";
    modale2.style.display="none";
    fleche.style.visibility="hidden";

})
// Ajouter une photo ouvrir la modale photo 
const modale2 = document.querySelector("#conteneurModale2")
const fleche = document.querySelector(".fa-arrow-left")
const ajouterPhoto = document.querySelector("#conteneurModale1 input");
ajouterPhoto.addEventListener("click", function(){
    modaleGallerie.style.display="none";
    modale2.style.display="block";
    fleche.style.visibility="visible";

})
// revenir en arrère
fleche.addEventListener("click", function(){
    
    removeGalleryPreview();
    modale2.style.display="none";
    fleche.style.visibility="hidden"
    modaleGallerie.style.display="flex";
    genererPreview();
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

