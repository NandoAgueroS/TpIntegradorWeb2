const express = require("express");
const funciones = require("./funciones.js");
const app = express()
const PORT = 3000

app.use(express.static('public'))
// app.use(express.static(`${__dirname}/styles`))
// app.use(express.static(`${__dirname}/js`))

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/html/index.html")
})
app.get("/obras", (req, res)=>{
    const keyword = req.query.keyword;
    const department = req.query.department;
    const location = req.query.location;
    console.log(department)
    funciones.filtrar(keyword, department, location).then((a)=>{
        res.status(200).json(a)
    })
    .catch(error=>console.log(error));
})
app.get("/departamentos",(req,res)=>{
    funciones.cargarDepartments()
    .then(departamentos => {
        res.status(200).json(departamentos)
    })
    .catch(error => console.log(error))
    
})
// app.get("/ubicaciones",(req,res)=>{
//     funciones.cargarUbicaciones()
//     .then(ubicaciones => {
//         res.status(200).json(ubicaciones)
//     })
//     .catch(error => console.log(error))
    
// })
app.get("/*", (req, res)=> {
    res.status(404).sendFile(__dirname + "/html/not-found.html")
})
app.listen(3000,()=>{
    console.log(`servidor iniciado en el puerto ${PORT}`)
})