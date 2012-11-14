var i_screenHeight = getWinSize().myHeight;
var i_screenWidth = getWinSize().myWidth;

var slats = new Array();

var canvas = document.getElementById('canvas');

//canvas.offsetTop = (i_screenHeight - canvas.height) / 2;
//canvas.offsetLeft = (i_screenWidth - canvas.width) /2;

var drawer = new Drawer(canvas);

update = function() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawer.drawBackground(backgroundImg);
};

var backgroundImg = new Image();
backgroundImg.src = "../img/background.png";
backgroundImg.onload = function() {
    setInterval(update, 50);
};

