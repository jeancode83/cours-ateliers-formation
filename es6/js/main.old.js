// Déclarer une variable firstname et lui affecter la valeur Kylian
let firstname = "Kylian";

// Déclarer un tableau numérique players
let players = [];

// Stocker dans la première case du tableau la chaine Kylian Mbappé
players[0] = "Kylian Mbappé";
players[1] = "Zimdine Zidane";

// Ajouter Antoine Griezmann au tableau en passant par la méthode push
players.push("Antoine Giezmoune");
//console.log(players)

// Parcourir le tableau avec une boucle for et afficher dans la console chaque joueur du tableau players
for (let index = 0; index < players.length; index++) {
    let nomPlayer = players[index];
    // console.log(nomPlayer);
}

// Parcourir le tableau avec une boucle for...of et afficher dans la console chaque joueur du tableau players
for (let nomPlayer of players) {
   // console.log(nomPlayer);
}

// Parcourir le tableau avec la méthode forEach et afficher dans la console chaque joueur du tableau players
players.forEach(player => {
//   console.log(player);   
});

// Créer un tableau associatif / objet anonyme qui répresente un joueur avec son prenom (Olivier), son nom (Giroud) et son poste (Attaquant)
let joueurs = [
    {
        prenom: "Olivier",
        nom: "Giroufle",
        poste: "Attaquant"
    },
    {
        prenom: "Zimdim",
        nom: "Zidane",
        poste: "Coup d'bouleur"
    }
];
//console.log(joueurs);
//console.log(joueurs[0].prenom);


let joueur2 =  {
    prenom: "Passez",
    nom: "Libalon",
    poste: "Supporter"
};
//console.log(joueur2);
//console.log(joueur2.prenom);


// Afficher dans la console la concaténation des informations sur le joueur précédemment créé
let notification = `Le joueur ${joueurs[0].prenom} ${joueurs[0].nom} occupe le poste d'${joueurs[0].poste}`
//alert(notification);

// Créer un tableau permettant de stocker plusieurs joueurs (en reprenant le modèle d'Olivier Giroud) -> Adrien Rabiot (Milieu), Aurélien Tchouaméni (Milieu) et Hugo Lloris (Gardien)
joueurs.push({
    prenom: "Adrien",
    nom: "Rabiot",
    poste: "Milieu"
});
joueurs.push({
    prenom: "Aurélien",
    nom: "Tchouaméni",
    poste: "Milieu"
});
joueurs.push({
    prenom: "Hugo",
    nom: "Lloris",
    poste: "Gardien"
});
//console.log(joueurs);

// Recupérer tous les milieux de terrain du tableau
let milieux = [];
for (let index = 0; index < joueurs.length; index++) {
    const milieu = joueurs[index];
    if (milieu.poste == "Milieu") {
      milieux.push(milieu)  
    }   
}
//console.log(milieux);


// Créer une classe Player avec des propriétés firstname, lastname et position
class Player {

    // En initialisant mon objet Player je lui assigne des valeurs
    constructor(prenom, nom, position, equipe) {
        this.prenom = prenom;
        this.nom = nom;
        this.position = position;
        this.equipe = equipe;
    }

    // Méthode permettant de récupérer des paramètres du nom de mon objet Player
    getFullName() {
        return `${this.prenom} ${this.nom} ${this.position} ${this.equipe}`;  
    }

    // Fonction permettant de récupérer la postion
    getPosition() {
        return this.position;
    }

    // Fonction permettant d'assigner une nouvelle position
    setPosition(newPosition) {
        this.position = newPosition;
    }

    // Fonction permettant de récupérer le nom
    getName() {
        return this.nom;
    }

    // Fonction permettant d'assigner un nouveau nom
    setName(newName) {
        this.nom = newName;
    }
}
// Créer un objet Player pour le joueur Raphaël Varane (Défenseur)
let play = new Player("Raphaël", "Varane", "Défenseur", "France");
console.log(play.getFullName());
play.setPosition("Défenseur central");
console.log(play.getFullName());
play.setName("Varaneto")
console.log(play.getFullName());

console.log("###########");


//Ajouter une méthode dans la classe pour modifier le poste d'un joueur
/**Voir ligne 100**/

// Appeler la méthode sur l'objet Raphaël Varane afin de modifier son poste de Défenseur à Défenseur central
//play = new Player("Raphaël", "Varane", "Défenseur central");
//console.log(play.changePosition());

/**
 * Exercice mise en application des classes
 */

//Création de la classe principale
class Vehicule {
    constructor(marque, modele, kilometrage, annee) {
        this.marque = marque;
        this.modele = modele;
        this.kilometrage = kilometrage;
        this.annee = annee;
    }
    getDisplay() {
        return `Vehicules:\nMarque: ${this.marque}\nModèle: ${this.modele}\nKilomètrage: ${this.kilometrage}\nAnnée: ${this.annee}`;  
    }
}
let vehicule = new Vehicule("Peugeot", "207sw", 165400, 2007);
console.log(vehicule.getDisplay());

// Extension de la classe Vehicule générique pour créer des véhicules de type voiture
// Ajout des paramètres climatisation et immatriculation
// Overide de la fonction getDisplay pour afficher les nouveaux paramètres ajoutés 
class Voiture extends Vehicule {
    // Overide du constructeur (pour ajouter les nouveaux paramètres)
    constructor(marque, modele, kilometrage, annee, climatisation, immatriculation) {
        // Rappel des paramètres de la classe Vehicule parents avec la fonction super()
        super(marque, modele, kilometrage, annee);
        // Initialisation des nouveaux paramètres de la classe Vehicule
        this.climatisation = climatisation; 
        this.immatriculation = immatriculation;   
    }
    // Overide de la fonction getDisplay avec pretty formatage des infos
    getDisplay() {
        let msg = "Voiture: \n";
        msg += `Immatriculation: ${this.immatriculation}\n`;
        msg += `Marque: ${this.marque}\n`;
        msg += `Modèle: ${this.modele}\n`;
        msg += `Kilomètrage: ${this.kilometrage}\n`;
        msg += `Année: ${this.annee}\n`;
        msg += `-- Option(s) --\n`;
        // Utilisation des conditions ternaires (si variable ? Alors : sinon)
        msg += `Climatisation: ${this.climatisation ? "oui" : "non."}`;

        return msg;  
    }
}

let voiture1 = new Voiture("Audi", "A8", 12000, 2024, true, "CD-286-YA");
console.log("Voiture1 ---\n", voiture1.getDisplay());

let voiture2 = new Voiture("BMW", "série2", 45000, 2020, false, "JW-290-PD");
console.log("Voiture2 ---\n", voiture2.getDisplay());

// Extension de la classe Vehicule générique pour créer des véhicules de type moto
// Création d'une nouvelle méthode getWheels()
// Overide de getDisplay(), pour le nouvel affichage
class Moto extends Vehicule {
    getWheels() {
        return 2;
    }
    getDisplay() {
        let msg = "Moto: \n";
        msg += `Marque: ${this.marque}\n`;
        msg += `Modèle: ${this.modele}\n`;
        msg += `Kilomètrage: ${this.kilometrage}\n`;
        msg += `Année: ${this.annee}\n`;
        msg += `-- Particularité(s) --\n`;
        msg += `Nombre de roues: ${this.getWheels()}`;
        return msg;  
    }
}

let moto1 = new Moto("Solex", "Silex", 900000, "1200");
console.log("Moto1 ---\n", moto1.getDisplay());
console.log("Wheels: ", moto1.getWheels());
