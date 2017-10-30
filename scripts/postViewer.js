var xmlDoc;
var articulo;
function Articulo(idArticulo, idUsuario) {
    this.idArticulo = 2;
    this.idUsuario = 1;
     var articulos = xmlDoc.getElementsByTagName("articulo");
    if (typeof puntuarCreado=== "undefined") {
        Articulo.prototype.puntuar = function (puntos) {
           
          articulos[this.idArticulo-1].setAttribute("puntos",puntos);
            $("#puntajes").innerHTML=puntos;
          };
    }
    if(typeof comentar=== "undefined"){
        Articulo.prototype.agregarComentario= function (texto) {
            //xml
            var comentarios=articulos[this.idArticulo-1].getElementsByTagName("comentarios")[0];
            var tagNuevoComentario=xmlDoc.createElement("comentario");
            tagNuevoComentario.setAttribute("idUsuario",this.idUsuario);
            var contenidoNuevoComentario=xmlDoc.createTextNode(texto);
            tagNuevoComentario.appendChild(contenidoNuevoComentario);
            comentarios.appendChild(tagNuevoComentario);
            //html
            var textoComentario = document.createTextNode(texto);
        var nodo = document.createElement("p");
        nodo.appendChild(texto);
        add(sNombre, iDinero);
        $("#divContenedorPantallaInicial").appendChild(nodo);
        $("#txtDinero").className = "bordeNormal";
        $("#txtDinero").className = "bordeNormal";
            console.log(a);
        };
    }
    this.puntuarCreado=true;
    this.comentar=true;
}
    
   function  procesar(puntos) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xmlDoc = xmlhttp.responseXML;
            console.log(xmlDoc);
            articulo=new Articulo();
            articulo.puntuar(puntos);
            subirXMLArticulos();
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.send();
    $("#ul").style.display="none";
    $("#puntajeBox label").className="transition";
}


function subirXMLArticulos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPostArticulo.php", true);
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDoc);
    xmlhttp.send(xmlDoc);

}
$(".btnComentar").onclick=function () {
    var msj=$(".areaComentar").value;
    
    articulo.agregarComentario(msj);
};

