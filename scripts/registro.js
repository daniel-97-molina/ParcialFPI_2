var formulario = $("#formRegistro");

formulario.btnRegistrarme.onclick = function(){validar();};
var xmlDoc;
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

function cargarXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      procesar(this);
    }
  };
  xmlhttp.open("GET", "data/usuarios.xml", true);
  xmlhttp.send();
}

function procesar(xml) {
  var x, i, txt;
  xmlDoc = xml.responseXML;
  console.log("cargarXML:");
  console.log(xmlDoc);
}

function subirXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "procesarPost.php", true);
  xmlhttp.setRequestHeader("Content-Type", "text/xml");
  console.log(xmlDoc);
  xmlhttp.send(xmlDoc);
}
