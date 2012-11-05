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

slatsGenerate = function(slats, need_height) {
    need_height = need_height * (-1);
    var count = 25;
    var id = slats[slats.length -1].id;
    var y_step = winSizes.myHeight;
    var x_step = slats[slats.length -1].width * 3;
    var tmp_xpos = slats[slats.length -1].xpos;
    var tmp_ypos = slats[slats.length -1].ypos;

    while(tmp_ypos > need_height) {       // путь

        var current_slat = new Slat();
        current_slat.ypos = getRandomInt(tmp_ypos, tmp_ypos - 240); // jumpers step OY (290) - 50
        if((current_slat.ypos - tmp_ypos) > 240) { current_slat.ypos = current_slat.ypos - ((current_slat.ypos - tmp_ypos) - 240);}

        var direction = getRandomInt(0, 10);
        if((current_slat.xpos + 50) > (winSizes.myWidth - 10)) { direction = 8; }   // to left

        if(direction < 5) {    // right
            current_slat.xpos = getRandomInt(tmp_xpos, (tmp_xpos + 200));
        } else {    // left
            current_slat.xpos = getRandomInt((tmp_xpos - 200), tmp_xpos);
            if(current_slat.xpos < 0) {current_slat.xpos = current_slat.xpos * (-1);}
        }

        current_slat.id = id;
        slats.push(current_slat);
        id++;

        tmp_ypos = current_slat.ypos;
        tmp_xpos = current_slat.xpos;
    }
    var last_slat = slats.pop();    // запоминаю последнюю

    for (var i = 0; i < count; i++) {       // мусор
        var current_slat = new Slat();
        current_slat.ypos = getRandomInt((need_height - 10), winSizes.myHeight);
        current_slat.xpos = getRandomInt(0, (winSizes.myWidth - current_slat.width));
        current_slat.id = id;
        slats.push(current_slat);
        id++;
    }

    slats.push(last_slat);

    for(var a = 0; a < slats.length; a++) {
        slats[a].addToDom(slats[a].id, slats[a].xpos, slats[a].ypos);
    }
    return slats;
};

slat_objs.push(new Slat(first_slat_x, first_slat_y));
slat_objs = slatsGenerate(slat_objs, ((winSizes.myHeight * 3)));

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

