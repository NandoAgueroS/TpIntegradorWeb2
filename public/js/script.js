const resultados = document.getElementById("resultados");
let dataResponse = [];
let obrasSinImagen = 0;
const buscar = () => {
  // localStorage.removeItem('datosdeobras')
  const keyword = document.getElementById("keyword").value;
  const location = document.getElementById("location").value;
  const department = document.getElementById("department").value;
  resultados.innerHTML = '<h2 style="font-size: 3em;">Cargando...</h2>';
  inicioPag = 0;
  let URL = "/obras?";
  console.log(keyword);
  console.log(location);
  console.log(department);
  if (keyword) URL = URL.concat(`keyword=${keyword}`);
  if (department) URL = URL.concat(`&department=${department}`);
  if (location) URL = URL.concat(`&location=${location}`);
  console.log(URL);
  fetch(URL)
    .then((response) => {
      console.log(response);
      if (response.status === 504) {
        throw new Error(
          "Error: El servidor demoró demasiado, intente una busqueda más específica"
        );
      } else if (response.status >= 200 && response.status < 300) {
        response.json();
      }
    })
    .then((data) => {
      // localStorage.setItem('datosdeobras',JSON.stringify(data));
      const reoganizado = moverSinImagenAlFinal(data);
      dataResponse = reoganizado.obras;
      obrasSinImagen = reoganizado.sinImagenLength;
      mostrar();
    })
    .catch((error) => {
      console.log(error);
      resultados.innerHTML = `Ocurrió un error: ${error}`;
    });
  // try {

  //   const response = await fetch(URL)
  //   // console.log(response.status)
  //   console.log('Objeto respuesta: ' + response + '.')
  //   if (response.status == 504) {
  //     console.log('Error: El servidor demoró demasiado, intente una busqueda más específica')
  //     throw new Error('Error: El servidor demoró demasiado, intente una busqueda más específica');
  //   } else if(response.status>=200 && response.status < 300) {
  //     console.log(response.status)
  //         const data = await response.json()
  //         const reoganizado = moverSinImagenAlFinal(data);
  //         dataResponse = reoganizado.obras;
  //         obrasSinImagen = reoganizado.sinImagenLength;
  //         mostrar();
  //       }
  // } catch (error) {
  //   console.log(error);
  //   resultados.innerHTML = `Ocurrió un error: ${error}`;

  // }
};

document.getElementById("enviar").addEventListener("click", buscar);
function mostrar() {
  // const data = moverSinImagenAlFinal(JSON.parse(localStorage.getItem('datosdeobras')))
  // const data = da;
  console.log(inicioPag);
  if (dataResponse.length > 0) {
    const resultados = document.getElementById("resultados");
    document.getElementById("numero-pagina").innerHTML = `Página ${
      inicioPag / 20 + 1
    } de ${Math.ceil(dataResponse.length / 20)} <br> ${
      dataResponse.length
    } Obras encontradas`;
    resultados.innerHTML = "";
    const informacionDatos = document.getElementById("informacion-datos");
    informacionDatos.innerHTML = `Se movieron al final ${obrasSinImagen} obras sin imagen`;

    console.log(data.length);
    for (
      let index = inicioPag;
      index < inicioPag + 20 && index < dataResponse.length;
      index++
    ) {
      const element = dataResponse[index];
      let imagen = "";
      if (element["imagen-principal"] != "")
        imagen = element["imagen-principal"];
      else {
        imagen = "../images/imagen-no-disponible.jpg";
      }
      const divObra = document.createElement("div");
      divObra.classList.add("obra");
      divObra.innerHTML = `
    <div class="imagen_info">
    <div class = "imagen_container">
    <span> ${element.fecha} </span>
    <img src="${imagen}" alt=""></div>
    <div class="info"><ul>
    <li><h4>${element.titulo}</h4></li>
    <li>Cultura: ${element.cultura}</li>
    <li>Dinastia: ${element.dinastia}</li>
    </ul>
    </div>
    </div>`;
      if (element.imagenesAdicionales.length > 0) {
        const button = document.createElement("button");
        button.innerHTML = "ver más imágenes";
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute(
          "onclick",
          `mostrarModal(${JSON.stringify(element)})`
        );
        divObra.append(button);
      }
      resultados.appendChild(divObra);
    }
  } else {
    resultados.innerHTML = "No se encontraron resultados para la búsqueda";
  }
}

const cargarDepartamentos = () => {
  const URLDepartments =
    "https://collectionapi.metmuseum.org/public/collection/v1/departments";
  const select = document.getElementById("department");
  const option = document.createElement("option");
  option.value = "";
  option.text = "Todos";
  select.appendChild(option);
  fetch(URLDepartments)
    .then((response) => response.json())
    .then((data) => {
      data.departments.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.departmentId;
        option.text = element.displayName;
        select.appendChild(option);
      });
    })
    .catch((error) => console.log(error));
};
cargarDepartamentos();
let inicioPag = 0;
// let hastaPag = 4;
// const paginacion= ()=>{
//   inicioPag +=5;
//   hastaPag +=5;
//   mostrar();
//   return inicioPag
// }
document.getElementById("siguiente").addEventListener("click", () => {
  if (inicioPag + 20 < dataResponse.length) {
    inicioPag += 20;
    mostrar();
  }
});
document.getElementById("retroceder").addEventListener("click", () => {
  if (inicioPag >= 20) {
    inicioPag -= 20;
    mostrar();
  }
});

function moverSinImagenAlFinal(array) {
  const sinImagen = array.filter((a) => !a["imagen-principal"]);
  const conImagen = array.filter((a) => a["imagen-principal"]);
  const reorganización = {
    obras: [...conImagen, ...sinImagen],
    sinImagenLength: sinImagen.length,
    conImagenLength: conImagen.length,
  };
  console.log(sinImagen);
  console.log(conImagen);
  console.log(reorganización);
  return reorganización;
}

