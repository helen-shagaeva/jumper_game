
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var drawer = new Drawer(context);

var backgroundImg = new Image();
backgroundImg.src = "../img/background.png";

backgroundImg.onload = function() {
    drawer.drawBackground(backgroundImg);
};
drawer.drawBackgroun;

drawer.