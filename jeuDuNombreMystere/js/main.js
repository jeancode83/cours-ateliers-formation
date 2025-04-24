var toursMax = 9;
var nb,
	essai,
	score;

nb = Number(prompt("Saisissez le nombre à trouver"));

score = 0;

do {
	essai = Number(prompt(`${score <= 1 ? "Tentez" : "Retentez"} votre chance !! (${(toursMax+1) - score})`));

	if (nb > essai) {
		alert("Ton nombre est plus petit que le nombre mystère");
	}

	if (nb < essai) {
		alert("Ton nombre est plus grand que le nombre mystère");
	}
	score++;

} while ((nb != essai) && (score <= toursMax));

if (score > toursMax) {
    alert("Game over, dommage vous y arriverez la prochaine fois !!");
}
else {
    if (score == 1) {
       alert("Bravo, vous avez réussi du premier coup !!") 
    } else {
      alert("Bravo, votre score est de " + score + " coups.");  
    }
}


