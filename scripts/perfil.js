var xmlDocUsuarios;
var idUsuario;
var usuarios;
window.onload = function () {
    if (!localStorage.usuarioLogueado) {
        location.href = "login.html";
    } else {
        var x = location.href.split("id=")[1] || localStorage.usuarioLogueado;
        idUsuario = parseInt(x) - 1;
        cargarXML2(idUsuario);
        cargarArticulosUsuario(idUsuario);
    }
};

function cargarXML2(idUsuario) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            cargarDatos2(this, idUsuario);
//            cargarArticulos();
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.send();
}
$("#imagenUsuario").onclick = function () {
    $("#file").click(console.log(""));
};

function cargarDatos2(xml, idUsuario) {
    xmlDocUsuarios = xml.responseXML;
    usuarios = xmlDocUsuarios.getElementsByTagName("usuario");

    var usuarioActual = usuarios[localStorage.usuarioLogueado - 1];
    $("#divUsuario img").setAttribute("src", "images/imagesPerfil/" + usuarioActual.getAttribute("imagen"));
    $("#divUsuario h4").innerHTML = usuarioActual.getElementsByTagName("nombre")[0].childNodes[0].nodeValue;

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

//function cargarArticulosUsuario(usuario) {
//    var xmlHttp = new XMLHttpRequest;
//    xmlHttp.onreadystatechange = function () {
//        if (this.readyState === 4 && this.status === 200) {
//            var xmlDocArticulo = xmlHttp.responseXML;
//            
//            var aArticulos = xmlDocArticulo.getElementsByTagName("articulo");
//            
//            for (var i = 0; i < aArticulos.length; i++) {
//                if (usuarios[usuario].getAttribute("id") === aArticulos[i].getAttribute("idUsuario")) {
//                    var sAutor = usuarios[usuario].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
//                    $("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i], sAutor));
//
//                }
//            }
//        }
//
//    };
//
//    xmlHttp.open("GET", "data/articulos.xml", true);
//    xmlHttp.send();
//
//}

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
    location.reload();    
}

function subirXMLUsuario() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPost.php", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDocUsuarios);
    xmlhttp.send(xmlDocUsuarios);
}


//Para lo de los relevantes
function cargarArticulosUsuario(usuario) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var xmlDocArticulos = xmlhttp.responseXML;
            var aArticulos = xmlDocArticulos.getElementsByTagName("articulo");
            var aUsuarios = xmlDocUsuarios.getElementsByTagName("usuario");
            var iNumeroArticulos = 0;
            var iPuntosPerfil = 0;
            //Para lo de los posts relevantes
            var aArticulosOrdenado = Array.from(aArticulos);
            aArticulosOrdenado.sort(function (a, b) {
                return b.getAttribute("puntos") - a.getAttribute("puntos");
            });

            //Agregar divs de categoría
            var bEncontrados = false;
            for (var i = 0; i < aArticulos.length; i++) {
                if (aArticulos[i].getAttribute("idUsuario") == usuario+1) {
                    iNumeroArticulos++;
                    iPuntosPerfil += parseInt(aArticulos[i].getAttribute("puntos"));
                }
            }
            for (var i = aArticulos.length - 1; i >= 0; i--) {

                if (aArticulos.length - i > 15) {
                    break;
                }
                var sAutor = "No encontrado";
                var iPuntos = aArticulos[i].getAttribute("puntos");
                for (var j = 0; j < aUsuarios.length; j++) {
                    if (aUsuarios[j].getAttribute("id") === aArticulos[i].getAttribute("idUsuario")) {
                        sAutor = aUsuarios[j].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                        break;
                    }
                }
                if (aUsuarios[usuario].getAttribute("id") === aArticulos[i].getAttribute("idUsuario")) {
                    bEncontrados = true;
                    $("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i], sAutor, iPuntos));
                }
//                $("#contenedorDerecha").appendChild(generarDivArticuloSmall(aArticulos[i], sAutor));


            }

            $(".ubicarPuntosPosts #puntos").innerHTML = iPuntosPerfil;
            $(".ubicarPuntosPosts #posts").innerHTML = iNumeroArticulos;
            if (!bEncontrados) {
                var nt = document.createTextNode("No se encontraron publicaciones");
                var np = document.createElement("p");
                np.appendChild(nt);
                np.className = "noEncontrado";
                $("#divEntradasUsuario").appendChild(np);
            }

            //Agregar divs de mas destacados
            var iContador = 0;
            for (var i = 0; i < aArticulosOrdenado.length; i++) {
                var sAutor = "No encontrado";
                var iPuntos = aArticulosOrdenado[i].getAttribute("puntos");

                for (var j = 0; j < aArticulosOrdenado.length; j++) {
                    if (aUsuarios[j].getAttribute("id") === aArticulosOrdenado[i].getAttribute("idUsuario")) {
                        sAutor = aUsuarios[j].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
                        break;
                    }
                }
                //$("#layout-izquierda").appendChild(generarDivArticuloBig(aArticulos[i],sAutor));
                if (usuarios[usuario].getAttribute("id") === aArticulosOrdenado[i].getAttribute("idUsuario")) {
                    iContador++;
                    $("#layout-derecha").appendChild(generarDivArticuloSmall(aArticulosOrdenado[i], sAutor, iPuntos));
                    if (iContador >= 7) {
                        break;
                    }
                }
            }
        }
    };

    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.send();
}

