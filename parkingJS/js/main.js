import Parking from './modules/Parking.js';
import ParkingPlace from './modules/ParkingPlace.js';

// J'initialise mon instence parking
let parkingSablettes = new Parking("Les Sablettes", "322 av. J-Baptiste Mattei 83500 La Seyne-sur-mer", 10, "msg");
// statutParking = off | msg | depot | paiement
console.log(parkingSablettes.getParking());

/**
 * Création de trois variables, la première pour matérialiser les actions via le prompt "actionClient"
  la suivante pour la recherche de l'immatriculation par un format défini avec <regex> (Expressions rationnelles
   ou Regular expressions) et enfin la dernière qui contient le formatage de l'immatriculation
    celle-ci bloquera les formats non conformes
 */
let actionClient;
let recherchePlaque;
let regex = /([A-Z]){2}-([\d+]){3}-([A-Z\+]){2}/g;

// On crée une variable "statutParking" qui stock les différents statuts afin de pouvoir
//  utiliser les variantes créées ("depot"), ("paiement"), ("off"), ("msg")
// J'utilise les conditions "do" et "if" pour réagir de façon appropriée à chaque "actionClient"
do {
	let statutParking = parkingSablettes.getStatut();

	if (statutParking == "msg") {

		let msgIntro = parkingSablettes.messageBienvenue();

		actionClient = Number(prompt(msgIntro));

		if (actionClient == 1) {
			
			if (parkingSablettes.getPlacesDispo() > 0)  {
				parkingSablettes.setStatut("depot");
				// J'utilise continue pour arrêter l'exécution des instructions pour l'itération de la boucle courante
				continue;
			}
		} else if (actionClient == 2) {
			parkingSablettes.setStatut("paiement");
			continue;
		} else if (actionClient == 99 || actionClient == 3) {
			parkingSablettes.setStatut("off");
			break;
		} else if (actionClient == 1234) {
			parkingSablettes.clearStorage();
			parkingSablettes.setStatut("msg");
			continue;
		} else {
			alert(`L'action ${actionClient} est invalide, merci de réessayer`)
			continue;
		}

	} else if (statutParking == "depot") {
		actionClient = prompt("Bonjour, veuillez entrer l'immatriculation pour entrer votre véhicule");
		
		if (actionClient !== "") {

			if (actionClient == 99) {
				parkingSablettes.setStatut("off");
				break;
			}

			recherchePlaque = actionClient.match(regex);

			if (recherchePlaque) {
				let plaque = recherchePlaque[0];
				let place1 = new ParkingPlace(plaque, parkingSablettes.getDate());
				parkingSablettes.setVoiture(place1);
				alert(place1.genererTicket());
				parkingSablettes.setStatut("msg");
				continue;

			} else {
				alert("Les données fournies ne correspondent pas à un format immatriculation,\nréessayez s'il vous plait");
			}

		}

	} else if (statutParking == "paiement") {

		actionClient = prompt("Entrez votre immatriculation s'il vous plait");

		if (actionClient !== "") {

			recherchePlaque = actionClient.match(regex);

			if (recherchePlaque) {

				let	plaque = recherchePlaque[0];
				let infoVoiture = parkingSablettes.getPrixAvecImmat(plaque);
				let paiementManqMonnaie = 0;
				let manqMonnaie = 0;
				console.log("Voiture", infoVoiture);
				
				if (infoVoiture) {

					let paiementDu = infoVoiture.prix;
					actionClient = Number(prompt(`Vous avez passé ${infoVoiture.diff}min,\nVeuillez régler la somme de ${parkingSablettes.getDisplayPrice(paiementDu)}\nou validez sans somme afin de revenir au menu`));
					console.log("Pas vide",actionClient);
					
					if (actionClient !== 0) {

						while (parkingSablettes.getRoundDecimal(actionClient, 2) < paiementDu) {
							
							let process  = parkingSablettes.getPaiement(paiementDu, actionClient);

							// On stock le calcul formaté avec roundDecimal, du prixCourant - paiement, afin d'avoir l'argent manquant		
							manqMonnaie = Number(prompt(process.msg));
							// J'additionne le paiement + manqMonnaie uniquement si il rempli la condition manqMonnaie est > à 0
							if (manqMonnaie > 0) {
								actionClient = parkingSablettes.getRoundDecimal(actionClient + manqMonnaie, 2);
							}
						} 

						parkingSablettes.setVoiture(plaque, "remove");

						let msg = "Nous avons bien reçu le paiement " + parkingSablettes.getDisplayPrice(actionClient) + " .\n";
	
						// On vérifie si le paiement client est supérieur au prix de la boisson et si il y a un appoint à effectuer
						if (actionClient > paiementDu) {
							// Je calcule paiement - prixCourant et j'y stock la valeur d'appoint dans paiementManqMonnaie
							paiementManqMonnaie = parkingSablettes.getRoundDecimal((actionClient - paiementDu), 2);
							// On concatène à la viariable msg  l'information du montant rendu monnaie
							msg += "Votre monnaie de " + parkingSablettes.getDisplayPrice(paiementManqMonnaie) + " et ";
						}

						// On concatène à la viariable msg le message de récupération de la boisson
						msg += "Merci beaucoup,\nà bientôt et bonne journée !!";

						// On affiche le message au client 
						alert(msg);
						parkingSablettes.setStatut("msg");
						continue;

					} else {
						parkingSablettes.setStatut("msg");
						continue;

					}

				} else {
					alert("Désolé, nous ne retrouvons aucun véhicule avec cette immatriculation ");
				}
			}
		}

		if (actionClient == 99) {
			parkingSablettes.setStatut("off");
			break;
		}
	}

} 	while (parkingSablettes.getStatut() !== "off");

