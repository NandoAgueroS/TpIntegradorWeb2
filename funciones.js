const traduccion = require("./traduccion.js");

async function filtrar(keyword, department, location, withImages) {
  const URLFiltro = `https://collectionapi.metmuseum.org/public/collection/v1/search?`;
  let departmentLista = "";
  let keywordLista = "";
  let locationLista = "";
  if (department) departmentLista = `&departmentId=${department}`;
  if (location) locationLista = `&geoLocation=${location}`;
  if (keyword) keywordLista = keyword;

  const URL1 = `${URLFiltro}hasImages=true&q=${keywordLista}${locationLista}${departmentLista}`;
  console.log(URL1);
  // try {
  const response = await fetch(URL1);
  const ids = await response.json();
  const datos = await obtenerPorID(ids.objectIDs, withImages);

  return datos;
  // } catch (error) {
  //   return { error: "no se encontraron datos" };
  // }
}
async function obtenerPorID(id, withImages) {
  let datos = [];
  // let sinFiltrarNulls = [];
  let tramos = [];
  if (id) {
    console.log("length original: " + id.length);

    id = id.length > 200 ? id.slice(0, 200) : id;

    for (let i = 0; i< id.length; i += 100){
      tramos.push(id.slice(i, i + 100));
    }
    
    for (const tramo of tramos) {
      
    console.log("length limitado: " + id.length);
    const variosFetch = tramo.map(async (element) => {
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`
        );
        const data = await response.json();
        const promesaTraduccion = await traduccion.traducirJSON({
          0: data.title,
          1: data.culture,
          2: data.dynasty,
        });
        return {
          id: element,
          titulo: promesaTraduccion[0] || "no especifica titulo",
          cultura: promesaTraduccion[1] || "no especifica cultura",
          dinastia: promesaTraduccion[2] || "no especifica dinastia",
          "imagen-principal": data.primaryImageSmall || "",
          pais: data.country || "no especifica pais",
          imagenesAdicionales: data.additionalImages || [],
          fecha: data.objectDate || "",
        };
      } catch (error) {
        console.log(error);
        console.log(`no se pudo obtener el objeto con 
          id:${element}`);
        return null;
      }
    });
    console.log(variosFetch);
    const sinFiltrarNulls = await Promise.all(variosFetch);
    // console.log(datos);
    datos.push(...sinFiltrarNulls.filter((a) => a !== null));
    console.log("datos " + datos);}
  } else {
    console.log("no se encontraron resultados");
  }
  return datos;
}

module.exports = { filtrar, obtenerPorID };
