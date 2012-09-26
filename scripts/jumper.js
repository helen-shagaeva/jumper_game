/**
 * User: arlekino
 * Date: 9/16/12
 * Time: 5:44 PM
 */

function newJumper() {
	this.gravity = 0.3;
	this.step = 200;
	this.xpos = 300;
	this.ypos = 400;
	this.xvel = 0;
    this.yvel = 0;
    this.xacc = 0;
    this.yacc = 3;
	this.boosting = false;
    this.updateJumper = function(jumperObj, slat_js) {
        // Navigate
        jumperObj.xvel += jumperObj.xacc;
        jumperObj.xpos += jumperObj.xvel;

        // Boost
        if(jumperObj.boosting) {
            jumperObj.yacc = -5;
        }
        
        this.falling();

       // Land
	    if (jumperObj.ypos > (slat_js.ypos - slat_js.height_of_slat) ) {
            jumperObj.ypos = slat_js.ypos - jumperObj.step;
            jumperObj.yvel = 0;
            jumperObj.yacc = 0;
            jumperObj.xacc = 0;
            jumperObj.xvel = 0;
	    }
    };
    this.falling = function() {
         // Fall
        this.yacc += this.gravity;
        this.yvel += this.yacc;
        this.ypos += this.yvel;
    };
}