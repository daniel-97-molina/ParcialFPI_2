if(!localStorage.usuarioLogueado){
    location.href="login.html";
}
var form = $("#form");
var xmlDoc;
var rutaImagen;
var ultimo;

form.onsubmit = function(e){
    e.preventDefault(); 
    cargarXML();
    
};
$("#btnRealizado").onclick = function (e) {
    
    //e.preventDefault(); 
    //cargarXML();
    validarInput(form.txtTitulo, "Ingresa el titulo del post");
    validarInput(form.contenido, "Ingresa el contenido de tu post");
};
$(".contenedorImagen").onclick = function () {
    $("#file").click(console.log(""));
};
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
                $(".contenedorImagen").style.backgroundImage = "url(" + e.target.result + ")";
            };
        })();

        reader.readAsDataURL(archivo[0]);
    } else {
        alert("Ingrese una imagen con formato png,jpg o jpeg");
    }
};

function cargarXML() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xmlDoc = xmlhttp.responseXML;
            agregarArticulo();
        }
    };
    xmlhttp.open("GET", "data/articulos.xml", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.send();
}


function subirXMLArticulos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPostArticulo.php", true);
    xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(xmlDoc);
    setTimeout(function () {
        location.href="postViewer.html?id="+(ultimo+1);  
    },100);
          
   
}

//codigo para las imagenes 
$(".contenedorImagen").onclick = function () {
    $("#file").click(console.log(""));
};

function agregarArticulo() {
    var sTitulo = xmlDoc.createTextNode($("#txtTitulo").value);
    var sContenido = xmlDoc.createTextNode($("#txtContenido").value);
    var sImagen = xmlDoc.createTextNode(rutaImagen);
    var select = $("#lista");
    var nombreCategoria = select.options[select.selectedIndex].value;
    var sCategoria = xmlDoc.createTextNode(nombreCategoria);

    var nTitulo = xmlDoc.createElement("titulo");
    var nContenido = xmlDoc.createElement("contenido");
    var nImg = xmlDoc.createElement("img");
    var nCategoria = xmlDoc.createElement("categoria");
    var tagComentarios = xmlDoc.createElement("comentarios");

    nTitulo.appendChild(sTitulo);
    nContenido.appendChild(sContenido);
    nImg.appendChild(sImagen);
    nCategoria.appendChild(sCategoria);
    articulos = xmlDoc.getElementsByTagName("articulos");
    ultimo=parseInt(articulos[0].getAttribute("ultimo"));
    articulos[0].setAttribute("ultimo",ultimo+1);

    var articulo = xmlDoc.createElement("articulo");
    articulo.setAttribute("idArticulo", ultimo+1);
    articulo.setAttribute("idUsuario", localStorage.usuarioLogueado);
    articulo.setAttribute("puntos",0);
    articulo.appendChild(nTitulo);
    articulo.appendChild(nContenido);
    articulo.appendChild(nImg);
    articulo.appendChild(nCategoria);
    articulo.appendChild(tagComentarios);

    articulos[0].appendChild(articulo);
    subirXMLArticulos();
    imagen("imagesArticulos");
}

