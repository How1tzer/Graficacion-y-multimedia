let inputHora;
let horaLaPaz = 0;
let horaCDMX = 0;
let horaBarcelona = 0;
let minutosLaPaz = 0;
let minutosCDMX = 0;
let minutosBarcelona = 0;
let segundos = 0;

function setup() {
  createCanvas(600, 400); // Aumentamos la altura del lienzo para dejar espacio para los elementos debajo de los relojes
  
  // Dibujar relojes
  let offsetY = 160; // Desplazamiento vertical para dejar espacio para los títulos de los relojes
  let relojHeight = 120; // Altura de los relojes
  let relojY = height / 2 - relojHeight / 2; // Posición vertical de los relojes

   // Obtener la hora actual
   let horaActual = hour();
   let minutoActual = minute();
 
   // Establecer los valores iniciales de las horas y minutos
   horaLaPaz = horaActual;
   horaCDMX = (horaActual + 1) % 24; // Ciudad de México tiene 1 hora más
   horaBarcelona = (horaActual + 8) % 24; // Barcelona tiene 8 horas más
   minutosLaPaz = minutoActual;
   minutosCDMX = minutoActual;
   minutosBarcelona = minutoActual;
  
  dibujarReloj(width / 4, relojY, "La Paz", horaLaPaz, minutosLaPaz, puntoPendiente);
  dibujarReloj(width / 2, relojY, "Ciudad de México", horaCDMX, minutosCDMX, dda);
  dibujarReloj(width * 3 / 4, relojY, "Barcelona", horaBarcelona, minutosBarcelona, bresenham);

  // Calcular la posición central en el eje X para el input y el botón
  let centerX = width / 2;
  let inputY = relojY + relojHeight + offsetY; // Posición vertical del input
  
  // Crear input para la hora
  inputHora = createInput();
  inputHora.position(window, inputY-20); // Centramos el input horizontalmente y lo posicionamos debajo de los relojes
  
  // Crear botón para actualizar relojes
  let boton = createButton('Actualizar');
  boton.position(window, inputY + inputHora.height); // Centramos el botón horizontalmente y lo posicionamos debajo del input
  boton.mousePressed(actualizarHoras);
}

function draw() {
  background(255);
  
  // Dibujar relojes
  dibujarReloj(width / 4, height / 2, "La Paz", horaLaPaz, minutosLaPaz, puntoPendiente);
  dibujarReloj(width / 2, height / 2, "Ciudad de México", horaCDMX, minutosCDMX, dda);
  dibujarReloj(width * 3 / 4, height / 2, "Barcelona", horaBarcelona, minutosBarcelona, bresenham);
}

function actualizarHoras() {
  // Obtener la hora y los minutos del input y convertirlos a números
  let horaInput = inputHora.value().split(":");
  let hora = int(horaInput[0]);
  let minuto = int(horaInput[1]);

  // Verificar si la entrada es válida
  if (isNaN(hora) || isNaN(minuto) || hora < 0 || hora > 23 || minuto < 0 || minuto > 59) {
    alert("Por favor ingrese una hora válida en formato HH:MM.");
    // Limpiar el input
    inputHora.value("");
    return; // Salir de la función si la entrada no es válida
  }

  // Asignar horas y minutos a los relojes
  horaLaPaz = hora;
  horaCDMX = (hora + 1) % 24; // Ciudad de México tiene 1 hora más
  horaBarcelona = (hora + 8) % 24; // Barcelona tiene 8 horas más

  minutosLaPaz = minuto;
  minutosCDMX = minuto;
  minutosBarcelona = minuto;
}


function obtenerMinutos() {
  return minute();
}

function dibujarReloj(x, y, titulo, hora, minutos, algoritmoDibujo) {
  textAlign(CENTER);
  textSize(18);
  text(titulo, x, y - 60);

  let radio = 50;
  noFill();
  stroke(0);
  strokeWeight(2);
  algoritmoDibujo(x, y, radio);

  let horasAngulo = map(hora % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let minutosAngulo = map(minutos, 0, 60, 0, TWO_PI) - HALF_PI;
  let segundosAngulo = map(segundos, 0, 60, 0, TWO_PI) - HALF_PI;

  dibujarManecilla(x, y, radio * 0.5, horasAngulo, 4, color(255, 0, 0));
  dibujarManecilla(x, y, radio * 0.8, minutosAngulo, 2, color(0, 0, 255));
  dibujarManecilla(x, y, radio * 0.8, segundosAngulo, 1, color(0, 255, 0));

  textSize(16);
  text(nf(hora, 2) + ':' + nf(minutos, 2), x, y + 80);
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
    // Incrementar los minutos cuando los segundos lleguen a 60
    minuteTick();
  }
}

// Incrementar los minutos cada vez que los segundos lleguen a 60
function minuteTick() {
  // Incrementar los minutos
  minutosLaPaz = (minutosLaPaz + 1) % 60;
  minutosCDMX = (minutosCDMX + 1) % 60;
  minutosBarcelona = (minutosBarcelona + 1) % 60;

  // Verificar si es necesario incrementar la hora
  if (minutosLaPaz === 0) {
    horaLaPaz = (horaLaPaz + 1) % 24;
    horaCDMX = (horaCDMX + 1) % 24;
    horaBarcelona = (horaBarcelona + 1) % 24;
  }
}


// Llamada a la funcion que marca los segundos
setInterval(secondTick, 1000);
