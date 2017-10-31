var xmlDocUsuarios;
var idUsuario;
var usuarios;
window.onload= function () {
    if(!localStorage.usuarioLogueado){
        location.href="login.html";
    }else{
    var x=location.href.split("id=")[1]||localStorage.usuarioLogueado;
    idUsuario = parseInt(x)- 1;
    cargarXML2(idUsuario);
    cargarArticulosUsuario(idUsuario);
}
};

function cargarXML2(idUsuario) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            cargarDatos2(this, idUsuario);
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.send();
}
$("#imagenUsuario").onclick = function () {
    $("#file").click(console.log(""));
};

function cargarDatos2(xml, idUsuario) {
    xmlDocUsuarios = xml.responseXML;
    usuarios = xmlDocUsuarios.getElementsByTagName("usuario");

    var nombre = usuarios[idUsuario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
    var correo = usuarios[idUsuario].getElementsByTagName("correo")[0].childNodes[0].nodeValue;
    var genero = usuarios[idUsuario].getElementsByTagName("sexo")[0].childNodes[0].nodeValue;
    var imagen = "images/imagesPerfil/" + usuarios[idUsuario].getAttribute("imagen");

    $("#nombreUsuario").innerHTML = nombre;
    $("#correoUsuario").innerHTML = correo;
    $("#imagenUsuario").style.backgroundImage = "url(" + imagen + ")";

    if (genero === "M") {
        $("#generoUsuario").innerHTML = "Masculino";
    } else if (genero === "F") {
        $("#generoUsuario").innerHTML = "Femenino";
    }

}
function cargarArticulosUsuario(usuario) {
    var xmlHttp = new XMLHttpRequest;
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var xmlDocArticulo = xmlHttp.responseXML;
            var aArticulos = xmlDocArticulo.getElementsByTagName("articulo");
            for (var i = 0; i < aArticulos.length; i++) {
                if (usuarios[usuario].getAttribute("id") === aArticulos[i].getAttribute("idUsuario")) {
                     var sAutor = usuarios[usuario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                    $("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i], sAutor));

                }
            }
        }

    };

    xmlHttp.open("GET", "data/articulos.xml", true);
    xmlHttp.send();


}
$("#file").onchange = function (e) {
    var permitida = false;
    var x = ["image/jpg", "image/png", "image/jpeg"];
    var archivo = e.target.files;
    for (var i = 0; i < x.length; i++) {
        if (archivo[0].type === x[i]) {
            rutaImagen = archivo[0].name;

            permitida = true;
        }
    }
    if (permitida) {
        var reader = new FileReader();

        reader.onload = (function (f) {
            return function (e) {
                // Insertamos la imagen
                $("#imagenUsuario").style.backgroundImage = "url(" + e.target.result + ")";
            };
        })();

        reader.readAsDataURL(archivo[0]);
    } else {
        alert("Ingrese una imagen con formato png,jpg o jpeg");
    }

    enviarImagen_Xml();
};
function enviarImagen_Xml() {
    usuarios[idUsuario].setAttribute("imagen", rutaImagen);
    imagen("imagesPerfil");
    subirXMLUsuario();
}

function subirXMLUsuario() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPost.php", true);
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDocUsuarios);
    xmlhttp.send(xmlDocUsuarios);
}
