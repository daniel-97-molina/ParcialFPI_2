var categoriaActual = location.href.split("cat=")[1];
if(typeof(categoriaActual)==="undefined"){
    categoriaActual = "Arte";
}
$("#tituloCat").innerHTML += categoriaActual.toUpperCase();


