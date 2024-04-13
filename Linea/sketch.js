function setup() {
  createCanvas(800, 800);
  background(0);
  drawAsterisk(400, 400, 200);
}

function drawAsterisk(x, y, size) {
  // longitud de las líneas
  let halfSize = size / 2;
  let quarterSize = size / 2;

  // color de las líneas
  stroke(255);

  // Dibujar línea vertical usando DDA
  ddaLine(x, y - halfSize, x, y + halfSize);

  // Dibujar línea horizontal usando DDA
  ddaLine(x - halfSize, y, x + halfSize, y);

  // Dibujar líneas perpendiculares usando DDA
  let sqrt2 = sqrt(2);
  let x3 = x - quarterSize / sqrt2;
  let y3 = y - quarterSize / sqrt2;
  let x4 = x + quarterSize / sqrt2;
  let y4 = y + quarterSize / sqrt2;
  ddaLine(x3, y3, x4, y4);
  let x5 = x - quarterSize / sqrt2;
  let y5 = y + quarterSize / sqrt2;
  let x6 = x + quarterSize / sqrt2;
  let y6 = y - quarterSize / sqrt2;
  ddaLine(x5, y5, x6, y6);
}

function ddaLine(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps;
  let xIncrement, yIncrement;

  // Determinar el número de pasos basado en la distancia más larga (horizontal o vertical)
  if (abs(dx) > abs(dy)) {
    steps = abs(dx);
  } else {
    steps = abs(dy);
  }

  // Calcular incrementos para cada eje
  xIncrement = dx / steps;
  yIncrement = dy / steps;

  let x = x1;
  let y = y1;

  // Dibujar puntos en la línea usando el algoritmo DDA
  for (let i = 0; i < steps; i++) {
    point(round(x), round(y));
    x += xIncrement;
    y += yIncrement;
  }
}
