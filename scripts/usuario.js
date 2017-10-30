var xmlDoc;
window.onload = function () {
    cargarXML2(parseInt(location.href.split("id=")[1]) - 1);
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

function cargarDatos2(xml, idUsuario, imagen) {
    xmlDoc = xml.responseXML;
    var usuarios = [];
    usuarios = xmlDoc.getElementsByTagName("usuario");
    if (imagen) {




    }


    var nombre = usuarios[idUsuario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
    var correo = usuarios[idUsuario].getElementsByTagName("correo")[0].childNodes[0].nodeValue;
    var genero = usuarios[idUsuario].getElementsByTagName("sexo")[0].childNodes[0].nodeValue;

    document.getElementById("nombreUsuario").innerHTML = nombre;
    document.getElementById("correoUsuario").innerHTML = correo;
    document.getElementById("generoUsuario").innerHTML = genero;

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
                $(".contenedorImagen").style.backgroundImage = "url(" + e.target.result + ")";
            };
        })();

        reader.readAsDataURL(archivo[0]);
    } else {
        alert("Ingrese una imagen con formato png,jpg o jpeg");
    }

};

function subirXMLArticulos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPost.php", true);
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDoc);
    xmlhttp.send(xmlDoc);
}
