const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const puerto = 3000 || process.env.PORT;
const Reloj = require(__dirname + "/public/js/reloj.js");

//relojes
const r1 = new Reloj(20, 50, 46);
const r2 = new Reloj(0, 40, 20);
const r3 = new Reloj(14, 30, 15);
r1.hora();
r2.hora();
r3.hora();

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

//cuando alguien se conecta se ejecuta
io.on("connection", function (socket) {
  console.log("Se han conectado");

  //esclavo1
  io.emit("e1", { h: r1.getH, m: r1.getM, s: r3.getS });

  //Cuando alguien se desconecta se ejecuta
  socket.on("disconnect", function () {
    console.log("Se ha desconectado un usuario");
  });
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});

http.listen(puerto, () => {
  console.log(`Escuchando en el puerto ${puerto}`);
});
