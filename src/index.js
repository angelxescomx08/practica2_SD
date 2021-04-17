const express = require("express");
const app = express();
const puerto = 3000 || process.env.PORT;
const Reloj = require(__dirname + "/public/js/reloj.js");

const r1 = new Reloj(20, 50, 46);
r1.hora();

app.use(express.static(__dirname + "/public"));

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

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});

app.listen(puerto, () => {
  console.log(`Escuchando en el puerto ${puerto}`);
});
