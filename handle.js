// Gather and format client informations, then store them in a new Facture object
document
	.getElementById("send")
	.addEventListener("click", function () {
		let infosClient = document.getElementsByName('nameClient')[0].value
		let AdrClient = document.getElementsByName('AdrClient')[0].value
		let RCClient = document.getElementsByName('RCClient')[0].value
		let NISClient = document.getElementsByName('NISClient')[0].value
		let NAIClient = document.getElementsByName('NAIClient')[0].value
		let moreinfo = '<div id="moreinfo">' + '<br>' + '<div>' + 'RCC:' + RCClient + '</div>' + '<div>' + 'NIS:' + NISClient + '</div>' + '<div>' + 'NAI:' + NAIClient + '</div>' + '</div>'
		let clientHtml = infosClient.replace(/\n/g, '<br />\n')
		document.getElementById('clientinfo').innerHTML = '<p> <span> Facturer à :</span> <br>' +
		'<span class="italic-bold">' + clientHtml + '</span>' + 
		'<br>' +
		AdrClient+'</p>' + moreinfo;

		let documentType = document.getElementById("documentType").value // Uppercase document type to use as title
		document.getElementById('docuType').innerHTML = '<p>' + documentType + '</p>'

		let outputDate = dateFormat(document.getElementById("docDate").value) // Format the date to dd-mm-yyyy
		document.getElementById('docuDate').innerHTML = 'Alger le:' + outputDate

		let documentNumber = `N°${document.getElementById("docNumber").value}/${outputDate.slice(-2)}` // the year is 2022 so it would be '2022-1'
		document.getElementById('docuNumber').innerHTML = documentNumber

		// Once informations have been processed, create Facture object and enable the form to add items onto the document
		FactureActuelle = new Facture(documentType, documentNumber, outputDate, infosClient)
		document.getElementById('addLine').removeAttribute('disabled')

		let ClientNumber = `Réf client : ${document.getElementById("ClientNumber").value}`
		document.getElementById('client').innerHTML = '<p>' + ClientNumber + '</p>'

	})

//Items section
let totalPrice = 0
let ref = 0
const itemsListElement = document.getElementById('tbody')

// Add item on the document
document
	.getElementById('addLine')
	.addEventListener('click', function () {
		const itemToAdd = new Item
		ref += 1

		let itemInfos = document.getElementsByName("addItem")

		itemToAdd.name = itemInfos[0].value
		itemToAdd.quantity = itemInfos[1].value
		let itemPrice = itemInfos[2].value
		let Montant = itemPrice * itemToAdd.quantity

		let newItemElement = document.createElement("div")
		newItemElement.setAttribute("class", "row")

		//Désignation
		//Quantité
		//P.U.H.T
		//mnontant H.T
		newItemElement.innerHTML = `<div class="itemDescription">${itemToAdd.name}</div>
			<div class="msmaller center">${itemToAdd.quantity}</div>
			<div class="msmaller center">${itemPrice}</div>
			<div class="msmaller center">${Montant}</div>`



		itemsListElement.appendChild(newItemElement)
		totalPrice += Montant

		//document.getElementById('HTtoTTC').innerHTML = totalPrice 
		//Total H.T
		document
			.getElementById('tot')
			.innerHTML = totalPrice

		let TVA = (totalPrice * (19 / 100))
		arrondi = TVA * 100;
		arrondi = Math.round(arrondi);
		arrondi = arrondi / 100;
		TVA = arrondi
		let totTTC = totalPrice + TVA
		arrondi = totTTC * 100;
		arrondi = Math.round(arrondi);
		arrondi = arrondi / 100;
		totTTC = arrondi

		document
			.getElementById('TVA')
			.innerHTML = TVA

		document
			.getElementById('totTTC')
			.innerHTML = totTTC
		// Add item to document
		FactureActuelle.addItem(itemToAdd)
		document.getElementById('somme').innerHTML = '<p>' + 'Arrêtée la présente Facture pro forma à la somme de : <span class= "bold">' + NumberToLetter(totTTC, "Dinnar", "Centimes") + '</span> </p>'
	})

