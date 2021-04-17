const express = require("express");
const app = express();
const puerto = 3000 || process.env.PORT;

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});

//maestro
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/maestro.html");
});

app.get("/esclavo1", (req, res) => {
  res.sendFile(__dirname + "/public/esclavo1.html");
});

app.get("/esclavo2", (req, res) => {
  res.sendFile(__dirname + "/public/esclavo2.html");
});

app.get("/esclavo3", (req, res) => {
  res.sendFile(__dirname + "/public/esclavo3.html");
});

app.listen(puerto, () => {
  console.log(`Escuchando en el puerto ${puerto}`);
});
