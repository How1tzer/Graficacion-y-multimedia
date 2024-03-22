let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(0);
  //fps
  frameRate(60);
  //Cancha
  drawDecorations();

  // Tablero
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(leftScore, width * 0.25, 50);
  text(rightScore, width * 0.75, 50);

  //jugadores y pelota
  leftPaddle.show();
  rightPaddle.show();
  
  leftPaddle.update();
  rightPaddle.update();
  
  ball.show();
  ball.update();
  
  checkCollisions();

}

function drawDecorations() {
  // Línea central
  stroke(255);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);

  // Círculos
  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(width / 2, height / 2, 100);
  ellipse(width / 2, height / 2, 10);

}

///////////////
///Colisiones//
///////////////
function checkCollisions() {
  
  if (ball.hitsPaddle(leftPaddle) || ball.hitsPaddle(rightPaddle)) {
    ball.vx *= -1;
  }
  
  if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= height) {
    ball.vy *= -1;
  }
  
  // Puntuación
  if (ball.x - ball.radius <= 0) {
    // El lado derecho anota
    rightScore++;
    ball.reset();
  } else if (ball.x + ball.radius >= width) {
    // El lado izquierdo anota
    leftScore++;
    ball.reset();
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2 - this.h / 2;
    this.isLeft = isLeft;
    this.x = isLeft ? 20 : width - 30;
    this.speed = 5;
    this.color = isLeft ? '#ff7c70' : '#98c0f6';
  }
  
  show() {
    fill(this.color); 
    rect(this.x, this.y, this.w, this.h, 10);
  }
  
  update() {
    if (this.isLeft) {
      if (keyIsDown(87) && this.y > 0) {
        this.y -= this.speed;
      } else if (keyIsDown(83) && this.y < height - this.h) {
        this.y += this.speed;
      }
    } else {
      if (keyIsDown(UP_ARROW) && this.y > 0) {
        this.y -= this.speed;
      } else if (keyIsDown(DOWN_ARROW) && this.y < height - this.h) {
        this.y += this.speed;
      }
    }
  }
}

class Ball {
  constructor() {
    this.radius = 10;
    this.reset();
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    // Fijamos las velocidades de rebote aquí
    this.vx = random(4, 4); // Cambié el rango para hacerlo más rápido
    this.vy = random(-3, 3);
    if (random() > 0.5) {
      this.vx *= -1;
    }
  }
  
  hitsPaddle(paddle) {
    if (this.x - this.radius < paddle.x + paddle.w &&
        this.x + this.radius > paddle.x &&
        this.y - this.radius < paddle.y + paddle.h &&
        this.y + this.radius > paddle.y) {
      return true;
    }
    return false;
  }
}
