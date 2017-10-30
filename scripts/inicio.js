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
            console.log("xmlDocUsuarios");
            console.log(xmlDocUsuarios);
            if (localStorage.usuarioLogueado) {
                usuarioActual = xmlDocUsuarios.getElementsByTagName("usuario")[localStorage.usuarioLogueado];
                $("#divUsuario img").setAttribute("src", usuarioActual.getElementsByTagName("img")[0].childNodes[0].nodeValue);
                
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
            xmlDocUsuarios = xmlhttp.responseXML;
            console.log(xmlDocUsuarios);

            $("#divUsuario img").setAttribute("src", "images/imagesArticulos/");
            cargarArticulos();
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.send();

//    
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#layout-izquierda").appendChild(generarDivArticuloBig());
//    $("#contenedorDerecha").appendChild(generarDivArticuloSmall());
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