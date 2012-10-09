/**
 * User: arlekino
 * Date: 9/16/12
 * Time: 5:44 PM
 */
function Jumper() {
    //Value for jumper's phisics
    this.gravity = 0.3;

    // Value
    this.xpos = 300;
    this.ypos = 300;
    this.xvel = 0;
    this.yvel = 0;
    this.xacc = 0;
    this.yacc = 3;
    this.last_slat = new Slat(300, 570);
    this.boosting = false;
    this.updateJumper = function (jumperObj, slats) {

        winSizes = getWinSize();

        jumperObj.xvel += jumperObj.xacc;
        jumperObj.xpos += jumperObj.xvel;

        // Boost
        if (jumperObj.yacc >= 0) {
            jumperObj.boosting = false;
        }

        if(this.falling(slats)) {
            jumperObj.ypos = this.last_slat.ypos - slats[oneSlat].height_of_slat - 30;
            jumperObj.boosting = true;
            jumperObj.yacc = -3;
            jumperObj.yvel = 0;
            jumperObj.xacc = 0;
            jumperObj.xvel = 0;
        }


//        if (jumperObj.ypos + jumperObj.yvel >= (jumperObj.last_slat.ypos - this.last_slat.height_of_slat)) {
//
//        }


        //�����, ����� �������� ����� ���� ��� ����, ���� ��� ��� ��� ������ ��������.
        document.onmousedown = function(e) {
            //var direction=mouseShowHandler(e).x<winSizes.myWidth/2 ? 'leftside' : 'rightside';
            if (mouseShowHandler(e).x < winSizes.myWidth / 2) {
                jumperObj.xvel -= 3;
                if (jumperObj.xpos <= -20) jumperObj.xpos = winSizes.myWidth - 40;
                //--������
            }
            else if (mouseShowHandler(e).x > winSizes.myWidth / 2) {
                jumperObj.xvel += 3;
                if (jumperObj.xpos >= winSizes.myWidth - 60) jumperObj.xpos = -40;
            }
        }

        document.onkeydown = function(e) {
            b_keyPressed = true;
            if (b_keyPressed && getKeyCode(e) == "37") {
                //alert('left');
                jumperObj.xvel -= 3;
                if (jumperObj.xpos <= -20) jumperObj.xpos = winSizes.myWidth - 40;
            }
            else if (b_keyPressed && getKeyCode(e) == "39") {
                //alert('right');
                jumperObj.xvel += 3;
                if (jumperObj.xpos >= winSizes.myWidth - 60) jumperObj.xpos = -40;
            }
        }
        document.onkeyup = function() {
            b_keyPressed = false;
        }
    };
    this.falling = function (slats) {
        // Fall
        var changeSlat = false;
        for (oneSlat in slats) {
            if (!this.boosting) {
                if (this.xpos >= slats[oneSlat].xpos && this.xpos <= slats[oneSlat].xpos + slats[oneSlat].width
                    && this.ypos <= slats[oneSlat].ypos - slats[oneSlat].height_of_slat
                    && this.ypos + this.yvel >= slats[oneSlat].ypos - this.yacc - slats[oneSlat].height_of_slat) {
                    //if (slats[oneSlat] != this.last_slat) {
                        changeSlat = true;
                        this.last_slat = slats[oneSlat];
                    //}
                }
            }
        }
        if (!changeSlat) {
            this.yacc += this.gravity;
            this.yvel += this.yacc;
            this.ypos += this.yvel;
            return false;
        } else {
            return true;
        }
    };
}