let imagenActual = 0;
let data = {};
let imagenesAdicionales = [];
const imagenAdicional = document.getElementById("imagen-adicional");
const cargar = async() => {
  const response = await fetch("/buscar-id");
  dataArray = await response.json()
  data = dataArray[0];
  imagenesAdicionales = data.imagenesAdicionales;
  console.log(data[0])
  const imagenPrincipal = document.getElementById("imagen-principal");
  const infoUl = document.getElementById("info-ul");
  imagenPrincipal.src = data["imagen-principal"];
  imagenAdicional.src = imagenesAdicionales[imagenActual];
  infoUl.innerHTML = `
                    <li>Titulo: ${data.titulo}</li>
                    <li>Cultura: ${data.cultura}</li>
                    <li>Dinastia: ${data.dinastia}</li>`;
};
const siguienteImagen = () => {
  imagenActual++;
  imagenAdicional.src = imagenesAdicionales[imagenActual];
  console.log(imagenActual)
};
const anteriorImagen = () => {
    imagenActual--;
    imagenAdicional.src = imagenesAdicionales[imagenActual];
    console.log(imagenActual)
};
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
cargar();
// const fetchAllImages = async(a)=>{
//   console.log(a)
//   const imagenesFetch = a.map(async(element)=>{
//     const response = await fetch(element);
//     return response
//   })
//   const imagenesListas = await Promise.all(imagenesFetch)
//   return imagenesListas
// }