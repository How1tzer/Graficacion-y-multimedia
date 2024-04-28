function setup() {
  createCanvas(600, 400);
  background(0); 
  let xc = width / 2;
  let yc = height / 2;
  let r = 150; 
  drawCircle(xc, yc, r);
}

function drawCircle(xc, yc, r) {
  stroke(255); 
  strokeWeight(2); 
  let x = 0;
  let y = r;
  let p = 5 / 4 - r;
  
  while (x <= y) {
    point(xc + x, yc + y);
    point(xc - x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc + y, yc + x);
    point(xc - y, yc + x);
    point(xc + y, yc - x);
    point(xc - y, yc - x);

    x++;
    if (p < 0) {
      p += 2 * x + 1;
    } else {
      y--;
      p += 2 * (x - y) + 1;
    }
  }
}