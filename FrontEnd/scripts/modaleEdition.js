const visibility = document.querySelector(".conteneurBtnFiltre");
const barreModale = document.querySelector("#barreModale");
const modifierPhotoProfil = document.querySelector(".modaleEditionPhotoProfil");
const modifierDescription = document.querySelector(".modaleEditionDescription");
const editionProjets = document.querySelector(".modaleEditionProjets");
const loginBtn = document.querySelector(".loginIndex");
const logoutBtn = document.querySelector(".logout"); 
const modale2 = document.querySelector("#conteneurModale2")
const fleche = document.querySelector(".fa-arrow-left")
const ajouterPhoto = document.querySelector("#conteneurModale1 input");
const ajouter = document.querySelector('label[for="inputFile"]');
const modaleMain = document.querySelector("#grandConteneurModale");
const modaleGallerie = document.querySelector("#conteneurModale1");
const modifierProjets = document.querySelector(".modaleEditionProjets .btnEdition");
const inputFile = document.getElementById("inputFile");
const apercu = document.getElementById("apercu");
const validerPhoto = document.querySelector('.modaleSelection input[type="submit"]');
const titre = document.querySelector('.titreModale2');
const select = document.querySelector('.selectionCategorie');
const overlay = document.querySelector(".overlay");

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
// fonction de la preview et suppression de projet
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

                iconPoubelle.addEventListener("click", function() {
                    fetch(`http://localhost:5678/api/works/${element.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then(response => {
                        if (response.ok) {
                            galleryPreview.remove();
                        } else {
                            console.log('La suppression du projet a échoué.');
                        }
                    })
                    .catch(error => {
                        console.log('Une erreur s\'est produite lors de la suppression du projet:', error);
                    });
                });
            
                conteneurGalleryPhoto.appendChild(galleryPreview);
                galleryPreview.appendChild(iconPoubelle);
                galleryPreview.appendChild(galleryPreviewImg);
                galleryPreview.appendChild(editerTitre);
            });
        })
}
// Cliquer sur modifier pour afficher la modale gallery
modifierProjets.addEventListener("click", function(){
    
    modaleMain.style.display="block";
    modaleGallerie.style.display="flex";
    overlay.style.display="flex";
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
    overlay.style.display="none";
    modaleMain.style.display="none";
    modale2.style.display="none";
    fleche.style.visibility="hidden";
    apercu.style.display="none";
    inputFile.value="";
    titre.value="";
    select.value="";
    validerPhoto.style.backgroundColor = '#cbc9c977';

})
// fermer la modale en cliquant en dehors
overlay.addEventListener("click",function(){
    
    removeGalleryPreview();
    overlay.style.display="none";
    modaleMain.style.display="none";
    modale2.style.display="none";
    fleche.style.visibility="hidden";
    apercu.style.display="none";
    inputFile.value="";
    titre.value="";
    select.value="";
    validerPhoto.style.backgroundColor = '#cbc9c977';

})
// revenir en arrère
fleche.addEventListener("click", function(){
    
    removeGalleryPreview();
    modale2.style.display="none";
    fleche.style.visibility="hidden"
    modaleGallerie.style.display="flex";
    apercu.style.display="none";
    ajouter.style.display="none";
    inputFile.value="";
    titre.value="";
    select.value="";
    validerPhoto.style.backgroundColor = '#cbc9c977';
    genererPreview();

})
// Ajouter une photo ouvrir la modale photo 
ajouterPhoto.addEventListener("click", function(){
    modaleGallerie.style.display="none";
    modale2.style.display="block";
    fleche.style.visibility="visible";
    ajouter.style.display="block";
    apercu.style.display="none";

})
// aperçu Photo
inputFile.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const fileReader = new FileReader();
        fileReader.addEventListener("load", function(){
            apercu.setAttribute("src", this.result);
            ajouter.style.display="none";
            apercu.style.display="block";
        });
        fileReader.readAsDataURL(file);
    }else{
        apercu.setAttribute("src", "");
    }
});
// background bouton valider Photo
modale2.addEventListener("input",() => {
    if (titre.value !== '' && inputFile.value !== '' && select.value !== '') {
        validerPhoto.style.backgroundColor = '#1D6154';
    }else{
        validerPhoto.style.backgroundColor = '#cbc9c977';
    }
})


// bouton valider POST
// validerPhoto.addEventListener("click", (event) =>{
//     event.preventDefault();

//     const token = localStorage.getItem("token");

//     fetch("http://localhost:5678/api/works",{
//         method: "POST",
//         body: JSON.stringify({
            
//             title: titre.value,
//             imageUrl: inputFile.value,
//             categoryId: select.value
           
//         }),
//         headers: {
//             'Content-Type' : 'multipart/form-data',
//             Authorization : `Bearer ${token}`
//         }
//     })
//     .then(reponse => reponse.json())
//     .then(data => console.log(data))
// })

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
