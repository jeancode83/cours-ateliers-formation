//Création de la classe principale
export default class Vehicule {
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