
var objetoArticulo;
var aUsuario;
var xmlDocArticulos;
var logueado;
window.onload = function (e) {
    var articulo = location.href.split("id=")[1] - 1;
    cargarDatosArticulo(articulo);
    if(localStorage.usuarioLogueado){
        objetoArticulo=new Articulo(articulo,localStorage.usuarioLogueado);
        logueado=true;
    }else{
        logueado=false;
    }
};

function Articulo(idArticulo, idUsuario) {
    this.idArticulo = idArticulo;
    this.idUsuario = idUsuario;
    var aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
    if (typeof puntuarCreado === "undefined") {
        Articulo.prototype.puntuar = function (puntos) {
            var puntosActuales=aArticulos[this.idArticulo].getAttribute("puntos");
            aArticulos[this.idArticulo].setAttribute("puntos", puntosActuales+puntos);
            $("#puntajes").innerHTML = puntosActuales+puntos;

        };
    }
    if (typeof comentar === "undefined") {
        Articulo.prototype.agregarComentario = function (texto) {
            //xml

            var comentarios = aArticulos[this.idArticulo].getElementsByTagName("comentarios")[0];
            var tagNuevoComentario = xmlDocArticulos.createElement("comentario");
            tagNuevoComentario.setAttribute("idUsuario", this.idUsuario);
            var contenidoNuevoComentario = xmlDocArticulos.createTextNode(texto);
            tagNuevoComentario.appendChild(contenidoNuevoComentario);
            comentarios.appendChild(tagNuevoComentario);
            console.log(comentarios);
            var autorComentario = aUsuarios[this.idUsuario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            var ruta = "images/imagesPerfil/" + aUsuarios[this.idUsuario].getAttribute("imagen");
            crearDivArticulo(ruta, autorComentario, texto);

        };
    }
    this.puntuarCreado = true;
    this.comentar = true;
}
function cargarDatosArticulo(articulo) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xmlDocArticulos = xmlhttp.responseXML;
            
            usuarioActual = xmlDocUsuarios.getElementsByTagName("usuario")[localStorage.usuarioLogueado - 1];
            $("#divUsuario img").setAttribute("src", "images/imagesPerfil/" + usuarioActual.getAttribute("imagen"));
            $("#divUsuario h4").innerHTML = usuarioActual.getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            
            
            var aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
            //
//                if (aArticulos[articulo].getAttribute("idArticulo") === articulo) {
            var tituloArticulo = aArticulos[articulo].getElementsByTagName("titulo")[0].childNodes[0].nodeValue;
            var contenidoArticulo = aArticulos[articulo].getElementsByTagName("contenido")[0].childNodes[0].nodeValue;
            var imgArticulo ="images/imagesArticulos/"+aArticulos[articulo].getElementsByTagName("img")[0].childNodes[0].nodeValue;

            var aComentarios = aArticulos[articulo].getElementsByTagName("comentarios")[0].getElementsByTagName("comentario");
            $("#tituloPost").innerHTML = tituloArticulo;
            $("#contenidoArticulo").innerHTML = contenidoArticulo;
            $("#contenedorImagen > img").setAttribute("src",imgArticulo);


            cargarDatosUsuario(aComentarios);
//                }
            //}
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.send();
}
function cargarDatosUsuario(comentarios) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var xmlDocUsuarios = xmlhttp.responseXML;
            aUsuarios = xmlDocUsuarios.getElementsByTagName("usuario");
//            for (var i = 0; i < aUsuarios.length; i++) {
         
            for (var j = 0; j < comentarios.length; j++) {
                var usuarioDelComentario = comentarios[j].getAttribute("idUsuario");
                var ruta = "images/imagesPerfil/" + aUsuarios[usuarioDelComentario].getAttribute("imagen");
                var nombreUsuario = aUsuarios[usuarioDelComentario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                var textoComentario = comentarios[j].childNodes[0].nodeValue;
                crearDivArticulo(ruta, nombreUsuario, textoComentario);
//                }

            }
        }
        
    };
      xmlhttp.open("GET", "data/usuarios.xml", true);
        xmlhttp.send();
}

function  procesar(puntos, comentar) {

    if (comentar) {

        objetoArticulo.agregarComentario(comentar);

    } else {
        objetoArticulo.puntuar(puntos);
    }
    subirXMLArticulos();

    $("#ul").style.display = "none";
    $("#puntajeBox label").className += " transition";
}


function subirXMLArticulos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPostArticulo.php", true);
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDocArticulos);
    xmlhttp.send(xmlDocArticulos);

}
function crearDivArticulo(rutaImagen, autor, texto) {
    var comentario = document.createElement("div");
    comentario.className = "comentario transition";
    comentario.innerHTML = `
                                    <div class="imagen">

                                        <img src="${rutaImagen}" alt="foto">

                                    </div>
                                    <div class="contenidoComentario">
                                        <div class="autor">${autor}</div>
                                        <div class="mensaje">${texto}</div>
                                    </div>
                                `;
    $("#contenidoComentarios").appendChild(comentario);
}
$(".btnComentar").onclick = function () {
    if(logueado){
    var msj = $(".areaComentar").value;
    procesar(0, msj);
    }else{
        
    }
};




//Para lo de los posts relevantes
