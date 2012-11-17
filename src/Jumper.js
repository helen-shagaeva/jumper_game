function Jumper(canvas) {
    this.i_xPos = canvas.width/2;
    this.i_yPos = canvas.height * 0.8;
    this.i_xAcc = 0;
    this.i_yAcc = 3;
    this.i_gravity = 2;
    this.i_maxJumperYPos = canvas.height * 0.5;
    this.i_score = 0;
    this.i_regenerateScore = 0;
    this.i_friction = 1;

//    this.moveRight();
//    this.moveLeft();

    this.image = new Image();
    this.image.src = "../img/human.png";

    // this.drawBackground = function (backgroundImg) {

    //todo add movescene function to updateJumper args
    this.updateJumper = function (jumperObj, a_slats) {
        if (this.i_xacc > this.i_friction) {
            this.i_xacc -= this.i_friction;
        } else if (this.i_xacc < -this.i_friction) {
            this.i_xacc += this.i_friction;
        } else {
            this.i_xacc = 0;
        }
        jumperObj.i_xpos += jumperObj.i_xacc;


        if (jumperObj.i_yacc >= 0) {
            jumperObj.b_boosting = false;
        }

    };
}