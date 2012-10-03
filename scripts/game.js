//first slat values
first_slat_x = 300;
first_slat_y = 570;

// Setup copter element and jumper model
var jumperObj = new Jumper();
jumper = document.getElementById("jumper_id");

var slatObj = new Slat(first_slat_x, first_slat_y);
var slat_h1 = document.getElementById("slat1_id");
var slat_h2 = document.getElementById("slat2_id");
var slat_h3 = document.getElementById("slat3_id");

var slat_objs = {};


slat_objs[0]=(new Slat(first_slat_x, first_slat_y));
slat_objs[1]=(new Slat(first_slat_x, first_slat_y - 400));
slat_objs[2]=(new Slat(first_slat_x + 200, first_slat_y - 200));

//Initial
slat_h1.style.top = first_slat_y;
slat_h1.style.left = first_slat_x;

slat_h2.style.top = first_slat_y - 400;
slat_h2.style.left = first_slat_x;

slat_h3.style.top = first_slat_y - 200;
slat_h3.style.left = first_slat_x + 300;

// Copy the "logical" object's position to the
// element in the DOM
draw = function(jumperObj) {
	jumper.style.left = jumperObj.xpos;
	jumper.style.top = jumperObj.ypos;

  slat_objs[1].ypos++;
  slat_h2.style.top = slat_objs[1].ypos;
};

update = function() {
	jumperObj.updateJumper(jumperObj, slat_objs);
	draw(jumperObj);
};

setInterval(update, 50);	// 50msec = 20 frames per second

