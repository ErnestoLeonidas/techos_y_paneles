// posicion inical que puede ser 0
var posIni_X = 50;
var posIni_Y = 50;

var anchoTecho = 420;
var largoTecho = 450;

var anchoPanel = 80;
var largoPanel = 150;

function setup() {
    var canvasContainer = document.getElementById('canvasContainer');
    var canvas = createCanvas(windowWidth, windowHeight/2);
    canvas.parent(canvasContainer);
    // Obtenemos los valores iniciales de los controles de entrada
    anchoTecho = parseInt(document.getElementById('anchoTecho').value);
    largoTecho = parseInt(document.getElementById('largoTecho').value);
    anchoPanel = parseInt(document.getElementById('anchoPanel').value);
    largoPanel = parseInt(document.getElementById('largoPanel').value);

    dibujarTecho(anchoTecho, largoTecho);
    dibujarPanel(anchoPanel, largoPanel);
}

function dibujarTecho(anchoTecho, largoTecho) {
    fill('gray');
    stroke('blue');
    noFill();
    rect(posIni_X, posIni_Y, anchoTecho, largoTecho);

    dibujatTexto(posIni_X, posIni_Y, anchoTecho, largoTecho);
}

function dibujarPanel(anchoPanel, largoPanel) {
    var panelesRotados = 0;
    var cantidadPaneles = 0;
    var cantPanel_X = Math.trunc(anchoTecho/anchoPanel);
    var cantPanel_Y = Math.trunc(largoTecho/largoPanel);

    if (largoTecho-largoPanel*cantPanel_Y >= anchoPanel) {
        panelesRotados = Math.trunc(anchoTecho/largoPanel);
    }

    // console.log('cantPanel_X',cantPanel_X);
    // console.log('cantPanel_Y',cantPanel_Y);
    // console.log('panelesRotados',panelesRotados);
    cantidadPaneles = cantPanel_X + panelesRotados;
    // console.log(Math.trunc(cantidadPaneles/cantPanel_X));

    var ubicacion_X = posIni_X;
    var ubicacion_Y = posIni_Y;

    for (var i = 0; i < Math.trunc(cantPanel_Y); i++) { // recorremos las filas
        for (var g = 0; g < cantPanel_X; g++){          //recorremos las cantidades
            ubicacion_X = posIni_X + g * anchoPanel;    // concatenamos al ancho los paneles
            
            // dibujamos el panel
            stroke('red');
            rect(ubicacion_X, ubicacion_Y, anchoPanel, largoPanel);
            dibujatTexto(ubicacion_X, ubicacion_Y, anchoPanel, largoPanel);
        }
        ubicacion_Y = posIni_Y + (i+1) * largoPanel; //concatenamos al alto los paneles
    }

    for (pr=0; pr < panelesRotados; pr++) {
        // console.log('cantidad')
        ubicacion_X = posIni_X + pr * largoPanel;

        // dibujamos el panel
        stroke('red');
        rect(ubicacion_X, ubicacion_Y, largoPanel, anchoPanel);
        dibujatTexto(ubicacion_X, ubicacion_Y, largoPanel, anchoPanel);
    }
}

function dibujatTexto(rectX, rectY, rectWidth, rectHeight) {
    textAlign(RIGHT, CENTER);
    push(); // Guarda el estado de la transformación actual
    translate(rectX,  rectY + rectHeight / 2); // Cambia el origen de la rotación
    rotate(-HALF_PI); // Rota el texto en sentido antihorario (para que quede vertical)
    text("" + rectHeight, 0, 7); // Dibuja el texto
    pop(); // Restaura el estado de la transformación

    // texto debajo
    textAlign(CENTER, TOP);
    text("" + rectWidth, rectX + rectWidth / 2, rectY + rectHeight);
}

function actualizarDimensiones() {
    anchoTecho = parseInt(document.getElementById('anchoTecho').value);
    largoTecho = parseInt(document.getElementById('largoTecho').value);
    anchoPanel = parseInt(document.getElementById('anchoPanel').value);
    largoPanel = parseInt(document.getElementById('largoPanel').value);

    clear(); // limpiamos el dibujo
    dibujarTecho(anchoTecho, largoTecho);
    dibujarPanel(anchoPanel, largoPanel);
}