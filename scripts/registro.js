var formulario = $("#formRegistro");
var xmlDoc;

formulario.btnRegistrarme.onclick = function(){validar();};

function validar(){

  validarInput(formulario.txtRegistroUsuario, "Ingrese un nombre de usuario");
  validarInput(formulario.txtRegistroCorreo, "Ingrese su correo");
  validarInput(formulario.txtRegistroPassword, "Ingrese una contraseña");
  if(formulario.txtRegistroCorreo.validity.typeMismatch){
    formulario.txtRegistroCorreo.setCustomValidity("Ingrese un correo válido - ejemplo@ejemplo.com");
  }
  if(formulario.txtRegistroUsuario.validity.patternMismatch){
    formulario.txtRegistroUsuario.setCustomValidity("Ingrese un nombre válido con valores alfanuméricos y los símbolos: -_");
  }
}

formulario.onsubmit = function(){
    procesarInfo();
};

function procesarInfo() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
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
  var sNombre = xmlDoc.createTextNode($("#txtRegistroUsuario").value);
  var sCorreo = xmlDoc.createTextNode($("#txtRegistroCorreo").value);
  var sPassword = xmlDoc.createTextNode($("#txtRegistroPassword").value);
  var sSexo = xmlDoc.createTextNode($("#radioMasculino").checked ? "M" : "F");

  var nNombre = xmlDoc.createElement("nombre");
  var nCorreo = xmlDoc.createElement("correo");
  var nPassword = xmlDoc.createElement("password");
  var nSexo = xmlDoc.createElement("sexo");

  nNombre.appendChild(sNombre);
  nCorreo.appendChild(sCorreo);
  nPassword.appendChild(sPassword);
  nSexo.appendChild(sSexo);

  nUsuario = xmlDoc.createElement("usuario");
  nUsuario.appendChild(nNombre);
  nUsuario.appendChild(nCorreo);
  nUsuario.appendChild(nPassword);
  nUsuario.appendChild(nSexo);
  console.log(nUsuario);
  usuarios = xmlDoc.getElementsByTagName("usuarios");
  usuarios[0].appendChild(nUsuario);
  subirXML();
}
