const fs = require('fs');

// Informations de la facture
const factureNumero = 1;
const nomEntreprise = 'Haddad Sarah';
const domaine = 'Confection';
const adresse = 'Alger';
const rc = '4860036 A 07';
const numArticle = '16119144410';
const nif = 'xxxxxxxxxxxxxxx';
const rib = 'xxx xxxxx xxxxxxxxxxxx C.P.A';

// Format des données CSV
const csvData = [
  ['Facture Pro format N°', 'Nom de l\'entreprise', 'Domaine', 'Adresse', 'RC', 'N° d\'Article', 'NIF', 'RIB'],
  [factureNumero, nomEntreprise, domaine, adresse, rc, numArticle, nif, rib]
];

// Convertir les données en format CSV
const csvContent = csvData.map(row => row.join(',')).join('\n');

// Écrire les données dans un fichier CSV
fs.writeFile('facture.csv', csvContent, 'utf8', (err) => {
  if (err) {
    console.error('Une erreur s\'est produite lors de l\'écriture du fichier CSV:', err);
  } else {
    console.log('Le fichier CSV a été créé avec succès.');
  }
});
