function Jumper(canvas, util) {
    this.i_xPos = canvas.width/2;
    this.i_yPos = canvas.height * 0.7;
    this.i_xAcc = 0;
    this.i_yAcc = 3;
    this.i_gravity = 2;
    this.i_maxJumperYPos = canvas.height * 0.5;
    this.i_score = 0;
    this.i_regenerateHeight = 0;
    this.i_friction = 1;
    this.b_boosting = false;
    this.o_lastSlat = null;
    this.util = util;
    this.i_yShift = 6;
    this.i_yMaxacceleration = 10;
//  ���� �� ������
    this.point = 0;
	this.canvas = canvas;
    this.i_canvasHeight = canvas.height;
    this.i_jumperWidth = 0;
    this.i_jumperHeight = 0;

//    this.moveRight();
//    this.moveLeft();



    // this.drawBackground = function (backgroundImg) {

    //todo add movescene function to updateJumper args
    this.updateJumper = function (jumperObj, a_slats, scene) {
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
            //alert(jumperObj.i_yPos);
            //alert(jumperObj.o_lastSlat.i_ySlatPos - this.util.getSlatHeight(a_slats[oneSlat]) - this.i_jumperHeight);
            var moveHeight =  jumperObj.o_lastSlat.i_ySlatPos - this.i_jumperHeight - jumperObj.i_yPos;

            if (jumperObj.i_yPos + moveHeight <= jumperObj.i_maxJumperYPos) {
                if (jumperObj.i_yPos <= jumperObj.i_maxJumperYPos) {
                    jumperObj.preMoving(jumperObj, scene, a_slats, moveHeight);
                } else {
                    jumperObj.i_yPos += jumperObj.i_maxJumperYPos - jumperObj.i_yPos;
                    jumperObj.preMoving(jumperObj, scene, a_slats, moveHeight - (jumperObj.i_maxJumperYPos - jumperObj.i_yPos));
                }
            } else {
                jumperObj.i_yPos += moveHeight;
            }

            jumperObj.b_boosting = true;
            jumperObj.i_yAcc = -30;
            jumperObj.i_xAcc = 0;
        } else {
            jumperObj.i_yAcc += jumperObj.i_gravity;
            if (jumperObj.b_boosting && jumperObj.i_yPos + jumperObj.i_yAcc <= jumperObj.i_maxJumperYPos) {
                if (jumperObj.i_yPos <= jumperObj.i_maxJumperYPos) {
                    jumperObj.preMoving(jumperObj, scene, a_slats, jumperObj.i_yAcc);
                } else {
                    jumperObj.i_yPos += jumperObj.i_maxJumperYPos - jumperObj.i_yPos;
                    jumperObj.preMoving(jumperObj, scene, a_slats, jumperObj.i_yAcc - (jumperObj.i_maxJumperYPos - jumperObj.i_yPos));
                }
            } else {
                jumperObj.i_yPos += jumperObj.i_yAcc;
            }
        }


		//exit to 'start menu'
        if (typeof i_canvasHeight !== "undefined" && this.explode(jumperObj,this.i_canvasHeight)) {
            alert('you loose ...');
            //gameOver();
			location.reload();
        }
	
	};

    this.preMoving = function(jumperObj, scene, a_slats, moveHeight) {
       // alert("premoving");
        jumperObj.i_score -= moveHeight;
        jumperObj.i_regenerateHeight -= moveHeight;
        var isRegenerate = false;
        if(jumperObj.i_regenerateHeight > scene.regenerateLimit) {
            isRegenerate = true;
            jumperObj.i_regenerateHeight = 0;
        }
        scene.moveScene(moveHeight, a_slats, isRegenerate, jumperObj.i_score);
    };


    this.falling = function (jumperObj, a_slats) {
        for (oneSlat in a_slats) {
            if (!this.b_boosting) {
                if (jumperObj.i_xPos + jumperObj.i_jumperWidth > a_slats[oneSlat].i_xSlatPos
                    && jumperObj.i_xPos < a_slats[oneSlat].i_xSlatPos + this.util.getSlatWidth(this.canvas)
                    && jumperObj.i_yPos <= a_slats[oneSlat].i_ySlatPos - this.util.getSlatHeight(this.canvas)
                    && jumperObj.i_yPos + jumperObj.i_yAcc + jumperObj.i_jumperHeight>=
                            a_slats[oneSlat].i_ySlatPos - this.util.getSlatHeight(this.canvas)) {

                    jumperObj.o_lastSlat = a_slats[oneSlat];
                    return true;
                }
            }
        }
        return false;
    };
	
	
	//if person die
	this.explode = function (jumperObj, i_canvasHeight){
		if (jumperObj.i_yPos + jumperObj.i_jumperHeight <= i_canvasHeight) {
			return false;
        }
        return true;
	}
	
}