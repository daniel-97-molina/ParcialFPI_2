var xmlDoc;
var rutaImagen;
$("#btnRealizado").onclick = function () {
    var form = $("#form");
    validarInput(form.txtTitulo, "Ingresa el titulo del post");
    validarInput(form.contenido, "Ingresa el contenido de tu post");
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
    xmlhttp.send();
}


function subirXMLArticulos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "procesarPostArticulo.php", true);
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    console.log(xmlDoc);
    xmlhttp.send(xmlDoc);
}

$("#btnRealizado").onclick = function (e) {
    e.preventDefault();
    cargarXML();

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
    var ultimo=articulos[0].getAttribute("ultimo");
    articulos[0].setAttribute("ultimo",ultimo+1);

    var articulo = xmlDoc.createElement("articulo");
    articulo.setAttribute("idArticulo", ultimo+1);
    articulo.setAttribute("idUsuario", idUsuarioLoggeado);
    articulo.appendChild(nTitulo);
    articulo.appendChild(nContenido);
    articulo.appendChild(nImg);
    articulo.appendChild(nCategoria);
    articulo.appendChild(tagComentarios);

    articulos[0].appendChild(articulo);
    subirXMLArticulos();
    imagen("imagesPerfil");
}



/*<articulos>
 <articulo id="1" idUsuario="5">
 <titulo></titulo>
 <contenido>
 </contenido>
 <imagen>
 </imagen>
 <comentarios>
 <comentario idUsuario="usuario">
 </comentario>
 </comentarios>
 </articulo>
 </articulos> 
 */