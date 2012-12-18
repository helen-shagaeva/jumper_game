function Slat(xpos, ypos, slatType) {
    this.i_xSlatPos = xpos;
    this.i_ySlatPos = ypos;
    // this.interact ;
    // this.move;
    this.slatType = slatType;

    this.t = "";
    this.direction = false; // move to right
    this.speed = 3;

    this.shiftSlat = function(height) {
        this.i_ySlatPos -= height;
    };
};