const datosDeEjemplo = [
  {
    id: 436524,
    titulo: "Girasoles",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ep/web-large/DP229743.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "1887",
  },
  {
    id: 705155,
    titulo: "Diseño de Abanico con Gatos y Girasoles",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/dp/web-large/DP860374.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "ca. 1885–90",
  },
  {
    id: 11922,
    titulo: "Clitía",
    cultura: "Americano",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ad/web-large/DT218366.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/ad/original/133111.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/133110.jpg",
    ],
    fecha: "1869–70; carved 1872",
  },
  {
    id: 816522,
    titulo: "Flores en un jarrón grotesco",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ep/web-large/DP-19714-001.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/ep/original/DP-19714-002.jpg",
    ],
    fecha: "ca. 1635",
  },
  {
    id: 343052,
    titulo:
      "Diseño para decoración de pared con pavo real, grullas y girasoles para el restaurante del Hotel Langham (París)",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/dp/web-large/DP811934.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/dp/original/DP-14686-001.jpg",
    ],
    fecha: "1896–98",
  },
  {
    id: 347980,
    titulo: "Canciones de Experiencia: Mi Bonito Rosal, ¡Ah! Girasol, El Lilly",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/dp/web-large/DP816691.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "[1794] printed ca. 1825",
  },
  {
    id: 20141,
    titulo: "Placa",
    cultura: "Americano",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ad/web-large/L.2009.22.35.jpg",
    pais: "United States",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/ad/original/035-initials.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/035-mark.jpg",
    ],
    fecha: "ca. 1878–82",
  },
  {
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
  },
  {
    id: 208554,
    titulo: "Cargador",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/DT4036.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/es/original/ES4091.jpg",
    ],
    fecha: "1876",
  },
  {
    id: 190739,
    titulo: "Clitía",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/DP-18413-001.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/es/original/DP-18413-002.jpg",
      "https://images.metmuseum.org/CRDImages/es/original/DP-18413-040.jpg",
      "https://images.metmuseum.org/CRDImages/es/original/DP-18413-039.jpg",
    ],
    fecha: "ca. 1868–75",
  },
  {
    id: 207869,
    titulo: "Luis XVI",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/DT6487.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/es/original/DP210729.jpg",
    ],
    fecha: "1787",
  },
  {
    id: 761604,
    titulo: "no especifica titulo",
    cultura: "Americano",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ad/web-large/DP-15482-003.jpg",
    pais: "United States",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-007.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-004.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-005.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/DP-15482-006.jpg",
    ],
    fecha: "ca. 1850–80",
  },
  {
    id: 360837,
    titulo: "Sir Anthony Van Dyck con un girasol",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/dp/web-large/DP823393.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "1644",
  },
  {
    id: 400581,
    titulo:
      "Girasol (Helianthus annuus), de la serie Flores para Old Judge Cigarrillos",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/dp/web-large/DP822032.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "1890",
  },
  {
    id: 423400,
    titulo:
      "Girasol: Altivez, de la serie Bellezas Florales y Lenguaje de las Flores (N75) para cigarrillos marca Duke",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/dp/web-large/DPB882889.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "1892",
  },
  {
    id: 707887,
    titulo: "Plato botánico con girasol blanco.",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/DP-1687-037.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "ca. 1755",
  },
  {
    id: 57922,
    titulo: "caja de incienso",
    cultura: "Japón",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/as/web-large/14_40_827deac.JPG",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "18th century",
  },
  {
    id: 193938,
    titulo: "Recuerdo",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/39533.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "1789–92",
  },
  {
    id: 223828,
    titulo: "Pedazo",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/DP2791.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/es/original/DP2791_36.90.727.jpg",
    ],
    fecha: "late 19th century",
  },
  {
    id: 437329,
    titulo: "El rapto de las sabinas",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ep/web-large/DP-29324-001.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/ep/original/LC-46_160-2.jpg",
      "https://images.metmuseum.org/CRDImages/ep/original/LC-46_160-3.jpg",
    ],
    fecha: "probably 1633–34",
  },
  {
    id: 208218,
    titulo: "Plato",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/DT3892.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "late 17th century",
  },
  {
    id: 202228,
    titulo: "Alfombra con fama y fortaleza",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/es/web-large/DP212204.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/es/original/DP155158.jpg",
      "https://images.metmuseum.org/CRDImages/es/original/DP158810.jpg",
    ],
    fecha: "1668–85",
  },
  {
    id: 436252,
    titulo: "James Stuart (1612-1655), duque de Richmond y Lennox",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ep/web-large/DP-25646-001.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/ep/original/LC-89_15_16-2.jpg",
      "https://images.metmuseum.org/CRDImages/ep/original/LC-89_15_16-3.jpg",
    ],
    fecha: "ca. 1633–35",
  },
  {
    id: 436580,
    titulo: "Egina visitada por Júpiter",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/ep/web-large/DP-12954-001.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [
      "https://images.metmuseum.org/CRDImages/ep/original/LC-1970_295-2.jpg",
      "https://images.metmuseum.org/CRDImages/ep/original/LC-1970_295-3.jpg",
    ],
    fecha: "ca. 1767–69",
  },
  {
    id: 363282,
    titulo: "Diseño de chimenea y rejilla con morillos de girasol",
    cultura: "no especifica cultura",
    dinastia: "no especifica dinastia",
    "imagen-principal":
      "https://images.metmuseum.org/CRDImages/dp/web-large/DP806980.jpg",
    pais: "no especifica pais",
    imagenesAdicionales: [],
    fecha: "19th century",
  },
];
