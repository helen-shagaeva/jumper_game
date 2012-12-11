function Slat(xpos, ypos, slatType) {
    this.i_xSlatPos = xpos;
    this.i_ySlatPos = ypos;
    // this.interact ;
    // this.move;
    this.slatType = slatType;

    this.t = "";

    typeOneMoving = function() {
        if(this.i_xSlatPos == 'undefined' || this.i_ySlatPos == 'undefined') {
        this.i_xSlatPos = xpos;
        this.i_ySlatPos = ypos;
        }
        this.i_xSlatPos += 3;
        //alert(this.i_xSlatPos + " " + xpos + " " + ypos);
    };

    if(this.slatType == 0) {

        setInterval(typeOneMoving, 50);
    }



    this.shiftSlat = function(height) {
        this.i_ySlatPos -= height;
    };
};