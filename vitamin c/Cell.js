class Cell {
    constructor(x, y, i, blockIndex) {
        this.x = x;
        this.y = y;
        this.index = i;
        this.isDead = false;
        this.blockIndex = blockIndex;

        this.damage = 0;
    }

    run() {

        var myTime = time - blocks[this.blockIndex].startTime;

        colorMode(HSB, 255);
        var hue = map(this.index, 0, resolution, 0, 360)

        let c = color(hue, cos(myTime/50 + 3)*10 + min(time/4, 100), 200);
        stroke(c)
        strokeWeight(noise(this.x/10, this.y/10)+.5);
        vertex(this.x, this.y);
    }
    update(i, originX, originY) {
        if (this.isDead) return;
        var myTime = time - blocks[this.blockIndex].startTime;

        var x = sin(i/resolution*Math.PI*2 + (noise(this.x, this.y)-.5)/50)*(myTime-this.damage) + originX;
        var y = cos(i/resolution*Math.PI*2 + (noise(this.x, this.y)-.5)/50)*(myTime-this.damage) + originY;
        
        var newP = new p5.Vector(x, y);
        this.updatePos(newP);

        this.damage += noise(x/10,y/10)/5
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