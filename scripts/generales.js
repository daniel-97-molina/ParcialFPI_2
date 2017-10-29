function $(query) {
  return document.querySelector(query);
}

function validarInput(input, mensaje) {
  if (input.validity.valueMissing) {
    input.setCustomValidity(mensaje);
  } else {
    input.setCustomValidity("");
  }
}


function generarDivArticuloBig(titulo, cuerpo) {
  var aGenerado = document.createElement("a");
  aGenerado.setAttribute("href", "#");
  aGenerado.className = "aContenedorArticulo";
  aGenerado.innerHTML = `<div class="contenido">
      <div class="detalles">
        <p>Autor - fecha - puntos</p>
      </div>
      <div class="categoria">
        <p>Categoría</p>
      </div>
      <img src="images/a.jpg" alt="imagen-del-post">

      <h3>Titulo de la publicacion publicada articulo</h3>
      <p>cuerpo del articulo, mas texto makdkf aqui las primeras lineas de la publicacion unas cuantas palabras</p>
    </div>
  `;
  return aGenerado;
}

function generarDivArticuloSmall(){
  var aGenerado = document.createElement("a");
  aGenerado.setAttribute("href", "#");
  aGenerado.className = "aContenedorArticuloSmall";
  aGenerado.innerHTML = `<div class="contenido">
      <img src="images/a.jpg" alt="imagen-del-post">
      <h3>Titulo de la publicacion publicada</h3>
      <div class="detalles">
        <p>Categoría - Autor - fecha - puntos</p>
      </div>
    </div>
  `;
  return aGenerado;
}

//DEVUELVE UN ARCHIVO XML - Parámetro: ruta del archivo
function cargarXML(sRuta) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      return this.responseXML;
    }
  };
  xmlhttp.open("GET", sRuta, true);
  xmlhttp.send();
}


function subirXML(documentoXML,direccion) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "procesarPost.php?direccion="+direccion, true);
  xmlhttp.setRequestHeader("Content-Type", "text/xml");
  console.log(documentoXML);
  xmlhttp.send(documentoXML);
}
