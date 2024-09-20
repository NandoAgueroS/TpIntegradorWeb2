const buscar = ()=>{
    localStorage.removeItem('datosdeobras')
    const keyword = document.getElementById('keyword').value
    const location = document.getElementById('location').value
    const department = document.getElementById('department').value
    console.log(department)
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = '<h2 style="font-size: 3em;">Cargando...</h2>';
    inicioPag=0;
    let URL = "http://localhost:3000/obras?"
    if(keyword) URL = URL + "keyword=" + keyword
    if(department) URL = URL + "&department=" + department
    if(location) URL = URL + "&location=" + location
    console.log(URL)
    console.log(keyword)
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('datosdeobras',JSON.stringify(data));
        mostrar();})
}    
//       localStorage.setItem('datosdeobras',JSON.stringify(data));
//       mostrar()
      //document.getElementById('resultados').innerHTML = "<h3>cargando...</h3>"

// document.getElementById('enviar').addEventListener("click",(evento)=>{
//     preventDefault();
//     buscar();
// })
document.getElementById('enviar').addEventListener("click",buscar)
function mostrar(){
    const data = JSON.parse(localStorage.getItem('datosdeobras'))
    console.log(inicioPag)
    const resultados = document.getElementById('resultados');
    document.getElementById('numero-pagina').innerHTML=`${(inicioPag/16)}`
    resultados.innerHTML = '';
  //   data.forEach(element => {
  //   }
  // )
  for (let index = inicioPag; index < inicioPag + 16 && index<data.length; index++) {
    const element = data[index];
    let imagen = element['imagen-principal']
    if(imagen == 'sin imagen') imagen = "js/libros.png"
    const divObra = document.createElement('div')
    divObra.classList.add('obra')
    divObra.innerHTML = `
    <div class = "imagen_container"><img src="${imagen}" alt="${element.fecha}"></div>
    <span><ul>
    <li>Titulo: ${element.titulo}</li>
    <li>Cultura: ${element.cultura}</li>
    <li>Dinastia: ${element.dinastia}</li>
    </ul>
    </span>`
    // if (element.imagenesAdicionales.length > 0){
    //     const boton = document.createElement('button')
    //     boton.innerHTML='ver más imágenes';
    //     boton.id="abrir-modal"
    //     divObra.appendChild(boton)
    resultados.appendChild(divObra)
      
    }
    // document.getElementById('paginacion').innerHTML=`
    // <button id="siguiente">Siguiente</button>
    // `
  };
const cargarDepartamentos = () => {
    const select = document.getElementById('department')
    const option = document.createElement('option')
    option.value='';
    option.text="Todos";
    select.appendChild(option)
    fetch("http://localhost:3000/departamentos")
    .then(response => response.json())
    .then(data => {
        data.departments.forEach(element => {
            const option = document.createElement('option')
            option.value=element.departmentId;
            option.text=element.displayName;
            select.appendChild(option)
        });
    })
}
cargarDepartamentos()
let inicioPag = 0;
// let hastaPag = 4;
// const paginacion= ()=>{
//   inicioPag +=5;
//   hastaPag +=5;
//   mostrar();
//   return inicioPag
// }
document.getElementById('siguiente').addEventListener('click',()=>{
    if((inicioPag+16)<=JSON.parse(localStorage.getItem('datosdeobras')).length){
        inicioPag +=16;
        mostrar()
    }
})
document.getElementById('retroceder').addEventListener('click',()=> {
  if(inicioPag>=16)
  inicioPag -=16;
  mostrar()})




