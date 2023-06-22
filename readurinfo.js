// Read the CSV file
fetch('facture.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data
    const rows = csvData.split('\n').map(row => row.split(','));
  
    // Extract the required information
    const [headerRow, dataRow] = rows;
    const [entreprise, domaine, adresse, rc, numArticle, nif, rib] = dataRow;
  
    // Update the HTML element with the extracted information
    const urinfoElement = document.getElementById('infosEI');
    urinfoElement.innerHTML = `<p id="urinfo">${entreprise}<br>${domaine}<br>${adresse}</p>`;
    urinfoElement.innerHTML += `<p>RC:${rc}<br>N° d'Article:${numArticle}<br>N.I.F:${nif}<br>R.I.B:${rib}</p>`;
  })
  .catch(error => {
    console.error('An error occurred while reading the CSV file:', error);
  });
