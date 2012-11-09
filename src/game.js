var i_screenHeight = getWinSize().myHeight;
var i_screenWidth = getWinSize().myWidth;

var canvas = document.getElementById('canvas');

canvas.offsetTop = (i_screenHeight - canvas.height) / 2;
canvas.offsetLeft = (i_screenWidth - canvas.width) /2;
var drawer = new Drawer(canvas);

var backgroundImg = new Image();
backgroundImg.src = "../img/background.png";
backgroundImg.onload = function() {
    drawer.drawBackground(backgroundImg);
}

update = function() {

};

setInterval(update, 50);