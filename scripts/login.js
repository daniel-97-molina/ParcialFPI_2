var formulario = $("#formulario");

formulario.btnIniciar.onclick = function(){validar();};
formulario.oninput = function(event){event.preventDefault();validar();event.preventDefault();};
function validar(){
    validarInput(formulario.txtUsuario, "Ingrese su usuario o correo");
    validarInput(formulario.txtPassword, "Ingrese su contraseña");

}