//const datosDeEjemplo =[
    // {
    //     "id": 436524,
    //     "titulo": "Girasoles",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ep/web-large/DP229743.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "1887"
    // },
    // {
    //     "id": 705155,
    //     "titulo": "Diseño de Abanico con Gatos y Girasoles",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/dp/web-large/DP860374.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "ca. 1885–90"
    // },
    // {
    //     "id": 11922,
    //     "titulo": "Clitía",
    //     "cultura": "Americano",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ad/web-large/DT218366.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ad/original/133111.jpg",
    //         "https://images.metmuseum.org/CRDImages/ad/original/133110.jpg"
    //     ],
    //     "fecha": "1869–70; carved 1872"
    // },
    // {
    //     "id": 816522,
    //     "titulo": "Flores en un jarrón grotesco",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19714-001.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ep/original/DP-19714-002.jpg"
    //     ],
    //     "fecha": "ca. 1635"
    // },
    // {
    //     "id": 343052,
    //     "titulo": "Diseño para decoración de pared con pavo real, grullas y girasoles para el restaurante del Hotel Langham (París)",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/dp/web-large/DP811934.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/dp/original/DP-14686-001.jpg"
    //     ],
    //     "fecha": "1896–98"
    // },
    // {
    //     "id": 347980,
    //     "titulo": "Canciones de Experiencia: Mi Bonito Rosal, ¡Ah! Girasol, El Lilly",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/dp/web-large/DP816691.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "[1794] printed ca. 1825"
    // },
    // {
    //     "id": 20141,
    //     "titulo": "Placa",
    //     "cultura": "Americano",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ad/web-large/L.2009.22.35.jpg",
    //     "pais": "United States",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ad/original/035-initials.jpg",
    //         "https://images.metmuseum.org/CRDImages/ad/original/035-mark.jpg"
    //     ],
    //     "fecha": "ca. 1878–82"
    // },
    // {
    //     "id": 2019,
    //     "titulo": "Cómoda con cajones",
    //     "cultura": "Americano",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ad/web-large/85I_ACF3093R6.jpg",
    //     "pais": "United States",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ad/original/ADA4663.jpg",
    //         "https://images.metmuseum.org/CRDImages/ad/original/ADA3854.jpg",
    //         "https://images.metmuseum.org/CRDImages/ad/original/ADA66.jpg"
    //     ],
    //     "fecha": "1675–1700"
    // },
    // {
    //     "id": 208554,
    //     "titulo": "Cargador",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/DT4036.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/es/original/ES4091.jpg"
    //     ],
    //     "fecha": "1876"
    // },
    // {
    //     "id": 190739,
    //     "titulo": "Clitía",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/DP-18413-001.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/es/original/DP-18413-002.jpg",
    //         "https://images.metmuseum.org/CRDImages/es/original/DP-18413-040.jpg",
    //         "https://images.metmuseum.org/CRDImages/es/original/DP-18413-039.jpg"
    //     ],
    //     "fecha": "ca. 1868–75"
    // },
    // {
    //     "id": 207869,
    //     "titulo": "Luis XVI",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/DT6487.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/es/original/DP210729.jpg"
    //     ],
    //     "fecha": "1787"
    // },
    // {
    //     "id": 761604,
    //     "titulo": "no especifica titulo",
    //     "cultura": "Americano",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ad/web-large/DP-15482-003.jpg",
    //     "pais": "United States",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-007.jpg",
    //         "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-004.jpg",
    //         "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-005.jpg",
    //         "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-006.jpg"
    //     ],
    //     "fecha": "ca. 1850–80"
    // },
    // {
    //     "id": 360837,
    //     "titulo": "Sir Anthony Van Dyck con un girasol",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/dp/web-large/DP823393.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "1644"
    // },
    // {
    //     "id": 400581,
    //     "titulo": "Girasol (Helianthus annuus), de la serie Flores para Old Judge Cigarrillos",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/dp/web-large/DP822032.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "1890"
    // },
    // {
    //     "id": 423400,
    //     "titulo": "Girasol: Altivez, de la serie Bellezas Florales y Lenguaje de las Flores (N75) para cigarrillos marca Duke",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/dp/web-large/DPB882889.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "1892"
    // },
    // {
    //     "id": 707887,
    //     "titulo": "Plato botánico con girasol blanco.",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/DP-1687-037.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "ca. 1755"
    // },
    // {
    //     "id": 57922,
    //     "titulo": "caja de incienso",
    //     "cultura": "Japón",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/as/web-large/14_40_827deac.JPG",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "18th century"
    // },
    // {
    //     "id": 193938,
    //     "titulo": "Recuerdo",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/39533.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "1789–92"
    // },
    // {
    //     "id": 223828,
    //     "titulo": "Pedazo",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/DP2791.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/es/original/DP2791_36.90.727.jpg"
    //     ],
    //     "fecha": "late 19th century"
    // },
    // {
    //     "id": 437329,
    //     "titulo": "El rapto de las sabinas",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-29324-001.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ep/original/LC-46_160-2.jpg",
    //         "https://images.metmuseum.org/CRDImages/ep/original/LC-46_160-3.jpg"
    //     ],
    //     "fecha": "probably 1633–34"
    // },
    // {
    //     "id": 208218,
    //     "titulo": "Plato",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/DT3892.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "late 17th century"
    // },
    // {
    //     "id": 202228,
    //     "titulo": "Alfombra con fama y fortaleza",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/es/web-large/DP212204.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/es/original/DP155158.jpg",
    //         "https://images.metmuseum.org/CRDImages/es/original/DP158810.jpg"
    //     ],
    //     "fecha": "1668–85"
    // },
    // {
    //     "id": 436252,
    //     "titulo": "James Stuart (1612-1655), duque de Richmond y Lennox",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-25646-001.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ep/original/LC-89_15_16-2.jpg",
    //         "https://images.metmuseum.org/CRDImages/ep/original/LC-89_15_16-3.jpg"
    //     ],
    //     "fecha": "ca. 1633–35"
    // },
    // {
    //     "id": 436580,
    //     "titulo": "Egina visitada por Júpiter",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/ep/web-large/DP-12954-001.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [
    //         "https://images.metmuseum.org/CRDImages/ep/original/LC-1970_295-2.jpg",
    //         "https://images.metmuseum.org/CRDImages/ep/original/LC-1970_295-3.jpg"
    //     ],
    //     "fecha": "ca. 1767–69"
    // },
    // {
    //     "id": 363282,
    //     "titulo": "Diseño de chimenea y rejilla con morillos de girasol",
    //     "cultura": "no especifica cultura",
    //     "dinastia": "no especifica dinastia",
    //     "imagen-principal": "https://images.metmuseum.org/CRDImages/dp/web-large/DP806980.jpg",
    //     "pais": "no especifica pais",
    //     "imagenesAdicionales": [],
    //     "fecha": "19th century"
    // }
// ]