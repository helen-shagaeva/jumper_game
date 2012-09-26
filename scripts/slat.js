/**
 * User: arlekino
 * Date: 9/15/12
 * Time: 7:55 PM
 */
function newSlat() {
    this.height_of_slat = 40;
    this.xpos = 300;
	this.ypos = 570;
    this.touch = false;
    this.getRandomInt = function(min, max) {
           return Math.floor(Math.random() * (max - min + 1)) + min;
    };
}
