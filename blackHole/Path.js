class Path {
      
    constructor(x, y, i) {
    }

    run(time) {
        var t = 0;
        console.log(time)
        points = [];
        t = Math.PI;
        translate(width/2, height/2)
        scale(4,4);
        noFill();
        strokeWeight(.5)
        stroke(255)
        // circle(0 + sin(time)*100+50, 0,200)
        noFill()
        rotate(time+HALF_PI)
        strokeWeight(.3)
        stroke(255,255,255,150)
        oldP = new p5.Vector(sin(t), cos(t));
        
        beginShape();
        for(var i = 0; i< 5000; i++){
            
            var x = sin(t);
            var y = cos(t);
            
            var transition = max(min(map(y, -.3, .3, 0, 1), 1), 0);
            transition = ParametricBlend(transition);
            

        

             x*=1+transition*(.5 + t*0.0005);
             y*=1-transition*.5; 
             

            
            var newP = new p5.Vector(x, y);
            points.push(newP);
            var mult=t/(2.0+time)

            var transition2 = 0;
            var pNoise = 1+pow(noise(newP.x*mult/100.0+1000,newP.y*mult/100.0+1000, 1-t/500.0 + time*10.0),6)/3.0 //(1-transition2)*pow(noise(newP.x*mult/20.0+1000,newP.y*mult/20.0+1000, 1-t/500.0 + time/100.0),6)*3*t/500+1;
            var xcos = 1*cos(t/100.0+time*10.0)
            var ycos = 1*sin(t/100.0+time*10.0)

            pNoise = 1;
            xcos = 1;
            ycos = 1;
            vertex(newP.x*mult * pNoise + xcos, newP.y*mult * pNoise + ycos);
            oldP = newP.copy();
            t += .02 + time*1;
        }
        endShape();

        // save("mySVG.svg")  
    }
}