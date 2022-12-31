
var oldP;
var points = []

var blocks = []

var resolution = 720;

function setup() {
  pixelDensity(3.0);
  const css = getComputedStyle(canvas.parentElement),
  marginWidth  = round( float(css.marginLeft) + float(css.marginRight)  ),
  marginHeight = round( float(css.marginTop)  + float(css.marginBottom) ),
  w = windowWidth - marginWidth, h = windowHeight - marginHeight;
  createCanvas(w, h);
  // createCanvas(w, h,WEBGL);
  // createCanvas(w, h, SVG);

  let block = new Block(0,0,0);
  let block2 = new Block(100,0,1);
  let block3 = new Block(250,-250,2);

  blocks.push(block)
  blocks.push(block2)
  blocks.push(block3)

  
  background(3);
}

var time = 0.0;
function draw() {
  translate(width/2, height/2)
  scale(.5,.5)
  blocks.forEach(function(block){
    block.run(time)
  })

  time += 1;
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

  let block = new Block(mouseX*2-width,mouseY*2-height, blocks.length);
  blocks.push(block)
  //saveSvg
}

function saveSvg() {

  const css = getComputedStyle(canvas.parentElement),
  marginWidth  = round( float(css.marginLeft) + float(css.marginRight)  ),
  marginHeight = round( float(css.marginTop)  + float(css.marginBottom) ),
  w = windowWidth - marginWidth, h = windowHeight - marginHeight;
  createCanvas(w, h, SVG);
  draw();


  save("mySVG.svg");

}