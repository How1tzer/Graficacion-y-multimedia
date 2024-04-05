function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  //framerate
  frameRate(1);
  // Puntos
  let x1 = 100;
  let y1 = 100;
  let x2 = 300;
  let y2 = 300;

  // Cálculo de la pendiente (m) y el punto de intersección con el eje y (b)
  let m = (y2 - y1) / (x2 - x1);
  let b = y1 - m * x1;

  // Línea verde (ecuación punto-pendiente)
  stroke(0, 255, 0); // Verde
  line(x1, y1, x2, y2);

  // Línea azul (función line de p5.js) ligeramente desplazada hacia la derecha
  stroke(0, 0, 255); // Azul
  line(x1 + 50, y1, x2 + 50, y2); // Ajusta las coordenadas según tus preferencias

  
  print(`Pendiente (m): ${m}`);
  print(`Punto de intersección (b): ${b}`);
}
