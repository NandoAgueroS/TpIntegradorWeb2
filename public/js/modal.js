let indexActual = 0;
let data = {};
let imagenes = [];
let actualModal = document.getElementById("actual-modal");
const imagenAdicional = document.getElementById("imagen-adicional");
function mostrarModal(element) {
  indexActual = 0;
  imagenes = element.imagenesAdicionales;
  const tituloObra = document.getElementById("modal-title");
  const cantidadAdicionales = document.getElementById("cantidad-modal");
  tituloObra.innerHTML = element.titulo;
  $("#ModalCenter").modal("show");
  imagenAdicional.src = imagenes[0];
  console.log(element);
  actualModal.innerHTML = indexActual + 1;
  cantidadAdicionales.innerHTML = `Imágenes adicionales: ${imagenes.length}`;
}
function siguienteImagen() {
  if (imagenes.length - 1 > indexActual) {
    indexActual++;
    console.log(indexActual, imagenes.length);
    imagenAdicional.src = imagenes[indexActual];
    actualModal.innerHTML = indexActual + 1;
  }
}
function anteriorImagen() {
  if (indexActual > 0) {
    indexActual--;
    imagenAdicional.src = imagenes[indexActual];
    console.log(indexActual);
    actualModal.innerHTML = indexActual + 1;
  }
}

