let inputHora;
let horaLaPaz = 0;
let horaCDMX = 0;
let horaBarcelona = 0;
let segundos = 0;

function setup() {
  createCanvas(600, 200);
  
  // Crear input para la hora
  inputHora = createInput();
  inputHora.position(20, 20);
  
  // Crear botón para actualizar relojes
  let boton = createButton('Actualizar');
  boton.position(inputHora.x + inputHora.width + 10, 20);
  boton.mousePressed(actualizarHoras);
}

function draw() {
  background(255);
  
  // Dibujar relojes
  dibujarReloj(width / 4, height / 2, "La Paz", horaLaPaz, puntoPendiente);
  dibujarReloj(width / 2, height / 2, "Ciudad de México", horaCDMX, dda);
  dibujarReloj(width * 3 / 4, height / 2, "Barcelona", horaBarcelona, bresenham);
}

function actualizarHoras() {
  // Obtener la hora del input y convertirla a número
  let horaInput = int(inputHora.value());
  
  // Asignar horas a los relojes
  horaLaPaz = horaInput;
  horaCDMX = (horaInput + 1) % 24; // Ciudad de México tiene 1 hora más
  horaBarcelona = (horaInput + 8) % 24; // Barcelona tiene 8 horas más
}

function dibujarReloj(x, y, titulo, hora, algoritmoDibujo) {
  // Título del reloj
  textAlign(CENTER);
  textSize(18);
  text(titulo, x, y - 60);
  
  // Dibujar el círculo del reloj
  let radio = 50;
  noFill();
  stroke(0);
  strokeWeight(2);
  algoritmoDibujo(x, y, radio);
  
  // Calcular las posiciones de las manecillas
  let horasAngulo = map(hora % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let minutosAngulo = map(minute(), 0, 60, 0, TWO_PI) - HALF_PI;
  let segundosAngulo = map(segundos, 0, 60, 0, TWO_PI) - HALF_PI;
  
  // Dibujar las manecillas
  dibujarManecilla(x, y, radio * 0.5, horasAngulo, 4, color(255, 0, 0)); // Manecilla de las horas (rojo)
  dibujarManecilla(x, y, radio * 0.8, minutosAngulo, 2, color(0, 0, 255)); // Manecilla de los minutos (azul)
  dibujarManecilla(x, y, radio * 0.8, segundosAngulo, 1, color(0, 255, 0)); // Manecilla de los segundos (verde)
}

// Función para dibujar una manecilla
function dibujarManecilla(x, y, longitud, angulo, grosor, color) {
  stroke(color);
  strokeWeight(grosor);
  line(x, y, x + cos(angulo) * longitud, y + sin(angulo) * longitud);
}

// Algoritmo de Bresenham para dibujar el círculo del reloj de Barcelona
function bresenham(xc, yc, r) {
  let x = 0;
  let y = r;
  let d = 3 - 2 * r;
  drawSymmetricPoints(xc, yc, x, y);
  while (y >= x) {
    x++;
    if (d > 0) {
      y--;
      d = d + 4 * (x - y) + 10;
    } else {
      d = d + 4 * x + 6;
    }
    drawSymmetricPoints(xc, yc, x, y);
  }
}

// Algoritmo DDA para dibujar el círculo del reloj de Ciudad de México
function dda(xc, yc, r) {
  let x = r;
  let y = 0;
  let d = 1 - r;

  drawSymmetricPoints(xc, yc, x, y);
  while (x > y) {
    if (d < 0) {
      d += 2 * y + 3;
    } else {
      d += 2 * (y - x) + 5;
      x--;
    }
    y++;
    drawSymmetricPoints(xc, yc, x, y);
  }
}

// Ecuación punto-pendiente para dibujar el círculo del reloj de La Paz
function puntoPendiente(xc, yc, r) {
  let x = 0;
  let y = r;
  let p = 1 - r;
  drawSymmetricPoints(xc, yc, x, y);
  while (x < y) {
    x++;
    if (p < 0) {
      p += 2 * x + 1;
    } else {
      y--;
      p += 2 * (x - y) + 1;
    }
    drawSymmetricPoints(xc, yc, x, y);
  }
}

// Dibuja los puntos simétricos
function drawSymmetricPoints(xc, yc, x, y) {
  point(xc + x, yc + y);
  point(xc - x, yc + y);
  point(xc + x, yc - y);
  point(xc - x, yc - y);
  point(xc + y, yc + x);
  point(xc - y, yc + x);
  point(xc + y, yc - x);
  point(xc - y, yc - x);
}

// Incrementar los segundos cada segundo
function secondTick() {
  segundos++;
  if (segundos >= 60) {
    segundos = 0;
  }
}

// Llamar a la función secondTick() cada segundo
setInterval(secondTick, 1000);
