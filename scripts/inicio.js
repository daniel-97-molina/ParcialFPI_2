var usuarioActual;
var xmlDocUsuarios;
var xmlDocArticulos;
if (!localStorage.usuarioLogueado) {
    $("#divUsuario").className = "oculto";
    $("#divBotonesLogin").className = "";
}

window.onload = function () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xmlDocUsuarios = xmlhttp.responseXML;
            if (localStorage.usuarioLogueado) {
                usuarioActual = xmlDocUsuarios.getElementsByTagName("usuario")[localStorage.usuarioLogueado - 1];
                $("#divUsuario img").setAttribute("src", "images/imagesPerfil/" + usuarioActual.getAttribute("imagen"));
                $("#divUsuario h4").innerHTML = usuarioActual.getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            }
            cargarArticulos();
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.send();

};

function cargarArticulos() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xmlDocArticulos = xmlhttp.responseXML;
            var aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
            var aUsuarios = xmlDocUsuarios.getElementsByTagName("usuario");

            //Para lo de los posts relevantes
            var aArticulosOrdenado = Array.from(aArticulos);
            
            aArticulosOrdenado.sort(function (a, b) {
                return b.getAttribute("puntos") - a.getAttribute("puntos");
            });
            
            var bEncontrados = false;
            for (var i = aArticulos.length - 1; i >= 0; i--) {
                if(aArticulos.length-i > 15){break;}
                var sAutor = "No encontrado";
                var iPuntos = aArticulos[i].getAttribute("puntos");

                for (var j = 0; j < aUsuarios.length; j++) {
                    if (aUsuarios[j].getAttribute("id") === aArticulos[i].getAttribute("idUsuario")) {
                        sAutor = "Autor: " + aUsuarios[j].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                        break;
                    }
                }
                $("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i], sAutor, iPuntos));
                bEncontrados = true;
//                $("#contenedorDerecha").appendChild(generarDivArticuloSmall(aArticulos[i], sAutor));
            }
            if(!bEncontrados){
                var nt = document.createTextNode("No se encontraron publicaciones");
                var np = document.createElement("p");
                np.appendChild(nt);
                np.className = "noEncontrado";
                $("#layout-izquierda").appendChild(np);
            }


            for (var i =0; i < aArticulosOrdenado.length; i++) {
                if(i > 7){break;}
                var sAutor = "No encontrado";
                var iPuntos = aArticulosOrdenado[i].getAttribute("puntos");
                for (var j = 0; j < aArticulosOrdenado.length; j++) {
                    if (aUsuarios[j].getAttribute("id") === aArticulosOrdenado[i].getAttribute("idUsuario")) {
                        sAutor = "Autor: " + aUsuarios[j].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                        break;
                    }
                }

                    //$("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i],sAutor));
                    $("#contenedorDerecha").appendChild(generarDivArticuloSmall(aArticulosOrdenado[i],sAutor, iPuntos));                    
            }
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.send();

}


$("#btnCrearPublicacion").onclick = function () {
    if (localStorage.usuarioLogueado) {
        location.href = "postManager.html";
    } else {
        location.href = "login.html";
    }
};

