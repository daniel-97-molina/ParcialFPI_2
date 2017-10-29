var formulario = $("#formulario");


formulario.btnIniciar.onclick = function () {
    validar();
    cargarXML3();
};

formulario.oninput = function (event) {
//    event.preventDefault();
     validarInput(formulario.txtUsuario, "Ingrese su usuario o correo");
    validarInput(formulario.txtPassword, "Ingrese su contraseña");
//    event.preventDefault();
};



//Para validar que el usuario exista


function cargarXML3() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cargarDatos3(this);
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.send();
}


function cargarDatos3(xml) {
    var existeUsuario = false;
    var passwordCorrecta = false;

    var xmlDoc = xml.responseXML;

    var usuarios = [];
    usuarios = xmlDoc.getElementsByTagName("usuario");

    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i].getElementsByTagName("correo")[0].childNodes[0].nodeValue == $("#txtUsuario").value) {
            existeUsuario = true;
            if (usuarios[i].getElementsByTagName("password")[0].childNodes[0].nodeValue == $("#txtPassword").value) {
                passwordCorrecta = true;
            }
        }
    }

    if (existeUsuario === true) {
        console.log("El usuario esta registrado");
    } else if (existeUsuario === false) {
        console.log("El usuario no esta registrado");
    }

    if (passwordCorrecta === true) {
        console.log("La contrasenia es correcta");
    } else if (passwordCorrecta === false) {
        console.log("La contrasenia no es correcta");
    }



}

