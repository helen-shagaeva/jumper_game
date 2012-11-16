var i_screenHeight = getWinSize().myHeight;
var i_screenWidth = getWinSize().myWidth;

var slats = new Array();

var canvas = document.getElementById('canvas');
canvas.height = i_screenHeight;
canvas.width = i_screenHeight / (16/10);

// TODO move canvas to center of the screen
//canvas.offsetTop = (i_screenHeight - canvas.height) / 2;
//canvas.offsetLeft = (i_screenWidth - canvas.width) /2;

var drawer = new Drawer(canvas);
var jumper = new Jumper(canvas.width, canvas.height);

update = function() {
    jumper.updateJumper(jumper);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawer.drawBackground(backgroundImg);
    drawer.drawJumper(jumper);
};

var backgroundImg = new Image();
backgroundImg.src = "../img/background.png";
backgroundImg.onload = function() {
    setInterval(update, 50);
};

