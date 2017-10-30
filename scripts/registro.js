if(localStorage.usuarioLogueado){
    location.href = "inicio.html";
}

var formulario = $("#formRegistro");
var xmlDoc;
var usuarioActual;

formulario.btnRegistrarme.onclick = function () {
    validar();
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

formulario.onsubmit = function (event) {
    event.preventDefault();
    procesarInfo();
    location.href = "inicio.html";
};

function procesarInfo() {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      procesar(this);
    }
  };
  xmlhttp.open("GET", "data/usuarios.xml", true);
  xmlhttp.send();

//  xmlhttp.upload.onload = function(){
//        agregarUsuario();
//  };
}

function procesar(xml) {
    xmlDoc = xml.responseXML;
    console.log("cargarXML:");
    console.log(xmlDoc);
    agregarUsuario();
    
}

function subirXML() {
    var xmlh = new XMLHttpRequest();
    xmlh.open("POST", "procesarPost.php", true);
    xmlh.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDoc);
    xmlh.send(xmlDoc);
    
    
}

function agregarUsuario() {
    usuarios = xmlDoc.getElementsByTagName("usuarios");
    usuarios[0].setAttribute("ultimo",parseInt(usuarios[0].getAttribute("ultimo"))+1);
    
    usuarioActual = new Usuario(usuarios[0].getAttribute("ultimo"), $("#txtRegistroUsuario").value, $("#txtRegistroCorreo").value, $("#txtRegistroPassword").value,($("#radioMasculino").checked ? "M" : "F"));
    
    
    
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
    nUsuario.setAttribute("id", "8888");
    nUsuario.setAttribute("imagen", "nadaaaa");
    nUsuario.appendChild(nNombre);
    nUsuario.appendChild(nCorreo);
    nUsuario.appendChild(nPassword);
    nUsuario.appendChild(nSexo);
    console.log(nUsuario);

    usuarios[0].appendChild(nUsuario);
    subirXML();
}
