window.onload = function () {
    cargarXML2(parseInt(location.href.split("id=")[1]) - 1);
};

function cargarXML2(idUsuario) {
D
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cargarDatos2(this, idUsuario);
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.send();
}

function cargarDatos2(xml, idUsuario) {
    var xmlDoc = xml.responseXML;

    var usuarios = [];
    usuarios = xmlDoc.getElementsByTagName("usuario");

    var nombre = usuarios[idUsuario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
    var correo = usuarios[idUsuario].getElementsByTagName("correo")[0].childNodes[0].nodeValue;
    var genero = usuarios[idUsuario].getElementsByTagName("sexo")[0].childNodes[0].nodeValue;

    $("#nombreUsuario").innerHTML = nombre;
    $("#correoUsuario").innerHTML = correo;


    if (genero == "M") {
        $("#generoUsuario").innerHTML = "Masculino";
    } else if (genero == "F") {
        $("#generoUsuario").innerHTML = "Femenino";
    }

}

