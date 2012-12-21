function Drawer(canvas, points_canvas) {
    this.canvas = canvas;
    this.points_canvas = points_canvas;
    this.context = this.canvas.getContext('2d');

    this.drawBackground = function (backgroundImg) {
        for (var i = 0; i * backgroundImg.height < this.canvas.height; i++) {

            for (var j = 0; j * backgroundImg.width < this.canvas.width; j++) {
                this.context.drawImage(backgroundImg, j * backgroundImg.width, i * backgroundImg.height,
                    backgroundImg.width, backgroundImg.height);
            }
        }

    };

    this.drawJumper = function (jumper, util) {
        if (util.jumperImage != null) {

            this.context.drawImage(util.jumperImage, jumper.i_xPos, jumper.i_yPos, util.getJumperWidth(this.canvas), util.getJumperHeight(this.canvas));
        }
    };

    this.drawSlats = function (util, slats) {
        // todo draw image,s slat for each slats

        for (var i = 0; i < slats.length; i++) {
            if(slats[i].slatType == 1) {
                var x = slats[i].i_xSlatPos;
                if((x + util.getSlatWidth(this.canvas) >= this.canvas.width)) {
                    slats[i].direction = true;
                } else if(x <= 0){
                    slats[i].direction = false;
                }
                if(slats[i].direction) {
                    slats[i].i_xSlatPos -= slats[i].speed;
                } else {
                    slats[i].i_xSlatPos += slats[i].speed;
                }
            }
            if(slats[i].slatType != 4) {
                this.context.drawImage(util.images[slats[i].slatType], slats[i].i_xSlatPos, slats[i].i_ySlatPos,
                    util.getSlatWidth(this.canvas), util.getSlatHeight(this.canvas));
            }
        }
    };
    this.drawPoitnsCanvas = function(pt) {
        var can = document.getElementById("canvas1");
        var context = can.getContext("2d");
        context.clearRect(0,0,can.width, can.height);
        var font_w = (can.width / 4);
        context.font = font_w + "px Arial";
        context.fillStyle = "#ffffff";
        context.fillRect(11,11,(can.width),50);
        context.strokeText(pt,20,40);
        context.strokeStyle = "#000";
    }
}