function $(query) {
    return document.querySelector(query);
}

if (!localStorage.usuarioLogueado) {
    $("#divUsuario").className = "oculto";
    $("#divBotonesLogin").className = "";
}
if (!localStorage.usuarioLogueado) {
    $("#divUsuario").className = "oculto";
    $("#divBotonesLogin").className = "";
}
function validarInput(input, mensaje) {
    if (input.validity.valueMissing) {
        input.setCustomValidity(mensaje);
    } else {
        input.setCustomValidity("");
    }
}


function generarDivArticuloBig(nArticulo, sAutor, iPuntos) {
    var aGenerado = document.createElement("a");
    aGenerado.setAttribute("href", "postViewer.html?id=" + nArticulo.getAttribute("idArticulo"));
    aGenerado.className = "aContenedorArticulo";
    aGenerado.innerHTML = `<div class="contenido">
      <div class="detalles">
        <p>${sAutor} - puntos: ${iPuntos}</p>
      </div>
      <div class="categoria">
        <p>${nArticulo.getElementsByTagName("categoria")[0].childNodes[0].nodeValue}</p>
      </div>
      <img src="images/imagesArticulos/${nArticulo.getElementsByTagName("img")[0].childNodes[0].nodeValue}" alt="imagen-del-post">
      <h3>${nArticulo.getElementsByTagName("titulo")[0].childNodes[0].nodeValue.substr(0,40)}</h3>
      <p>${nArticulo.getElementsByTagName("contenido")[0].childNodes[0].nodeValue.substr(0,75)+"..."}</p>
    </div>
  `;
    return aGenerado;
}


function generarDivArticuloSmall(nArticulo, sAutor, iPuntos) {
    var aGenerado = document.createElement("a");
    aGenerado.setAttribute("href", "postViewer.html?id=" + nArticulo.getAttribute("idArticulo"));
    aGenerado.className = "aContenedorArticuloSmall";
    aGenerado.innerHTML = `<div class="contenido">
      <img src="images/imagesArticulos/${nArticulo.getElementsByTagName("img")[0].childNodes[0].nodeValue}" alt="imagen-del-post"">
      <h3>${nArticulo.getElementsByTagName("titulo")[0].childNodes[0].nodeValue.substr(0, 30)}</h3>
      <div class="detalles">
        <p>${nArticulo.getElementsByTagName("categoria")[0].childNodes[0].nodeValue} - ${sAutor} - puntos: ${iPuntos}</p>
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

function Usuario(iId, sNombre, sCorreo, sPassword, cGenero, sImagen) {
    this.correo = sCorreo;
    this.password = sPassword;
    this.imagen = sImagen;
    this.genero = cGenero;
    Persona.call(this, iId, sNombre);

//    if(typeOf(Usuario.prototype.__iniciado) === "undefined"){
//        Usuario.prototype.
//        Usuario.prototype.__iniciado = true;
//    }
}


function Persona(iId, sNombre) {
    this.id = iId;
    this.nombre = sNombre;
}

//codigo para las imagenes 

//$(".contenedorImagen").onclick = function () {
//    $("#file").click(console.log(""));
//};



function imagen(ruta) {//codigo para enviar la imagen al servidor
    let form = $("#form");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", "imageHandler.php?ruta=" + ruta);
    xmlhttp.send(new FormData(form));
}



//MÉTODOS DEL HEADER
$("#divUsuario").onclick = function () {
    if ($("#menuUsuario").className === "oculto") {
        $("#menuUsuario").className = "";
    } else {
        $("#menuUsuario").className = "oculto";
    }
};

$("#btnCerrarSesion").onclick = function () {
    localStorage.removeItem("usuarioLogueado");
    location.reload();
};

$("#btnPerfil").onclick = function () {
    location.href = "perfil.html?id=" + localStorage.usuarioLogueado;
};

$("#btnIniciarSesion").onclick = function () {
    location.href = "login.html";
};
$("#btnRegistrarme").onclick = function () {
    location.href = "registro.html";
};

$("#submenu").onclick = function(){
    $("#submenu2").className = $("#submenu2").className=== "oculto" ? "":"oculto";
};
$("#menu").onclick = function(){
    $("header").style.left = $("header").style.left==="0px"? "-80%":"0px";
};




//Para agregar imagen y nombre de usuario en el header

window.onload = function () {
//    if (!localStorage.usuarioLogueado) {
//        location.href = "login.html";
//    } else {
        var x = location.href.split("id=")[1] || localStorage.usuarioLogueado;
        var idUsuario = parseInt(x) - 1;
        cargarXMLGenerales(idUsuario);
//    }
};

function cargarXMLGenerales(idUsuario) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            cargarDatosGenerales(this, idUsuario);
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.send();
}


function cargarDatosGenerales(xml) {
    var xmlDocUsuarios = xml.responseXML;
    var usuarios = xmlDocUsuarios.getElementsByTagName("usuario");

    var usuarioActual = usuarios[localStorage.usuarioLogueado - 1];
    $("#divUsuario img").setAttribute("src", "images/imagesPerfil/" + usuarioActual.getAttribute("imagen"));
    $("#divUsuario h4").innerHTML = usuarioActual.getElementsByTagName("nombre")[0].childNodes[0].nodeValue;

}

