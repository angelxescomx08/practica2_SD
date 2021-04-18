const modificar = (r, h, m, s) => {
    r.setH = h;
    r.setM = m;
    r.setS = s;
}

function abrirVentana(r,n) {
    document.getElementById("capaFondo").style.visibility = "visible";
    document.getElementById("capaVentana").style.visibility = "visible";
    r.parar();
    return {r:r,n:n};
}

function cerrarVentana() {
    document.getElementById("capaFondo").style.visibility = "hidden";
    document.getElementById("capaVentana").style.visibility = "hidden";
}

function botonModificar(r,n,socket){
    r.setH = parseInt(document.getElementById('h').value,10);
    r.setM = parseInt(document.getElementById('m').value,10);
    r.setS = parseInt(document.getElementById('s').value,10);
    r.setV = parseInt(document.getElementById('v').value,10);

    if(n===1)socket.emit('r1',{h:r.getH,m:r.getM,s:r.getS});
    if(n===2)socket.emit('r2',{h:r.getH,m:r.getM,s:r.getS});
    if(n===3)socket.emit('r3',{h:r.getH,m:r.getM,s:r.getS});

    r.continuar();
}

function enviar(r,n,socket){
    if(n===1)socket.emit('er1')
    if(n===2)socket.emit('er2')
    if(n===3)socket.emit('er3')
}