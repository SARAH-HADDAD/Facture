export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 * 
	 * À faire. Étapes :
	 *   1) Reproduire à l'identique la facture retrouvée dans le fichier resultat.html 
	 *      dans la section AFFICHAGE
	 *   2) Compléter la section SAISIE en se fiant aux commentaires
	 *   3) Compléter la section TRAITEMENT en se fiant aux commentaires
	 *   4) Adapter l'affichage pour utiliser les données à notre disposition
	 *   5) Se réjouir du résultat
	 * Note: Si vous n'avez pas encore vu les structures conditionnelles, 
	 *       faites comme si la livraison était toujours demandée.
	 * Petit truc : Dans les prompt, mettez une valeur par défaut 
	 *              pour éviter d'avoir à les rentrer à chaque essai.
	 */
	static main() {
		const PRIX_LIVRAISON = 50;

		var app = document.getElementById("app");
		// SAISIE====================================================
		var article, prixunitaire, quantite, livraison
		// Demander à l'usager quel article acheter.
		var article = prompt("Quel article voulez-vous acheter?", "Télé");
		// Demander à l'usager le prix unitaire. Transformer le résultat en float.
		var prixunitaire = parseFloat(prompt("Quel est le prix unitaire?", "1000"));
		// Demander à l'usager la quantité. Transformer le résultat en integer.
		var quantite = parseInt(prompt("Combien en voulez-vous?", "2"));
		// Demander à l'usager s'il veut faire livrer.
		var livraison = confirm("Livraison?");

		// TRAITEMENT================================================
		// Calculer le sous-total (le prix multiplié par la quantité)
		var soustotal = prixunitaire * quantite;
		// Ajouter le prix de la livraison au besoin (si livraison est true)
		if (livraison === true) {
			soustotal += PRIX_LIVRAISON;
		}
		// Calculer la TPS (5% du sous-total)
		var tps = soustotal * 5 / 100;
		// Calculer la TVQ (9.975% du sous-total)
		var tvq = soustotal * 9.975 / 100;
		// Calculer le total (aditionner le sous-total, la tps et la tvq)
		var total = soustotal + tps + tvq;

		// AFFICHAGE=================================================
		// Reproduire le HTML de la facture
		var facture = app.appendChild(document.createElement("div"));
		facture.id = "facture";
		
		var h1 = facture.appendChild(document.createElement("h1"));
		h1.innerHTML = "Au bon rabais";

		var divArticle = facture.appendChild(document.createElement("div"));
		divArticle.classList.add("article");
		divArticle.innerHTML = article;

		var divPrixUnitaire = facture.appendChild(document.createElement("div"));
		divPrixUnitaire.classList.add("prixunitaire");
		divPrixUnitaire.innerHTML = prixunitaire.toFixed(2) + " $";

		var divQuantite = facture.appendChild(document.createElement("div"));
		divQuantite.classList.add("quantite");
		divQuantite.innerHTML = quantite;

		if (livraison === true) {
			var divLivraison = facture.appendChild(document.createElement("div"));
			divLivraison.classList.add("livraison");
			divLivraison.innerHTML = PRIX_LIVRAISON + ".00 $";
		}

		var divSousTotal = facture.appendChild(document.createElement("div"));
		divSousTotal.classList.add("soustotal");
		divSousTotal.innerHTML = soustotal.toFixed(2) + "$";

		var divTPS = facture.appendChild(document.createElement("div"));
		divTPS.classList.add("tps");
		divTPS.innerHTML = tps.toFixed(2) + "$";

		var divTVQ = facture.appendChild(document.createElement("div"));
		divTVQ.classList.add("tvq");
		divTVQ.innerHTML = tvq.toFixed(2) + "$";

		var divTotal = facture.appendChild(document.createElement("div"));
		divTotal.classList.add("total");
		divTotal.innerHTML = total.toFixed(2) + "$";

	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns undefined Ne retourne rien
	 */
	static init() {
		window.addEventListener("load", () => {
			this.main();
		});
	}
}
App.init();
