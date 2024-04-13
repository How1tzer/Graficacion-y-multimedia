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

  //línea vertical 
  let y1 = y - halfSize;
  let x1 = x;
  let m = 0; 
  let x2 = x;
  let y2 = y + halfSize;
  line(x1, y1, x2, y2);

  //línea horizontal 
  y1 = y;
  x1 = x - halfSize;
  m = 0; 
  x2 = x + halfSize;
  y2 = y;
  line(x1, y1, x2, y2);

  // Dibujar líneas perpendiculares 
  let sqrt2 = sqrt(2);
  let x3 = x - quarterSize / sqrt2;
  let y3 = y - quarterSize / sqrt2;
  let x4 = x + quarterSize / sqrt2;
  let y4 = y + quarterSize / sqrt2;
  line(x3, y3, x4, y4);
  let x5 = x - quarterSize / sqrt2;
  let y5 = y + quarterSize / sqrt2;
  let x6 = x + quarterSize / sqrt2;
  let y6 = y - quarterSize / sqrt2;
  line(x5, y5, x6, y6);
}
