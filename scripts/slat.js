/**
 * User: arlekino
 * Date: 9/15/12
 * Time: 7:55 PM
 */
function Slat(xpos, ypos) {
    this.height = 40;
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = 93;
    this.image  = new Image();
    this.image.src = 'images/slat.png';
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
	
	/*
	this.draw = function(){
		//draw function of this object	
	};
	this.update = function(){
		//update function of this object
	};
	*/
}
