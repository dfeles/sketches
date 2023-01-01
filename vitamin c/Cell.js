class Cell {
    constructor(x, y, i, blockIndex, bw) {
        this.x = x;
        this.y = y;
        this.index = i;
        this.isDead = false;
        this.blockIndex = blockIndex;
        this.bw = bw

        this.damage = 0;
    }

    run() {
        if (this.isDead) return;

        var myTime = time - blocks[this.blockIndex].startTime;

        colorMode(HSB, 255);
        var hue = map(this.index, 0, resolution, 0, 360)
        hue = (this.index + sin(time/100)*10 + sin(time/10)*10 + sin(time/2)*100) % 360;
        // hue += noise(this.x/100, this.y/100)*10

        var sat = pow(cos(myTime),10)*100 + 100;
        sat = this.bw ? 0 : sat;

        let c = color(hue, sat, 250);
        stroke(c)
        strokeWeight(this.damage/100);
        vertex(this.x, this.y);
    }
    update(i, originX, originY) {
        if (this.isDead) return;
        var myTime = time - blocks[this.blockIndex].startTime;

        var x = sin(i/resolution*Math.PI*2 + (noise(this.x/10, this.y/10)-.5)/50)*(myTime-this.damage) + originX;
        var y = cos(i/resolution*Math.PI*2 + (noise(this.x/10, this.y/10)-.5)/50)*(myTime-this.damage) + originY;

        x+= (noise(this.x/100, this.y/100)-.5)*10
        y+= (noise(this.x/100, this.y/100)-.5)*10
    
        var newP = new p5.Vector(x, y);
        this.updatePos(newP);

        this.damage += noise(x,y)
    }
    updatePos(newP) {

        for(var n = 0; n<blocks.length; n++){
            if (n == this.blockIndex) continue;

            if(blocks[n].inside(newP)){
                this.isDead = true;
                return;
            }
        }

        this.x = newP.x;
        this.y = newP.y;
    }
    
}