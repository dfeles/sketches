
var oldP;
var points = []

var paths = []
function setup() {
  const css = getComputedStyle(canvas.parentElement),
  marginWidth  = round( float(css.marginLeft) + float(css.marginRight)  ),
  marginHeight = round( float(css.marginTop)  + float(css.marginBottom) ),
  w = windowWidth - marginWidth, h = windowHeight - marginHeight;
  createCanvas(w, h);
  // createCanvas(w, h, SVG);

  let path = new Path(0,0,80000);
  paths.push(path)

  
}

var time = 0.0;
function draw() {
  background(3);
  paths.forEach(function(path){
    path.run(time)
  })

  time += 0.001;
}


function bezierBlend(t) {
    return t * t * (3.0 - 2.0 * t);
}
function ParametricBlend( t)
{
    var sqt = t * t;
    return sqt / (2.0 * (sqt - t) + 1.0);
}



function mouseClicked() {
  console.log('majom');

  const css = getComputedStyle(canvas.parentElement),
  marginWidth  = round( float(css.marginLeft) + float(css.marginRight)  ),
  marginHeight = round( float(css.marginTop)  + float(css.marginBottom) ),
  w = windowWidth - marginWidth, h = windowHeight - marginHeight;
  createCanvas(w, h, SVG);
  draw();


  save("mySVG.svg");

}
