//first slat values
// Need for testing
first_slat_x = 300;
first_slat_y = 570;

// Setup copter element and jumper model
var jumperObj = new Jumper();
jumper = document.getElementById("jumper_id");

// var slatObj = new Slat(first_slat_x, first_slat_y);

 var slat_h1 = document.getElementById("slat1_id");
 var slat_h2 = document.getElementById("slat2_id");
 var slat_h3 = document.getElementById("slat3_id");


var slat_objs = new Array();

getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

slatsGenerate = function(slats) {
    var count = getRandomInt(20, 30);
    alert(count);
    for (var i = 0; i < count; i++) {
        var current_slat = new Slat();
        current_slat.width = getRandomInt(0, 50);
        current_slat.xpos = getRandomInt(0, (screen.availWidth - current_slat.width));
        current_slat.ypos = getRandomInt(0, (screen.availHeight - 100));

        slats.push(current_slat);
    }
    return slats;
};

 //slat_objs = slatsGenerate(slat_objs);

 slat_objs[0]=(new Slat(first_slat_x, first_slat_y));
 slat_objs[1]=(new Slat(first_slat_x+ 100, first_slat_y - 100));
 slat_objs[2]=(new Slat(first_slat_x+ 200, first_slat_y - 200));


//slat_objs = slatsGenerate(slat_objs);

//Initial

slat_h1.style.top = first_slat_y;
slat_h1.style.left = first_slat_x;

slat_h2.style.top = first_slat_y - 100;
slat_h2.style.left = first_slat_x + 100;

slat_h3.style.top = first_slat_y - 200;
slat_h3.style.left = first_slat_x+ 200;

drawSlats = function(slats) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var count = slats.length;
    for(var i = 0; i < count; i++) {
        ctx.drawImage(slats[i].image, slats[i].xpos, slats[i].ypos);
    }
};

// Copy the "logical" object's position to the
// element in the DOM
draw = function(jumperObj) {
    jumper.style.left = jumperObj.i_xpos;
    jumper.style.top = jumperObj.i_ypos;

    drawSlats(slat_objs);
//    slat_objs[1].ypos++;
//    slat_h2.style.top = slat_objs[1].ypos;
};

update = function() {
    jumperObj.updateJumper(jumperObj, slat_objs);
    draw(jumperObj);
};

setInterval(update, 50);	// 50msec = 20 frames per second

