
const traduccion = require('./traduccion.js')
async function filtrar(keyword, department, location){
    // cargarUbicaciones()
    const URLFiltro = `https://collectionapi.metmuseum.org/public/collection/v1/search?`
    let departmentLista='';
    let keywordLista='';
    let locationLista = '';
    if (department) departmentLista=`&departmentId=${department}`
    if (location) locationLista=`&geoLocation=${location}`
    if (keyword) keywordLista= keyword;
    // console.log(keyword)
    // console.log(department)
    // console.log(location)
    const URL1 = `${URLFiltro}hasImages=true&q=${keywordLista}${locationLista}${departmentLista}`;
    console.log(URL1)
    // let response = 'todavia no llego el objeto';
    try {
        const response = await fetch(URL1)
        const ids = await response.json()
        const datos = await obtenerPorID(ids.objectIDs.slice(0,100))
        // console.log(datos.total)
        // if (datos.length>20) {
            
        //     return datos.slice[0,20];
        // }else{
        //     return datos;
        // }
        return datos;
    } catch (error) {
        return {'error':'no se encontraron datos'}
    }
}
async function obtenerPorID(id){
    // console.log(id);
    let datos = [];
    if(id){
    for await (const element of id) {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`)
            const data = await response.json()
            //podria hacer un promise all?
            if(data.primaryImageSmall){
                // let cultura = await traduccion.traducir(data.culture) || 'no especifica cultura'
                // let titulo = await traduccion.traducir(data.title) || 'no especifica titulo'
                // let dinastia = await traduccion.traducir(data.dynasty) || 'no especifica dinastia'
                Promise.all([traduccion.traducir(data.culture), traduccion.traducir(data.title), traduccion.traducir(data.dynasty)])
                .then((values)=>{
                    
                    let imagenPrincipal = data.primaryImageSmall || 'sin imagen'
                    let pais = data.country || 'no especifica pais'
                    // console.log(values)
                    datos.push(
                        {
                            "id":element, 
                            "titulo":values[1] || 'no especifica titulo', 
                            "cultura":values[0] || 'no especifica cultura', 
                            "dinastia":values[2] || 'no especifica dinastia', 
                            "imagen-principal": imagenPrincipal, 
                            "pais": pais, 
                            "imagenesAdicionales": data.additionalImages || [],
                            "fecha":data.objectDate || ''
                        })}
                )}
            } catch (error) {
              console.log(error)  
            }
            };}else{
            console.log('no se encontraron resultados')
        }   
    return datos;
}

const cargarDepartments = async () =>{
    try {
        const URLDepartments = 'https://collectionapi.metmuseum.org/public/collection/v1/departments'
        const response = await fetch(URLDepartments);
        const datos = await response.json();
        console.log(datos);
        return datos;
    } catch (error) {
        console.log('no se pudo traer los departamentos, error:')
        console.log(error)
    }
}

module.exports = {filtrar, cargarDepartments};

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