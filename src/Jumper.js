function Jumper(canvas, util) {
    this.i_xPos = canvas.width/2;
    this.i_yPos = canvas.height * 0.7;
    this.i_xAcc = 0;
    this.i_yAcc = 3;
    this.i_gravity = 2;
    this.i_maxJumperYPos = 0; //canvas.height * 0.5;
    this.i_score = 0;
    this.i_regenerateScore = 0;
    this.i_friction = 1;
    this.b_boosting = false;
    this.o_lastSlat = null;
    this.util = util;
    this.i_yShift = 6;
    this.i_yMaxacceleration = 10;

//    this.moveRight();
//    this.moveLeft();

    this.image = new Image();
    this.image.src = "../img/human.png";

    this.i_jumperWidth = this.image.width;
    this.i_jumperHeight = this.image.height;


    // this.drawBackground = function (backgroundImg) {

    //todo add movescene function to updateJumper args
    this.updateJumper = function (jumperObj, a_slats) {
        if (jumperObj.i_xAcc > jumperObj.i_friction) {
            jumperObj.i_xAcc -= jumperObj.i_friction;
        } else if (jumperObj.i_xAcc < -jumperObj.i_friction) {
            jumperObj.i_xAcc += jumperObj.i_friction;
        } else {
            jumperObj.i_xAcc = 0;
        }
        jumperObj.i_xPos += jumperObj.i_xAcc;


        if (jumperObj.i_yAcc >= 0) {
            jumperObj.b_boosting = false;
        }

        if (this.falling(jumperObj, a_slats)) {
            jumperObj.i_yPos = jumperObj.o_lastSlat.i_ySlatPos - this.util.getSlatHeight(a_slats[oneSlat]) - this.i_jumperHeight;
            jumperObj.b_boosting = true;
            jumperObj.i_yAcc = -30;
            jumperObj.i_xAcc = 0;
        } else {
            jumperObj.i_yAcc += jumperObj.i_gravity;
            if (jumperObj.b_boosting && jumperObj.i_yPos + jumperObj.i_yAcc <= jumperObj.i_maxJumperYPos) {
                if (jumperObj.i_yPos <= jumperObj.i_maxJumperYPos) {
                    this.moveScene(jumperObj.i_yAcc, a_slats);
                } else {
                    //this.moveScene(this.i_maxJumperYPos - jumperObj.i_yPos, a_slats, a_slat_divs);
                    this.moveScene(jumperObj.i_yAcc - (jumperObj.i_maxJumperYPos - jumperObj.i_yPos), a_slats);
                    jumperObj.i_yPos += jumperObj.i_maxJumperYPos - jumperObj.i_yPos;
                }
            } else {
                jumperObj.i_yPos += jumperObj.i_yAcc;
            }
        }

    };


    this.falling = function (jumperObj, a_slats) {
        for (oneSlat in a_slats) {
            if (!this.b_boosting) {
                if (jumperObj.i_xPos + jumperObj.i_jumperWidth > a_slats[oneSlat].i_xSlatPos
                    && jumperObj.i_xPos < a_slats[oneSlat].i_xSlatPos + this.util.getSlatWidth(a_slats[oneSlat])
                    && jumperObj.i_yPos <= a_slats[oneSlat].i_ySlatPos - this.util.getSlatHeight(a_slats[oneSlat])
                    && jumperObj.i_yPos + jumperObj.i_yAcc + jumperObj.i_jumperHeight>=
                            a_slats[oneSlat].i_ySlatPos - this.util.getSlatHeight(a_slats[oneSlat])) {

                    jumperObj.o_lastSlat = a_slats[oneSlat];
                    return true;
                }
            }
        }
        return false;
    };
}