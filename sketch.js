function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);

  let tamanoCelda = width / 8; 

  for (let fila = 0; fila < 8; fila++) {
    for (let col = 0; col < 8; col++) {
      if ((fila + col) % 2 === 0) {
        fill('white');
      } else {
        fill('black');
      }
      rect(col * tamanoCelda, fila * tamanoCelda, tamanoCelda, tamanoCelda);
    }
  }
}