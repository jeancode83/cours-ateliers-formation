import Vehicule from './Vehicule.js';
// Extension de la classe Vehicule générique pour créer des véhicules de type moto
// Création d'une nouvelle méthode getWheels()
// Overide de getDisplay(), pour le nouvel affichage
export default class Moto extends Vehicule {
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