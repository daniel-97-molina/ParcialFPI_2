$("#btnRealizado").onclick=function (){
    var form = $("#form");
    validarInput(form.txtTitulo,"Ingresa el titulo del post"); 
    validarInput(form.contenido,"Ingresa el contenido de tu post"); 
};

