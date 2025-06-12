export default class Hostel {

    constructor(nom, adresse, chambresNb) {
        this.nom = nom;
        this.adresse = adresse
        this.chambresNb = chambresNb
        this.chambres = this.getStorage();
    }

    /**
     * Initialisation du message d'accueil en utilisant des variables contenant le nom de l'hotel ainsi que l'adresse
     * @returns 
     */
    messageBienvenue() {

        let msg = `Bonjour, bienvenue dans notre magnifique hotel "${this.nom}"\n ${this.adresse}\n`;

        return msg;
    }

    /**
     * setChambre
     *  Ajout et suppression d'une chambre dans le local storage
     * 
     * @param {Object} chambre
     *  L'objet chambre avec nom, prenom client, nb de nuits, de personnes...
     *  
     * @param {string} action
     *  Action d'ajout ou de suppression d'une chambre (add -> ajout, remove -> suppression)
     */

    setChambre(chambre, action = "add") {
        this.setStorage(chambre, action)
    }

    /**
     * getStorage
     *  Récupère le nb de chambres du local storage
     * @returns 
     */
    getStorage() {
        //  Je créé une variable chambres dans laquelle je stock mon tableau de chambres "jt_hostel"
        //  (convertis en chaine cararctères) dans le local storage.
        let chambres = localStorage.getItem("jt_hostel");
        // Si chambres exsiste et n'est pas vide
        if (chambres && chambres !== '') {
            // Je convertis la chaine en tableau  et en objet et je le stock dans une variable
            let stockageChambres = JSON.parse(chambres);
            //   puis je retourne le tableau      
            return stockageChambres;
        }
        // Si chambres est vide ou n'exsiste pas alors je retourne un tableau vide
        return [];
    }

    /**
     * setStorage
     * Enregistrement/suppression des informations séjour client
     * 
     * @param {Object} chambre 
     *  Informations séjour client
     * 
     * @param {string} action 
     *  Action d'ajout/suppression
     */
    setStorage(chambre, action = "add") {

        // Récupération des chambres
        let chambres = this.getStorage();

        //  Dans le cas d'ajout d'une chambre
        if (action == "add") {
            // on push le séjour
            //  à la suite des autres éléments du tableau
            chambres.push(chambre);
        }

        // Dans le cas d'un suppression d'une chambre
        if (action == "remove") {

            //  On utilise la methode filter pour supprimer un élément si il y a correspondance
            chambres = chambres.filter(element => (element.client.prenom !== chambre.client.prenom && element.client.nom !== chambre.client.nom));
        }

        //  On formate le contenu de mon tableau de séjour (chambres) en chaine de caractères
        let newStorage = JSON.stringify(chambres)
        //  et on le stock dans le localStorage
        localStorage.setItem("jt_hostel", newStorage);
    }

    /**
     * getHostel
     *  Retourne mon tableau Hostel
     * @returns 
     */
    getHostel() {
        return this.getStorage();
    }

    /**
   * getBuilderNumber
   *  Fonction qui récupère le tableau [chambresNb] et m'affiche le nombre de chambres
   * 
   * @returns 
   */
    getBuilderNumber() {
        return Array.from({ length: this.chambresNb }, (_, index) => index + 1);
    }

    /**
 * getNombreChambres
 *  Retourne l'id d'une chambre disponible
 * 
 * @returns
 */
    getNombreChambres() {
        //  On initialise une variable à un tableau vide
        let idoccupee = [];
        //  On stock dans chambres le tableau de chambres
        let chambres = this.chambres;
        //  Création d'une loop qui itère chaque éléments de mon tableau
        chambres.forEach(chambre => {
            //  afin de récupérer l'id de chaque éléments du tableau
            //  et les stocker dans le tableau idoccuppee
            idoccupee.push(chambre.id);

        });
        console.log("Id occupee", idoccupee);

        // Je créé un tableau qui contient l'index du nombre total de chambres
        let arrayChambres = this.getBuilderNumber();

        //  Je recréé un tableau contenant uniquement les chambres dont l'id n'est pas occupé
        let chambresDispo = arrayChambres.filter(id => !idoccupee.includes(id));

        // Je demande si le tableau est plus grand que 0 pour renvoyer
        //  la première postion du tableau sinon je renvoie null 
        return chambresDispo.length > 0 ? chambresDispo[0] : null;
    }

    /**
     * getChambresOccup
     *  Renvoi le nb d'éléments du tableau chambres
     * @returns 
     */
    getChambresOccup() {

        // Récupération de mon tableau des chambres occupées et le place dans une variable
        let chambresVides = this.getHostel();
        //  Retourne le nombre d'éléments du tableau
        return chambresVides.length;
    }


    /**
     * getSiSupplement
     *  Cette fonction a pour but de comparer la date d'arrivée et celle du départ
     *  contrôler également l'heure du départ afin de savoir si des suppléments seront
     *  à prévoir.
     * 
     * @param {*} entreeHotel
     * @param {*} nbDeNuits
     * 
     * @returns
     */
    getSiSupplement(entreeHotel, nbDeNuits) {

        //  j'initialise une variable qui contient la date d'arrivée
        let totalDate = new Date(entreeHotel);
        //  Je créé une variable qui stockera la date d'entrée à laquel on y ajoute
        //  le nombre de nuits passées (date d'entrée + nb nuits = réel total séjour)
        let totalSejour = new Date(totalDate.setDate(totalDate.getDate() + parseInt(nbDeNuits)));
        //  Je créé une variable pour y stocker la date et l'heure de sortie
        let d = new Date();
        //  Pour savoir si le client part à la date prévue, on va formater
        //  YYYY-MM-DD la date de sortie prévue et la date de sortie réelle 
        let dateSortieFormatee = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        let dateSortieSejour = `${totalSejour.getFullYear()}-${totalSejour.getMonth() + 1}-${totalSejour.getDate()}`;
        //  On compare la date prévue à la sortie réelle (si elles correspondent)
        if (dateSortieFormatee == dateSortieSejour) {
            // Si elles correspondent, alors je vérifie si le client part
            // avant 11h
            if (d.getHours > 11) {
                //  L'heure de départ se situe après 11h, il y aura un supplément
                return true;
            } else {
                //  L'heure du départ se situe avant 11h, il n'y aura aucun supplément
                return false;
            }
        } else {
            //  Le client ne part pas à la date prévue (parti avant)
            if (d < totalSejour) {
                return false;
            } else {
                //  Le client est toujours présent à la date de départ
                return true;
            }
        }
    }

    /**
     * getFormatPrice
     * Ajoute une devise aux nombres fournits en paramètres
     * @param {Number} number 
     * @returns 
     */
    getFormatPrice(number) {
        let formater = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        });
        return formater.format(number);
    }

    /**
     * * getPrix()
     *    Calcule le temps passé en fonction du temps de séjour
     * @param {*} sejour 
     * @param {*} hasSupplement 
     * @returns 
     */
    getPrix(sejour, hasSupplement) {
        //  Initialisation msg et total en vide
        let msg = "",
            total = 0;
        //  Destructuration de l'objet sejour afin de récupérer les données
        let {
            client,
            nbnuits,
            nbpersonnes,
            petitdej
        } = sejour;
        console.log(sejour);
        //  Destructuration de client pour la récupération données
        let {
            prenom,
            nom
        } = client;

        //  Récupération du nb de personnes de la chambre courante
        let chambreToPrix = this.getChambreToPrice(nbpersonnes);

        //  Calcul du nb de nuits x le prix de la chambre
        total = nbnuits * chambreToPrix;

        //  Petit message personnalisé avec les variables $prenom, $nom mais aussi
        //  $nbnuits
        msg += `Merci ${client.prenom} ${client.nom} pour votre séjour de ${nbnuits}
         nuit(s) passée(s) chez nous, le prix hors petit déjeuner est de ${this.getFormatPrice(total)}.<br>`

        //  Si il y a un supplément, j'ajoute 10€ au total de la facture avec msg de justification
        if (hasSupplement) {
            total = total + 10;
            msg += `Nous consattons que vous partez après l'heure prévue (11hrs), un supplément de 10€
              s'ajoute malheureusement à votre facture, qui s'élève à présent à ${this.getFormatPrice(total)} .<br>`
        }

        //  Si la valeur de petitdej est "oui" 
        if (petitdej == "oui") {
            //  j'effectue un calcul du nombre de nuits x par le nombre de personnes formatés en entiers
            //  avec parsInt pour avoir le total du prix des petits déjeuners
            let calculPetitDej = ((7 * parseInt(nbnuits)) * parseInt(nbpersonnes));
            //  J'ajoute  mon calculPetitDej au total et je place le résultat dans cette même variable
            total = total + calculPetitDej;
            //  J'affiche au client le résultat de ces calculs
            msg += `Vous avez prit l'option petit déjeuner, celui-ci est facturé à 7€/jour/personne.\nPour ${nbpersonnes}
             personne(s), le prix du total des petits déjeuners est de ${this.getFormatPrice(calculPetitDej)}
              ce qui fait une facture totale de ${this.getFormatPrice(total)} .<br>`
        }
        msg += `----------------------------------------------------<br>`;

        //  Affichage du prix de la chambre multiplié par le nombre de nuits
        msg += `${this.getFormatPrice(chambreToPrix)} x ${nbnuits} nuit(s) d'hotel --------------<br>`;

        // Si le supplément de retard s'applique alors je l'affiche sur la facture
        if (hasSupplement) {
            msg += `----------------------------------------------------<br>`;
            msg += `Supplément retard retour clés (10€) --------------<br>`;
        }
        //  Si l'option petit déjeuner a été sélectionnée j'affiche le calcul
        if (petitdej == "oui") {
            msg += `----------------------------------------------------<br>`;
            msg += `${nbnuits} nuit(s) x 7€ par petit déjeuner --------------<br>`;
        }
        msg += `----------------------------------------------------<br>`;
        //  J'affiche enfin le total TTC
        msg += `Pour un total de ${this.getFormatPrice(total)} TTC.<br>`
        msg += `----------------------------------------------------<br>`;
        msg += `----------------------------------------------------<br>`;
        //  Message de paiement effectué
        msg += `Votre facture est bien réglée, merci de votre séjour, passez une agréable journée.<br>`

        return msg;
    }

    /**
     * getChambreToPrice
     *  Convertir la valeur des options aux prix proposés (voir form select html)
     * @param {*} nbPers 
     * @returns 
     */
    getChambreToPrice(nbPers) {
        let chambreToPrice = {
            "1": 65,
            "2": 89,
            "3": 139,
            "4": 189
        }
        return chambreToPrice[nbPers];
    }

    /**
     * getPrixChambre
     *  Cette méthode consiste à chercher l'exsistence du client et éditer une facture
     * @param {*} chambre 
     * @returns 
     */
    getPrixChambre(chambre) {

        //  Appel du tableau de chambres
        let chambres = this.getStorage();

        //  Si chambres exsiste et n'est pas vide
        if (chambres && chambres.length > 0) {

            // Alors je loop les chambres occupées
            for (let index = 0; index < chambres.length; index++) {

                //  Après chaque itération je stocke la chambre courante loopée dans chambreStorage
                const chambreStorage = chambres[index];

                //  Je contrôle la correspondance entre le prenom et nom (storage/action courante)
                if (chambreStorage.client.prenom == chambre.client.prenom && chambreStorage.client.nom == chambre.client.nom) {

                    //  J'ajoute l'arrivée client au chambreStorage et j'assigne le tout à dateEntree
                    let dateEntree = chambreStorage.arrivee;

                    //  J'ajoute le nb de nuits client au chambreStorage et j'assigne le tout à nbDeNuits
                    let nbDeNuits = chambreStorage.nbnuits;

                    //  J'utilise la méthode avec l'entrée et le nb de nuits en paramètres pour 
                    //  définir si un supplément est à appliquer
                    let hasSupplement = this.getSiSupplement(dateEntree, nbDeNuits);

                    //  Nous disposons de tous les éléments du séjours afin de préparer une facture
                    let facture = this.getPrix(chambreStorage, hasSupplement);

                    //  Je retourne la facture
                    return facture;

                }
            }
        }
        return null;
    }

}