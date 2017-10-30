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


function agregarUsuario() {
  sNombre = xmlDoc.createTextNode($("#txtRegistroUsuario").value);
  sCorreo = xmlDoc.createTextNode($("#txtRegistroCorreo").value);
  sPassword = xmlDoc.createTextNode($("#txtRegistroPassword").value);
  sSexo = xmlDoc.createTextNode($("#radioMasculino").checked ? "M" : "F");


  nNombre = xmlDoc.createElement("nombre");
  nCorreo = xmlDoc.createElement("correo");
  nPassword = xmlDoc.createElement("password");
  nSexo = xmlDoc.createElement("sexo");

  nNombre.appendChild(sNombre);
  nCorreo.appendChild(sCorreo);
  nPassword.appendChild(sPassword);
  nSexo.appendChild(sSexo);

  nUsuario = xmlDoc.createElement("Usuario");
  nUsuario.appendChild(nNombre);
  nUsuario.appendChild(nCorreo);
  nUsuario.appendChild(nPassword);
  nUsuario.appendChild(nSexo);
  console.log(nUsuario);
  usuarios = xmlDoc.getElementsByTagName("usuarios");
  usuarios[0].appendChild(nUsuario);
  subirXML(xmlDoc,"data/probando.xml");

}

