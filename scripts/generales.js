function $(query){
  return document.querySelector(query);
}

function validarInput(input, mensaje) {
  if (input.validity.valueMissing) {
    input.setCustomValidity(mensaje);
  } else {
    input.setCustomValidity("");
  }
}
