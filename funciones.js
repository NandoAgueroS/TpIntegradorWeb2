const traduccion = require("./traduccion.js");
async function filtrar(keyword, department, location, withImages) {
  // cargarUbicaciones()
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
  // console.log(id);
  //limitar a 100
  let datos = [];
  let sinFiltrarNulls = [];
  if (id) {
    console.log("length original: " + id.length);
    id = id.length > 100 ? id.slice(0, 100) : id;
    console.log("length limitado: " + id.length);
    const variosFetch = id.map(async (element) => {
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`
        );
        const data = await response.json();
        // const promesaTraduccion = await Promise.all([
        //   traduccion.traducir(data.culture),
        //   traduccion.traducir(data.title),
        //   traduccion.traducir(data.dynasty),
        // ]);
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
    sinFiltrarNulls = await Promise.all(variosFetch);
  } else {
    console.log("no se encontraron resultados");
  }
  console.log(datos);
  datos = sinFiltrarNulls.filter((a) => a !== null);
  console.log("datos " + datos);
  return datos;
}

// async function cargarUbicaciones(){
//   const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects");
//   const ids = await response.json;
//   const data = await ids.objectIDs.slice(0,100).map(async(element) => {
//     const response1 = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`)
//     const data1 = await response1.json();
//     return data;
//   })
// }
// async function obtenerPorID(id, withImages){
//     // console.log(id);
//     //limitar a 100
//     console.log("length original: " + id.length)
//     id = id.length>100 ? id.slice(0,100) : id
//     console.log("length limitado: " + id.length)
//     let datos = [];
//     if(id){
//     for  (const element of id) {
//         try {
//             const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`)
//             const data = await response.json()
//             //podria hacer un promise all?
//             // if(data.primaryImageSmall){
//                 // Promise.all([traduccion.traducir(data.culture), traduccion.traducir(data.title), traduccion.traducir(data.dynasty)])
//                 // .then((values)=>{

//                     let imagenPrincipal = data.primaryImageSmall || ''
//                     let pais = data.country || 'no especifica pais'
//                     // console.log(values)
//                     datos.push(
//                         {
//                             "id":element,
//                             "titulo":data.title || 'no especifica titulo',
//                             "cultura":data.culture || 'no especifica cultura',
//                             "dinastia":data.dynasty || 'no especifica dinastia',
//                             "imagen-principal": imagenPrincipal,
//                             "pais": pais,
//                             "imagenesAdicionales": data.additionalImages || [],
//                             "fecha":data.objectDate || ''
//                         })
//                 //)
//             // }
//             } catch (error) {
//               console.log(error)
//             }
//             };}else{
//             console.log('no se encontraron resultados')
//         }
//     return datos;
// }

module.exports = { filtrar, obtenerPorID };

// const cargarUbicaciones = async () =>{
//     try {
//         const URLUbicaciones = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=&isHighlight=true&hasImages=true'
//         const response = await fetch(URLUbicaciones);
//         const datos = await response.json();
//         console.log(datos);
//         const obras = await obtenerPorID2(datos.objectIDs);
//         const set = new Set(obras.map(a => a.country));
//         const ubicaciones = [...set]
//         console.log({ubicaciones})
//         return ubicaciones;
//     } catch (error) {
//         console.log('no se pudo traer las ubicaciones, error:')
//         console.log(error)
//     }
// }
// async function obtenerPorID2(id){
//     // console.log(id);
//     let datos = [];
//     if(id){
//     for await (const element of id) {
//         try {
//             const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`)
//             const data = await response.json()
//             console.log(data)
//             return data;
//             } catch (error) {
//               console.log(error)
//             }
//             };}else{
//             console.log('no se encontraron resultados')
//         }
//     return datos;
// }
// export{filtrar}
