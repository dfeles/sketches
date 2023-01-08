class Block {
    constructor(x, y, i, bw) {
        this.originX = x;
        this.originY = y;
        this.index = i;
        this.cells = [];
        this.bw = bw;

        this.ageLeft = random(20,100);

        this.startTime = time;


        for(var i = 0; i< resolution; i++){

            let cell = new Cell(i, this.index);
            this.cells.push(cell)
        }
    }

    setup() {
        this.cells.forEach(cell=> {
            cell.setup();
        })
    }

    run() {
        if(this.ageLeft>0) {
            var t = 0;
            this.points = [];
            t = Math.PI;
            stroke(255,255,255,255);
            
            noFill();
            beginShape(POINTS);

            console.log(!this.cells[this.cells.length-1].isDead);
            if ( !this.cells[this.cells.length-1].isDead ) {
                this.points.push(new p5.Vector(this.cells[this.cells.length-1].x, this.cells[this.cells.length-1].y))
                this.cells[this.cells.length-1].run()
            };
            for(var i = 0; i< this.cells.length; i++){
                var cell = this.cells[i];
                if(cell.isDead){
                    // May the Lawd receive its soul.

                    endShape();
                    beginShape(POINTS);
                } else {
                    cell.update();
                }
                this.points.push(new p5.Vector(cell.x, cell.y));
                
                cell.run()
                t += .02 + (time-this.startTime)*1;
            }
            for(var i = 0; i< this.cells.length; i++){
            }

            if ( !this.cells[0].isDead ) {
                this.points.push(new p5.Vector(this.cells[0].x, this.cells[0].y))
                this.cells[0].run()
            };
            endShape();
            
        }
        this.ageLeft -= .1;

        // save("mySVG.svg")  
    }

    inside(point) {
        return this.insideCalc(point, this.points)
    }

    insideCalc(point, vs) {
        if(vs == undefined) return false;
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
        
        var x = point.x, y = point.y;
        
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].x, yi = vs[i].y;
            var xj = vs[j].x, yj = vs[j].y;
            
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        
        return inside;
    };
}