import Vehicule from './Vehicule.js';
// Extension de la classe Vehicule générique pour créer des véhicules de type voiture
// Ajout des paramètres climatisation et immatriculation
// Overide de la fonction getDisplay pour afficher les nouveaux paramètres ajoutés 
export default class Voiture extends Vehicule {
    // Overide du constructeur (pour ajouter les nouveaux paramètres)
    constructor(marque, modele, kilometrage, annee,immatriculation, climatisation = false) {
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