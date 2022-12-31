
class SunStroke {
  
  constructor(x1,y1,x2,y2) {
    this.position1 = createVector(x1,y1);
    this.position2 = createVector(x2,y2);
  }
  
  update(x1,y1,x2,y2) {
    this.position1 = createVector(x1,y1);
    this.position2 = createVector(x2,y2);
  }

  draw() {
    stroke("#FFFFFF");
    
    line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
    
    noStroke();
    //circle(this.position1.x,this.position1.y,10);
    //circle(this.position2.x,this.position2.y,10);
  }
  
  
}
