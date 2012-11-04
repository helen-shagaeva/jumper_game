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

    var xcount = getRandomInt(1, (screen.availWidth/93) - 2);          // slats width
    var ycount = getRandomInt(1, 3);
    var part_count = screen.availHeight/step;
    var counter = 0;
    var first = true;
    for (var i = 0; i < part_count; i++) {
        for(var yn = 0; yn < ycount; yn++) {
            if(i == 0 && first) {
                i = 1;
            }
            var ypos_new_slat= getRandomInt((screen.availHeight - (step * i)), screen.availHeight - (step * (i-1)));
            if(ypos_new_slat === undefined) {
                yn -= 1;
                continue;
            }
            for(var xn = 0; xn < xcount; xn++) {
                var current_slat = new Slat();
                current_slat.ypos = ypos_new_slat;
                current_slat.xpos = getRandomInt(0, (screen.availWidth - current_slat.width));
                if(current_slat.xpos === undefined) {
                    xn -= 1;
                    continue;
                }
                current_slat.id = counter;
                slats.push(current_slat);
                //current_slat.draw(current_slat.xpos, current_slat.ypos);
                counter++;
            }
            first = false;
        }
    }

    var string_deb = "count: " + slats.length + "\n";
    for(var a = 0; a < slats.length; a++) {
        string_deb += "slat[" + a + "].x: " + slats[a].xpos + " y: " + slats[a].ypos + "\n";
        slats[a].addToDom(slats[a].id, slats[a].xpos, slats[a].ypos);
    }
    alert(string_deb);
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

