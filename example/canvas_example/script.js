var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// First circle
var center1X = canvas.width / 2 - 100;
var center1Y = canvas.height / 2;
var radius = 70;

// Second circle
var center2X = canvas.width / 2 + 100;
var center2Y = canvas.height / 2;

// Third circle
var center3X = canvas.width / 2;
var center3Y = canvas.height / 2 + 150;

this.draw = function () {

    // Redraw canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(center1X, center1Y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();


    context.beginPath();
    context.arc(center2X, center2Y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();


    context.beginPath();
    context.arc(center3X, center3Y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'blue';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

    center1X += 2;
    center1Y += 2;
    center2X -= 2;
    center2Y += 2;
    center3X -= 2;
    center3Y -= 2;
};

setInterval(draw, 50);