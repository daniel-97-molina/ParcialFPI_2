
var objetoArticulo;
var aUsuarios;
var xmlDocArticulos;
var logueado;
window.onload = function (e) {
    var articulo = location.href.split("id=")[1] - 1;
    cargarDatosArticulo(articulo);
    if (localStorage.usuarioLogueado) {
        objetoArticulo = new Articulo(articulo, localStorage.usuarioLogueado);
        cargarXMLGenerales(localStorage.usuarioLogueado);
        logueado = true;
    } else {
        logueado = false;
    }
};

function Articulo(idArticulo, idUsuario) {
    this.idArticulo = idArticulo;
    this.idUsuario = idUsuario;
    var aArticulos;
    if (typeof puntuarCreado === "undefined") {
        Articulo.prototype.puntuar = function (puntos) {
            aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
            var puntosActuales = parseInt(aArticulos[this.idArticulo].getAttribute("puntos"));
            aArticulos[this.idArticulo].setAttribute("puntos", puntosActuales + parseInt(puntos));
            $("#puntajes").innerHTML = puntosActuales + puntos;

        };
    }
    if (typeof comentar === "undefined") {
        Articulo.prototype.agregarComentario = function (texto) {
            //xml
            aArticulos = xmlDocArticulos.getElementsByTagName("articulo");

            var comentarios = aArticulos[this.idArticulo].getElementsByTagName("comentarios")[0];
            var tagNuevoComentario = xmlDocArticulos.createElement("comentario");
            tagNuevoComentario.setAttribute("idUsuario", this.idUsuario);
            var contenidoNuevoComentario = xmlDocArticulos.createTextNode(texto);
            tagNuevoComentario.appendChild(contenidoNuevoComentario);
            comentarios.appendChild(tagNuevoComentario);
            console.log(aUsuarios);
            var autorComentario = aUsuarios[this.idUsuario - 1].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            var ruta = "images/imagesPerfil/" + aUsuarios[this.idUsuario - 1].getAttribute("imagen");
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
            var aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
            var tituloArticulo = aArticulos[articulo].getElementsByTagName("titulo")[0].childNodes[0].nodeValue;
            var contenidoArticulo = aArticulos[articulo].getElementsByTagName("contenido")[0].childNodes[0].nodeValue;
            var imgArticulo = "images/imagesArticulos/" + aArticulos[articulo].getElementsByTagName("img")[0].childNodes[0].nodeValue;
            var puntos = aArticulos[articulo].getAttribute("puntos");
            var comentarios = aArticulos[articulo].getElementsByTagName("comentarios")[0].getElementsByTagName("comentario");

            var usuario = aArticulos[articulo].getAttribute("idUsuario");
            $("#tituloComentario p").innerHTML=comentarios.length+" comentarios - "+tituloArticulo;
            $("#tituloPost").innerHTML = tituloArticulo;
            $("#contenidoArticulo").innerHTML = contenidoArticulo;
            $("#contenedorImagen > img").setAttribute("src", imgArticulo);
            $("#puntajes").innerHTML = puntos;


            cargarDatosUsuario(aArticulos, articulo, usuario,comentarios);
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.send();
}
function cargarDatosUsuario(aArticulos, articulo, usuario,comentarios) {
    
    var categoria = aArticulos[articulo].getElementsByTagName("categoria")[0].childNodes[0].nodeValue;
    var puntosUsuario = 0;
    var articulosUsuario = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var xmlDocUsuarios = xmlhttp.responseXML;
            aUsuarios = xmlDocUsuarios.getElementsByTagName("usuario");
            var rutaImgUsuario = "images/imagesPerfil/" + aUsuarios[usuario-1].getAttribute("imagen");
            var nombreUsuario = aUsuarios[usuario-1].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            var correoUsuario = aUsuarios[usuario-1].getElementsByTagName("correo")[0].childNodes[0].nodeValue;
            $(".imagen-infoUsuario > img").setAttribute("src", rutaImgUsuario);
            $(".userName > #nombre").innerHTML = nombreUsuario;
            $("div > #correo").innerHTML = correoUsuario;
            for (var i = 0; i < aArticulos.length; i++) {
                if (aArticulos[i].getAttribute("idUsuario") === usuario) {
                    articulosUsuario++;
                    puntosUsuario += parseInt(aArticulos[i].getAttribute("puntos"));
                }
                  if(aArticulos[i].getAttribute("idArticulo")==articulo+1){continue;}
                if (aArticulos[i].getElementsByTagName("categoria")[0].childNodes[0].nodeValue === categoria) {
                  
                        var sAutor=aUsuarios[aArticulos[i].getAttribute("idUsuario")-1].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                        var iPuntos=aArticulos[i].getAttribute("puntos");
                        $("#contenedorSmall").appendChild(generarDivArticuloSmall(aArticulos[i], sAutor, iPuntos));
                }
            }
            
            $("#nPost").innerHTML = articulosUsuario;
            $("#nPuntos").innerHTML = puntosUsuario;
            for (var j = 0; j < comentarios.length; j++) {

                var usuarioDelComentario = comentarios[j].getAttribute("idUsuario") - 1;
                var ruta = "images/imagesPerfil/" + aUsuarios[usuarioDelComentario].getAttribute("imagen");
                var nombreUsuario = aUsuarios[usuarioDelComentario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                var textoComentario = comentarios[j].childNodes[0].nodeValue;
                crearDivArticulo(ruta, nombreUsuario, textoComentario);


            }
        }

    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.send();
}

function  procesar(puntos, comentar) {
    if (logueado) {
        if (comentar) {

            objetoArticulo.agregarComentario(comentar);

        } else {
            objetoArticulo.puntuar(puntos);
        }
        subirXMLArticulos();

        $("#ul").style.display = "none";
        $("#puntajeBox label").className += " transition";
    } else {

        $("#contenedorModal").className = "hacerVisible";

    }
}
$("#cerrarModal").onclick = function () {
    $("#contenedorModal").className = "ocultar";
};
$("#loginModal").onclick = function () {
    location.href = "login.html";
};
function subirXMLArticulos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPostArticulo.php", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
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
    var msj = $(".areaComentar").value;
    procesar(0, msj);

};

