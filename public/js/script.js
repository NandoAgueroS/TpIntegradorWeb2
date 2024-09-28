function validarForm(){
  const keyword = document.getElementById("keyword").value;
  const location = document.getElementById("location").value;
  const department = document.getElementById("department").value;
  if(!keyword && !location && !department){
    informacionDatos.innerHTML = '<p class="error">Debe establecer al menos un filtro para la búsqueda'
  }
  else {
    buscar(keyword,location, department)
  }
}
const resultados = document.getElementById("resultados");
const informacionDatos = document.getElementById("informacion-datos");
const siguientePaginacion = document.getElementById('siguiente')
const retrocederPaginacion = document.getElementById('retroceder')
let dataResponse = [];
let obrasSinImagen = 0;
let inicioPag = 0;

function buscar(keyword, location, department) {
  informacionDatos.innerHTML = '<h3 style="font-size: 2em;">Cargando...</h3>';
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
        throw new Error("El servidor demoró demasiado, intente una búsqueda más específica");
      } else if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then((data) => {
      const reoganizado = moverSinImagenAlFinal(data);
      dataResponse = reoganizado.obras;
      obrasSinImagen = reoganizado.sinImagenLength;
      mostrar();
    })
    .catch((error) => {
      console.log(error);
      informacionDatos.innerHTML = `Ocurrió un error: ${error}`;
      dataResponse = [];
      limpiarContenido();
    });
  };
  
document.getElementById("enviar").addEventListener("click", validarForm);

function mostrar() {
  console.log(inicioPag);
  limpiarContenido()
  try {
    
    if (dataResponse.length > 0) {
      if (obrasSinImagen>0) { 
        informacionDatos.innerHTML = `${obrasSinImagen} obras sin imagen se muestran al final`;
      }
      console.log(data.length);
      for (
       let index = inicioPag;
       index < inicioPag + 20 && index < dataResponse.length;
       index++
      ) {
        const element = dataResponse[index];
        let imagen = "";
        
        if (element["imagen-principal"] != ""){
          imagen = element["imagen-principal"];
        }
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
          <div class="info">
          <ul>
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
    informacionDatos.innerHTML = "No se encontraron resultados para la búsqueda";
    resultados.innerHTML = '';
  }
} catch (error) {
  console.log(error)  
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

function limpiarContenido(){
  console.log('error, json:'+dataResponse)
  resultados.innerHTML='';
  document.getElementById("numero-pagina").innerHTML = `Página ${inicioPag / 20 + 1} de ${Math.ceil(dataResponse.length / 20)} <br> 
   Mostrando ${dataResponse.length} obras`;
   const paginacionHtml = document.getElementById('paginacion');
  if (dataResponse.length>0) paginacionHtml.style.visibility = 'visible';
  else paginacionHtml.style.visibility = 'hidden';
  if (dataResponse.length > 20 && dataResponse.length > inicioPag + 20 ) siguientePaginacion.style.visibility = 'visible'
  else siguientePaginacion.style.visibility = 'hidden'
  if (inicioPag - 20 >= 0) retrocederPaginacion.style.visibility = 'visible'
  else retrocederPaginacion.style.visibility = 'hidden'
}