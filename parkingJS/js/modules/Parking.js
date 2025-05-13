export default class Parking {

	/**
	 * constructor()
	 *  Initialise le parking
	 * 
	 * @param {string} nom
	 * 	Le nom du parking
	 * 
	 * @param {string} adresse
	 * 	L'adresse du parking
	 * 
	 * @param {number} placesTotales
	 * 	Nombre de places dans le parking
	 * 
	 * @param {string} statut
	 * 	Les différents stauts du parking = off | msg | depot | paiement 
	 * 		- Off       | Parking fermé (code 99)
	 * 		- Msg       | Différents messages affichés à l'utilisateur afin de le guider lors du dépot et de la récupération véhicule
	 * 		- Dépôt     | Interaction avec le client en lui demandant son immatriculation afin de trouver une place disponible,
	 * 		  			  stocker son véhicule dans le programme et lui délivrer un ticket comprenant date + heure d'arrivée
	 * 		- Paiement  | On demande une action client (taper 2 et entrer l'immatriculation de sortie) Je compare grâce à REGEX le format
	 * 					  immatriculation, si il correspond je passe au règlement, sinon je préviens de l'anomalie. Vient ensuite la phase
	 * 					  de paiement avec la somme formatée à 2 chiffres après la virgule mais aussi en valeur €. J'utilise la méthode
	 * 					  getPrixAvecImmat qui comprend getDiffDate et getPrix afin de disposer du calcul temps=>prix et je renvoie le résultat.
	 * 					  Pour la phase du règlement je soustrais la somme insérée à la somme à régler et je renvois un msg, somme manquante si besoin,
	 * 					  sinon je rend la monnaie en trop ou affiche un msg d'aurevoir, à bientôt.
	 */

	constructor(nom, adresse, placesTotales, statut = "off") {
		this.nom = nom;
		this.adresse = adresse;
		this.placesTotales = placesTotales;
		this.parking = this.getStorage();
		this.statut = statut;
	}

	// Création du message d'accueil client avec infos parking, possibilité de dépot véhicule, restitution véhicule et même annulation de l'opération.
	messageBienvenue () {

		// Initialisation variable placesDispo grâce à la méthode getPlacesDispo, celle-ci me retourne le calcul : nombre de places totales - les
		//  places occupées.
		let placesDispo = this.getPlacesDispo();
		// Initialisation du message d'accueil avec la variable msg
		let msg = `Bonjour, bienvenue au Parking "${this.nom}"\nAu ${this.adresse}\n`;

		// Je pose la condition if les places dispo sont à 0 (pas de places libres) alors je renvoie un message demandant de repasser
		if (placesDispo === 0) {
			
			msg += `------------------------\n`;
			msg += `Merci de repasser plus tard, il n'y a plus de places disponibles\n`;
			msg += `------------------------\n`;
		}

		// L'opération de dépôt de voitures n'est disponible qu'uniquement si le parking dispose de places libres,
		// L'option de dépôt de voiture ne s'affichera que sous cette condition.
		if (placesDispo > 0) {
			msg += `Nous disposons de : ${placesDispo} places de parking disponibles\n`;
			msg += `------------------------\n`;
			msg += `Sélectionnez 1 pour déposer votre véhicule\n`;
			msg += `------------------------\n`;
		}
		// J'affiche les options pour récupérer la voiture ou annuler l'opération en cours
		msg += `Sélectionnez 2 pour récupérer votre véhicule\n`;
		msg += `------------------------\n`;
		msg += `Sélectionnez 3 pour annuler l'opération\n`;
	
		return msg;
		}

	// Méthode pour avoir le nb de places disponibles par le biais du calcul places totales - la méthode getPlacesOccup
	getPlacesDispo() {	
			
		return this.placesTotales - this.getPlacesOccup();
	}

	// Récupère le nombre de places occupées
	getPlacesOccup() {
		let placesVides = this.getParking();

		return placesVides.length;
	}

	/**
	 * getPrixAvecImmat()
	 * 	Recherche de voiture avec l'immatrctriculation, formate le temps passé et la somme dûe
	 * 
	 * @param {string} immatriculation
	 * 	Immatriculation à fournir pour la recherche de la voiture
	 * 
	 * @returns
	 * 	La fonction renvoie un objet avec un paramètre "place" qui contient les informations de la voiture,
	 * 	un paramètre "diff" avec le calcul du temps passé, et un paramètre "prix" avec le temps passé.
	 *  Si une voiture est trouvée, la date d'entrée est utilisée pour calculer le temps passé dans le parking
	 *  et calculer le prix à payer. 
	 */
	getPrixAvecImmat(immatriculation) {

        // Je récupère le parking avec toutes les places
        let parking = this.getParking();
		// Si un parking exsiste et qu'il y a des voitures à l'intérieur
		if (parking && parking.length > 0) {
			// Je loop le contenu du parking
			for (let index = 0; index < parking.length; index++) {
				// Je stock dans "place" la voiture courante
				const place = parking[index];
				// Avec l'immatriculation fournie en paramètre,
				//  je teste si l'immatriculation de la voiture courante correspond
				if (immatriculation == place.immatriculation) {
					// Une voiture a été trouvée, je créé une variable afin de stocker
					// la date d'entrée
					let dateEntree = place.dateEntree;
					// Cette variable "dateEntree" est fournie à la méthode "getDiffDate()"
					// pour calculer le temps total passé dans le parking,
					// que je stock dans la variable "diffMinutes".
					let diffMinutes = this.getDiffdate(dateEntree);
					// Enfin je fournie "diffMinutes" à la méthode "getPrix()" pour obtenir
					// le prix à payer.
					let recupArgent = this.getPrix(diffMinutes);
					// Et je retourne toutes ces variables dans un objet
					let informationDePaiement = {
						place: place,
						diff: diffMinutes,
						prix: recupArgent
					};
					return informationDePaiement;
				}
			}
		}
		// Je retourne "null" à la fin dans le cas où je n'ai pas trouvé de parking, le parking est vide
		// ou l'immatriculation n'exsiste pas.
		return null;
	}
    
	// Système d'ajout de voiture
	/**
	 * setVoiture()
	 *  Fonction permettant d'ajouter/supprimer une voiture du parking
	 * 
	 * @param {*} voiture
	 *  Lors de l'ajout d'une voiture dans le parking. "voiture" est une référence à une instance de "placeParking"
	 *  lors du retrait, "voiture" fait référence à une place d'immatriculation.
	 * 
	 * @param {*} action
	 *  "action" renvoie à l'action réalisée "add" | "remove".
	 */
	setVoiture(voiture, action = "add") {
		// Afin de sauvegarder temporairement les données parking, nous utilisons le "localStorage" des navigateurs
		//  par intermédiaire des fonctions (setStorage() et getStorage() (Voir les fonctions ci-dessous))  
		this.setStorage(voiture, action)
	}

	/**
	 * getParking()
	 *  Méthode qui permet d'obtenir les données parking
	 * 
	 * @returns
	 *  Retourne la fonction "getStorage()" afin d'obtenir les éléments du parking,
	 *  (se référer à "getStorage()" pour la gestion de la récupération du parking dans le "localStorage")
	 * @see{@link getStorage}
	 */
	getParking() {
		return this.getStorage();
	}

	/**
	 * getDate()
	 * 
	 * @returns 
	 * 	Renvoie une instence de date et heure à un instant T,
	 * 	formatée en "Timestamp" pour une facilité des manipulations des dates dans les comparaisons
	 * 	et les conditions.
	 */
	getDate() {
		return new Date().getTime();
	}

	/**
	 * getDiffDate()
	 *  Compteur qui calcule la différence de temps entre l'arrivée et le départ
	 * 
	 * @param {number} entreeParking 
	 *  "Timestamp" d'heure d'arrivée du client, provenant d'une place de parking ("ParkingPlace")
	 * @returns
	 * 	Renvoie le temps passé dans le parking en minutes
	 */
	getDiffdate(entreeParking) {
		// On récupère l'heure de sortie que l'on stock dans une variable
		let sortieParking = this.getDate();
		// On stock dans la variable "diff" le calcule de l'entrée - la sortie
		let diff = sortieParking - entreeParking;
		// On stock dans la variable "timeSecondes" la conversion des <timestamp> en secondes (diff/1000)
		//	La fonction Math.floor(diff / 1000) renvoie le plus grand entier qui est inférieur ou égal à ce nombre
		let timeSecondes = Math.floor(diff / 1000);
		// On stock dans "storageMilli" le résultat du calcule de la conversion des sec en min
		//	La fonction Math.ceil() retourne le plus petit entier supérieur ou égal au nombre donné.
        let storageMilli = Math.ceil(timeSecondes / 60);

		return storageMilli;
	}

	/**
	 * getPrix()
	 *  Retourne un prix selon un temps passé
	 * 
	 * @param {*} minutes 
	 *  Le nombre de minutes à calculer
	 * 
	 * @returns
	 *  Le prix correspondant
	 */
	getPrix(minutes) {
		if (minutes && minutes > 0) {
			if (minutes <= 15) {
				return .8;
			} else if (minutes <= 30) {
				return 1.3;
			} else if (minutes <= 45) {
				return 1.7;
			} else {
				return 6;
			}
		}
		return null;
	}

	/**
	 * getPaiement()
	 *  Permet d'effectuer le processus de paiement intégrant la gestion de l'appoint et du rendu
	 * 
	 * @param {*} paiement
	 * 	La somme à payer
	 * 
	 * @param {*} sommeReglee
	 * 	Le montant réglé par le client
	 *  
	 * @returns 
	 * 	Un objet(variable) appelé "traitement" contenant 3 paramètres
	 * 		<statut>
	 * 			"ok" --> somme réglée
	 * 			"appoint" --> somme manquante
	 * 			"rendu" --> somme trop perçue à rendre
	 * 		<somme>
	 * 			Selon le statut de "getPaiement()" la somme est null, manquante ou trop perçue
	 * 		<msg>
	 * 			Selon le statut (Idem somme), le message sera adapté aux conditions
	 * @see{@link getAppointRendu}
	 */
	getPaiement(paiement, sommeReglee) {
		let traitement;
		let sommeFormatee;
		if (sommeReglee === paiement ) {
			traitement = {
				statut: "ok",
				somme: null,
				msg: `Vous avez bien réglé la somme attendue`
			}
		} else if (sommeReglee < paiement) {
			sommeFormatee = this.getAppointRendu("appoint", paiement, sommeReglee);
			traitement = {
				statut: "appoint",
				somme: sommeFormatee,
				msg: `Merci d'effectuer l'appoint, il manque ${this.getDisplayPrice(sommeFormatee)}`
			}
		} else {
			traitement = {
				statut: "rendu",
				somme: this.getAppointRendu("rendu", paiement, sommeReglee),
				msg: `Vous avez bien réglé la somme attendu`
			}
		}
		return traitement;
	}
	/**
	 * getAppointRendu()
	 * 	Calcule à partir d'un mode la somme dûe "appoint" ou la somme à rendre "rendu",
	 *  et l'arrondi au(x) chiffre(s) après la virgule (2 dans mon cas)
	 * 
	 * @param {*} mode
	 * 	appoint
	 * 		Soustrait la somme réglée au paiment attendu pour connaitre la somme manquante
	 *  rendu
	 * 		Soustrait le paiement attendu à la somme réglée afin de connaitre le trop perçu
	 * 
	 * @param {*} paiement
	 * 	La somme dûe
	 * 
	 * @param {*} sommeReglee
	 * 	Somme réglée par le client
	 * 
	 * @returns
	 */
	getAppointRendu(mode, paiement, sommeReglee) {
		if (mode == "appoint") {
			return this.getRoundDecimal(paiement - sommeReglee, 2);	
		} else {
			return this.getRoundDecimal(sommeReglee - paiement, 2);
		}	
	}

	/**
	 * getRoundDecimal()
	 * 	Arrondi les chiffres à virgule (3.142627 -> 3.14)
	 * 
	 * @param {*} nb
	 * 	Le nombre (float) à arrondir
	 * 
	 * @param {*} precision
	 * 	Le nombre de zéro(s) attendus après la virgule
	 * 
	 * @returns
	 * 
	 * @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/pow|Math.pow()}
	 * @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/round|Math.round()} 
	 */
	getRoundDecimal(nb, precision) {
		// Voir doc Mozilla 
		let tmp = Math.pow(10, precision);
		return Math.round(nb * tmp) / tmp;
	}

	/**
	 * getDisplayPrice()
	 * 	Formate des chiffres en devises € (10€),
	 *  'fr-FR' définit la zone et "currency" la devise
	 * 
	 * @param {*} number
	 *  Le chiffre à formater
	 * 	@see{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat|Intl.NumberFormat()}
	 * 
	 * @returns 
	 */
	getDisplayPrice(number) {
		let formater = new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		});
		return formater.format(number);
	}

	/**
	 * getStatut()
	 *	Voir paramètres statut du constructor
	 * 
	 * @returns 
	 * 
	 */
	getStatut() {
		return this.statut;
	}

	/**
	 * setStatut()
	 * 	Permet de modifier le statut du parking (voir paramètres du constructor)
	 * 
	 * @param {*} statut 
	 * 	Le statut à modifier selon les besoins
	 */
	setStatut(statut) {
		this.statut = statut;
	}

	/**
	 * getStorage()
	 * 	Récupère le parking dans le "localStorage" (string) et le retourne en objet
	 * 
	 * @see{@link https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage|localStorage}
	 * @see{@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse|JSON.parse()}
	 * @returns 
	 */
	getStorage() {
		// Je stock dans la variable "parking" la récupération de l'élément jt_parking du "localStorage"
		//  dans lequel est stocké (en string) les places de parking occupées
		let parking = localStorage.getItem("jt_parkings");
		// Je vérifie que "parking" exsiste et qu'il n'est pas vide
		if (parking && parking !== '') {
			// Si "parking" n'est pas vide, je récupère le contenu de "parking" (string)
			//  que je convertis en tableau (objet)
			let stockageParking = JSON.parse(parking);
			// Et je retourne mon tableau d'objets
			return stockageParking;
		}
		// Si "parking" est vide, je retourne un tableau vide
		return [];	
	}

	/**
	 * setStorage()
	 *  Selon l'opération, on ajoute/retire un véhicule du "localStorage"
	 * @param {*} voiture_immat 
	 * 
	 * @param {*} action 
	 * 
	 */
	setStorage(voiture_immat, action = "add") {

		let parking = this.getStorage();
		
		if (action == "add") {
			parking.push(voiture_immat);
		}

		if (action == "remove") {	
			
			// La méthode filter() crée et retourne un nouveau tableau contenant
			//  tous les éléments du tableau d'origine qui remplissent une condition	
			parking = parking.filter(place => place.immatriculation !== voiture_immat);
		}

		// La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON.
		//  Optionnellement, elle peut remplacer des valeurs ou spécifier les propriétés
		//  à inclure si un tableau de propriétés a été fourni.
		let newStorage = JSON.stringify(parking)
		localStorage.setItem("jt_parkings", newStorage);
	}

	/**
	 * clearStorage()
	 * 	Vide le parking du localStorage
	 * 	@see{@link https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage|localStorage}
	 */
	clearStorage() {
		localStorage.removeItem("jt_parkings");
	}
}