// Export html document in its current state
document
	.getElementById('exportDocument')
	.addEventListener('click', function () {
		let facture = document.getElementsByTagName('aside')[0].innerHTML
		let exportDocument = `<!DOCTYPE html>
		<html>
			<head>
			<style type="text/css">
			@media print {
				@page {
				  margin: 0;
				}
			body {
				font-family: Arial, Times, 'Times New Roman', serif;
				font-size: 12pt;
				margin: 1.6cm;
			}
			
			.bold {
				font-weight: bold;
				color:black;
			}
			
			.emph {
				background: #ddd;
				border: 1px solid black;
				border-radius: 12px;
				padding: 9px 0 !important;
			}
			
			.center {
				text-align: center;
			}
			
			#client {
				border: 1px solid black;
				padding: 0px 0px;
			}
			#client p {
				margin: 0px;
				padding: 3px;
				font-size: 0.8em;
				font-weight: 300;
			}
			#clientinfo {
				border: 1px solid black;
				padding : 0px 15px ;
				margin: 10px 0;
				text-align: center;
				font-size: 0.8em;
			}
			
			#clientinfo span:first-child {
				float: left;
				clear: left;
				text-align: left;
				font-size: 1em;
			} 
			#items {
				width: 100%;
			}
			
			.row {
				width: 100%;
				margin: 2px auto;
				padding: 1px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-around;
			}
			
			.row p {
				padding: 3px;
			}
			
			.row div {
				width: auto;
				flex: 1;
			}
			
			.row :nth-child(0n+1) {
				flex: 3;
			}
			
			.thead {
				display: flex;
				flex-flow: column nowrap;
				font-weight: bold;
				text-align: center;
			}
			
			.thead .row {
				background: #eee;
				border: 1px solid #ddd;
				border-radius: 15px;
				padding: 6px 0px !important;
			}
			
			.header {
				width: auto;
				margin: auto;
			}
			
			#tbody {
				display: flex;
				flex-flow: column nowrap;
				font-size: 0.88em;
			}
			
			
			#tbody .row {
				background: #eee;
				border-radius: 10px;
				padding: 10px 0 10px 10px;
				margin: 2px auto;
			}
			
			.tfoot {
				display: flex;
				flex-flow: column nowrap;
				border-top: 1px solid #eee;
				text-align: center;
				align-self: flex-end; /* Align the element to the bottom (right) */
			}
			
			#clauses {
				width: 100%;
				color: #444;
				font-size: 0.7em;
			}
			#moreinfo {
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;
				font-weight: bold;
				margin-block-end: 1em;
			}
			
			#GSM {
			
				font-weight: bold;
				text-decoration: underline;
				font-size: 1.15em;
			}
			
			#GM {
				font-weight: bold;
				font-size: 1em;
			}
			
			#I {
				font-style: italic;
				font-size: 0.8em;
			}
			
			#parties {
				display: block;
			}
			
			/* Style for the Flex container */
			.flex-container {
				flex-direction: row;
				display: flex;
				justify-content: space-evenly;
				align-items: baseline;
			}
			/* Style for the content inside each flex item */
			.flex-container div {
				white-space: nowrap; /* Prevent content inside items from wrapping */   
			}
			/* Style for the docuType span */
			#docuType {
				font-weight: bold;
				margin-right: 10px;
			}
			#docuDate {
				font-size: 0.5em;
				font-style: italic;
				color: #454545;
				font-weight: normal;
				margin-right: 10px;
			}
			.italic-bold{
				font-style: italic;
				font-weight: bold;
				display: inline-block; /* Center the span */
				text-align: left; /* Center the text within the span */
				font-size: 1.5em;
			}
			#right {
				margin: 10px 60px 60px 0; /* Top, Right, Bottom, Left */
				position: fixed;
				bottom: 0;
				right: 0;
				color: #444; /* Text color */
				font-style: italic;
			}
			
			h2 {
				display: flex;
				flex-direction: row; 
				align-items: baseline;
				justify-content: space-between; 
			}
			#somme {
				margin: 10px 0;
			}		
			</style>
			</head>
			<body id="exportedDocument">
			${facture}
			</body>
		</html>`

		let newWindow = window.open('', '_blank');
		newWindow.document.write(exportDocument);
		newWindow.document.close();
		newWindow.print();
		// html2pdf().from(exportDocument).save('exported_file.pdf');
	})
