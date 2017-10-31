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


function generarDivArticuloBig(nArticulo, sAutor) {
  var aGenerado = document.createElement("a");
  aGenerado.setAttribute("href", "postViewer.html?id="+nArticulo.getAttribute("idArticulo"));
  aGenerado.className = "aContenedorArticulo";
  aGenerado.innerHTML = `<div class="contenido">
      <div class="detalles">
        <p>${sAutor} -  fecha - puntos???</p>
      </div>
      <div class="categoria">
        <p>${nArticulo.getElementsByTagName("categoria")[0].childNodes[0].nodeValue}</p>
      </div>
      <img src="images/imagesArticulos/${nArticulo.getElementsByTagName("img")[0].childNodes[0].nodeValue}" alt="imagen-del-post">
      <h3>${nArticulo.getElementsByTagName("titulo")[0].childNodes[0].nodeValue.substr(0,30)}</h3>
      <p>${nArticulo.getElementsByTagName("contenido")[0].childNodes[0].nodeValue.substr(0,75)+"..."}</p>
    </div>
  `;
  return aGenerado;
}

function generarDivArticuloSmall(nArticulo, sAutor){//?id=1&otro=3
  var aGenerado = document.createElement("a");
  aGenerado.setAttribute("href", "postViewer.html?id="+nArticulo.getAttribute("idArticulo"));
  aGenerado.className = "aContenedorArticuloSmall";
  aGenerado.innerHTML = `<div class="contenido">
      <img src="images/imagesArticulos/${nArticulo.getElementsByTagName("img")[0].childNodes[0].nodeValue}" alt="imagen-del-post"">
      <h3>${nArticulo.getElementsByTagName("titulo")[0].childNodes[0].nodeValue.substr(0,30)}</h3>
      <div class="detalles">
        <p>${nArticulo.getElementsByTagName("categoria")[0].childNodes[0].nodeValue} - ${sAutor} - fecha - puntos</p>
      </div>
    </div>
  `;
  return aGenerado;
}

//DEVUELVE UN ARCHIVO XML - Parámetro: ruta del archivo
//function cargarXML(sRuta) {
//  var xmlhttp = new XMLHttpRequest();
//  xmlhttp.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//      return this.responseXML;
//    }
//  };
//  xmlhttp.open("GET", sRuta, true);
//  xmlhttp.send();
//}
//
//
//function subirXML(documentoXML,direccion) {
//  var xmlhttp = new XMLHttpRequest();
//  xmlhttp.open("POST", "procesarPost.php?direccion="+direccion, true);
//  xmlhttp.setRequestHeader("Content-Type", "text/xml");
//  console.log(documentoXML);
//  xmlhttp.send(documentoXML);
//  }

function Usuario(iId, sNombre, sCorreo, sPassword, cGenero, sImagen){
    this.correo = sCorreo;
    this.password = sPassword;
    this.imagen = sImagen;
    this.genero = cGenero;
    Persona.call(this, iId ,sNombre);
    
//    if(typeOf(Usuario.prototype.__iniciado) === "undefined"){
//        Usuario.prototype.
//        Usuario.prototype.__iniciado = true;
//    }
} 

 
function Persona(iId, sNombre){
    this.id = iId;
    this.nombre = sNombre;
}

//codigo para las imagenes 


function imagen(ruta) {//codigo para enviar la imagen al servidor
    let form = $("#form");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", "imageHandler.php?ruta="+ruta);
    xmlhttp.send(new FormData(form));
}