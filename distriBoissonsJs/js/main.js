function roundDecimal(nb, precision) {
	var tmp = Math.pow(10, precision);
	return Math.round(nb * tmp) / tmp;
}
var boissonSelect, paiement, manqMonnaie;
var boissons = [
	{
		nom: "Coca-cola",
		prix: 0.80
	}, {
		nom: "Fanta",
		prix: 0.70
	}, {
		nom: "Ice-Tea",
		prix: 0.70
	}, {
		nom: "Perrier",
		prix: 1.00
	}
];
console.table(boissons);
let msgIntro = "Veuillez sélectionner votre boisson\n"
for (let index = 0; index < boissons.length; index++) {
	msgIntro += "tapez " + (index +1) + " pour sélectionner un " + boissons[index].nom + " à " + boissons[index].prix + " €.\n";
	
}
i = 0;
do {
	boissonSelect = Number(prompt(msgIntro))
	if (boissonSelect < 1 || boissonSelect > 4 ) {
		alert("La boisson sélectionnée n'existe pas");
	}
	i ++;
	
} while (boissonSelect < 1 || boissonSelect > 4)

// Uniquement si la boisson est sélectionnée
if (boissonSelect) {
	
	// Je stock la boisson et le prix courant dans une variable let pour simplifier le code
	let prixCourant = boissons[boissonSelect - 1].prix;
	let boissonCourante = boissons[boissonSelect - 1].nom;

	// On prépare une variable pour stocker l'appoint
	let paiementManqMonnaie;

	// On stock dans la variable paiement le paiement de la boisson sélectionnée
	paiement = Number(prompt("Vous avez choisi un " + boissonCourante + " veuillez régler la somme de " + prixCourant + " €."))

	// On lance une boucle tant que le paiement est inférieur au prixCourant de la boisson sélectionnée
	while (roundDecimal(paiement, 2) < prixCourant) {

		// On stock le calcul formaté avec roundDecimal, du prixCourant - paiement, afin d'avoir l'argent manquant
		paiementManqMonnaie = roundDecimal((prixCourant - paiement), 2);

		// On stock dans la variable manqMonnaie l'appoint soumis par le client
		manqMonnaie = Number(prompt("Il manque " + paiementManqMonnaie + " €, merci de régler l'appoint."));
		
		// J'additionne le paiement + manqMonnaie uniquement si il rempli la condition manqMonnaie est > à 0
		if (manqMonnaie > 0) {
			paiement = roundDecimal(paiement + manqMonnaie, 2);
		}
	} 

	// On créé une variable msg afin de préparer le message de récupération de la boisson
	let msg = "Nous avons bien reçu le paiement " + paiement + " €. ";
	
	// On vérifie si le paiement client est supérieur au prix de la boisson et si il y a un appoint à effectuer
	if (paiement > prixCourant) {
		// Je calcule paiement - prixCourant et j'y stock la valeur d'appoint dans paiementManqMonnaie
		paiementManqMonnaie = roundDecimal((paiement - prixCourant), 2);
		// On concatène à la viariable msg  l'information du montant rendu monnaie
		msg += "votre monnaie de " + paiementManqMonnaie + " € et ";
	}

	// On concatène à la viariable msg le message de récupération de la boisson
	msg += "Votre " + boissonCourante + " est prêt.";

	// On affiche le message au client 
	alert(msg);
}





