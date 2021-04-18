const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const puerto = process.env.PORT||3000;
const Reloj = require(__dirname + "/public/js/reloj.js");
const random = require(__dirname+'/public/js/aleatorio.js');

//relojes
const r1 = new Reloj(random(0,24), random(0,60), random(0,60));
const r2 = new Reloj(random(0,24), random(0,60), random(0,60));
const r3 = new Reloj(random(0,24), random(0,60), random(0,60));
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
  io.emit("e1", { h: r1.getH, m: r1.getM, s: r1.getS });
  socket.on('r1', (r)=>{
    r1.setH = r.h;
    r1.setM = r.m;
    r1.setS = r.s;
  })
  socket.on('er1', ()=>{
    io.emit('e1',{ h: r1.getH, m: r1.getM, s: r1.getS });
  })

  //esclavo2
  io.emit("e2", { h: r2.getH, m: r2.getM, s: r2.getS });
  socket.on('r2', (r)=>{
    r2.setH = r.h;
    r2.setM = r.m;
    r2.setS = r.s;
  })
  socket.on('er2', ()=>{
    io.emit('e2',{ h: r2.getH, m: r2.getM, s: r2.getS });
  })

  //esclavo2
  io.emit("e3", { h: r3.getH, m: r3.getM, s: r3.getS });
  socket.on('r3', (r)=>{
    r3.setH = r.h;
    r3.setM = r.m;
    r3.setS = r.s;
  })
  socket.on('er3', ()=>{
    io.emit('e3',{ h: r3.getH, m: r3.getM, s: r3.getS });
  })

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
