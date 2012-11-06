//first slat values
// Need for testing

first_slat_x = 300;
first_slat_y = 570;


var winSizes = getWinSize();

// Setup copter element and jumper model
var jumperObj = new Jumper();
var generator = new Generator(winSizes.myWidth, winSizes.myHeight);
jumper = document.getElementById("jumper_id");

var slat_objs = new Array();

slat_objs.push(new Slat(first_slat_x, first_slat_y));
slat_objs = generator.slatsGenerate(slat_objs, ((winSizes.myHeight * 3)), true);

// Copy the "logical" object's position to the
// element in the DOM
draw = function(jumperObj) {
    jumper.style.left = jumperObj.i_xpos;
    jumper.style.top = jumperObj.i_ypos;
};

update = function() {
    jumperObj.updateJumper(jumperObj, slat_objs);
    draw(jumperObj);
};

setInterval(update, 50);	// 50msec = 20 frames per second

