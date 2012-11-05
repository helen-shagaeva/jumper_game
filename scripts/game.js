//first slat values
// Need for testing

first_slat_x = 300;
first_slat_y = 570;


var winSizes = getWinSize();

// Setup copter element and jumper model
var jumperObj = new Jumper();
jumper = document.getElementById("jumper_id");

var slat_objs = new Array();

getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

slatsGenerate = function(slats, step) {
    slat_objs.push(new Slat(first_slat_x, first_slat_y));

    var count = 25;
    var id = 0;
    for (var i = 0; i < count; i++) {
        var current_slat = new Slat();
        current_slat.ypos = getRandomInt(-100, winSizes.myHeight);
        current_slat.xpos = getRandomInt(0, (screen.availWidth - current_slat.width));
        current_slat.id = id;
        slats.push(current_slat);
        id++;
    }
    for(var a = 0; a < slats.length; a++) {
        slats[a].addToDom(slats[a].id, slats[a].xpos, slats[a].ypos);
    }
    return slats;
};
  slat_objs = slatsGenerate(slat_objs, 290); // 290 - step!!!

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

