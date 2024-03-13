let circles = []; // Arreglo para almacenar las esferas

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(30);
  frameRate(60);

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

    // Detección de colisión entre pelotas
    for (let j = i + 1; j < circles.length; j++) {
      let otherCircle = circles[j];
      let distance = dist(circle.x, circle.y, otherCircle.x, otherCircle.y);
      if (distance < circle.diameter / 2 + otherCircle.diameter / 2) {
        let angle = atan2(otherCircle.y - circle.y, otherCircle.x - circle.x);
        circle.speedX = -cos(angle);
        circle.speedY = -sin(angle);
        otherCircle.speedX = cos(angle);
        otherCircle.speedY = sin(angle);
      }
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
