class Cell {
    constructor(i, blockIndex) {
        this.index = i;
        this.isDead = false;
        this.blockIndex = blockIndex;
        this.damage = 0;

        this.path = [];
    }

    setup() {
        this.block = blocks[this.blockIndex]
        this.bw = this.block.bw;
        this.x = this.block.originX;
        this.y = this.block.originY;
        this.originX = this.block.originX;
        this.originY = this.block.originY;
    }

    run() {
        if (this.isDead) return;

        var myTime = time - this.block.startTime;

        colorMode(HSB, 255);
        var hue = map(this.index, 0, resolution, 0, 360)
        hue = (this.index + sin(time/1000)*10 + sin(time/100)*10 + sin(time/100)*100) % 360;
        // hue += noise(this.x/100, this.y/100)*10

        var sat = pow(cos(myTime),10)*100 + 150;
        sat = this.bw ? 0 : sat;

        var b = pow(cos(myTime/10),10)*100;

        let c = color(hue, sat, 50, 255);
        stroke(c)
        fill(c)
        strokeWeight(2+time/100);
        vertex(this.x, this.y);

        noStroke()
        fill(255)
        circle(this.x, this.y, .5)
    }

    update(i) {
        if (this.isDead) return;
        var myTime = time - this.block.startTime;

        var x = sin(this.index/resolution*Math.PI*2 + (noise(this.x/10, this.y/10)-.5)/50)
        var y = cos(this.index/resolution*Math.PI*2 + (noise(this.x/10, this.y/10)-.5)/50)
        
        x *= (myTime-this.damage + this.index % 2 * 10);
        y *= (myTime-this.damage + this.index % 2 * 10);

        x += this.originX;
        y += this.originY;
        
        x+= (noise(this.x/100, this.y/100)-.5)*10
        y+= (noise(this.x/100, this.y/100)-.5)*10
    
        var newP = new p5.Vector(x, y);
        this.updatePos(newP);
        this.path.push(newP);

        this.damage += noise(x,y)-.5
    }


    updatePos(newP) {

        
        this.x = newP.x;
        this.y = newP.y;

        for(var n = 0; n<blocks.length; n++){
            if (n == this.blockIndex) continue;

            if(blocks[n].inside(newP)){
                this.isDead = true;
                return;
            }
        }
    }
    
}