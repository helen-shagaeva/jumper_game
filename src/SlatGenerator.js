function SlatGenerator(canvas, util) {
    this.canvas = canvas;
    this.util = util;
    this.max = 20000;

    this.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.slatsGenerate = function(slats, generatedHeight, score, first) {

        var count = 5 - score * 5 / this.max; // для мусора

        var last = slats[slats.length-1];

        var p = score * (1 / this.max);

        generatedHeight *= -1;

        while(last.i_ySlatPos > generatedHeight) {

            var slat_type = 0;
            if(Math.random() < p) {
                slat_type = 1;
            }
            var maxJump = (this.canvas.height * 0.2342);

            var k1 = (maxJump/2) / this.max;
            var k = k1 * score; // for change amount of slats
            var h = (last.i_ySlatPos - this.getRandomInt(0, maxJump));

            var y= this.getRandomInt((last.i_ySlatPos - k - maxJump/2), h);

            var x = 0;
            var direction = this.getRandomInt(0, 10);
            if ((x + 50) > (this.canvas.width - 10)) { // to left
                direction = 8;
            }
            if (direction < 5) {    // right
                x = this.getRandomInt(last.i_xSlatPos, (last.i_xSlatPos + 200));
                if(x > (this.canvas.width - this.util.getSlatWidth(this.canvas))) {
                    x = x - (last.i_xSlatPos + 200);
                }
                if (x < 0) {
                    x = x * (-1);
                }
            } else {    // left
                x = this.getRandomInt((last.i_xSlatPos - 200), last.i_xSlatPos);
                if (x < 0) {
                    x = x * (-1);
                }
                if(x > (this.canvas.width - this.util.getSlatWidth(this.canvas))) {
                    x = x - (last.i_xSlatPos + 200);
                }
            }

            var newSlat = new Slat(x, y, slat_type);
            slats.push(newSlat);

            newSlat.t = "main";

            last = newSlat;
        }

        last = slats.pop();

        var floor = this.canvas.height;
        if(!first) {
            floor = 0;
        }

        for (var i = 0; i < count; i++) {       // мусор

            var slat_type = 0;
            if(Math.random() < p) {
                slat_type = 1;
            }
            var y = this.getRandomInt((generatedHeight - 10), floor);
            if(y > floor) {
                y = y - floor;
            }
            if(y < (generatedHeight - 10))  {
                y = y + ((generatedHeight - 10) - y);
            }
            var x = this.getRandomInt(0, (this.canvas.width - this.util.getSlatWidth(this.canvas)));
            if(x > (this.canvas.width - this.util.getSlatWidth(this.canvas))) {
                x = x - (this.canvas.width - this.util.getSlatWidth(this.canvas));
            }
            if (x < 0) {
                x = x * (-1);
            }

            var newSlat = new Slat(x, y, slat_type);
            slats.push(newSlat);

            newSlat.t = "musor";
        }

        slats.push(last);
    }
}