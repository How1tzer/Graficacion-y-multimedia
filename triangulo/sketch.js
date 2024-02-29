function setup() {
  let canvas = createCanvas(800, 800);

  //Codigo  que ocupe para centrar el canvas
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function draw() {
  background(220);
  strokeWeight(3);
  
  //niveles 
  let numNiveles = 10; 

  // Coordenadas del centro del triángulo
  let centerX = width / 2;
  let centerY = 300; 

  // Distancia vertical entre niveles
  let distanciaVertical = 15;

  
  for (let nivel = 0; nivel < numNiveles; nivel++) {
    // Calcular la posición horizontal del primer punto en el nivel actual
    let startX = centerX - (nivel * distanciaVertical) / 2;

    // Dibujar puntos en el nivel actual
    for (let punto = 0; punto <= nivel; punto++) {
      let x = startX + punto * distanciaVertical;
      let y = centerY + nivel * (distanciaVertical * sqrt(3) / 2);
      point(x, y);
    }
  }
}