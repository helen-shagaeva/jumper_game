/**
 * User: arlekino
 * Date: 9/15/12
 * Time: 7:55 PM
 */
function Slat(xpos, ypos) {
    this.height_of_slat = 40;
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = 93;
    this.image  = new Image();
    this.image.src = 'images/slat.png';
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
}
