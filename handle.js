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
		document.getElementById('clientinfo').innerHTML = '<p>' + 'Facturer à : ' + clientHtml + '<br>' + AdrClient + moreinfo + '</p>'

		let documentType = document.getElementById("documentType").value // Uppercase document type to use as title
		document.getElementById('docuType').innerHTML = documentType

		let outputDate = dateFormat(document.getElementById("docDate").value) // Format the date to dd-mm-yyyy
		document.getElementById('docuDate').innerHTML = 'Alger le:' + outputDate

		let documentNumber = ` N°${document.getElementById("docNumber").value}/${outputDate.slice(-2)}` // the year is 2022 so it would be '2022-1'
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
		newItemElement.innerHTML = `<div class="itemDescription">
		<p>${ref}</span>
		</p></div>
			<p>${itemToAdd.name}</span>
			</p></div>
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
		document.getElementById('somme').innerHTML = '<p>' + 'Arrêtée la présente Facture pro forma à la somme de:' + NumberToLetter(totTTC, "Dinnar", "Centimes") + '</p>'
	})

// Export html document in its current state
document
	.getElementById('exportDocument')
	.addEventListener('click', function () {
		let facture = document.getElementsByTagName('aside')[0].innerHTML
		let exportDocument = `<!DOCTYPE html>
		<html style="display: flexflex-flow:row nowrap;justify-content:center;">
			<head>
			<style type="text/css">*
			{
				margin: 0;
				padding: 0;
			}
			body
			{
				font-family: Arial, Times, 'Times New Roman', serif;
				font-size: 11pt;
			}
			header
			{
				height: 8%;
				vertical-align: middle;
				margin-top: 20px;
			}
			header, nav, main
			{
				width: 100%;
			}
			nav ul
			{
				width: 100%;
				list-style: inside;
				margin: auto;
				display: flex;
				justify-content: space-evenly;
			}
			nav li:hover
			{
				cursor: pointer;
			}
			footer
			{
				position: relative;
				bottom: 50px;
				text-align: center;
			}
			
			.button
			{
				margin: 5px;
				padding: 6px;
				border-radius: 25px;
				border: 1px dotted black;
				background: rgb(246, 251, 255);
				transition: 0.3s;
			}
			.button:hover
			{
				cursor: pointer;
				background: rgb(235, 246, 255);
			}
			.button:active
			{
				border: inset 1px;
				background: rgb(253, 253, 253);
			}
			
			#docuDate
			{
				font-weight: 100;
				width: 80%;
				margin: auto;
				text-align: start;
			}
			
			.smaller
			{
				font-size: 0.95em;
			}
			.vsmaller
			{
				font-size: 0.75em;
				font-style: italic;
				color: #454545;
			}
			.bold
			{
				font-weight: bold;
			}
			.emph
			{
				background: #ddd;
				border: 1px solid black;
				border-radius: 12px;
				padding: 9px 0 !important;
			}
			.center
			{
				text-align: center;
			}
			
			aside
			{
				border: 1px solid black;
				border-radius: 5px;
				aspect-ratio: 21/29.7;
				width: 600px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
			}
			#exportedDocument {
				aspect-ratio: 21/29.7;
				width: 20cm;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
			}
			aside p, #exportedDocument p
			{
				padding: 9px;
			}
			
			section
			{
				width: 90%;
				display: flex;
				flex-direction: row-reverse;
				justify-content: space-evenly;
				align-items: center;
				height: 70%;
				margin: 11% auto;
			}
			section div
			{
				width: 45%;
				margin: auto;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
			}
			section h2
			{
				margin: 5% auto;
			}
			section div div
			{
				width: 90%;
			}
			
			#top
			{
				width: 100%;
				margin: 5px auto;
			}
			#parties
			{
				width: 100%;
				margin: 5px auto;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				font-size: 0.75em;
			}
			#parties div
			{
				width: 49%;
				margin: 0.5%;
			}
			#client
			{
				text-align: end;
			}
			#items
			{
				width: 95%;
				margin: 15px auto;
			}
			
			.row
			{
				width: 100%;
				margin: 2px auto;
				padding: 1px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-around;
			}
			.row p
			{
				padding: 3px;
			}
			.row div
			{
				width: auto;
				flex: 1;
			}
			.row :nth-child(0n+1)
			{
				flex: 3;
			}
			.thead
			{
				display: flex;
				flex-flow: column nowrap;
				width: 95%;
				font-weight: bold;
				text-align: center;
			}
			.thead .row
			{
				background: #eee;
				border: 1px solid #ddd;
				border-radius: 15px;
				padding: 6px 0px !important;
			}
			.header
			{
				width: auto;
				margin: auto;
			}
			#tbody
			{
				width: 95%;
				margin: 5px auto;
				display: flex;
				flex-flow: column nowrap;
				font-size: 0.88em;
			}
			#tbody .row
			{
				background: #eee;
				border-radius: 10px;
				padding: 3px;
				margin: 2px auto;
			}
			.tfoot
			{
				display: flex;
				flex-flow: column nowrap;
				border-top: 1px solid #eee;
				width: 90%;
				margin: 6px auto;
				text-align: center;
			}
			.hide
			{
				visibility: hidden;
			}
			
			.itemDetails
			{
				text-align: start !important;
			}
			.descriptionItem
			{
				color: #666;
				font-size: 0.8em;
			}
			
			#clauses
			{
				width: 90%;
				color: #444;
				font-size: 0.66em;
				margin: 5px auto;
			}
			#clauses p
			{
				margin: 5px;
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
			#docuDate{
				font-size: 0.5em;
				font-style: italic;
				color: #454545;
			}
			#parties {
				display: block;
				padding: 5px; /* Modify the padding as needed */
				margin: 5px 0; /* Modify the margins as needed (10px top and bottom, 0 left and right) */
			}
			#ouvrir
			{
				display: none;
			}
			/* Style for the Flex container */
			.flex-container {
				display: flex; /* Use Flexbox */
				align-items: center; /* Center items vertically */
			}
			
			/* Style for the docuType span */
			#docuType {
				font-weight: bold; /* Add any desired styles */
				margin-right: 5px; /* Add some space between docuType and docuNumber */
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
	})

// Export JSON file with document
/* document
	.getElementById('exportAsJSON')
	.addEventListener('click', function ()
	{
		// Export Facture object as JSON
		let documentJSON = JSON.stringify(FactureActuelle)
		let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(documentJSON)

		let exportFileDefaultName = `${FactureActuelle.docType}${FactureActuelle.docNumber}.json`

		let linkElement = document.getElementById('exportAsJSON')
		linkElement.setAttribute('href', dataUri)
		linkElement.setAttribute('download', exportFileDefaultName)
	}) */

/* Import JSON file as new document
// WIP
document
	.getElementById('importJSON')
	.addEventListener("change", function (e)
	{
		fileImport = new FileReader()
		fileImport.onload = event => JSON.parse(event.target.result)
		fileImport.readAsText(e.target.files[0])
	})
	*/