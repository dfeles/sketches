class Block {
    constructor(x, y, i) {
        this.originX = x;
        this.originY = y;
        this.index = i;
        this.cells = [];

        this.startTime = time;


        for(var i = 0; i< resolution; i++){

            let cell = new Cell(this.originX, this.originY, i, this.index);
            this.cells.push(cell)
        }
    }

    run() {
        var t = 0;
        this.points = [];
        t = Math.PI;
        stroke(255,255,255,150);
        
        noFill();
        
        // fill(255);
        // beginShape();
        // for(var i = 0; i< this.points.length; i++){
        //     vertex(this.points[i].x, this.points[i].y)
        // }
        // endShape();

        // beginShape(TRIANGLES);
        beginShape(POINTS);

        

        for(var i = 0; i< this.cells.length; i++){
            var cell = this.cells[i];
            if(cell.isDead){
                // May the Lawd receive its soul.
            } else {
                cell.update(i, this.originX, this.originY);
            }
            this.points.push(new p5.Vector(cell.x, cell.y));
            cell.run()

            t += .02 + (time-this.startTime)*1;
        }
        endShape();
        
        

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