const express = require("express");
const bodyParser = require("body-parser");
const funciones = require("./funciones.js");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});
app.get("/obras", (req, res) => {
  const keyword = req.query.keyword;
  const department = req.query.department;
  const location = req.query.location;
  const withImages = req.query.withImages;
  funciones
    .filtrar(keyword, department, location, withImages)
    .then((a) => {
      res.status(200).json(a);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
  });
  
  app.get("/*", (req, res) => {
    res.status(404).sendFile(__dirname + "/public/html/not-found.html");
  });
  app.listen(3000, () => {
    console.log(`servidor iniciado en el puerto ${PORT}`);
  });

