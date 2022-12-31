var sunStrokes = [];

var lineNr = 50;
function setup() {

  for(i=0; i<= lineNr; i++) {
    var radI = i/lineNr*PI*2;
    var stroke = new SunStroke(sin(radI)*150 + 500, cos(radI)*150 + 500, sin(radI)*300 + 500, cos(radI)*300 + 500);
    sunStrokes.push(stroke);
    
    
    var radI = i/lineNr*PI*2 + .1;
    var stroke = new SunStroke(sin(radI)*150 * cos(radI)*5 + 500, cos(radI)*150 + 500, sin(radI)*300* cos(radI)*5 + 500, cos(radI)*300 + 500);
    sunStrokes.push(stroke);
  }
}

var time = 0;
function draw() {
  time += 0.005;
  createCanvas(displayWidth, displayHeight);
  background("#333333");
  strokeWeight(.1);
  sunStrokes.forEach((stroke, i)=>{
    
    var radI = i/lineNr*PI*2 + time;

    var sTime = sin(time);
    var cTime = cos(time);


    if (i%2 != 0) {
      var x1= sin(radI+cTime)*300 + 500
      var x2= sin(radI-cTime)*300 + 500
      
      var y1= cos(radI)*300 + 500
      var y2= cos(radI)*300 + 500
      
      
      stroke.update(x1, y1, x2, y2);  
    } else {
      
      var x1= sin(radI+cTime)*150 * sTime + 500  
      var x2= sin(radI+cTime)*150 * cTime + 500 + cos(radI*50+time*10)*5
      
      var y1= cos(radI+sTime)*150 * sTime + 500 
      var y2= cos(radI+sTime)*150 * cTime + 500 + cos(radI*50+time*10)*5
      
      stroke.update(x1, y1, x2, y2);  
    }
    
    
    stroke.draw();
  })

}

var time = 0;
