var sunStrokes = [];

class SunStroke {
  
  constructor(x1,y1,x2,y2) {
    this.position1 = createVector(x1,y2);
    this.position2 = createVector(x2,y2);
  }

  draw() {
    line(this.position1, this.position2);
  }
  
  
}

function setup() {

  background(0);
  for(i=0; i<= 360; i++) {
    var radI = i/360*PI;
    var stroke = new SunStroke(sin(radI), cos(radI), sin(radI)*5, cos(radI)*5);
    sunStrokes.push(stroke);
  }
}


function draw() {
  sunStrokes.forEach((stroke, i)=>{
    stroke.draw();
  })

}

var time = 0;
