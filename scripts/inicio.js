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
            aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
            aUsuarios = xmlDocUsuarios.getElementsByTagName("usuario");

            for (var i = aArticulos.length - 1; i >= 0; i--) {
                var sAutor = "nadie";

                for (var j = 0; j < aUsuarios.length; j++) {

                    console.log(aUsuarios[j]);
                    if (aUsuarios[j].getAttribute("id") === aArticulos[i].getAttribute("idUsuario")) {

                        sAutor = "Autor: " + aUsuarios[j].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                        break;
                    }
                }
                $("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i], sAutor));
                $("#contenedorDerecha").appendChild(generarDivArticuloSmall(aArticulos[i], sAutor));
            }
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.send();


//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#contenedorDerecha").appendChild(generarDivArticuloSmall());
//    $("#contenedorDerecha").appendChild(generarDivArticuloSmall());
//    $("#contenedorDerecha").appendChild(generarDivArticuloSmall());

}


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
    location.href = "perfil2.html?id=" + localStorage.usuarioLogueado;
};

$("#btnIniciarSesion").onclick = function () {
    location.href = "login.html";
};
$("#btnRegistrarme").onclick = function () {
    location.href = "registro.html";
};

$("#btnCrearPublicacion").onclick = function () {
    if (localStorage.usuarioLogueado) {
        location.href = "postManager.html";
    } else {
        location.href = "login.html";
    }
};