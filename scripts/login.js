if (localStorage.usuarioLogueado) {
    location.href = "inicio.html";
}

var formulario = $("#formulario");

formulario.btnIniciar.onclick = function () {
    validar();
    cargarXML3();

};

formulario.oninput = function () {
    validar();
};

function validar() {
    validarInput(formulario.txtUsuario, "Ingrese su usuario o correo");
    validarInput(formulario.txtPassword, "Ingrese su contraseña");
}



//Para validar que el usuario exista

function cargarXML3() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cargarDatos3(this);
        }
    };
    xmlhttp.open("GET", "data/usuarios.xml", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
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
                localStorage.usuarioLogueado = usuarios[i].getAttribute("id");
            }
        }
    }

    if (!$("#txtUsuario").value == "" && !$("#txtPassword").value == "") {
        if (existeUsuario === true) {
            if (passwordCorrecta === true) {

                location.href = "inicio.html";
                
                

            } else if (passwordCorrecta === false) {
                $("#parrafoErrores").innerHTML = "La contraseña es incorrecta";
                $("#parrafoErrores").style.display = "block";
                $(".divImage").style.width = "105px";
                $(".divImage").style.height = "105px";
            }
        } else if (existeUsuario === false) {
            $("#parrafoErrores").innerHTML = "El usuario no esta registrado";
            $("#parrafoErrores").style.display = "block";
            $(".divImage").style.width = "105px";
            $(".divImage").style.height = "105px";

        }

    }


}