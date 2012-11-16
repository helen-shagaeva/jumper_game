function Jumper(canvas_width, canvas_height) {
    this.i_xPos = canvas_width/2;
    this.i_yPos = canvas_height * 0.1;
    this.i_xAcc = 0;
    this.i_yAcc = 3;
    this.i_gravity = 2;
    this.i_maxJumperYPos = canvas_height * 0.7;
    this.i_score = 0;
    this.i_regenerateScore = 0;

//    this.moveRight();
//    this.moveLeft();

    this.image = new Image();
    this.image.src = "../img/human.png";

    // this.drawBackground = function (backgroundImg) {

    //todo add movescene function to updateJumper args
    this.updateJumper = function (jumperObj, a_slats) {

        jumperObj.i_yPos += jumperObj.i_yAcc;
//        // Трение - уменьшает ускорение объекта до 0.
//        if (this.i_xacc > this.i_friction) {
//            this.i_xacc -= this.i_friction;
//        } else if (this.i_xacc < -this.i_friction) {
//            this.i_xacc += this.i_friction;
//        } else {
//            this.i_xacc = 0;
//        }
//        jumperObj.i_xpos += jumperObj.i_xacc;

    };
}