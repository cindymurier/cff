"use strict";

const nomVilleDépart = document.querySelector(".title h1");
const mainContainer = document.querySelector("main");

const renderTrain = async (ville) => {
	try {
		const response = await fetch(
			`http://transport.opendata.ch/v1/stationboard?station=${ville}&limit=10`
		);
		const data = await response.json();
		console.log(data);

		data.stationboard.forEach((e) => {
			afficheTrain(e);
		});
		//change affiche du nom de la ville de départ
		nomVilleDépart.innerHTML = ville;
	} catch {
		console.error(e.message);
	}
};

//pas oublier d'appeler la fonction pour qu'elle s'affiche
renderTrain("Neuchâtel");

const afficheTrain = (data) => {
	const category = data.category;
	const nomVille = data.to;

	const time = new Date(data.stop.departure);
	const minute = time.getMinutes().toString().padStart(2, "0");
	const heure = time.getHours();

	const html = `<article>
    <div class="time">${heure + ":" + minute}</div>
    <div class="category" data-category="${category}">${category}</div>
    <div class="destination">${nomVille}</div>
</article>`;

	mainContainer.insertAdjacentHTML("beforeend", html);
};
