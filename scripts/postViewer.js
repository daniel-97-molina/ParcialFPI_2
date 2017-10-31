var xmlDoc;
var articulo;

function Articulo(idArticulo, idUsuario) {
    this.idArticulo = 2;
    this.idUsuario = 1;
    var articulos = xmlDoc.getElementsByTagName("articulo");
    if (typeof puntuarCreado === "undefined") {
        Articulo.prototype.puntuar = function (puntos) {

            var acumuladorPuntos = articulos[this.idArticulo - 1].getAttribute("puntos"); //Irvin

            articulos[this.idArticulo - 1].setAttribute("puntos", (acumuladorPuntos + puntos));
            $("#puntajes").innerHTML = acumuladorPuntos + puntos;
        };
    }
    if (typeof comentar === "undefined") {
        Articulo.prototype.agregarComentario = function (texto) {
            //xml

            var comentarios = articulos[this.idArticulo - 1].getElementsByTagName("comentarios")[0];
            var tagNuevoComentario = xmlDoc.createElement("comentario");
            tagNuevoComentario.setAttribute("idUsuario", this.idUsuario);
            var contenidoNuevoComentario = xmlDoc.createTextNode(texto);
            tagNuevoComentario.appendChild(contenidoNuevoComentario);
            comentarios.appendChild(tagNuevoComentario);
            console.log(comentarios);

            var comentario = document.createElement("div");
            comentario.className = "comentario transition";
            comentario.innerHTML = `
                                    <div class="imagen">

                                        <img src="images/icon_login.jpg" alt="foto">

                                    </div>
                                    <div class="contenidoComentario">
                                        <div class="autor">` + idUsuario + `</div>
                                        <div class="mensaje">` + texto + `</div>
                                    </div>
                                `;
            $("#contenidoComentarios").appendChild(comentario);
        };
    }
    this.puntuarCreado = true;
    this.comentar = true;
}
function cargarXml() {

}

function  procesar(puntos, comentar) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            xmlDoc = xmlhttp.responseXML;
            articulo = new Articulo();

            if (comentar) {

                articulo.agregarComentario(comentar);

            } else {
                articulo.puntuar(puntos);
            }
            subirXMLArticulos();

        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.send();
    $("#ul").style.display = "none";
    $("#puntajeBox label").className += " transition";
}


function subirXMLArticulos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPostArticulo.php", true);
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDoc);
    xmlhttp.send(xmlDoc);

}
$(".btnComentar").onclick = function () {
    var msj = $(".areaComentar").value;
    procesar(0, msj);
};




//Para lo de los posts relevantes
