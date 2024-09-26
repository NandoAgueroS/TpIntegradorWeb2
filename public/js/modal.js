let indexActual = 0;
let data = {};
let imagenes = [];
let actualModal = document.getElementById("actual-modal");
const imagenAdicional = document.getElementById("imagen-adicional");
function mostrarModal(element) {
  indexActual = 0;
  imagenes = element.imagenesAdicionales;
  // const modal = document.getElementById('exampleModalCenter');
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
  // console.log(indexActual)
}
function anteriorImagen() {
  if (indexActual > 0) {
    indexActual--;
    imagenAdicional.src = imagenes[indexActual];
    console.log(indexActual);
    actualModal.innerHTML = indexActual + 1;
  }
}
const objetoEjemplo = {
  id: 2019,
  titulo: "Cómoda con cajones",
  cultura: "Americano",
  dinastia: "no especifica dinastia",
  "imagen-principal":
    "https://images.metmuseum.org/CRDImages/ad/web-large/85I_ACF3093R6.jpg",
  pais: "United States",
  imagenesAdicionales: [
    "https://images.metmuseum.org/CRDImages/ad/original/ADA4663.jpg",
    "https://images.metmuseum.org/CRDImages/ad/original/ADA3854.jpg",
    "https://images.metmuseum.org/CRDImages/ad/original/ADA66.jpg",
  ],
  fecha: "1675–1700",
};
// cargar();
// const fetchAllImages = async(a)=>{
//   console.log(a)
//   const imagenesFetch = a.map(async(element)=>{
//     const response = await fetch(element);
//     return response
//   })
//   const imagenesListas = await Promise.all(imagenesFetch)
//   return imagenesListas
// }
