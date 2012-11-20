var i_screenHeight = getWinSize().myHeight;
var i_screenWidth = getWinSize().myWidth;

// TODO move to util
var canvas = document.getElementById('canvas');
canvas.height = i_screenHeight;
canvas.width = i_screenHeight / (16/10);

var slats = new Array();
var drawer = new Drawer(canvas);
var util = new Util();
var jumper = new Jumper(canvas, util);
var generator = new SlatGenerator(canvas, util);

slats.push(new Slat(jumper.i_xPos - 10, jumper.i_yPos + 100, 0));
generator.generateSlats(slats, 0, 0);


// TODO move canvas to center of the screen
//canvas.offsetTop = (i_screenHeight - canvas.height) / 2;
//canvas.offsetLeft = (i_screenWidth - canvas.width) /2;


update = function() {
    jumper.updateJumper(jumper, slats);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawer.drawBackground(backgroundImg);
    drawer.drawSlats(util, slats);
    drawer.drawJumper(jumper);
    util.movingControll(jumper);
};

var backgroundImg = new Image();
backgroundImg.src = "../img/background.png";
backgroundImg.onload = function() {
    util.loadImage(setInterval(update, 50));
};







