var xmlDocArticulos;

var categoriaActual = location.href.split("cat=")[1];
if(typeof(categoriaActual)==="undefined"){
    categoriaActual = "Arte";
}

$("#tituloCat").innerHTML += categoriaActual.toUpperCase();

window.onload = function(){
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xmlDocArticulos = xmlhttp.responseXML;
            aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
            var bExisten = false;
            for (var i = (aArticulos.length -1) ; i >= 0 ; i--) {
                if(aArticulos[i].getElementsByTagName("categoria")[0].childNodes[0].nodeValue === categoriaActual){
                    $("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i]));
                    bExisten = true;
                }
                //LIMITE DE POST A MOSTRAR?????????????????????????????????????????????????????????????????????????????
            }
            if(!bExisten){
                $("#layout-izquierda").appendChild(document.createTextNode("No se encontraron publicaciones"));
            }
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.send();
  
};