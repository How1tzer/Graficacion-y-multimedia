let circles = []; // Arreglo para almacenar las esferas

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(30);

  //Dibujador de esferas-inador
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    ellipse(circle.x, circle.y, circle.diameter);
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    // La formula de colision que encontre en un foro
    if (circle.x + circle.diameter / 2 >= width || circle.x - circle.diameter / 2 <= 0) {
      circle.speedX *= -1;
    }
    if (circle.y + circle.diameter / 2 >= height || circle.y - circle.diameter / 2 <= 0) {
      circle.speedY *= -1;
    }
  }
  console.log(circles);
}

function mouseClicked() {
  let newCircle = {
    x: mouseX,
    y: mouseY,
    diameter: 50,
    speedX: random(-2, 2),
    speedY: random(-2, 2)
  };
  circles.push(newCircle);
}