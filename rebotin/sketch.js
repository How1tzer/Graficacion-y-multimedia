//Declarar variables aburrido como siempre
let x, y; 
let speedX, speedY; 
let diameter = 50; 

function setup() {
  //Canvas 
  createCanvas(800, 800); 
  //Incio de posicion :P
  x = width / 3; 
  y = height / 9; 

  //Velocidad del Circulo
  speedX = 1; 
  speedY = 1; 
}

function draw() {
  background(30); 

  // Mueve el círculo
  x += speedX;
  y += speedY;

  // Rebote Horizontal
  if (x + diameter / 2 >= width || x - diameter / 2 <= 0) {
    speedX *= -1; 
  }

  // Rebote Vertica;
  if (y + diameter / 2 >= height || y - diameter / 2 <= 0) {
    speedY *= -1; 
  }

  //Circulo
  ellipse(x, y, diameter);

  frameRate(60);
}
