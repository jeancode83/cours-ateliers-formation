import Hostel from './modules/hostel.js';

//  Récupération date courante
let whatTimeIsIt = new Date();

//  Création d'une tranche horaire < ou égale à 12 ou > ou égale à 15
//let isOpen = whatTimeIsIt.getHours() <= 12 || whatTimeIsIt.getHours() >= 15;
let isOpen = true;
if (isOpen) {
    //  Si nous sommes dans la tranche d'ouverture, on récupère tous les selecteur .jt-disabled
    let inputDisabled = document.querySelectorAll(".jt-disabled");
    if (inputDisabled) {
        // Je loop les éléments qui disposent de l'attribut disabled par défaut et je les désactive
        for (let index = 0; index < inputDisabled.length; index++) {
            let elementDisabled = inputDisabled[index];
            elementDisabled.removeAttribute("disabled");
        }
    }
}

//  Initialisation du message d'acceuil avec adresse et nombre de chambre
let hostelOlivarius = new Hostel("OLIVARIUS", "6 avenue Halley, 59491 Villeneuve d'Ascq", 20, "msg");

//  Création d'une div afin de placer le message de bienvenue à l'endroit approprié
let divBienvenue = document.querySelector(".jt-msg-bienvenue");
if (divBienvenue) {
    divBienvenue.innerHTML = hostelOlivarius.messageBienvenue();
}

// FormEntree
//  Récupération du formulaire, à ce formulaire on ajoute un évènement submit
let divFormEntree = document.querySelector('form[data-jt-submit="entree"].jt-form-restau');
if (divFormEntree) {
    // Si ce formulaire exsiste on peut lui ajouter un évènement
    divFormEntree.addEventListener("submit", (event) => {
        // On stop les évènements par défaut
        event.preventDefault();
        // Je récupère les valeurs des formulaires et je les stocke dans des variables
        // en attendant de m'en servir
        let f_name = document.querySelector("input#jt-first-name");
        let name = document.querySelector("input#jt-name");
        let nbnuits = document.querySelector("input#jt-nb-nuits");
        let nbpersonnes = document.querySelector("select#jt-nb-personnes");
        let petitdej = document.querySelector("#jt-petit-dej input[name='petit_dej']:checked");

        // Je créé mon objet afin d'y stocker les informations attendues
        let newClient = {
            client: {
                prenom: f_name.value,
                nom: name.value
            },
            nbnuits: nbnuits.value,
            nbpersonnes: nbpersonnes.value,
            petitdej: petitdej.value,
            arrivee: new Date().getTime(),
            id: hostelOlivarius.getNombreChambres()
        }

        //  J'enregistre le client
        hostelOlivarius.setChambre(newClient);
        // j'initialise le formulaire avec des valeurs par défaut
        f_name.value = "";
        name.value = "";
        nbnuits.value = "1";
        nbpersonnes.value = "1";
        petitdej.value = "oui";
        let petitDejReset = document.querySelector("#jt-petit-dej input[name='petit_dej']:first-child");
        petitDejReset.checked = true;
    })
}


// FormSortie
//  Récupération du formulaire, à ce formulaire on ajoute un évènement submit
let divFormSortie = document.querySelector('form[data-jt-submit="sortie"].jt-form-restau');
if (divFormSortie) {
    //  Si ce formulaire exsiste on peut lui ajouter un évènement
    divFormSortie.addEventListener("submit", (event) => {
        // On stop les évènements par défaut
        event.preventDefault();
        // Je récupère les valeurs de sortie des formulaires et je les stocke dans des variables
        // en attendant de m'en servir
        let f_name = document.querySelector("input#jt-first-name-sortie");
        let name = document.querySelector("input#jt-name-sortie");
        // Je créé mon objet afin d'y stocker les informations attendues
        let chambre = {
            client: {
                prenom: f_name.value,
                nom: name.value
            }
        }
        //  Je récupère le calcul total du prix du séjour
        let msg = hostelOlivarius.getPrixChambre(chambre);
        if (msg) {
            //  Si le séjour exsiste je place mon message de facturation à l'endroit souhaité (bas de page)
            // grâce à la div placée au préalable dans mon html
            let divMessFacture = document.querySelector(".jt-msg-facture");
            if (divMessFacture) {
                divMessFacture.innerHTML = msg;
                //  Je prépare la suppression du client après validation de ses données
                hostelOlivarius.setChambre({
                    client: {
                        prenom: f_name.value,
                        nom: name.value
                    }
                }, "remove");
            }
        }

        //  Je met les valeurs prenom, nom vides par défaut
        f_name.value = "";
        name.value = "";
    })
}


