import Voiture from './modules/Voiture.js';
import Moto from './modules/Moto.js';
// Start main
console.log("-------VOITURES-------");

let voiture1 = new Voiture("Audi", "A8", 12000, 2024,"CD-286-YA", true);
console.log("Voiture1 ---\n", voiture1.getDisplay());

let voiture2 = new Voiture("BMW", "série2", 45000, 2020,"JW-290-PD");
console.log("Voiture2 ---\n", voiture2.getDisplay());

let voiture3 = new Voiture("BMW", "série1", 70000, 2018,"AA-400-WC");
console.log("Voiture3 ---\n", voiture3.getDisplay());

console.log("-------MOTOS-------");

let moto1 = new Moto("Solex", "Silex", 900000, "1200");
console.log("Moto1 ---\n", moto1.getDisplay());
console.log("Wheels: ", moto1.getWheels());

let moto2 = new Moto("Kawazaki", "M4000", 34000, "2014");
console.log("Moto2 ---\n", moto2.getDisplay());
console.log("Wheels: ", moto2.getWheels());