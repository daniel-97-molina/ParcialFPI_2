if (localStorage.usuarioLogueado) {
    location.href = "inicio.html";
}

var formulario = $("#formRegistro");
var xmlDoc;
var usuarioActual;

formulario.btnRegistrarme.onclick = function () {
    validar();
    procesarInfo();
};

function validar() {

    validarInput(formulario.txtRegistroUsuario, "Ingrese un nombre de usuario");
    validarInput(formulario.txtRegistroCorreo, "Ingrese su correo");
    validarInput(formulario.txtRegistroPassword, "Ingrese una contraseña");
    if (formulario.txtRegistroCorreo.validity.typeMismatch) {
        formulario.txtRegistroCorreo.setCustomValidity("Ingrese un correo válido - ejemplo@ejemplo.com");
    }
    if (formulario.txtRegistroUsuario.validity.patternMismatch) {
        formulario.txtRegistroUsuario.setCustomValidity("Ingrese un nombre válido con valores alfanuméricos y los símbolos: -_");
    }
}

//formulario.onsubmit = function (event) {//le borre event
////    event.preventDefault();
//    procesarInfo();
////    location.href = "inicio.html";
//};


function procesarInfo() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            procesar(this);
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.send();

//  xmlhttp.upload.onload = function(){
//        agregarUsuario();
//  };
}

function procesar(xml) {
    xmlDoc = xml.responseXML;
//    console.log("cargarXML:");
//    console.log(xmlDoc);
    agregarUsuario();

}

function subirXML() {
    var xmlh = new XMLHttpRequest();
    xmlh.open("POST", "procesarPost.php", true);
    xmlh.setRequestHeader('Cache-Control', 'no-cache');
    xmlh.setRequestHeader("Content-Type", "text/xml");
//    console.log(xmlDoc);
        
    xmlh.send(xmlDoc);
    location.href = "inicio.html";

}

function agregarUsuario() {

    //Irvin
    var resultado = usuariosExistentes(xmlDoc.getElementsByTagName("usuario"));
    if (resultado == true) {

        var usuarios = xmlDoc.getElementsByTagName("usuarios");

        usuarios[0].setAttribute("ultimo", parseInt(usuarios[0].getAttribute("ultimo")) + 1);

        usuarioActual = new Usuario(usuarios[0].getAttribute("ultimo"), $("#txtRegistroUsuario").value, $("#txtRegistroCorreo").value, $("#txtRegistroPassword").value, ($("#radioMasculino").checked ? "M" : "F"));


        window.localStorage.usuarioLogueado = usuarioActual.id;

        var sNombre = xmlDoc.createTextNode(usuarioActual.nombre);
        var sCorreo = xmlDoc.createTextNode(usuarioActual.correo);
        var sPassword = xmlDoc.createTextNode(usuarioActual.password);
        var cGenero = xmlDoc.createTextNode(usuarioActual.genero);

        var nNombre = xmlDoc.createElement("nombre");
        var nCorreo = xmlDoc.createElement("correo");
        var nPassword = xmlDoc.createElement("password");
        var nSexo = xmlDoc.createElement("sexo");

        nNombre.appendChild(sNombre);
        nCorreo.appendChild(sCorreo);
        nPassword.appendChild(sPassword);
        nSexo.appendChild(cGenero);

        nUsuario = xmlDoc.createElement("usuario");
        nUsuario.setAttribute("id", usuarioActual.id);
        nUsuario.setAttribute("imagen", "default.jpg");
        nUsuario.appendChild(nNombre);
        nUsuario.appendChild(nCorreo);
        nUsuario.appendChild(nPassword);
        nUsuario.appendChild(nSexo);
//        console.log(nUsuario);

        usuarios[0].appendChild(nUsuario);
        subirXML();
    } else {
        event.preventDefault();
    }

}

//Irvin
function usuariosExistentes(usuarios) {
    var existeUsuario = false;
    var existeCorreo = false;
    var siguientePaso = false;

    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue == $("#txtRegistroUsuario").value) {
            existeUsuario = true;
        }
        if (usuarios[i].getElementsByTagName("correo")[0].childNodes[0].nodeValue == $("#txtRegistroCorreo").value) {
            existeCorreo = true;
        }
    }

    if (!$("#txtRegistroUsuario").value == "" && !$("#txtRegistroCorreo").value == "" && !$("#txtRegistroPassword").value == "") {
        if (existeUsuario === false && existeCorreo === false) {

            siguientePaso = true;

        } else if (existeCorreo === true && existeUsuario === true) {
            $("#parrafoError").innerHTML = "El nombre y el correo ya existen";
            $("#parrafoError").style.display = "block";

        } else if (existeUsuario === false && existeCorreo === true) {
            $("#parrafoError").innerHTML = "Este correo ya fue registrado";
            $("#parrafoError").style.display = "block";

        } else if (existeUsuario === true && existeCorreo === false) {
            $("#parrafoError").innerHTML = "Nombre de usuario no disponible";
            $("#parrafoError").style.display = "block";
        }
    }

    return siguientePaso;

}