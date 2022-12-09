// Génération de Factures


var produits = new Array();
  // produits["NomdemonProduit"] = ["prix", "description"];

  produits["Pulls"] = ["Pulls", "25", "100% coton éco-responsable", "0"];
  produits["T-Shirt"] = ["T-Shirt", "19", "En promo", "0"];
  produits["Jeans"] = ["Jeans", "25", "inusable", "0"];
  produits["Veste & Manteau"] = ["Veste & Manteau", "75", "anti-tout et confortable", "0"];
  produits["Chemise"] = ["Chemise", "35", "aérer", "0"];
  produits["Robe"] = ["Robe", "35", "légère", "0"];
  produits["Jupe"] = ["Jupe", "15", "douse et 100% coton", "0"];
  produits["Polos"] = ["Polos", "20", "tien chaux", "0"];
  produits["Survêtement"] = ["Survêtement", "40", "Un peu chère", "0"];



  for( var prod in produits){
    document.getElementById('articles').innerHTML += "<div><span>"+prod + ' — ' + produits[prod][1] + " €</span> <a onclick=\"add('"+prod+"')\"><i class=\"fas fa-plus-circle\"></i> Ajouter au panier</a></div>";
  }




  var sous_total = 0;
  var taxe = 0;

  function add(x){
      produits[x][3]++;
      sous_total += Math.abs(((produits[x][1])*1));
      document.getElementById("sous_total").innerHTML = sous_total.toFixed(2) + " €";
      taxe = (sous_total - (sous_total*1.2));
      taxe = Math.abs(taxe.toFixed(2));
      document.getElementById("taxe").innerHTML = taxe + " €";
      document.getElementById('total').innerHTML = ((sous_total+taxe)*1).toFixed(2) + " €";

      document.getElementById('articles').innerHTML = "";
      for( var prod in produits){
        if (prod === x) {
          document.getElementById('articles').innerHTML += "<div><span>"+x+ ' — ' + produits[x][1] + " €</span> <a class='ajout'><i class=\"fas fa-check-circle\"></i> Ajouté au panier !</a></div>";
          setTimeout(function(){
            document.getElementById('articles').innerHTML ="";
            for( var prod in produits){
              document.getElementById('articles').innerHTML += "<div><span>"+prod + ' — ' + produits[prod][1] + " €</span> <a onclick=\"add('"+prod+"')\"><i class=\"fas fa-plus-circle\"></i> Ajouter au panier</a></div>";
            }
          }, 1000);
        }
        else {
          document.getElementById('articles').innerHTML += "<div><span>"+prod + ' — ' + produits[prod][1] + " €</span> <a onclick=\"add('"+prod+"')\"><i class=\"fas fa-plus-circle\"></i> Ajouter au panier</a></div>";
        }
      }

  }

function display(){
  if (document.getElementById("d-none").style.display = "none") {
    document.getElementById("d-none").style.display = "block";
    document.getElementById("d-block").style.display = "none";
    document.getElementById('panier').innerHTML = "";
  }
  for( var prod in produits){
    if (produits[prod][3] != "0") {
      var somme = produits[prod][3]*produits[prod][1];
      document.getElementById('panier').innerHTML += "<td>"+ produits[prod][0]+ " — " + produits[prod][2]+"</td><td class=\"text-center\">"+ produits[prod][1]+"</td> <td class=\"text-center\">"+ produits[prod][3]+"</td> <td class=\"text-center\">"+somme+"</td>" ;
    }
  }
}
function display2(){
  document.getElementById("d-none").style.display = "none";
  document.getElementById("d-block").style.display = "block";
}


function print_page(){
  document.getElementById("print").style.display = "none";
  document.getElementById("disabled").style.display = "none";
  print();
  setTimeout(function(){ document.getElementById("print").style.display = "initial"; document.getElementById("disabled").style.display = "initial"; }, 0);
}
