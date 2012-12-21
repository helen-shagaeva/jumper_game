var i_screenHeight = getWinSize().myHeight;
var i_screenWidth = getWinSize().myWidth;

// TODO move to util
var canvas = document.getElementById('canvas');
canvas.height = i_screenHeight;
canvas.width = i_screenHeight / (16/10);



// ������ ���������� ��������������� � ����������� 
// �� ���������������� ������ ��� �� ����������
var i_canvasHeight = getCanvasSize("canvas").myHeight;
var i_canvasWidth = getCanvasSize("canvas").myWidth;

var slats = new Array();
var drawer = new Drawer(canvas);
var util = new Util();
var generator = new SlatGenerator(canvas, util);
var scene = new Scene(generator);
var jumper = new Jumper(canvas, util, scene);


// TODO move canvas to center of the screen
//canvas.offsetTop = (i_screenHeight - canvas.height) / 2;
//canvas.offsetLeft = (i_screenWidth - canvas.width) /2;


update = function() {
    jumper.updateJumper(jumper, slats, scene);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawer.drawBackground(backgroundImg);
    drawer.drawSlats(util, slats);
    drawer.drawJumper(jumper, util);
    util.movingControll(jumper);
};

var backgroundImg = new Image();
backgroundImg.src = "../img/background.png";
backgroundImg.onload = function() {
    util.loadImage(setInterval(update, 50), jumper, util);
};

slats.push(new Slat(canvas.width/2 - 10, canvas.height * 0.7 + 100, 0));
generator.slatsGenerate(slats,getWinSize().myHeight * 3, 0, true);