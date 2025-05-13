export default class ParkingPlace {
    constructor(immatriculation, dateEntree) {
        this.immatriculation = immatriculation;
        this.dateEntree = dateEntree;
    }

    // Affichage des données d'arrivée et délivrance de ticket
    genererTicket() {
        let msg = `Immatriculation numéro: ${this.immatriculation}\n`;
        msg += `Heure d'entrée: ${this.convertTimestampToTime(this.dateEntree)}`;
        return msg;
    }
    
    // Renvoie la date du jour et l'heure d'arrivée
    getDateEntree() {
        return this.dateEntree
    }
    
    // Renvoie de l'immatriculation véhicule
    getImmat() {
        return this.immatriculation
    }

    // Convertion d'un timestamp en chaine de caractères
    convertTimestampToTime(timestamp) {
        let date = new Date(timestamp)
        return date.toLocaleString();
    }
}
