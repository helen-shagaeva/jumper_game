// Setup copter element and jumper model
var jumper = new newJumper();
buzzer = document.getElementById("jumper_id");

var slat = new newSlat();
slat_h = document.getElementById("slat_id");

// Copy the "logical" object's position to the
// element in the DOM
draw = function(copter, slat) {
	buzzer.style.left = copter.xpos;
	buzzer.style.top = copter.ypos;

    slat_h.style.top = slat.ypos;
    slat_h.style.left = slat.xpos;
};

update = function() {
	jumper.updateJumper(jumper, slat);
	draw(jumper, slat);
};

setInterval(update, 50);	// 50msec = 20 frames per second

