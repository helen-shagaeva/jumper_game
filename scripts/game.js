// Setup copter element and jumper model
var jumperObj = new newJumper();
jumper = document.getElementById("jumper_id");

var slat = new newSlat();
slat_h = document.getElementById("slat_id");

// Copy the "logical" object's position to the
// element in the DOM
draw = function(jumperObj, slat) {
	jumper.style.left = jumperObj.xpos;
	jumper.style.top = jumperObj.ypos;

    slat_h.style.top = slat.ypos;
    slat_h.style.left = slat.xpos;
};

update = function() {
	jumperObj.updateJumper(jumperObj, slat);
	draw(jumperObj, slat);
};

setInterval(update, 50);	// 50msec = 20 frames per second

