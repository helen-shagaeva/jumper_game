/**
 * User: arlekino
 * Date: 9/16/12
 * Time: 5:44 PM
 */

function Jumper() {
    this.gravity = 0.3;
    this.step = 190;
    this.xpos = 300;
    this.ypos = 400;
    this.xvel = 0;
    this.yvel = 0;
    this.xacc = 0;
    this.yacc = 3;
    // Start slat
    this.last_slat = new Slat(300, 570);
    this.boosting = false;
    this.updateJumper = function (jumperObj, slats) {
        // Navigate
        jumperObj.xvel += jumperObj.xacc;
        jumperObj.xpos += jumperObj.xvel;

        // Boost
        if (jumperObj.boosting) {
            jumperObj.yacc = -5;
        }

        // TODO Make true boosting


        this.falling(slats);


        // TODO Do it In loop with all slat's
        if (jumperObj.ypos >= (jumperObj.last_slat.ypos - this.last_slat.height_of_slat)) {
            jumperObj.ypos = this.last_slat.ypos - jumperObj.step;
            jumperObj.yvel = 0;
            jumperObj.yacc = 0;
            jumperObj.xacc = 0;
            jumperObj.xvel = 0;
        }
    };
    this.falling = function (slats) {
        // Fall
        var changeSlat = false;
        for (oneSlat in slats) {
            if (!this.boosting) {
                if (this.xpos >= slats[oneSlat].xpos && this.xpos <= slats[oneSlat].xpos + slats[oneSlat].width
                            && this.ypos <= slats[oneSlat].ypos - slats[oneSlat].height_of_slat
                            && this.ypos >= slats[oneSlat].ypos - this.gravity - this.yacc- slats[oneSlat].height_of_slat) {
                    changeSlat = true;
                    jumperObj.last_slat = slats[oneSlat];
                    jumperObj.ypos = slats[oneSlat].ypos - slats[oneSlat].height_of_slat;
                    jumperObj.ypos = this.last_slat.ypos - jumperObj.step;
                    jumperObj.yvel = 0;
                    jumperObj.yacc = 0;
                    jumperObj.xacc = 0;
                    jumperObj.xvel = 0;
                }
            }
        }
        if (!changeSlat) {
            this.yacc += this.gravity;
            this.yvel += this.yacc;
            this.ypos += this.yvel;
        }
    };
}